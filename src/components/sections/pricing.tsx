import PricingCard from "@/components/ui/pricing-card";
import SectionShell from "@/components/ui/section-shell";
import { packages } from "@/data/site-content";

export default function PricingSection() {
  return (
    <SectionShell
      id="pricing"
      eyebrow="Website Packages"
      title="Choose the build level that fits the mission"
      description="A clean offer stack for clients who need anything from a fast coded site to a premium Photoshop-to-code experience."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {packages.map((pkg) => (
          <PricingCard
            key={pkg.title}
            title={pkg.title}
            price={pkg.price}
            text={pkg.text}
            items={pkg.items}
            badge={pkg.badge}
            featured={pkg.featured}
          />
        ))}
      </div>
    </SectionShell>
  );
}