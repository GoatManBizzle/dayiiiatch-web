import Reveal from "@/components/ui/reveal";

const steps = [
  {
    title: "Discovery",
    items: ["strategy calls", "goals", "planning"],
  },
  {
    title: "System Design",
    items: ["UI/UX", "architecture", "workflow mapping"],
  },
  {
    title: "Build & Automation",
    items: ["development", "integrations", "backend systems"],
  },
  {
    title: "Launch & Support",
    items: ["deployment", "optimization", "future scaling"],
  },
];

const trustIndicators = [
  "Fast Response",
  "Mobile Optimized",
  "Automation Ready",
  "Scalable Infrastructure",
];

export default function HowWeWorkSection() {
  return (
    <section className="relative mt-10 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-4 shadow-[0_0_52px_rgba(139,92,246,0.07)] backdrop-blur-xl sm:rounded-[2rem] sm:p-6 md:mt-16 md:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(34,211,238,0.12),transparent_34%),radial-gradient(circle_at_82%_10%,rgba(168,85,247,0.13),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.035),transparent_44%)]" />
      <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/45 to-transparent" />

      <div className="relative z-10">
        <div className="mb-7 grid gap-4 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200 sm:text-sm sm:tracking-[0.25em]">
              How We Work
            </p>

            <h3 className="mt-2 text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl">
              How DAYIIIatch Solutions Operates
            </h3>
          </div>

          <p className="max-w-3xl text-sm leading-6 text-zinc-300 lg:justify-self-end">
            Clear communication, structured workflows, and scalable systems
            built for real-world use.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-6 top-8 bottom-8 hidden w-px bg-gradient-to-b from-cyan-300/0 via-cyan-300/35 to-violet-300/0 md:block xl:left-0 xl:right-0 xl:top-11 xl:bottom-auto xl:mx-auto xl:h-px xl:w-[calc(100%-12rem)] xl:bg-gradient-to-r" />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <Reveal key={step.title} delayMs={index * 90}>
                <article className="group relative h-full rounded-[1.5rem] border border-white/10 bg-zinc-950/62 p-4 shadow-[0_0_28px_rgba(34,211,238,0.04)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-cyan-300/28 hover:bg-white/[0.065] hover:shadow-[0_0_38px_rgba(34,211,238,0.10)] sm:rounded-[1.8rem] sm:p-5">
                  <div className="pointer-events-none absolute inset-0 rounded-[1.8rem] bg-[radial-gradient(circle_at_22%_10%,rgba(34,211,238,0.09),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(168,85,247,0.08),transparent_30%)] opacity-0 transition duration-500 group-hover:opacity-100" />

                  <div className="relative mb-5 flex items-center justify-between gap-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-400/10 text-sm font-black text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.18)] transition duration-500 group-hover:border-cyan-300/50 group-hover:shadow-[0_0_32px_rgba(34,211,238,0.26)]">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {index < steps.length - 1 ? (
                      <div className="hidden h-px flex-1 bg-gradient-to-r from-cyan-300/35 via-violet-300/24 to-transparent xl:block" />
                    ) : null}
                  </div>

                  <div className="relative">
                    <h4 className="text-lg font-black text-white sm:text-xl">
                      {step.title}
                    </h4>

                    <div className="mt-4 grid gap-2">
                      {step.items.map((item) => (
                        <div
                          key={item}
                          className="rounded-2xl border border-white/10 bg-black/25 px-3 py-2.5 text-sm text-zinc-300"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {trustIndicators.map((indicator, index) => (
            <Reveal key={indicator} delayMs={index * 60}>
              <div className="rounded-2xl border border-cyan-300/12 bg-cyan-400/8 px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.14em] text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.04)] transition duration-300 hover:border-cyan-300/24 hover:bg-cyan-400/12">
                {indicator}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
