import TestimonialCard from "@/components/ui/testimonial-card";
import SectionShell from "@/components/ui/section-shell";
import { testimonials } from "@/data/site-content";

export default function TestimonialsSection() {
  return (
    <SectionShell
      id="testimonials"
      eyebrow="Trust & Proof"
      title="Space for testimonials and results"
      description="Even while building out the full portfolio, these testimonial-style cards help create stronger perceived trust and premium positioning."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {testimonials.map((item, index) => (
          <TestimonialCard
            key={index}
            quote={item.quote}
            name={item.name}
            role={item.role}
            badge={item.badge}
            initials={item.initials}
          />
        ))}
      </div>
    </SectionShell>
  );
}