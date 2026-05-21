"use client";

import Image from "next/image";

type Props = {
  screenshotMode?: boolean;
};

export default function ScreenshotBanner({ screenshotMode }: Props) {
  return (
    <section className="screenshot-shell relative mb-12 md:mb-16">
      <div className="pointer-events-none absolute -left-32 -top-32 h-[320px] w-[320px] rounded-full bg-violet-500/20 blur-[120px] md:-left-40 md:-top-40 md:h-[500px] md:w-[500px] md:blur-[160px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-[320px] w-[320px] rounded-full bg-cyan-400/20 blur-[120px] md:-bottom-40 md:-right-40 md:h-[500px] md:w-[500px] md:blur-[160px]" />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
        <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-violet-500/10 via-zinc-950/90 to-cyan-400/10 p-5 shadow-[0_0_60px_rgba(139,92,246,0.12)] sm:rounded-[2rem] sm:p-8">
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

          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-cyan-400/70 sm:tracking-[0.25em]">
            LinkedIn Screenshot Mode
          </p>

          <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Premium visuals. <br />
            Stronger trust. <br />
            Sharper first impressions.
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-400">
            This layout is optimized for high-impact screenshots, client-facing
            proposals, and social proof across LinkedIn, Fiverr, and Upwork.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { value: "24hr", label: "Response" },
              { value: "3", label: "Client Entry Points" },
              { value: "1", label: "Premium Funnel" },
              { value: "More", label: "Growth Potential" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/10 bg-white/5 p-3 text-center backdrop-blur"
              >
                <p className="text-lg font-bold text-white">{stat.value}</p>
                <p className="text-[10px] uppercase tracking-wide text-zinc-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "Strategy-first service flow",
              "Neon brand presence",
              "Built for LinkedIn-ready presentation",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-5 backdrop-blur sm:rounded-[2rem] sm:p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-400 sm:tracking-[0.25em]">
            Featured Case Study Mock
          </p>

          <h3 className="mt-2 text-xl font-semibold">
            Featured Build Concept
          </h3>

          <p className="mt-1 text-sm text-cyan-400">
            Client Funnel Upgrade Mock
          </p>

          <p className="mt-3 text-sm leading-6 text-zinc-400">
            A sample showcase card for future client wins, before-and-after
            transformations, and premium system builds.
          </p>

          <div className="mt-5 space-y-3">
            {[
              "Lead capture flow",
              "Premium booking path",
              "Sharper visual trust",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2"
              >
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                <p className="text-sm text-zinc-300">{item}</p>
              </div>
            ))}
          </div>

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

      <div className="pointer-events-none absolute left-0 right-0 top-[520px] hidden h-[120px] bg-gradient-to-b from-transparent to-black/70 blur-[2px] md:block" />
    </section>
  );
}
