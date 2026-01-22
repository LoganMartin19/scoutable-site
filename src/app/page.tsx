"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Shot = {
  key: string;
  title: string;
  subtitle: string;
  src: string;
};

const SHOTS: Shot[] = [
  {
    key: "home",
    title: "Home",
    subtitle: "Instant Teamsheet Scanning and Match Creation.",
    src: "/screens/home.png",
  },
  {
    key: "fixturelist",
    title: "Fixtures",
    subtitle: "Track Upcoming Matches and Scan Status by Competition.",
    src: "/screens/fixturelist.png",
  },
  {
    key: "scanpage",
    title: "Scan teamsheet",
    subtitle: "Upload a Teamsheet Image Directly from a Matchday.",
    src: "/screens/scanpage.png",
  },
  {
    key: "playerscan",
    title: "Player extraction",
    subtitle: "Auto-extract Players from the Teamsheet Scan.",
    src: "/screens/playerscan.png",
  },
  {
    key: "playerbreakdown",
    title: "Player reports",
    subtitle: "Quick Ratings, Notes, and MOTM Tagging.",
    src: "/screens/playerbreakdown.png",
  },
  {
    key: "workspace",
    title: "Workspace",
    subtitle: "Shared Club Workspace with Recent Reports.",
    src: "/screens/workspace.png",
  },
  {
    key: "scoutprofile",
    title: "Scout profiles",
    subtitle: "View Scout Coverage, Focus, and Contact Details.",
    src: "/screens/scoutprofile1.png",
  },
];

function clampIndex(i: number, len: number) {
  if (len <= 0) return 0;
  return ((i % len) + len) % len;
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--panel)] px-4 py-2 text-xs font-extrabold tracking-wide text-white">
      {children}
    </span>
  );
}

function SectionTitle({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      <div className="text-xs font-extrabold tracking-wider text-[var(--yellow)] uppercase">
        {kicker}
      </div>
      <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
        {title}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)] md:text-base">
        {subtitle}
      </p>
    </div>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
      <div className="text-sm font-extrabold text-white">{title}</div>
      <div className="mt-2 text-sm leading-6 text-[var(--muted)]">{text}</div>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      className="w-full rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-6 text-left shadow-[0_18px_50px_rgba(0,0,0,0.35)] transition hover:bg-[var(--panel-2)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="text-sm font-extrabold text-white">{q}</div>
        <div className="mt-0.5 text-[var(--muted)]">{open ? "–" : "+"}</div>
      </div>
      {open && <div className="mt-3 text-sm leading-6 text-[var(--muted)]">{a}</div>}
    </button>
  );
}

export default function Page() {
  const [active, setActive] = useState(0);
  const shots = useMemo(() => SHOTS, []);
  const current = shots[active];

  const next = () => setActive((i) => clampIndex(i + 1, shots.length));
  const prev = () => setActive((i) => clampIndex(i - 1, shots.length));

  return (
    <div className="min-h-screen bg-black text-white">
      {/* NAV */}
      <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-black/85 backdrop-blur">
        <div className="brand-container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-xl bg-black">
              <Image
                src="/screens/scoutablelogonew.png"
                alt="Scoutable logo"
                fill
                sizes="36px"
                className="object-contain"
                priority
              />
            </div>

            <div className="leading-tight">
              <div className="text-sm font-extrabold">Scoutable</div>
              <div className="text-xs text-[var(--muted)]">Tools for modern scouts</div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-[var(--muted)] md:flex">
            <a href="#features" className="hover:text-white">
              Features
            </a>
            <a href="#screens" className="hover:text-white">
              Screens
            </a>
            <a href="#faq" className="hover:text-white">
              FAQ
            </a>
            <a href="#contact" className="hover:text-white">
              Contact
            </a>
          </nav>

          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-[var(--yellow)] px-4 py-2 text-sm font-extrabold text-black shadow-sm transition hover:brightness-110"
          >
            Get in touch
          </a>
        </div>
      </header>

      {/* HERO (bigger blocks / livi vibe) */}
      <section className="brand-container pb-12 pt-10 md:pb-16 md:pt-14">
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div>
            <Pill>
              <span className="h-2 w-2 rounded-full bg-[var(--yellow)]" />
              Pilot testing available now
            </Pill>

            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
              Instant Team-sheet Scanning —{" "}
              <span className="text-[var(--yellow)]">Match Logs & Player Reports</span>{" "}
              in minutes.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-[var(--muted)] md:text-lg">
              Scoutable helps clubs capture teamsheets, generate match logs, and file quick player reports
              with ratings, notes, and MOTM — built for real matchday workflows.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="#screens"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--yellow)] px-6 text-sm font-extrabold text-black transition hover:brightness-110"
              >
                See the app screens
              </a>
              <a
                href="#contact"
                className="inline-flex h-12 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--panel)] px-6 text-sm font-extrabold text-white transition hover:bg-[var(--panel-2)]"
              >
                Book a pilot demo
              </a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-4">
                <div className="text-sm font-extrabold text-white">2–5 min</div>
                <div className="mt-1 text-xs leading-5 text-[var(--muted)]">from photo to log</div>
              </div>
              <div className="rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-4">
                <div className="text-sm font-extrabold text-white">Fast</div>
                <div className="mt-1 text-xs leading-5 text-[var(--muted)]">ratings & notes</div>
              </div>
              <div className="rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-4">
                <div className="text-sm font-extrabold text-white">Shared</div>
                <div className="mt-1 text-xs leading-5 text-[var(--muted)]">club workspace</div>
              </div>
            </div>
          </div>

          {/* Right block: logo + phone preview */}
          <div className="md:justify-self-end">
            <div className="rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-extrabold tracking-wider text-[var(--muted)] uppercase">
                    Pilot build preview
                  </div>
                  <div className="mt-2 text-lg font-extrabold text-white">{current.title}</div>
                  <div className="mt-1 text-sm text-[var(--muted)]">{current.subtitle}</div>
                </div>

                <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-[var(--line)] bg-black">
                  <Image
                    src="/screens/scoutablelogonew.png"
                    alt="Scoutable logo"
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <div className="relative aspect-[9/19.5] w-full max-w-[360px] overflow-hidden rounded-[32px] border border-[var(--line)] bg-black">
                  <Image
                    src={current.src}
                    alt={current.title}
                    fill
                    sizes="(max-width: 768px) 90vw, 360px"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-2">
                <button
                  onClick={prev}
                  className="rounded-xl border border-[var(--line)] bg-black/30 px-4 py-2 text-sm font-extrabold text-white hover:bg-[var(--panel-2)]"
                >
                  ← Prev
                </button>

                <div className="flex items-center gap-2">
                  {shots.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`h-2.5 w-2.5 rounded-full transition ${
                        i === active ? "bg-[var(--yellow)]" : "bg-white/25 hover:bg-white/40"
                      }`}
                      aria-label={`Go to ${shots[i].title}`}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  className="rounded-xl bg-[var(--yellow)] px-4 py-2 text-sm font-extrabold text-black hover:brightness-110"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="border-t border-[var(--line)] bg-black">
        <div className="brand-container py-12 md:py-14">
          <SectionTitle
            kicker="Features"
            title="Built for real matchday workflows"
            subtitle="Keep admin lightweight: capture the teamsheet, log the match, and file player notes in one flow."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Card
              title="Instant teamsheet capture"
              text="Upload a photo and extract players quickly — so you spend time watching, not typing."
            />
            <Card
              title="Match logs + score tracking"
              text="Capture formations, score, and a short match summary — ready for coaches or recruitment."
            />
            <Card
              title="Player reports in seconds"
              text="Rate Technical/Tactical/Physical/Psych, add notes, and tag MOTM — fast and consistent."
            />
            <Card
              title="Shared club workspace"
              text="A single place to browse recent reports and keep scouting aligned across staff."
            />
            <Card
              title="Permissions built-in"
              text="Writers can edit; viewers can read. Designed for clubs with multiple roles."
            />
            <Card
              title="Pilot-friendly setup"
              text="Start with one club workspace and iterate — no heavy onboarding needed."
            />
          </div>
        </div>
      </section>

      {/* SCREENS (SINGLE CAROUSEL ONLY — no messy thumb grid) */}
      <section id="screens" className="border-y border-[var(--line)] bg-black">
        <div className="brand-container py-12 md:py-14">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionTitle
              kicker="Screens"
              title="Scroll-stopping walkthrough"
              subtitle="One clean carousel — click through the full flow."
            />

            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="rounded-xl border border-[var(--line)] bg-[var(--panel)] px-4 py-2 text-sm font-extrabold text-white hover:bg-[var(--panel-2)]"
              >
                ← Prev
              </button>
              <button
                onClick={next}
                className="rounded-xl bg-[var(--yellow)] px-4 py-2 text-sm font-extrabold text-black hover:brightness-110"
              >
                Next →
              </button>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            <div className="text-xs font-extrabold tracking-wider text-[var(--muted)] uppercase">
              Step {active + 1} / {shots.length}
            </div>

            <div className="mt-2 text-2xl font-extrabold text-white">{current.title}</div>
            <div className="mt-2 text-sm text-[var(--muted)]">{current.subtitle}</div>

            <div className="mt-5 flex items-center gap-2">
              {shots.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    i === active ? "bg-[var(--yellow)]" : "bg-white/25 hover:bg-white/40"
                  }`}
                  aria-label={`Go to ${shots[i].title}`}
                />
              ))}
            </div>

            <div className="mt-7 flex justify-center">
              <div className="relative aspect-[9/19.5] w-full max-w-[420px] overflow-hidden rounded-[34px] border border-[var(--line)] bg-black">
                <Image
                  src={current.src}
                  alt={current.title}
                  fill
                  sizes="(max-width: 768px) 90vw, 420px"
                  className="object-contain"
                />
              </div>
            </div>

            <div className="mt-6 text-center text-xs text-[var(--muted)]">
              Screens shown are from an internal pilot build.
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-black">
        <div className="brand-container py-12 md:py-14">
          <SectionTitle
            kicker="FAQ"
            title="Common questions"
            subtitle="A few quick answers to what clubs usually ask first."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <FAQItem
              q="Will scanned fixtures/reports persist for users?"
              a="Yes — once the app is reading/writing Firestore per user (which your current ScoutContext + betaFirestore setup supports)."
            />
            <FAQItem
              q="Can staff view reports without editing?"
              a="Yes — you already support read-only behaviour for non-editors."
            />
            <FAQItem
              q="Do you support substitutes?"
              a="Yes — subs are already wired through your OCR → Firestore → match log flow."
            />
            <FAQItem
              q="What’s needed for a pilot?"
              a="A club workspace, a small user list, and agreed permissions (who can edit vs view)."
            />
          </div>
        </div>
      </section>

      {/* CONTACT DETAILS (bottom block) */}
      <section id="contact" className="border-t border-[var(--line)] bg-black">
        <div className="brand-container py-12 md:py-14">
          <div className="rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <div className="text-2xl font-extrabold text-white">Contact</div>
            <p className="mt-2 text-sm text-[var(--muted)]">
              For pilot access, onboarding, or support, reach out:
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-[var(--line)] bg-black/30 p-5">
                <div className="text-xs font-extrabold tracking-wider text-[var(--muted)] uppercase">
                  Email
                </div>
                <a
                  href="mailto:admin@scoutable.co.uk"
                  className="mt-2 block text-lg font-extrabold text-[var(--yellow)] hover:brightness-110"
                >
                  info@scoutable.co.uk
                </a>
                <div className="mt-1 text-xs text-[var(--muted)]">
                  We reply within 24–48 hours.
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--line)] bg-black/30 p-5">
                <div className="text-xs font-extrabold tracking-wider text-[var(--muted)] uppercase">
                  Pilot
                </div>
                <div className="mt-2 text-sm text-[var(--muted)]">
                  Want to trial Scoutable with your club?
                </div>
                <a
                  href="mailto:admin@scoutable.co.uk?subject=Scoutable%20Pilot%20Request"
                  className="mt-3 inline-flex items-center justify-center rounded-full bg-[var(--yellow)] px-5 py-2 text-sm font-extrabold text-black hover:brightness-110"
                >
                  Request a pilot
                </a>
              </div>
            </div>

            <div className="mt-6 text-xs text-[var(--muted)]">
              © {new Date().getFullYear()} Scoutable
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[var(--line)] bg-black">
        <div className="brand-container flex flex-col items-start justify-between gap-2 py-6 text-xs text-[var(--muted)] md:flex-row md:items-center">
          <div>Scoutable Ltd</div>
          <div>Built for modern scouting workflows</div>
        </div>
      </footer>
    </div>
  );
}