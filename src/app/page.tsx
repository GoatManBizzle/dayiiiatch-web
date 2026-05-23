"use client";

import { useMemo, useState } from "react";

import SiteShell from "@/components/layout/site-shell";

import AmbientMotion from "@/components/sections/ambient-motion";
import ConversionTrustStrip from "@/components/sections/conversion-trust-strip";
import HomepageScrollManager from "@/components/sections/homepage-scroll-manager";
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
import ReturnToTop from "@/components/sections/return-to-top";
import TestimonialsSection from "@/components/sections/testimonials";
import FAQSection from "@/components/sections/faq";
import ContactFormSection from "@/components/sections/contact-form";
import FooterSection from "@/components/sections/footer";

import DevToggle from "@/components/dev/dev-toggle";
import { siteSettings } from "@/config/site-settings";
import Reveal from "@/components/ui/reveal";

export default function HomePage() {
  const [screenshotMode, setScreenshotMode] = useState(
    siteSettings.screenshotMode
  );

  const isDev = useMemo(() => process.env.NODE_ENV !== "production", []);

  return (
    <SiteShell>
      <HomepageScrollManager />
      <AmbientMotion />
      <DigitalLogoBanner />
      <HeaderSection />
      <HeroSection />
      <ConversionTrustStrip
        items={[
          "Mobile-ready systems",
          "Automation-ready workflows",
          "Structured build process",
          "Operational infrastructure",
        ]}
        note="Build queue availability changes weekly, so the free call keeps the next step simple."
      />
      <Reveal delayMs={40}>
        <ProofSystemsSection />
      </Reveal>
      <Reveal delayMs={60}>
        <HowWeWorkSection />
      </Reveal>
      {isDev && screenshotMode && (
        <Reveal delayMs={60}>
          <ScreenshotBannerSection />
        </Reveal>
      )}
      <Reveal delayMs={70}>
        <ServicesSection />
      </Reveal>
      <Reveal delayMs={80}>
        <OffersSection />
      </Reveal>
      <ConversionTrustStrip
        items={[
          "Fast response support",
          "Clear next steps",
          "Limited onboarding capacity",
          "Current active builds",
        ]}
        note="Calm planning first, then the right build path."
      />
      <Reveal delayMs={90}>
        <TrustSection />
      </Reveal>
      <Reveal delayMs={90}>
        <TestimonialsSection />
      </Reveal>
      <Reveal delayMs={100}>
        <PricingSection />
      </Reveal>
      <Reveal delayMs={100}>
        <FAQSection />
      </Reveal>
      <Reveal delayMs={110}>
        <LeadCaptureSection />
      </Reveal>
      <Reveal delayMs={110}>
        <ContactFormSection />
      </Reveal>
      <Reveal delayMs={80}>
        <FooterSection />
      </Reveal>
      <StickyCTA />
      <ReturnToTop />

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
