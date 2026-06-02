import Reveal from "@/components/ui/reveal";

const pillars = [
  "Creative systems",
  "Digital builds",
  "Automation",
  "AI-assisted workflows",
  "Client workspace direction",
];

export default function AboutSummarySection() {
  return (
    <section
      id="about"
      data-style-section="about"
      className="style-editor-about-section relative mt-8 overflow-hidden rounded-[1.5rem] border border-cyan-300/14 bg-zinc-950/58 p-4 shadow-[0_0_54px_rgba(34,211,238,0.08)] backdrop-blur-xl sm:rounded-[2rem] sm:p-6 md:mt-12 md:p-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(34,211,238,0.15),transparent_34%),radial-gradient(circle_at_88%_18%,rgba(59,130,246,0.12),transparent_36%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_46%)]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/55 to-transparent" />

      <div className="relative z-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <div>
            <p className="style-editor-section-label text-xs font-bold uppercase tracking-[0.2em] text-cyan-200 sm:text-sm sm:tracking-[0.28em]">
              About
            </p>
            <h1 className="style-editor-about-heading mt-3 text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
              About DAYIIIatch Solutions
            </h1>
          </div>
        </Reveal>

        <Reveal delayMs={80}>
          <div>
            <p className="style-editor-about-body text-sm leading-7 text-zinc-300 sm:text-base">
              DAYIIIatch Solutions builds premium creative systems for brands
              that need more than a page on the internet. The work blends
              digital builds, automation, AI-assisted workflows, and client
              portal direction into cleaner paths from first impression to
              organized delivery.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {pillars.map((pillar) => (
                <span
                  key={pillar}
                  className="rounded-full border border-cyan-300/18 bg-cyan-400/8 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.11em] text-cyan-100"
                >
                  {pillar}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
