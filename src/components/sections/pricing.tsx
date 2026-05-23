import PricingCard from "@/components/ui/pricing-card";
import Reveal from "@/components/ui/reveal";
import SectionShell from "@/components/ui/section-shell";
import { packages, pricingFaqs, pricingTrustNotes } from "@/data/site-content";

export default function PricingSection() {
  return (
    <SectionShell
      id="pricing"
      eyebrow="Website Packages"
      title="Choose the build level that fits the mission"
      description="A clean offer stack for clients who need anything from a fast coded site to a premium Photoshop-to-code experience."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {packages.map((pkg, index) => (
          <Reveal key={pkg.title} delayMs={index * 60}>
            <PricingCard
              title={pkg.title}
              price={pkg.price}
              priceLabel={pkg.priceLabel}
              text={pkg.text}
              bestFor={pkg.bestFor}
              items={pkg.items}
              scopeNote={pkg.scopeNote}
              badge={pkg.badge}
              cta={pkg.cta}
              href={pkg.href}
              featured={pkg.featured}
            />
          </Reveal>
        ))}
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {pricingTrustNotes.map((note, index) => (
          <Reveal key={note} delayMs={index * 45}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-sm leading-6 text-zinc-300">
              {note}
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 rounded-[1.8rem] border border-white/10 bg-white/[0.055] p-5 shadow-[0_0_28px_rgba(139,92,246,0.06)]">
        <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
              Pricing Questions
            </p>
            <h4 className="mt-2 text-2xl font-bold text-white">
              Quick quote clarity
            </h4>
          </div>
          <p className="max-w-xl text-sm leading-6 text-zinc-400">
            Short answers before you choose a package path.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {pricingFaqs.map((faq, index) => (
            <Reveal key={faq.question} delayMs={index * 55}>
              <div className="rounded-2xl border border-white/10 bg-zinc-950/45 p-4">
                <p className="text-sm font-bold text-cyan-100">
                  {faq.question}
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {faq.answer}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
