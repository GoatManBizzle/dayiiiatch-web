import SiteShell from "@/components/layout/site-shell";
import AmbientMotion from "@/components/sections/ambient-motion";
import ClientJourneySection from "@/components/sections/client-journey";
import FooterSection from "@/components/sections/footer";
import HeaderSection from "@/components/sections/header";
import HowWeWorkSection from "@/components/sections/how-we-work";
import ReturnToTop from "@/components/sections/return-to-top";
import StickyCTA from "@/components/sections/sticky-cta";

const timeline = [
  {
    title: "Discovery",
    text: "Clarify the goals, audience, offer, blockers, and practical constraints before design or development starts.",
  },
  {
    title: "Strategy",
    text: "Turn the idea into a clean build route with priorities, content structure, workflow needs, and conversion paths.",
  },
  {
    title: "Build",
    text: "Design and develop the public experience, internal flow, or system foundation with responsive execution.",
  },
  {
    title: "Automation",
    text: "Connect repeatable steps, intake paths, reminders, admin support, AI workflows, and operational helpers.",
  },
  {
    title: "Launch",
    text: "Test the experience, polish the handoff, verify the core actions, and move the system into live use.",
  },
  {
    title: "Support",
    text: "Review performance, tune the workflow, and prepare the next round of improvements without adding chaos.",
  },
];

export default function HowWeWorkPage() {
  return (
    <SiteShell fixedMainBackground compactMobileSpacing publicThemeSurface>
      <AmbientMotion />
      <HeaderSection />

      <section
        data-style-section="workflow-hero"
        className="relative mt-8 overflow-hidden rounded-[1.5rem] border border-cyan-300/14 bg-zinc-950/62 p-4 shadow-[0_0_58px_rgba(34,211,238,0.08)] backdrop-blur-xl sm:rounded-[2rem] sm:p-6 md:p-8"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(34,211,238,0.16),transparent_34%),radial-gradient(circle_at_86%_18%,rgba(168,85,247,0.14),transparent_36%)]" />
        <div className="relative z-10 max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200 sm:text-sm sm:tracking-[0.28em]">
            Workflow
          </p>
          <h1 className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl md:text-6xl">
            How DAYIIIatch Solutions Operates
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-300 sm:text-base">
            A clear route for digital builds, automation, AI-assisted workflows,
            and client workspace direction. The goal is simple: move from a
            messy idea to a working system with fewer unknowns.
          </p>
        </div>
      </section>

      <HowWeWorkSection />
      <ClientJourneySection />

      <section
        data-style-section="timeline"
        className="relative mt-10 overflow-hidden rounded-[1.5rem] border border-violet-300/14 bg-white/[0.04] p-4 shadow-[0_0_52px_rgba(168,85,247,0.08)] backdrop-blur-xl sm:rounded-[2rem] sm:p-6 md:mt-16 md:p-8"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_12%,rgba(168,85,247,0.13),transparent_34%),radial-gradient(circle_at_84%_20%,rgba(34,211,238,0.12),transparent_34%)]" />
        <div className="relative z-10">
          <div className="mb-6 grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-violet-200 sm:text-sm sm:tracking-[0.25em]">
                Project Timeline
              </p>
              <h2 className="mt-2 text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl">
                Discovery to support, without the fog
              </h2>
            </div>
            <p className="max-w-3xl text-sm leading-6 text-zinc-300 lg:justify-self-end">
              Every project can flex, but the operating rhythm stays readable:
              strategy first, build second, automation and launch only when the
              path is clear.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {timeline.map((item, index) => (
              <article
                key={item.title}
                className="rounded-[1.25rem] border border-white/10 bg-zinc-950/58 p-4"
              >
                <span className="inline-flex rounded-full border border-cyan-300/18 bg-cyan-400/8 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-cyan-100">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-black text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FooterSection />
      <StickyCTA />
      <ReturnToTop />
    </SiteShell>
  );
}
