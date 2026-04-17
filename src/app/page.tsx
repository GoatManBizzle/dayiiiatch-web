"use client";

import { useMemo, useState } from "react";

import SiteShell from "@/components/layout/site-shell";

import TopBanner from "@/components/sections/top-banner";
import ScreenshotBannerSection from "@/components/sections/screenshot-banner";
import HeaderSection from "@/components/sections/header";
import HeroSection from "@/components/sections/hero";
import OffersSection from "@/components/sections/offers";
import TrustSection from "@/components/sections/trust";
import ServicesSection from "@/components/sections/services";
import PricingSection from "@/components/sections/pricing";
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
      <TopBanner />
      {screenshotMode && <ScreenshotBannerSection />}
      <HeaderSection />
      <HeroSection />
      <OffersSection />
      <TrustSection />
      <ServicesSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactFormSection />
      <FooterSection />

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