import TestimonialCard from "@/components/ui/testimonial-card";
import SectionShell from "@/components/ui/section-shell";
import { testimonials } from "@/data/site-content";

export default function TestimonialsSection() {
  return (
    <SectionShell
      id="testimonials"
      eyebrow="Testimonials"
      title="Honest proof placeholders"
      description="No fake testimonials here. These slots stay marked until real client quotes, case studies, and portfolio results are ready to publish."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
