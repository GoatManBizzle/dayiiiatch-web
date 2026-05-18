import SiteShell from "@/components/layout/site-shell";
import ContactFormSection from "@/components/sections/contact-form";
import HeaderSection from "@/components/sections/header";
import { GhostButton, PrimaryButton, SolidCTA } from "@/components/ui/buttons";

const serviceMap = {
  "free-call": {
    eyebrow: "Free Strategy Call",
    title: "Book your free 15-minute strategy call.",
    text: "Use this quick call to explain what you need, where you’re stuck, and what kind of DAYIIIatch Solutions support makes the most sense.",
    badge: "Best First Step",
  },
  "premium-session": {
    eyebrow: "Premium Strategy Session",
    title: "Book your paid deep strategy session.",
    text: "This is for serious clients who want focused planning, clearer direction, and a stronger action path before a build or larger service.",
    badge: "Serious Client Path",
  },
};

type BookPageProps = {
  searchParams?: Promise<{ service?: string }>;
};

export default async function BookingLandingPage({
  searchParams,
}: BookPageProps) {
  const params = await searchParams;
  const serviceKey = params?.service ?? "free-call";
  const selected =
    serviceMap[serviceKey as keyof typeof serviceMap] ??
    serviceMap["free-call"];

  return (
    <SiteShell>
      <HeaderSection />

      <section className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.25em] text-cyan-200">
            {selected.eyebrow}
          </div>

          <div className="space-y-4">
            <h1 className="max-w-4xl text-4xl font-black leading-[0.95] md:text-7xl">
              {selected.title}
            </h1>

            <p className="max-w-2xl text-base leading-7 text-zinc-300 md:text-lg">
              {selected.text}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <SolidCTA href="/book?service=free-call">Free Call</SolidCTA>
            <PrimaryButton href="/book?service=premium-session">
              Premium Session
            </PrimaryButton>
            <GhostButton href="#contact-form">Contact</GhostButton>
          </div>
        </div>

        <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-400/10" />

          <div className="relative space-y-4">
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-200">
                Selected Service
              </p>
              <h3 className="mt-2 text-2xl font-bold">{selected.badge}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-200">
                This page is now ready to connect into the full DAYIIIatch
                Scheduler booking flow for this selected service.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">
                Need something custom?
              </p>
              <h3 className="mt-2 text-2xl font-bold">Send an Inquiry</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-200">
                Use the contact form below if this doesn’t fit cleanly into a
                free call or premium session.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactFormSection />
    </SiteShell>
  );
}
