import BackgroundEffects from "./background-effects";

type SiteShellProps = {
  children: React.ReactNode;
};

export default function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-zinc-950 text-white">
      <BackgroundEffects />
      <main className="relative mx-auto max-w-7xl px-6 py-8 md:px-10 lg:px-16">
        {children}
      </main>
    </div>
  );
}