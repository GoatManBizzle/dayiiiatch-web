import SiteShell from "@/components/layout/site-shell";

import TopBanner from "@/components/sections/top-banner";
import ScreenshotBannerSection from "@/components/sections/screenshot-banner";
import HeaderSection from "@/components/sections/header";
import HeroSection from "@/components/sections/hero";
import ServicesSection from "@/components/sections/services";
import PricingSection from "@/components/sections/pricing";
import TestimonialsSection from "@/components/sections/testimonials";
import FAQSection from "@/components/sections/faq";
import ContactFormSection from "@/components/sections/contact-form";
import FooterSection from "@/components/sections/footer";

export default function HomePage() {
  return (
    <SiteShell>
      <TopBanner />
      <ScreenshotBannerSection />
      <HeaderSection />
      <HeroSection />
      <ServicesSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactFormSection />
      <FooterSection />
    </SiteShell>
  );
}