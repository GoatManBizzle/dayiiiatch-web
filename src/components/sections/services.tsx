import FeatureCard from "@/components/ui/feature-card";
import Reveal from "@/components/ui/reveal";
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
        {services.map((service, index) => (
          <Reveal key={service.title} delayMs={index * 55}>
            <FeatureCard
              title={service.title}
              text={service.text}
              bestFor={service.bestFor}
              features={service.features}
              cta={service.cta}
              href={service.href}
            />
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
