import FeatureCard from "@/components/ui/feature-card";
import SectionShell from "@/components/ui/section-shell";
import { services } from "@/data/site-content";

export default function ServicesSection() {
  return (
    <SectionShell
      id="services"
      eyebrow="Services"
      title="Core offers"
      description="These blocks can keep expanding into pricing cards, portfolio proof, and platform-specific offers as the brand grows."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <FeatureCard
            key={service.title}
            title={service.title}
            text={service.text}
          />
        ))}
      </div>
    </SectionShell>
  );
}