"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";

type Shot = {
  key: string;
  title: string;
  desc: string;
  src: string; // from /public
};

export default function ScreensCarousel() {
  const shots: Shot[] = useMemo(
    () => [
      {
        key: "home",
        title: "Home",
        desc: "Instant team-sheet scanning and match creation.",
        src: "/screens/home.png",
      },
      {
        key: "fixtures",
        title: "Fixtures",
        desc: "Track upcoming matches and scan status by competition.",
        src: "/screens/fixturelist.png",
      },
      {
        key: "scan",
        title: "Scan teamsheet",
        desc: "Upload a teamsheet image directly from matchday.",
        src: "/screens/scanpage.png",
      },
      {
        key: "extract",
        title: "Player extraction",
        desc: "Automatically extract starters (and soon: subs) into a match log.",
        src: "/screens/playerscan.png",
      },
      {
        key: "report",
        title: "Player reports",
        desc: "Quick ratings, notes, and MOTM — built for speed.",
        src: "/screens/playerbreakdown.png",
      },
      {
        key: "workspace",
        title: "Workspace",
        desc: "A shared club view of reports and scout activity.",
        src: "/screens/workspace.png",
      },
      {
        key: "profile",
        title: "Scout profiles",
        desc: "Simple scout cards with coverage and contact details.",
        src: "/screens/scoutprofile.png",
      },
    ],
    []
  );

  const [idx, setIdx] = useState(0);
  const current = shots[idx];

  const go = (next: number) => {
    const n = (next + shots.length) % shots.length;
    setIdx(n);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Left: big preview */}
      <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-700">Screens</p>
            <h3 className="mt-1 text-xl font-semibold text-zinc-900">
              {current.title}
            </h3>
            <p className="mt-1 text-sm text-zinc-600">{current.desc}</p>
          </div>

          <div className="hidden gap-2 sm:flex">
            <button
              onClick={() => go(idx - 1)}
              className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-50"
            >
              ← Prev
            </button>
            <button
              onClick={() => go(idx + 1)}
              className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Phone frame with consistent sizing */}
        <div className="mt-5 flex justify-center">
          <div className="relative h-[560px] w-[280px] overflow-hidden rounded-[36px] border border-black/10 bg-zinc-100 shadow-sm">
            <Image
              src={current.src}
              alt={current.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Dots */}
        <div className="mt-5 flex items-center justify-center gap-2">
          {shots.map((s, i) => (
            <button
              key={s.key}
              onClick={() => setIdx(i)}
              aria-label={`Go to ${s.title}`}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === idx ? "bg-blue-600" : "bg-zinc-300 hover:bg-zinc-400"
              }`}
            />
          ))}
        </div>

        {/* Mobile prev/next */}
        <div className="mt-5 flex gap-2 sm:hidden">
          <button
            onClick={() => go(idx - 1)}
            className="w-1/2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-50"
          >
            ← Prev
          </button>
          <button
            onClick={() => go(idx + 1)}
            className="w-1/2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Right: thumbnails + step copy */}
      <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)]">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-zinc-500">
            Step {idx + 1} / {shots.length}
          </p>
          <p className="text-sm font-semibold text-blue-700">Pilot-ready UI</p>
        </div>

        <h4 className="mt-2 text-2xl font-semibold text-zinc-900">
          {current.title}
        </h4>
        <p className="mt-2 text-zinc-600">{current.desc}</p>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {shots.map((s, i) => (
            <button
              key={s.key}
              onClick={() => setIdx(i)}
              className={`group rounded-2xl border p-3 text-left transition ${
                i === idx
                  ? "border-blue-600 bg-blue-50"
                  : "border-black/10 bg-white hover:bg-zinc-50"
              }`}
            >
              <div className="relative mb-2 h-[86px] w-full overflow-hidden rounded-xl border border-black/10 bg-zinc-100">
                <Image
                  src={s.src}
                  alt={s.title}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-sm font-semibold text-zinc-900">{s.title}</p>
              <p className="mt-0.5 text-xs text-zinc-500 line-clamp-2">
                {s.desc}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}