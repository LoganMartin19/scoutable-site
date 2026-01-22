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
  { key: "home", title: "Home", subtitle: "Instant Teamsheet Scanning and Match Creation.", src: "/screens/home.png" },
  { key: "fixturelist", title: "Fixtures", subtitle: "Track Upcoming Matches and Scan Status by Competition.", src: "/screens/fixturelist.png" },
  { key: "scanpage", title: "Scan teamsheet", subtitle: "Upload a Teamsheet Image Directly from a Matchday.", src: "/screens/scanpage.png" },
  { key: "playerscan", title: "Player extraction", subtitle: "Auto-extract Players from the Teamsheet Scan.", src: "/screens/playerscan.png" },
  { key: "playerbreakdown", title: "Player reports", subtitle: "Quick Ratings, Notes, and MOTM Tagging.", src: "/screens/playerbreakdown.png" },
  { key: "workspace", title: "Workspace", subtitle: "Shared Club Workspace with Recent Reports.", src: "/screens/workspace.png" },
  { key: "scoutprofile", title: "Scout profiles", subtitle: "View Scout Coverage, Focus, and Contact Details.", src: "/screens/scoutprofile1.png" },
];

function clampIndex(i: number, len: number) {
  if (len <= 0) return 0;
  return ((i % len) + len) % len;
}

function SectionTitle({ kicker, title, subtitle }: { kicker: string; title: string; subtitle?: string }) {
  return (
    <div>
      <div className="text-xs font-extrabold tracking-[0.18em] text-[var(--yellow)] uppercase">{kicker}</div>
      <h2 className="mt-3 text-2xl font-extrabold tracking-tight md:text-3xl">{title}</h2>
      {subtitle ? <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)] md:text-base">{subtitle}</p> : null}
    </div>
  );
}

function BigCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
      <div className="text-base font-extrabold">{title}</div>
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
      className="w-full rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 text-left shadow-[0_12px_40px_rgba(0,0,0,0.25)] transition hover:bg-[var(--panel-2)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="text-sm font-extrabold">{q}</div>
        <div className="mt-0.5 text-[var(--yellow)]">{open ? "–" : "+"}</div>
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
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* TOP ANNOUNCEMENT BAR (big block vibe) */}
      <div className="border-b border-[var(--line)] bg-black">
        <div className="brand-container flex items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-3">
            {/* swap this to your new black/yellow logo asset when ready */}
            <div className="relative h-9 w-9 overflow-hidden rounded-xl bg-black">
              <Image src="/screens/scoutablelogonew.png" alt="Scoutable logo" fill sizes="36px" className="object-contain" priority />
            </div>

            <div className="leading-tight">
              <div className="text-sm font-extrabold">Scoutable</div>
              <div className="text-xs text-[var(--muted)]">Pilot testing available now</div>
            </div>
          </div>

          <div className="hidden items-center gap-5 text-sm text-[var(--muted)] md:flex">
            <a href="#screens" className="hover:text-white">Screens</a>
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-[var(--yellow)] px-4 py-2 text-sm font-extrabold text-black shadow-sm transition hover:brightness-110"
          >
            Get in touch
          </a>
        </div>
      </div>

      {/* HERO (big block) */}
      <section className="brand-container pb-10 pt-10 md:pb-14 md:pt-14">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--panel)] px-3 py-1 text-xs font-extrabold text-[var(--yellow)]">
              PILOT MODE
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--yellow)]" />
              AVAILABLE NOW
            </div>

            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
              Instant Team-sheet Scanning —{" "}
              <span className="text-[var(--yellow)]">Match Logs & Player Reports</span> in minutes.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-[var(--muted)] md:text-lg">
              Scoutable helps clubs capture teamsheets, generate match logs, and file quick player reports
              with ratings, notes, and MOTM — built for real matchday workflows.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="#screens"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--yellow)] px-6 text-sm font-extrabold text-black shadow-sm transition hover:brightness-110"
              >
                View app screens
              </a>
              <a
                href="#contact"
                className="inline-flex h-12 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--panel)] px-6 text-sm font-extrabold text-white transition hover:bg-[var(--panel-2)]"
              >
                Book a pilot demo
              </a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-4">
                <div className="text-sm font-extrabold text-white">2–5 min</div>
                <div className="mt-1 text-xs leading-5 text-[var(--muted)]">from photo to log</div>
              </div>
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-4">
                <div className="text-sm font-extrabold text-white">Fast</div>
                <div className="mt-1 text-xs leading-5 text-[var(--muted)]">ratings & notes</div>
              </div>
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-4">
                <div className="text-sm font-extrabold text-white">Shared</div>
                <div className="mt-1 text-xs leading-5 text-[var(--muted)]">club workspace</div>
              </div>
            </div>
          </div>

          {/* Right: big phone preview */}
          <div className="md:justify-self-end">
            <div className="rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
              <div className="text-xs font-extrabold tracking-wider text-[var(--muted)] uppercase">
                Example output (pilot build)
              </div>

              <div className="mt-4 rounded-2xl border border-[var(--line)] bg-black/40 p-4">
                <div className="mx-auto w-full max-w-[340px]">
                  <div className="relative mx-auto aspect-[9/19.5] w-full overflow-hidden rounded-[30px] border border-[var(--line)] bg-black shadow-sm">
                    <Image
                      src={current.src}
                      alt={current.title}
                      fill
                      sizes="(max-width: 768px) 90vw, 340px"
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>

                <div className="mt-3 text-center text-xs text-[var(--muted)]">
                  Snap the teamsheet, extract players, start reporting.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BIG SCREENS CAROUSEL SECTION (the “scroll → big block” you asked for) */}
      <section id="screens" className="border-y border-[var(--line)] bg-black">
        <div className="brand-container py-12 md:py-14">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionTitle
              kicker="Screens"
              title="A quick tour through the workflow"
              subtitle="Scroll here and click through the core flow — teamsheet → extraction → reports → workspace."
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

          {/* BIG preview card */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
              <div className="text-xs font-extrabold tracking-wider text-[var(--muted)] uppercase">
                Step {active + 1} / {shots.length}
              </div>

              <div className="mt-2 text-2xl font-extrabold">{current.title}</div>
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

              <div className="mt-6 flex justify-center">
                <div className="relative aspect-[9/19.5] w-full max-w-[360px] overflow-hidden rounded-[30px] border border-[var(--line)] bg-black">
                  <Image
                    src={current.src}
                    alt={current.title}
                    fill
                    sizes="(max-width: 768px) 90vw, 360px"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Thumb grid */}
            <div className="rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {shots.map((s, i) => (
                  <button
                    key={s.key}
                    onClick={() => setActive(i)}
                    className={`rounded-2xl border p-3 text-left transition ${
                      i === active
                        ? "border-[var(--yellow)] bg-black/40"
                        : "border-[var(--line)] bg-black/25 hover:bg-black/35"
                    }`}
                  >
                    <div className="relative mx-auto aspect-[9/19.5] w-full max-w-[120px] overflow-hidden rounded-xl border border-[var(--line)] bg-black">
                      <Image src={s.src} alt={s.title} fill sizes="120px" className="object-contain" />
                    </div>
                    <div className="mt-2 text-xs font-extrabold">{s.title}</div>
                  </button>
                ))}
              </div>

              <div className="mt-4 text-xs text-[var(--muted)]">
                Screens shown are from an internal pilot build.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES (big blocks) */}
      <section id="features" className="brand-container py-12 md:py-14">
        <SectionTitle
          kicker="Features"
          title="Built for real scouting workflows"
          subtitle="Keep matchday admin lightweight: capture the teamsheet, log the match, and file player notes in one flow."
        />

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          <BigCard title="Instant teamsheet capture" text="Upload a photo and extract players quickly — so you spend time watching, not typing." />
          <BigCard title="Match logs + score tracking" text="Capture formations, score, and a short match summary — ready for coaches or recruitment." />
          <BigCard title="Player reports in seconds" text="Rate Tech/Tactical/Physical/Psych, add notes, and tag MOTM — fast and consistent." />
          <BigCard title="Shared club workspace" text="One place to browse reports and keep scouting aligned across staff." />
          <BigCard title="Permissions built-in" text="Writers can edit; viewers can read — designed for clubs with multiple roles." />
          <BigCard title="Pilot-friendly setup" text="Start with one club workspace and iterate — no heavy onboarding needed." />
        </div>
      </section>

      {/* FAQ + CONTACT (big blocks) */}
      <section id="faq" className="border-t border-[var(--line)] bg-black">
        <div className="brand-container py-12 md:py-14">
          <SectionTitle kicker="FAQ" title="Common questions" />

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            <FAQItem
              q="Will scanned fixtures/reports persist for users?"
              a="Yes — because they’re saved to Firestore per user. When a user logs out/in, they’ll still see their previous scans and reports."
            />
            <FAQItem
              q="Can staff view reports without editing?"
              a="Yes — you already support read-only mode for viewers while writers can edit."
            />
            <FAQItem
              q="Do you support substitutes?"
              a="Yes — your app now saves subs in matches/reports and shows them in Match Log."
            />
            <FAQItem
              q="What’s needed for a pilot?"
              a="A club workspace, a small user list, and agreed permissions (who can edit vs view)."
            />
          </div>

          <div
            id="contact"
            className="mt-10 rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
          >
            <div className="text-2xl font-extrabold">Book a quick demo</div>
            <div className="mt-2 text-sm text-[var(--muted)]">
              Drop your email and we’ll set up a short call and share access to the pilot build.
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input
                className="h-12 w-full rounded-xl border border-[var(--line)] bg-black/40 px-4 text-sm text-white outline-none ring-[var(--yellow)]/30 focus:ring-4"
                placeholder="Email address"
              />
              <button className="h-12 rounded-xl bg-[var(--yellow)] px-6 text-sm font-extrabold text-black hover:brightness-110">
                Get in touch
              </button>
            </div>

            <div className="mt-3 text-xs text-[var(--muted)]">No spam — just pilot updates.</div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--line)] bg-black">
        <div className="brand-container flex items-center justify-between py-6 text-xs text-[var(--muted)]">
          <div>© {new Date().getFullYear()} Scoutable</div>
          <div className="hidden sm:block">Built for pro scouting workflows</div>
        </div>
      </footer>
    </div>
  );
}