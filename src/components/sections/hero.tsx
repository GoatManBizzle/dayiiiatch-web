import { GhostButton, PrimaryButton, SolidCTA } from "../ui/buttons";
import { brand } from "@/config/brand";
import { links } from "@/config/links";
import Reveal from "@/components/ui/reveal";

const trustPoints = [
  "Live booking flow for free and premium sessions",
  "Branded under DAYIIIatch Solutions",
  "Built for creators, startups, and growing brands",
  "Flexible support from quick calls to custom builds",
];

const services = [
  {
    title: "Custom Websites & Landing Pages",
    text: "Modern pages built to help brands look official, convert traffic, and present services clearly.",
  },
  {
    title: "AI Workflow Setup",
    text: "Prompt systems, content pipelines, automation flows, and productivity upgrades for creators and businesses.",
  },
  {
    title: "Branding & Creative Direction",
    text: "Visual identity support, concept development, and strategic presentation for digital products and services.",
  },
  {
    title: "Automation & System Builds",
    text: "Smart tools, dashboards, process cleanup, and custom builds that save time and reduce friction.",
  },
];

export default function HeroSection() {
  return (
    <Reveal>
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.25em] text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.12)]">
            {brand.heroEyebrow}
          </div>

          <div className="space-y-4">
            <h2 className="max-w-4xl text-4xl font-black leading-[0.95] md:text-7xl">
              {brand.heroTitle}
            </h2>

            <p className="max-w-2xl text-base leading-7 text-zinc-300 md:text-lg">
              {brand.heroText}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <SolidCTA href={links.freeCall} external>
              Work With Us
            </SolidCTA>

            <PrimaryButton href={links.premiumSession} external>
              Book Premium Session
            </PrimaryButton>

            <GhostButton href="#services">Explore Services</GhostButton>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {trustPoints.map((point, index) => (
              <Reveal key={point} delayMs={index * 70}>
                <div className="rounded-2xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-zinc-200 shadow-[0_0_20px_rgba(139,92,246,0.05)] transition duration-300 hover:-translate-y-1 hover:border-violet-400/20">
                  {point}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl transition duration-300 hover:border-cyan-400/20">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-400/10" />

          <div className="relative mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400">Agency Snapshot</p>
              <h3 className="text-2xl font-bold">{brand.agencySnapshotTitle}</h3>
            </div>

            <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.12)]">
              {brand.agencySnapshotStatus}
            </div>
          </div>

          <div className="relative space-y-4">
            <div className="rounded-2xl border border-violet-400/20 bg-violet-500/10 p-4 shadow-[0_0_28px_rgba(168,85,247,0.08)]">
              <p className="text-sm leading-6 text-violet-100">
                {brand.agencySnapshotText}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {services.map((service, index) => (
                <Reveal key={service.title} delayMs={index * 80}>
                  <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-4 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20">
                    <p className="text-sm font-semibold text-white">
                      {service.title}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-zinc-400">
                      {service.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}