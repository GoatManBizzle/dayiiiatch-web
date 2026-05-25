import BackgroundEffects from "./background-effects";

type SiteShellProps = {
  children: React.ReactNode;
  fixedMainBackground?: boolean;
  compactMobileSpacing?: boolean;
  screenshotMode?: boolean;
  promoClipMode?: boolean;
  promoDockHidden?: boolean;
};

export default function SiteShell({
  children,
  fixedMainBackground = false,
  compactMobileSpacing = false,
  screenshotMode = false,
  promoClipMode = false,
  promoDockHidden = false,
}: SiteShellProps) {
  return (
    <div
      className={`relative min-h-screen overflow-x-hidden bg-zinc-950 text-white ${
        screenshotMode ? "screenshot-mode" : ""
      } ${promoClipMode ? "promo-clip-mode" : ""} ${
        promoDockHidden ? "promo-hide-dock" : ""
      }`}
    >
      <BackgroundEffects fixedMainImage={fixedMainBackground} />
      <main
        className={`relative z-10 mx-auto max-w-7xl sm:px-6 md:px-10 md:py-8 lg:px-16 ${
          compactMobileSpacing ? "px-3 py-4 sm:py-6" : "px-4 py-6"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
