import FeatureCard from "@/components/ui/feature-card";
import SectionShell from "@/components/ui/section-shell";
import { services } from "@/data/site-content";

export default function ServicesSection() {
  return (
    <SectionShell
      id="services"
      eyebrow="Services"
      title="Six clear lanes for digital support"
      description="Start with a quick call when you need direction, or choose a serious path when the project already has shape."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <FeatureCard
            key={service.title}
            title={service.title}
            text={service.text}
            bestFor={service.bestFor}
            features={service.features}
            cta={service.cta}
            href={service.href}
          />
        ))}
      </div>
    </SectionShell>
  );
}
