import Magnetic from "@/components/ui/magnetic";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
};

export function SolidCTA({
  href,
  children,
  external = false,
}: ButtonProps) {
  return (
    <Magnetic className="inline-flex w-full sm:w-auto">
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl border border-white/25 bg-white px-5 py-3 text-center text-sm font-bold text-zinc-950 shadow-[0_0_26px_rgba(255,255,255,0.10)] transition duration-500 ease-out hover:scale-[1.012] hover:border-white/40 hover:bg-cyan-50 hover:shadow-[0_0_36px_rgba(255,255,255,0.22)] focus:outline-none focus:ring-2 focus:ring-cyan-300/40 active:scale-[0.99] sm:w-auto"
      >
        {children}
      </a>
    </Magnetic>
  );
}

export function PrimaryButton({
  href,
  children,
  external = false,
}: ButtonProps) {
  return (
    <Magnetic className="inline-flex w-full sm:w-auto">
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl border border-cyan-400/35 bg-gradient-to-r from-cyan-400/13 to-violet-500/12 px-5 py-3 text-center text-sm font-semibold text-cyan-100 transition duration-500 ease-out hover:scale-[1.01] hover:border-cyan-300/55 hover:shadow-[0_0_32px_rgba(34,211,238,0.22)] focus:outline-none focus:ring-2 focus:ring-cyan-300/35 active:scale-[0.99] sm:w-auto"
      >
        {children}
      </a>
    </Magnetic>
  );
}

export function GhostButton({
  href,
  children,
  external = false,
}: ButtonProps) {
  return (
    <Magnetic className="inline-flex w-full sm:w-auto" strength={0.1}>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl border border-white/12 bg-white/[0.045] px-5 py-3 text-center text-sm font-semibold text-zinc-100 transition duration-500 ease-out hover:scale-[1.008] hover:border-violet-300/25 hover:bg-white/10 hover:shadow-[0_0_24px_rgba(139,92,246,0.11)] focus:outline-none focus:ring-2 focus:ring-violet-300/25 active:scale-[0.99] sm:w-auto"
      >
        {children}
      </a>
    </Magnetic>
  );
}
