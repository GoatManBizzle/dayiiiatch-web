import Magnetic from "@/components/ui/magnetic";
import Reveal from "@/components/ui/reveal";
import { links } from "@/config/links";

const platformCards = [
  {
    title: "Fiverr Optimization",
    strategy:
      "Shape the offer, gallery visuals, proof panels, and next-step path so buyers understand the value before they message.",
    chips: ["Gig gallery", "Offer clarity", "Buyer trust"],
    trust: ["Visual proof", "Fast scanning"],
  },
  {
    title: "Upwork Authority",
    strategy:
      "Turn proposals into a guided proof experience with screenshots, system logic, and clean client-ready presentation.",
    chips: ["Proposal assets", "Scope clarity", "System proof"],
    trust: ["Decision support", "Professional handoff"],
  },
  {
    title: "LinkedIn Presence",
    strategy:
      "Convert profile visits into credibility moments through content-ready systems, walkthrough clips, and proof snapshots.",
    chips: ["Post fuel", "Profile trust", "Proof stack"],
    trust: ["Authority signals", "Repeat content"],
  },
  {
    title: "Direct Website Funnel",
    strategy:
      "Keep direct visitors moving through brand, services, proof, pricing, checklist capture, and booking without confusion.",
    chips: ["CTA path", "Lead capture", "Booking flow"],
    trust: ["Mobile-first", "Conversion-ready"],
  },
];

const conversionAssets = [
  "Gig gallery visuals",
  "Proposal screenshots",
  "Client walkthrough clips",
  "Trust-building proof",
  "Mobile-first presentation",
  "Booking funnel optimization",
];

const retentionSignals = [
  "Clear communication",
  "Structured workflows",
  "Fast response systems",
  "Automation-ready support",
  "Long-term scaling paths",
];

export default function PlatformConversionSection() {
  return (
    <section
      id="platform-conversion"
      className="relative mt-10 overflow-hidden rounded-[1.5rem] border border-violet-300/12 bg-zinc-950/58 p-4 shadow-[0_0_58px_rgba(168,85,247,0.07)] backdrop-blur-xl sm:rounded-[2.1rem] sm:p-6 md:mt-16 md:p-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(168,85,247,0.13),transparent_32%),radial-gradient(circle_at_86%_12%,rgba(34,211,238,0.12),transparent_34%),linear-gradient(145deg,rgba(255,255,255,0.035),transparent_48%)]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/50 to-transparent" />
      <div className="pointer-events-none absolute -left-28 bottom-8 h-64 w-64 rounded-full bg-violet-500/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 top-16 h-64 w-64 rounded-full bg-cyan-400/8 blur-3xl" />

      <div className="relative z-10">
        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200 sm:text-sm sm:tracking-[0.25em]">
              Platform Conversion
            </p>

            <h3 className="mt-2 text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl">
              Built to Convert Across Every Platform
            </h3>
          </div>

          <p className="max-w-3xl text-sm leading-6 text-zinc-300 lg:justify-self-end">
            Whether clients discover DAYIIIatch through Fiverr, Upwork,
            LinkedIn, or direct search, the experience stays premium,
            structured, and conversion-ready.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:mt-8 md:grid-cols-2 xl:grid-cols-4">
          {platformCards.map((card, index) => (
            <Reveal key={card.title} delayMs={index * 75}>
              <Magnetic as="div" className="h-full" strength={0.035} scale={1.002}>
                <article className="group card-sheen relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-4 shadow-[0_0_30px_rgba(34,211,238,0.04)] backdrop-blur-xl transition duration-500 ease-out hover:-translate-y-1 hover:border-cyan-300/28 hover:bg-white/[0.065] hover:shadow-[0_0_40px_rgba(34,211,238,0.11)] active:scale-[0.995] sm:rounded-[1.6rem] sm:p-5">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.09),transparent_34%),radial-gradient(circle_at_88%_8%,rgba(168,85,247,0.10),transparent_36%)] opacity-0 transition duration-500 group-hover:opacity-100" />

                  <div className="relative flex h-full flex-col">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <span className="rounded-full border border-cyan-300/18 bg-cyan-400/8 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-cyan-100">
                        0{index + 1}
                      </span>
                      <span className="h-2 w-14 rounded-full bg-gradient-to-r from-cyan-300/50 to-violet-300/50 shadow-[0_0_18px_rgba(34,211,238,0.18)]" />
                    </div>

                    <h4 className="text-lg font-black text-white">
                      {card.title}
                    </h4>

                    <p className="mt-3 flex-1 text-sm leading-6 text-zinc-300">
                      {card.strategy}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {card.chips.map((chip) => (
                        <span
                          key={chip}
                          className="rounded-full border border-violet-300/16 bg-violet-500/8 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.11em] text-violet-100"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 grid gap-2">
                      {card.trust.map((item) => (
                        <div
                          key={item}
                          className="rounded-2xl border border-white/8 bg-black/24 px-3 py-2 text-xs font-semibold text-zinc-300"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </Magnetic>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 rounded-[1.25rem] border border-white/10 bg-black/24 p-3 backdrop-blur-xl sm:mt-8 sm:p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-100/80">
            Conversion Assets
          </p>

          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {conversionAssets.map((asset, index) => (
              <Reveal key={asset} delayMs={index * 35}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-2 text-center text-xs font-bold text-zinc-200 transition duration-300 hover:border-violet-300/24 hover:bg-violet-500/8 hover:text-violet-100">
                  {asset}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <div className="rounded-[1.25rem] border border-cyan-300/14 bg-cyan-400/8 p-4 shadow-[0_0_30px_rgba(34,211,238,0.06)] backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-100/80">
              Why Clients Stay
            </p>
            <p className="mt-3 text-sm leading-6 text-zinc-300">
              The build is only useful when the process feels clear,
              responsive, and ready for the next phase.
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
            {retentionSignals.map((signal, index) => (
              <Reveal key={signal} delayMs={index * 40}>
                <div className="flex min-h-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-3 text-center text-xs font-bold leading-5 text-zinc-200 transition duration-300 hover:border-cyan-300/24 hover:bg-cyan-400/8 hover:text-cyan-100">
                  {signal}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 rounded-[1.25rem] border border-white/10 bg-black/24 p-3 backdrop-blur-xl sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:p-4">
          <p className="text-sm leading-6 text-zinc-300">
            Use the free call to choose the platform path, or send a project
            request when you already know the build needs deeper support.
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
                Start a Premium Build
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
