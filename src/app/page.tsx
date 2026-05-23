"use client";

import { useMemo, useState } from "react";

import SiteShell from "@/components/layout/site-shell";

import AmbientMotion from "@/components/sections/ambient-motion";
import ScreenshotBannerSection from "@/components/sections/screenshot-banner";
import HeaderSection from "@/components/sections/header";
import HeroSection from "@/components/sections/hero";
import HowWeWorkSection from "@/components/sections/how-we-work";
import ProofSystemsSection from "@/components/sections/proof-systems";
import DigitalLogoBanner from "@/components/sections/digital-logo-banner";
import LeadCaptureSection from "@/components/sections/lead-capture";
import OffersSection from "@/components/sections/offers";
import TrustSection from "@/components/sections/trust";
import ServicesSection from "@/components/sections/services";
import PricingSection from "@/components/sections/pricing";
import StickyCTA from "@/components/sections/sticky-cta";
import TestimonialsSection from "@/components/sections/testimonials";
import FAQSection from "@/components/sections/faq";
import ContactFormSection from "@/components/sections/contact-form";
import FooterSection from "@/components/sections/footer";

import DevToggle from "@/components/dev/dev-toggle";
import { siteSettings } from "@/config/site-settings";

export default function HomePage() {
  const [screenshotMode, setScreenshotMode] = useState(
    siteSettings.screenshotMode
  );

  const isDev = useMemo(() => process.env.NODE_ENV !== "production", []);

  return (
    <SiteShell>
      <AmbientMotion />
      <DigitalLogoBanner />
      <HeaderSection />
      <HeroSection />
      <ProofSystemsSection />
      <HowWeWorkSection />
      {isDev && screenshotMode && <ScreenshotBannerSection />}
      <ServicesSection />
      <OffersSection />
      <TrustSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <LeadCaptureSection />
      <ContactFormSection />
      <FooterSection />
      <StickyCTA />

      {isDev && (
        <DevToggle
          label="Screenshot Mode"
          enabled={screenshotMode}
          onToggle={() => setScreenshotMode((prev) => !prev)}
        />
      )}
    </SiteShell>
  );
}
