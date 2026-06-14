"use client";

import { useMemo, useState } from "react";

import SiteShell from "@/components/layout/site-shell";

import AmbientMotion from "@/components/sections/ambient-motion";
import ConversionTrustStrip from "@/components/sections/conversion-trust-strip";
import HomepageScrollManager from "@/components/sections/homepage-scroll-manager";
import ScreenshotBannerSection from "@/components/sections/screenshot-banner";
import HeaderSection from "@/components/sections/header";
import AgencyIllusionSection from "@/components/sections/agency-illusion";
import ProofSystemsSection from "@/components/sections/proof-systems";
import DigitalLogoBanner from "@/components/sections/digital-logo-banner";
import LeadCaptureSection from "@/components/sections/lead-capture";
import StickyCTA from "@/components/sections/sticky-cta";
import ReturnToTop from "@/components/sections/return-to-top";
import DamarkoAssistant from "@/components/sections/damarko-assistant";
import PromoClipControls from "@/components/sections/promo-clip-controls";
import TestimonialsSection from "@/components/sections/testimonials";
import FAQSection from "@/components/sections/faq";
import ContactFormSection from "@/components/sections/contact-form";
import FooterSection from "@/components/sections/footer";
import AboutSummarySection from "@/components/sections/about-summary";
import ClientLoginButton from "@/components/sections/client-login-button";
import CommercialPathsSection from "@/components/sections/commercial-paths";

import DevToggle from "@/components/dev/dev-toggle";
import StyleEditor from "@/components/dev/style-editor";
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
      publicThemeSurface
      styleScope="public.homepage"
      flushTop
    >
      <HomepageScrollManager />
      <AmbientMotion />
      <ClientLoginButton />
      <header className="home-hero" data-style-section="home-hero">
        <DigitalLogoBanner />
        <HeaderSection />
      </header>
      <AboutSummarySection />
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
        <AgencyIllusionSection />
      </Reveal>
      {isDev && screenshotMode && !promoClipMode && (
        <Reveal delayMs={60}>
          <ScreenshotBannerSection />
        </Reveal>
      )}
      <Reveal delayMs={70}>
        <CommercialPathsSection />
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
        <TestimonialsSection />
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
      <StyleEditor />
    </SiteShell>
  );
}
