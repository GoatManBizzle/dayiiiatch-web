import Magnetic from "@/components/ui/magnetic";
import Reveal from "@/components/ui/reveal";
import { links } from "@/config/links";

const contentFormats = [
  {
    title: "Before / After Upgrade",
    description:
      "Turn a messy digital presence into a clear transformation story people can understand fast.",
  },
  {
    title: "Workflow Teardown",
    description:
      "Show the hidden friction in a process, then frame the cleaner system built to replace it.",
  },
  {
    title: "Booking Funnel Fix",
    description:
      "Capture the path from interest to scheduled call so prospects can see the operational upgrade.",
  },
  {
    title: "Mobile Trust Check",
    description:
      "Use mobile screenshots to prove the build still feels polished where clients actually browse.",
  },
  {
    title: "Automation Opportunity",
    description:
      "Highlight repeatable manual tasks and show where automation can reduce back-and-forth.",
  },
  {
    title: "Launch Proof Snapshot",
    description:
      "Package final screens, QA notes, and live system moments into platform-ready proof assets.",
  },
];

const platformTags = ["LinkedIn", "Fiverr", "Upwork", "Website"];

const useCases = [
  "Profile banners",
  "Gig gallery slides",
  "LinkedIn posts",
  "Proposal visuals",
  "Short promo clips",
  "Client proof assets",
];

export default function ContentEngineSection() {
  return (
    <section
      id="content-engine"
      className="relative mt-10 overflow-hidden rounded-[1.5rem] border border-cyan-300/12 bg-zinc-950/56 p-4 shadow-[0_0_58px_rgba(34,211,238,0.07)] backdrop-blur-xl sm:rounded-[2.1rem] sm:p-6 md:mt-16 md:p-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(34,211,238,0.13),transparent_31%),radial-gradient(circle_at_88%_10%,rgba(168,85,247,0.13),transparent_34%),linear-gradient(145deg,rgba(255,255,255,0.035),transparent_48%)]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
      <div className="pointer-events-none absolute -left-28 top-20 h-64 w-64 rounded-full bg-cyan-400/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-4 h-64 w-64 rounded-full bg-violet-500/8 blur-3xl" />

      <div className="relative z-10">
        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-violet-200 sm:text-sm sm:tracking-[0.25em]">
              Content Engine
            </p>

            <h3 className="mt-2 text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl">
              Turn Your Digital Presence Into Content Fuel
            </h3>
          </div>

          <p className="max-w-3xl text-sm leading-6 text-zinc-300 lg:justify-self-end">
            Every system we build can become screenshots, walkthrough clips,
            proof assets, and platform-ready marketing content.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:mt-8 md:grid-cols-2 xl:grid-cols-3">
          {contentFormats.map((format, index) => (
            <Reveal key={format.title} delayMs={index * 65}>
              <Magnetic as="div" className="h-full" strength={0.035} scale={1.002}>
                <article className="group card-sheen relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-4 shadow-[0_0_30px_rgba(34,211,238,0.04)] backdrop-blur-xl transition duration-500 ease-out hover:-translate-y-1 hover:border-violet-300/28 hover:bg-white/[0.065] hover:shadow-[0_0_40px_rgba(168,85,247,0.11)] active:scale-[0.995] sm:rounded-[1.6rem] sm:p-5">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(34,211,238,0.09),transparent_32%),radial-gradient(circle_at_86%_10%,rgba(168,85,247,0.10),transparent_34%)] opacity-0 transition duration-500 group-hover:opacity-100" />

                  <div className="relative flex h-full flex-col">
                    <div className="mb-4 rounded-[1.05rem] border border-cyan-300/14 bg-black/32 p-3">
                      <div className="grid grid-cols-[1fr_auto] gap-3">
                        <div className="space-y-2">
                          <span className="block h-2 w-20 rounded-full bg-cyan-300/35 shadow-[0_0_16px_rgba(34,211,238,0.18)]" />
                          <span className="block h-2 w-28 rounded-full bg-white/13" />
                          <span className="block h-2 w-16 rounded-full bg-violet-200/16" />
                        </div>

                        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-violet-300/18 bg-violet-500/10 text-xs font-black text-violet-100 shadow-[0_0_22px_rgba(168,85,247,0.10)]">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                      </div>
                    </div>

                    <h4 className="text-lg font-black text-white">
                      {format.title}
                    </h4>

                    <p className="mt-3 flex-1 text-sm leading-6 text-zinc-300">
                      {format.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {platformTags.map((tag) => (
                        <span
                          key={`${format.title}-${tag}`}
                          className="rounded-full border border-cyan-300/15 bg-cyan-400/7 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.11em] text-cyan-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Magnetic>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 rounded-[1.25rem] border border-white/10 bg-black/24 p-3 backdrop-blur-xl sm:mt-8 sm:p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-100/80">
            Use Cases
          </p>

          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {useCases.map((useCase, index) => (
              <Reveal key={useCase} delayMs={index * 35}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-2 text-center text-xs font-bold text-zinc-200 transition duration-300 hover:border-cyan-300/24 hover:bg-cyan-400/8 hover:text-cyan-100">
                  {useCase}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 rounded-[1.25rem] border border-white/10 bg-black/24 p-3 backdrop-blur-xl sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:p-4">
          <p className="text-sm leading-6 text-zinc-300">
            Build the system once, then reuse the proof across profiles,
            proposals, clips, and client conversations.
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
                Request Content-Ready Build
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
