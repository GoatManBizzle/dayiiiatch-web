"use client";

import { useMemo, useState } from "react";

import SiteShell from "@/components/layout/site-shell";

import AmbientMotion from "@/components/sections/ambient-motion";
import ConversionTrustStrip from "@/components/sections/conversion-trust-strip";
import HomepageScrollManager from "@/components/sections/homepage-scroll-manager";
import ScreenshotBannerSection from "@/components/sections/screenshot-banner";
import HeaderSection from "@/components/sections/header";
import HeroSection from "@/components/sections/hero";
import ClientJourneySection from "@/components/sections/client-journey";
import AuthorityStackSection from "@/components/sections/authority-stack";
import ContentEngineSection from "@/components/sections/content-engine";
import PlatformConversionSection from "@/components/sections/platform-conversion";
import InteractiveShowcaseSection from "@/components/sections/interactive-showcase";
import AgencyIllusionSection from "@/components/sections/agency-illusion";
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
import DamarkoAssistant from "@/components/sections/damarko-assistant";
import PromoClipControls from "@/components/sections/promo-clip-controls";
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
  const [promoClipMode] = useState(() => {
    if (typeof window === "undefined") return false;
    const params = new URLSearchParams(window.location.search);
    return params.get("promo") === "1" || params.get("mode") === "promo";
  });
  const [promoDockHidden] = useState(() => {
    if (typeof window === "undefined") return false;
    const params = new URLSearchParams(window.location.search);
    const promoEnabled =
      params.get("promo") === "1" || params.get("mode") === "promo";
    return promoEnabled && params.get("dock") === "hide";
  });

  const isDev = useMemo(() => process.env.NODE_ENV !== "production", []);

  return (
    <SiteShell
      fixedMainBackground
      compactMobileSpacing
      screenshotMode={isDev && screenshotMode && !promoClipMode}
      promoClipMode={promoClipMode}
      promoDockHidden={promoDockHidden}
    >
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
      <Reveal delayMs={70}>
        <ClientJourneySection />
      </Reveal>
      <Reveal delayMs={75}>
        <AuthorityStackSection />
      </Reveal>
      <Reveal delayMs={80}>
        <ContentEngineSection />
      </Reveal>
      <Reveal delayMs={85}>
        <PlatformConversionSection />
      </Reveal>
      <Reveal delayMs={90}>
        <InteractiveShowcaseSection />
      </Reveal>
      <Reveal delayMs={95}>
        <AgencyIllusionSection />
      </Reveal>
      {isDev && screenshotMode && !promoClipMode && (
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
      <DamarkoAssistant />
      <StickyCTA />
      <ReturnToTop />
      <PromoClipControls enabled={promoClipMode} />

      {isDev && (
        <div className="screenshot-hide promo-hide">
          <DevToggle
            label="Screenshot Mode"
            enabled={screenshotMode}
            onToggle={() => setScreenshotMode((prev) => !prev)}
          />
        </div>
      )}
    </SiteShell>
  );
}
