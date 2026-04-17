import SectionShell from "@/components/ui/section-shell";
import Reveal from "@/components/ui/reveal";
import ProofCard from "@/components/ui/proof-card";
import BeforeAfterCard from "@/components/ui/before-after-card";
import { proofCards, beforeAfterCards } from "@/data/site-content";

export default function TrustSection() {
  return (
    <>
      <SectionShell
        id="trust"
        eyebrow="Client Proof System"
        title="Show why the upgrade matters"
        description="Use these proof blocks to sell clearer outcomes, better positioning, and a more premium client experience."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {proofCards.map((card, index) => (
            <Reveal key={card.title} delayMs={index * 90}>
              <ProofCard
                title={card.title}
                subtitle={card.subtitle}
                summary={card.summary}
                points={card.points}
                result={card.result}
                status={card.status}
              />
            </Reveal>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Before / After Mock"
        title="Visualize the difference in client experience"
        description="These comparison blocks help explain why better visuals, stronger routing, and a cleaner funnel actually matter."
      >
        <div className="grid gap-4 lg:grid-cols-2">
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