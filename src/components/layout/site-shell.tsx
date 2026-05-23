import BackgroundEffects from "./background-effects";

type SiteShellProps = {
  children: React.ReactNode;
  fixedMainBackground?: boolean;
  compactMobileSpacing?: boolean;
};

export default function SiteShell({
  children,
  fixedMainBackground = false,
  compactMobileSpacing = false,
}: SiteShellProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-zinc-950 text-white">
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
