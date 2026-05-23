import Reveal from "@/components/ui/reveal";

const journeySteps = [
  {
    title: "Discovery",
    tag: "Friction Map",
    text: "Identify goals, blockers, current tools, and the infrastructure your project needs.",
  },
  {
    title: "Strategy",
    tag: "Build Route",
    text: "Turn the messy idea into a clean execution path, timeline, and decision map.",
  },
  {
    title: "Build",
    tag: "Active Queue",
    text: "Design and develop the core website, system, interface, or workflow foundation.",
  },
  {
    title: "Automation",
    tag: "Automation Ready",
    text: "Connect repeatable steps, intake paths, admin flows, and AI-assisted support layers.",
  },
  {
    title: "Launch",
    tag: "Launch Protocol",
    text: "Polish, test, deploy, and verify that the public path works across devices.",
  },
  {
    title: "Support",
    tag: "Support Layer",
    text: "Review performance, adjust the system, and prepare future scaling moves.",
  },
];

const systemIndicators = [
  "Active Build Queue",
  "Structured Handoff",
  "Automation Ready",
  "Support Layer",
];

export default function ClientJourneySection() {
  return (
    <section className="relative mt-10 overflow-hidden rounded-[1.5rem] border border-cyan-300/12 bg-zinc-950/58 p-4 shadow-[0_0_58px_rgba(34,211,238,0.08)] backdrop-blur-xl sm:rounded-[2.1rem] sm:p-6 md:mt-16 md:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_14%,rgba(34,211,238,0.13),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(168,85,247,0.12),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_44%)]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/55 to-transparent" />
      <div className="pointer-events-none absolute -left-24 top-1/3 h-56 w-56 rounded-full bg-cyan-400/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-violet-500/8 blur-3xl" />

      <div className="relative z-10">
        <div className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200 sm:text-sm sm:tracking-[0.25em]">
              Client Journey
            </p>

            <h3 className="mt-2 text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl">
              How Projects Move Through DAYIIIatch
            </h3>
          </div>

          <p className="max-w-3xl text-sm leading-6 text-zinc-300 lg:justify-self-end">
            A guided operational route from first conversation to launch-ready
            systems, with structure around every decision point.
          </p>
        </div>

        <div className="mt-5 grid gap-2 sm:mt-6 sm:grid-cols-2 lg:flex lg:flex-wrap">
          {systemIndicators.map((indicator, index) => (
            <Reveal key={indicator} delayMs={index * 45}>
              <div className="rounded-full border border-white/10 bg-black/24 px-3 py-2 text-center text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-300 shadow-[0_0_18px_rgba(34,211,238,0.04)] transition duration-300 hover:border-cyan-300/24 hover:text-cyan-100">
                {indicator}
              </div>
            </Reveal>
          ))}
        </div>

        <div className="relative mt-6 sm:mt-8">
          <div className="client-journey-route absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-300/0 via-cyan-300/45 to-violet-300/0 lg:left-0 lg:right-0 lg:top-10 lg:bottom-auto lg:mx-auto lg:h-px lg:w-[calc(100%-7rem)] lg:bg-gradient-to-r" />
          <div className="client-journey-pulse absolute left-6 top-8 h-16 w-px rounded-full bg-cyan-200/70 shadow-[0_0_20px_rgba(34,211,238,0.45)] lg:left-[3.5rem] lg:top-10 lg:h-px lg:w-20" />

          <div className="grid gap-4 lg:grid-cols-6">
            {journeySteps.map((step, index) => (
              <Reveal key={step.title} delayMs={index * 85}>
                <article
                  className={`group relative ml-11 rounded-[1.25rem] border border-white/10 bg-zinc-950/70 p-3.5 shadow-[0_0_28px_rgba(34,211,238,0.04)] backdrop-blur-xl transition duration-500 ease-out hover:-translate-y-1 hover:border-cyan-300/32 hover:bg-white/[0.065] hover:shadow-[0_0_38px_rgba(34,211,238,0.12)] active:scale-[0.995] sm:rounded-[1.45rem] sm:p-4 lg:ml-0 ${
                    index % 2 === 1 ? "lg:mt-8" : ""
                  }`}
                >
                  <div className="pointer-events-none absolute inset-0 rounded-[1.45rem] bg-[radial-gradient(circle_at_22%_10%,rgba(34,211,238,0.09),transparent_32%),radial-gradient(circle_at_82%_0%,rgba(168,85,247,0.08),transparent_30%)] opacity-0 transition duration-500 group-hover:opacity-100" />

                  <div className="absolute -left-[3.15rem] top-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-400/12 text-xs font-black text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.18)] transition duration-500 group-hover:border-cyan-300/55 group-hover:shadow-[0_0_34px_rgba(34,211,238,0.26)] sm:-left-[3.45rem] sm:top-5 sm:h-11 sm:w-11 lg:static lg:mb-4">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="relative">
                    <div className="flex flex-col gap-3">
                      <h4 className="text-lg font-black text-white">
                        {step.title}
                      </h4>

                      <span className="w-fit rounded-full border border-cyan-300/18 bg-cyan-400/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-cyan-100">
                        {step.tag}
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-zinc-300">
                      {step.text}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
