import Magnetic from "@/components/ui/magnetic";
import Reveal from "@/components/ui/reveal";
import { links } from "@/config/links";

const authorityCards = [
  {
    title: "Strategy Map",
    description:
      "A clear route for goals, pages, offers, tools, and the next actions your visitors should take.",
    chips: ["Goal clarity", "CTA path", "Build scope"],
    visual: "Future strategy map",
  },
  {
    title: "Workflow Architecture",
    description:
      "The structure behind the experience: intake, booking, admin visibility, and client movement.",
    chips: ["Client flow", "Admin view", "System logic"],
    visual: "Future workflow diagram",
  },
  {
    title: "Automation Layer",
    description:
      "Repeatable steps designed to reduce manual follow-up and keep leads moving with less friction.",
    chips: ["Email paths", "AI support", "Lead routing"],
    visual: "Future automation preview",
  },
  {
    title: "Launch System",
    description:
      "A production-minded pass across mobile, metadata, booking paths, forms, and handoff readiness.",
    chips: ["QA pass", "Deploy ready", "Support plan"],
    visual: "Future launch board",
  },
];

export default function AuthorityStackSection() {
  return (
    <section
      id="authority-stack"
      className="relative mt-10 overflow-hidden rounded-[1.5rem] border border-violet-300/12 bg-zinc-950/58 p-4 shadow-[0_0_58px_rgba(168,85,247,0.07)] backdrop-blur-xl sm:rounded-[2.1rem] sm:p-6 md:mt-16 md:p-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_8%,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_86%_12%,rgba(168,85,247,0.14),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_46%)]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/50 to-transparent" />
      <div className="pointer-events-none absolute -left-28 bottom-8 h-60 w-60 rounded-full bg-cyan-400/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 top-12 h-64 w-64 rounded-full bg-violet-500/8 blur-3xl" />

      <div className="relative z-10">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200 sm:text-sm sm:tracking-[0.25em]">
              Authority Stack
            </p>

            <h3 className="mt-2 text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl">
              Built Like a System, Not Just a Site
            </h3>
          </div>

          <p className="max-w-3xl text-sm leading-6 text-zinc-300 lg:justify-self-end">
            Every build is shaped around clarity, automation, client flow, and
            operational infrastructure.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:mt-8 md:grid-cols-2 xl:grid-cols-4">
          {authorityCards.map((card, index) => (
            <Reveal key={card.title} delayMs={index * 75}>
              <Magnetic as="div" className="h-full" strength={0.035} scale={1.002}>
                <article className="group card-sheen relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-4 shadow-[0_0_30px_rgba(34,211,238,0.04)] backdrop-blur-xl transition duration-500 ease-out hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.065] hover:shadow-[0_0_40px_rgba(34,211,238,0.12)] active:scale-[0.995] sm:rounded-[1.6rem] sm:p-5">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.10),transparent_34%),radial-gradient(circle_at_88%_8%,rgba(168,85,247,0.10),transparent_36%)] opacity-0 transition duration-500 group-hover:opacity-100" />

                  <div className="relative">
                    <div className="mb-4 min-h-32 overflow-hidden rounded-[1.1rem] border border-cyan-300/14 bg-black/35 p-3 shadow-inner shadow-cyan-950/30">
                      <div className="flex h-full min-h-24 flex-col justify-between rounded-[0.85rem] border border-white/8 bg-[linear-gradient(135deg,rgba(34,211,238,0.10),rgba(168,85,247,0.08)_48%,rgba(10,10,10,0.28))] p-3">
                        <div className="flex items-center justify-between gap-3">
                          <span className="h-2 w-14 rounded-full bg-cyan-300/42 shadow-[0_0_18px_rgba(34,211,238,0.25)]" />
                          <span className="h-2 w-2 rounded-full bg-violet-300/60 shadow-[0_0_16px_rgba(168,85,247,0.28)]" />
                        </div>

                        <div className="space-y-2">
                          <span className="block h-2 w-3/4 rounded-full bg-white/15" />
                          <span className="block h-2 w-1/2 rounded-full bg-cyan-200/18" />
                          <span className="block h-2 w-2/3 rounded-full bg-violet-200/14" />
                        </div>

                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-100/70">
                          {card.visual}
                        </p>
                      </div>
                    </div>

                    <h4 className="text-lg font-black text-white">
                      {card.title}
                    </h4>

                    <p className="mt-3 text-sm leading-6 text-zinc-300">
                      {card.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {card.chips.map((chip) => (
                        <span
                          key={chip}
                          className="rounded-full border border-cyan-300/16 bg-cyan-400/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-cyan-100"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Magnetic>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 rounded-[1.25rem] border border-white/10 bg-black/24 p-3 backdrop-blur-xl sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:p-4">
          <p className="text-sm leading-6 text-zinc-300">
            Start with clarity, then decide whether the build needs a simple
            path or a deeper custom system.
          </p>

          <div className="grid gap-2 sm:flex sm:items-center">
            <Magnetic className="inline-flex w-full sm:w-auto" strength={0.1}>
              <a
                href={links.freeCall}
                className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-cyan-300/34 bg-cyan-400/14 px-4 py-2.5 text-center text-xs font-black text-cyan-50 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-200/55 hover:shadow-[0_0_26px_rgba(34,211,238,0.18)] active:scale-[0.98]"
              >
                Book Free Call
              </a>
            </Magnetic>

            <Magnetic className="inline-flex w-full sm:w-auto" strength={0.1}>
              <a
                href={links.contactForm}
                className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-violet-300/24 bg-violet-500/10 px-4 py-2.5 text-center text-xs font-black text-violet-100 transition duration-300 hover:-translate-y-0.5 hover:border-violet-200/45 hover:shadow-[0_0_26px_rgba(168,85,247,0.16)] active:scale-[0.98]"
              >
                Request Project Build
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
