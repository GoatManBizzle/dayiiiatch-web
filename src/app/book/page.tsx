import SiteShell from "@/components/layout/site-shell";
import HeaderSection from "@/components/sections/header";
import ContactFormSection from "@/components/sections/contact-form";
import { PrimaryButton, SolidCTA, GhostButton } from "@/components/ui/buttons";
import { links } from "@/config/links";

export default function BookingLandingPage() {
  return (
    <SiteShell>
      <HeaderSection />

      <section className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.25em] text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.12)]">
            Ad Mode Landing Variant
          </div>

          <div className="space-y-4">
            <h1 className="max-w-4xl text-4xl font-black leading-[0.95] md:text-7xl">
              Book the right next step for your website, system, or brand.
            </h1>

            <p className="max-w-2xl text-base leading-7 text-zinc-300 md:text-lg">
              Start with a free call for quick clarity, book a premium session
              for deeper planning, or send a direct inquiry if you already know
              what needs to get built.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <SolidCTA href={links.freeCall} external>
              Book Free Call
            </SolidCTA>

            <PrimaryButton href={links.premiumSession} external>
              Book Premium Session
            </PrimaryButton>

            <GhostButton href="#contact-form">Send Inquiry</GhostButton>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Quick entry point for new clients",
              "Premium paid planning path",
              "Clean direct inquiry fallback",
              "Built to convert ad traffic fast",
            ].map((point) => (
              <div
                key={point}
                className="rounded-2xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-zinc-200 shadow-[0_0_20px_rgba(139,92,246,0.05)]"
              >
                {point}
              </div>
            ))}
          </div>
        </div>

        <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-400/10" />

          <div className="relative space-y-4">
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-200">
                Best first step
              </p>
              <h3 className="mt-2 text-2xl font-bold">Free Strategy Call</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-200">
                Best for people who need quick clarity on their current setup,
                next move, or best-fit service path.
              </p>
            </div>

            <div className="rounded-2xl border border-violet-400/20 bg-violet-500/10 p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-violet-200">
                Serious clients
              </p>
              <h3 className="mt-2 text-2xl font-bold">Premium Session</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-200">
                Best for deeper planning, focused problem-solving, and premium
                support when you need strategy with real structure behind it.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">
                Direct route
              </p>
              <h3 className="mt-2 text-2xl font-bold">Project Inquiry</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-200">
                Best when you already know what you want and just need to start
                the conversation about scope, pricing, and execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactFormSection />
    </SiteShell>
  );
}