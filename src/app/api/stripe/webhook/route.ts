import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

type ProStatus = "pro" | "starter";

type SubscriptionWithPeriod = Stripe.Subscription & {
  current_period_end?: number | null;
  items?: {
    data?: Array<{ current_period_end?: number | null }>;
  };
};

type InvoiceWithSubscription = Stripe.Invoice & {
  subscription?: string | { id?: string } | null;
};

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not configured.");
  }
  return new Stripe(key);
}

function subscriptionIsPro(status?: string | null) {
  return status === "active" || status === "trialing";
}

function timestampMs(seconds?: number | null) {
  return seconds ? seconds * 1000 : null;
}

function getSubscriptionPeriodEnd(subscription?: Stripe.Subscription | null) {
  const withPeriod = subscription as SubscriptionWithPeriod | null | undefined;
  const direct = withPeriod?.current_period_end;
  const item = withPeriod?.items?.data?.[0];
  return Number(direct || item?.current_period_end || 0) || null;
}

async function getCustomerEmail(customerId: string) {
  const customer = await getStripe().customers.retrieve(customerId);
  if (customer.deleted) return "";
  return customer.email || "";
}

async function resolveEmailFromSession(session: Stripe.Checkout.Session) {
  if (session.customer_details?.email) return session.customer_details.email;
  if (session.customer_email) return session.customer_email;
  if (typeof session.customer === "string") return getCustomerEmail(session.customer);
  return "";
}

async function resolveEmailFromSubscription(subscription: Stripe.Subscription) {
  if (typeof subscription.customer === "string") {
    return getCustomerEmail(subscription.customer);
  }
  if (subscription.customer.deleted) return "";
  return subscription.customer.email || "";
}

async function updateUserPlanByEmail(params: {
  email: string;
  plan: ProStatus;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  stripeSubscriptionStatus?: string | null;
  currentPeriodEndMs?: number | null;
  cancelAtPeriodEnd?: boolean | null;
}) {
  const email = params.email.trim().toLowerCase();
  if (!email) {
    console.warn("Stripe webhook skipped: no customer email.");
    return;
  }

  let user;
  try {
    user = await adminAuth.getUserByEmail(email);
  } catch {
    console.warn(`Stripe webhook skipped: no Firebase user found for ${email}.`);
    return;
  }

  await adminDb.collection("users").doc(user.uid).set(
    {
      plan: params.plan,
      subscriptionPlan: params.plan,
      stripeCustomerId: params.stripeCustomerId || null,
      stripeSubscriptionId: params.stripeSubscriptionId || null,
      stripeSubscriptionStatus: params.stripeSubscriptionStatus || null,
      stripeCurrentPeriodEndMs: params.currentPeriodEndMs || null,
      stripeCancelAtPeriodEnd: Boolean(params.cancelAtPeriodEnd),
      proUpdatedAt: Date.now(),
    },
    { merge: true }
  );
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const email = await resolveEmailFromSession(session);
  const subscriptionId =
    typeof session.subscription === "string" ? session.subscription : session.subscription?.id;
  let subscription: Stripe.Subscription | null = null;

  if (subscriptionId) {
    subscription = await getStripe().subscriptions.retrieve(subscriptionId);
  }

  await updateUserPlanByEmail({
    email,
    plan: subscriptionIsPro(subscription?.status) ? "pro" : "starter",
    stripeCustomerId: typeof session.customer === "string" ? session.customer : session.customer?.id,
    stripeSubscriptionId: subscriptionId,
    stripeSubscriptionStatus: subscription?.status || null,
    currentPeriodEndMs: timestampMs(getSubscriptionPeriodEnd(subscription)),
    cancelAtPeriodEnd: subscription?.cancel_at_period_end ?? null,
  });
}

async function handleSubscriptionChanged(subscription: Stripe.Subscription) {
  const email = await resolveEmailFromSubscription(subscription);
  await updateUserPlanByEmail({
    email,
    plan: subscriptionIsPro(subscription.status) ? "pro" : "starter",
    stripeCustomerId:
      typeof subscription.customer === "string"
        ? subscription.customer
        : subscription.customer.deleted
        ? undefined
        : subscription.customer.id,
    stripeSubscriptionId: subscription.id,
    stripeSubscriptionStatus: subscription.status,
    currentPeriodEndMs: timestampMs(getSubscriptionPeriodEnd(subscription)),
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
  });
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id;
  const email = customerId ? await getCustomerEmail(customerId) : invoice.customer_email || "";
  const invoiceSubscription = (invoice as InvoiceWithSubscription).subscription;
  const subscriptionId =
    typeof invoiceSubscription === "string" ? invoiceSubscription : invoiceSubscription?.id;

  await updateUserPlanByEmail({
    email,
    plan: "starter",
    stripeCustomerId: customerId,
    stripeSubscriptionId: subscriptionId,
    stripeSubscriptionStatus: "payment_failed",
    currentPeriodEndMs: null,
    cancelAtPeriodEnd: null,
  });
}

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!process.env.STRIPE_SECRET_KEY || !webhookSecret) {
    return NextResponse.json({ error: "Stripe webhook is not configured." }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 });
  }

  const rawBody = await request.text();
  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid Stripe signature.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        await handleSubscriptionChanged(event.data.object as Stripe.Subscription);
        break;
      case "invoice.payment_failed":
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;
      default:
        break;
    }
  } catch (err) {
    console.error("Stripe webhook handler failed:", err);
    return NextResponse.json({ error: "Webhook handler failed." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
