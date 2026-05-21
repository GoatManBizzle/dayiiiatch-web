import SectionShell from "@/components/ui/section-shell";
import Reveal from "@/components/ui/reveal";
import ProofCard from "@/components/ui/proof-card";
import BeforeAfterCard from "@/components/ui/before-after-card";
import {
  proofCards,
  beforeAfterCards,
  trustStripItems,
} from "@/data/site-content";

export default function TrustSection() {
  return (
    <>
      <SectionShell
        id="trust"
        eyebrow="Proof / Case Studies"
        title="Real problems, cleaner systems"
        description="These proof blocks show the kinds of messy business problems DAYIIIatch turns into clearer websites, booking flows, and workflow support."
      >
        <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {trustStripItems.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-cyan-400/15 bg-cyan-400/8 px-3 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.08em] text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.05)] sm:px-4 sm:text-xs sm:tracking-[0.14em]"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {proofCards.map((card, index) => (
            <Reveal key={card.title} delayMs={index * 90}>
              <ProofCard
                title={card.title}
                subtitle={card.subtitle}
                problem={card.problem}
                solution={card.solution}
                result={card.result}
                cta={card.cta}
                href={card.href}
                status={card.status}
              />
            </Reveal>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Before / After"
        title="From scattered to systemized"
        description="A simple view of the practical shift: cleaner presentation, cleaner booking, and cleaner backend support."
      >
        <div className="grid gap-4">
          {beforeAfterCards.map((card, index) => (
            <Reveal key={card.label} delayMs={index * 110}>
              <BeforeAfterCard
                beforeTitle={card.beforeTitle}
                beforePoints={card.beforePoints}
                afterTitle={card.afterTitle}
                afterPoints={card.afterPoints}
                label={card.label}
              />
            </Reveal>
          ))}
        </div>
      </SectionShell>
    </>
  );
}
