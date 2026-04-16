import Reveal from "@/components/ui/reveal";

const screenshotStats = [
  { value: "24hr", label: "Response Window" },
  { value: "3", label: "Client Entry Paths" },
  { value: "1", label: "Premium Brand Hub" },
  { value: "∞", label: "Growth Potential" },
];

const proofBadges = [
  "LinkedIn-ready visuals",
  "Premium booking flow",
  "Branded screenshot mode",
  "Funnel-first presentation",
];

const caseStudyMock = {
  title: "Featured Build Concept",
  subtitle: "Client Funnel Upgrade Mock",
  summary:
    "A sample showcase card for future client wins, before-and-after transformations, system upgrades, and branded execution snapshots.",
  metrics: [
    "Lead capture flow",
    "Premium booking path",
    "Sharper visual trust",
  ],
};

export default function ScreenshotBannerSection() {
  return (
    <>
      <Reveal>
        <section className="mb-10 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-500/12 via-zinc-950/90 to-cyan-400/10 p-6 shadow-[0_0_50px_rgba(139,92,246,0.08)]">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                  LinkedIn Screenshot Mode
                </p>
                <h2 className="mt-2 text-3xl font-black leading-tight md:text-5xl">
                  Premium visuals.
                  <br />
                  Stronger trust.
                  <br />
                  Sharper first impressions.
                </h2>
              </div>

              <div className="relative hidden h-24 w-24 overflow-hidden rounded-3xl border border-cyan-400/20 bg-zinc-900/70 shadow-[0_0_24px_rgba(34,211,238,0.12)] md:block float-soft">
                <img
                  src="/dayiiiatch-logo.png"
                  alt="DAYIIIatch Solutions logo badge"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <p className="max-w-3xl text-sm leading-7 text-zinc-300 md:text-base">
              This hero layer is tuned for portfolio screenshots, professional
              social proof, and bold presentation across LinkedIn, proposals,
              and profile media sections.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {screenshotStats.map((item, index) => (
                <Reveal key={item.label} delayMs={index * 80}>
                  <div className="rounded-2xl border border-cyan-400/10 bg-white/5 px-4 py-4 shadow-[0_0_24px_rgba(34,211,238,0.06)] transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20">
                    <p className="text-2xl font-black text-cyan-200 md:text-3xl">
                      {item.value}
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-[0.22em] text-zinc-400">
                      {item.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {proofBadges.map((badge, index) => (
                <Reveal key={badge} delayMs={index * 70}>
                  <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.08)]">
                    {badge}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(34,211,238,0.05)] transition duration-300 hover:border-violet-400/20">
            <p className="text-xs uppercase tracking-[0.3em] text-violet-300">
              Featured Case Study Mock
            </p>
            <h3 className="mt-3 text-2xl font-black">{caseStudyMock.title}</h3>
            <p className="mt-2 text-sm font-medium text-cyan-300">
              {caseStudyMock.subtitle}
            </p>
            <p className="mt-4 text-sm leading-7 text-zinc-300">
              {caseStudyMock.summary}
            </p>

            <div className="mt-6 grid gap-3">
              {caseStudyMock.metrics.map((metric, index) => (
                <Reveal key={metric} delayMs={index * 90}>
                  <div className="rounded-2xl border border-white/10 bg-zinc-900/60 px-4 py-3 text-sm text-zinc-200 transition duration-300 hover:bg-zinc-900/80">
                    {metric}
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-violet-400/20 bg-gradient-to-r from-violet-500/10 to-cyan-400/10 px-4 py-4">
              <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">
                Mock Outcome
              </p>
              <p className="mt-2 text-lg font-bold text-white">
                Cleaner positioning. Better screenshots. Stronger premium feel.
              </p>
            </div>
          </div>
        </section>
      </Reveal>
    </>
  );
}