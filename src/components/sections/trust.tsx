import SectionShell from "@/components/ui/section-shell";
import Reveal from "@/components/ui/reveal";
import ProofCard from "@/components/ui/proof-card";
import { proofCards } from "@/data/site-content";

export default function TrustSection() {
  return (
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
            />
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}