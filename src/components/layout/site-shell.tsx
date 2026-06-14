import BackgroundEffects from "./background-effects";

type SiteShellProps = {
  children: React.ReactNode;
  fixedMainBackground?: boolean;
  compactMobileSpacing?: boolean;
  screenshotMode?: boolean;
  promoClipMode?: boolean;
  promoDockHidden?: boolean;
  publicThemeSurface?: boolean;
  styleScope?: "public.homepage";
  flushTop?: boolean;
};

export default function SiteShell({
  children,
  fixedMainBackground = false,
  compactMobileSpacing = false,
  screenshotMode = false,
  promoClipMode = false,
  promoDockHidden = false,
  publicThemeSurface = false,
  styleScope,
  flushTop = false,
}: SiteShellProps) {
  return (
    <div
      data-style-scope={styleScope}
      className={`relative min-h-screen overflow-x-hidden bg-zinc-950 text-white ${
        publicThemeSurface ? "public-theme-surface" : ""
      } ${
        screenshotMode ? "screenshot-mode" : ""
      } ${promoClipMode ? "promo-clip-mode" : ""} ${
        promoDockHidden ? "promo-hide-dock" : ""
      }`}
    >
      <BackgroundEffects fixedMainImage={fixedMainBackground} />
      <main
        className={`relative z-10 mx-auto max-w-7xl sm:px-6 md:px-10 lg:px-16 ${
          flushTop
            ? "px-3 pb-4 pt-0 sm:pb-6 sm:pt-0 md:pb-8 md:pt-0"
            : compactMobileSpacing
              ? "px-3 py-4 sm:py-6 md:py-8"
              : "px-4 py-6 md:py-8"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
