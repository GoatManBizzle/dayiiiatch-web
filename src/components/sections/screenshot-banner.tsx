"use client";

import Image from "next/image";

type Props = {
  screenshotMode?: boolean;
};

export default function ScreenshotBanner({ screenshotMode }: Props) {
  return (
    <section className="screenshot-shell relative mb-16">
      
      {/* BACKDROP GLOW */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-violet-500/20 blur-[160px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-cyan-400/20 blur-[160px]" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* ========================= */}
        {/* LEFT: HERO PANEL */}
        {/* ========================= */}
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-500/10 via-zinc-950/90 to-cyan-400/10 p-8 shadow-[0_0_60px_rgba(139,92,246,0.12)]">

          {/* Floating Logo */}
          <div className="absolute right-6 top-6 hidden md:block">
            <div className="float-soft pulse-glow">
              <Image
                src="/dayiiiatch-logo.png"
                alt="logo"
                width={60}
                height={60}
                className="rounded-xl"
              />
            </div>
          </div>

          {/* Label */}
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-cyan-400/70">
            LinkedIn Screenshot Mode
          </p>

          {/* Headline */}
          <h2 className="text-4xl font-bold leading-tight md:text-5xl">
            Premium visuals. <br />
            Stronger trust. <br />
            Sharper first impressions.
          </h2>

          {/* Description */}
          <p className="mt-4 max-w-xl text-sm text-zinc-400">
            This layout is optimized for high-impact screenshots, client-facing
            proposals, and social proof across LinkedIn, Fiverr, and Upwork.
          </p>

          {/* STATS ROW */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { value: "24hr", label: "Response" },
              { value: "3", label: "Client Entry Points" },
              { value: "1", label: "Premium Funnel" },
              { value: "∞", label: "Growth Potential" },
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-white/5 p-3 text-center backdrop-blur"
              >
                <p className="text-lg font-bold text-white">{stat.value}</p>
                <p className="text-[10px] uppercase tracking-wide text-zinc-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* TAG PILLS */}
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "Strategy-first service flow",
              "Neon brand presence",
              "Built for LinkedIn-ready presentation",
            ].map((tag, i) => (
              <span
                key={i}
                className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ========================= */}
        {/* RIGHT: CASE STUDY MOCK */}
        {/* ========================= */}
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-6 backdrop-blur">

          <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">
            Featured Case Study Mock
          </p>

          <h3 className="mt-2 text-xl font-semibold">
            Featured Build Concept
          </h3>

          <p className="mt-1 text-sm text-cyan-400">
            Client Funnel Upgrade Mock
          </p>

          <p className="mt-3 text-sm text-zinc-400">
            A sample showcase card for future client wins, before-and-after
            transformations, and premium system builds.
          </p>

          {/* FEATURE LIST */}
          <div className="mt-5 space-y-3">
            {[
              "Lead capture flow",
              "Premium booking path",
              "Sharper visual trust",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2"
              >
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                <p className="text-sm text-zinc-300">{item}</p>
              </div>
            ))}
          </div>

          {/* OUTCOME BOX */}
          <div className="mt-6 rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-4">
            <p className="text-xs uppercase tracking-wide text-cyan-300">
              Mock Outcome
            </p>

            <p className="mt-1 text-sm text-white">
              Cleaner positioning. Better screenshots. Stronger premium feel.
            </p>
          </div>
        </div>
      </div>

      {/* SCREENSHOT FADE EDGE */}
      <div className="pointer-events-none absolute left-0 right-0 top-[520px] h-[120px] bg-gradient-to-b from-transparent to-black/70 blur-[2px]" />
    </section>
  );
}