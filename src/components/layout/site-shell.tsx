import BackgroundEffects from "./background-effects";

type SiteShellProps = {
  children: React.ReactNode;
};

export default function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-zinc-950 text-white">
      <BackgroundEffects />
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 md:px-10 md:py-8 lg:px-16">
        {children}
      </main>
    </div>
  );
}
