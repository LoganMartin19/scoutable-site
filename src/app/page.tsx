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
    <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-xs font-medium text-zinc-700 shadow-sm backdrop-blur">
      {children}
    </span>
  );
}

function Card({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="text-sm font-semibold text-zinc-900">{title}</div>
      <div className="mt-1 text-sm leading-6 text-zinc-600">{text}</div>
    </div>
  );
}

function FAQItem({
  q,
  a,
}: {
  q: string;
  a: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      className="w-full rounded-2xl border border-zinc-200 bg-white p-5 text-left shadow-sm transition hover:bg-zinc-50"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="text-sm font-semibold text-zinc-900">{q}</div>
        <div className="mt-0.5 text-zinc-400">{open ? "–" : "+"}</div>
      </div>
      {open && (
        <div className="mt-2 text-sm leading-6 text-zinc-600">{a}</div>
      )}
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
    <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_50%_0%,rgba(59,130,246,0.18),transparent_55%),radial-gradient(800px_500px_at_20%_20%,rgba(99,102,241,0.12),transparent_60%),linear-gradient(to_bottom,#f6f7fb,white)] text-zinc-900">
      {/* NAV */}
      <header className="sticky top-0 z-20 border-b border-zinc-200/60 bg-white/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-xl shadow-sm">
              <Image
                src="/screens/fulllogo.png"
                alt="Scoutable logo"
                fill
                sizes="36px"
                className="object-contain"
                priority
              />
            </div>

            <div className="leading-tight">
              <div className="text-sm font-semibold">Scoutable</div>
              <div className="text-xs text-zinc-500">Tools for modern scouts</div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-zinc-600 md:flex">
            <a href="#features" className="hover:text-zinc-900">Features</a>
            <a href="#screens" className="hover:text-zinc-900">Screens</a>
            <a href="#faq" className="hover:text-zinc-900">FAQ</a>
            <a href="#contact" className="hover:text-zinc-900">Contact</a>
          </nav>

          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Get in touch
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-5 pb-14 pt-14 md:pt-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <Pill>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Now testing in pilot mode
            </Pill>

            <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-900 md:text-5xl">
              Instant Team-sheet Scanning —{" "}
              <span className="text-blue-600">Match Logs & Player Reports</span>{" "}
              in minutes.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-zinc-700 md:text-lg">
              Scoutable helps clubs capture teamsheets, generate match logs, and file quick player reports
              with ratings, notes, and MOTM — built for real matchday workflows.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="#screens"
                className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                See the app screens
              </a>
              <a
                href="#contact"
                className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-900 shadow-sm transition hover:bg-zinc-50"
              >
                Book a pilot demo
              </a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
                <div className="text-sm font-semibold text-zinc-900">2–5 min</div>
                <div className="mt-1 text-xs leading-5 text-zinc-600">from photo to log</div>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
                <div className="text-sm font-semibold text-zinc-900">Fast</div>
                <div className="mt-1 text-xs leading-5 text-zinc-600">ratings & notes</div>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
                <div className="text-sm font-semibold text-zinc-900">Shared</div>
                <div className="mt-1 text-xs leading-5 text-zinc-600">club workspace</div>
              </div>
            </div>
          </div>

          <div className="md:justify-self-end">
            <div className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              <div className="text-xs font-medium text-zinc-500">
                Example output (pilot build)
              </div>

              {/* PHONE FRAME */}
              <div className="mt-3 overflow-hidden rounded-2xl bg-zinc-50 p-3">
                <div className="mx-auto w-full max-w-[320px]">
                  <div className="relative mx-auto aspect-[9/19.5] w-full overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-sm">
                    <Image
                      src={current.src}
                      alt={current.title}
                      fill
                      sizes="(max-width: 768px) 90vw, 320px"
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>

                <div className="mt-3 text-center text-xs text-zinc-500">
                  Snap the teamsheet, auto-extract players, and start reporting.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-6xl px-5 pb-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-sm font-semibold text-blue-600">Features</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
              Built for pro scouting workflows
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600 md:text-base">
              Keep matchday admin lightweight: capture the teamsheet, log the match, and file player notes in one flow.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card
            title="Instant teamsheet capture"
            text="Upload a photo and extract players quickly—so you spend time watching, not typing."
          />
          <Card
            title="Match logs + score tracking"
            text="Capture formations, score, and a short match summary—ready for coaches or recruitment."
          />
          <Card
            title="Player reports in seconds"
            text="Rate Technical/Tactical/Physical/Psych, add notes, and tag MOTM—fast and consistent."
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
            text="Start with one club workspace and iterate—no heavy onboarding needed."
          />
        </div>
      </section>

      {/* SCREENS / CAROUSEL */}
      <section id="screens" className="mx-auto max-w-6xl px-5 pb-16">
        <div className="flex items-center justify-between gap-6">
          <div>
            <div className="text-sm font-semibold text-blue-600">Screens</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
              A quick tour through the workflow
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600 md:text-base">
              Click through the core flow — teamsheet → extraction → reports → workspace.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm hover:bg-zinc-50"
            >
              ← Prev
            </button>
            <button
              onClick={next}
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm hover:bg-zinc-50"
            >
              Next →
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {/* BIG PREVIEW */}
          <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="text-xs font-medium text-zinc-500">
              Step {active + 1} / {shots.length}
            </div>
            <div className="mt-1 text-2xl font-semibold text-zinc-900">
              {current.title}
            </div>
            <div className="mt-2 text-sm text-zinc-600">{current.subtitle}</div>

            <div className="mt-5 flex items-center gap-2">
              {shots.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-2 w-2 rounded-full transition ${
                    i === active ? "bg-blue-600" : "bg-zinc-300 hover:bg-zinc-400"
                  }`}
                  aria-label={`Go to ${shots[i].title}`}
                />
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <div className="relative aspect-[9/19.5] w-full max-w-[320px] overflow-hidden rounded-[28px] border border-zinc-200 bg-zinc-50 shadow-sm">
                <Image
                  src={current.src}
                  alt={current.title}
                  fill
                  sizes="(max-width: 768px) 90vw, 320px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* THUMB GRID */}
          <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="grid grid-cols-3 gap-3">
              {shots.map((s, i) => (
                <button
                  key={s.key}
                  onClick={() => setActive(i)}
                  className={`rounded-2xl border p-3 text-left transition ${
                    i === active
                      ? "border-blue-300 bg-blue-50"
                      : "border-zinc-200 bg-white hover:bg-zinc-50"
                  }`}
                >
                  <div className="relative mx-auto aspect-[9/19.5] w-full max-w-[110px] overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
                    <Image
                      src={s.src}
                      alt={s.title}
                      fill
                      sizes="110px"
                      className="object-contain"
                    />
                  </div>
                  <div className="mt-2 text-xs font-semibold text-zinc-900">
                    {s.title}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 text-xs text-zinc-500">
          Screens shown are from an internal pilot build.
        </div>
      </section>

      {/* FAQ + CTA */}
      <section id="faq" className="mx-auto max-w-6xl px-5 pb-16">
        <div className="text-sm font-semibold text-blue-600">FAQ</div>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
          Common questions
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <FAQItem
            q="Will scanned fixtures/reports persist for users?"
            a="Yes — once the app loads fixtures/reports from Firestore on launch (instead of seeding local state). Right now your app resets because it isn’t pulling down saved docs on start yet."
          />
          <FAQItem
            q="Can staff view reports without editing?"
            a="Yes — you already have writer vs viewer behaviour working (read-only mode for non-writers)."
          />
          <FAQItem
            q="Do you support substitutes?"
            a="Not fully yet — but it’s a straightforward scanner pipeline update (you’ve already flagged this)."
          />
          <FAQItem
            q="What’s needed for a pilot?"
            a="A club workspace, a small user list, and agreed permissions (who can edit vs view)."
          />
        </div>

        <div
          id="contact"
          className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
        >
          <div className="text-xl font-semibold">Book a quick demo</div>
          <div className="mt-1 text-sm text-zinc-600">
            Drop your email and we’ll set up a short call and share access to the pilot build.
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <input
              className="h-12 w-full rounded-full border border-zinc-200 bg-white px-5 text-sm outline-none ring-blue-600/20 focus:ring-4"
              placeholder="Email address"
            />
            <button className="h-12 rounded-full bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
              Get in touch
            </button>
          </div>

          <div className="mt-2 text-xs text-zinc-500">
            No spam — just pilot updates.
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-200/70 bg-white/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 text-xs text-zinc-500">
          <div>© {new Date().getFullYear()} Scoutable</div>
          <div>Built for pro scouting workflows</div>
        </div>
      </footer>
    </div>
  );
}