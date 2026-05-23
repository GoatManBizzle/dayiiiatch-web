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
        className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl border border-white/20 bg-white px-5 py-3 text-center text-sm font-semibold text-zinc-950 transition duration-300 hover:scale-[1.015] hover:border-white/35 hover:shadow-[0_0_34px_rgba(255,255,255,0.22)] active:scale-[0.99] sm:w-auto"
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
        className="pulse-glow inline-flex min-h-12 w-full items-center justify-center rounded-2xl border border-cyan-400/40 bg-gradient-to-r from-cyan-400/15 to-violet-500/15 px-5 py-3 text-center text-sm font-semibold text-cyan-100 transition duration-300 hover:scale-[1.015] hover:border-cyan-300/55 hover:shadow-[0_0_36px_rgba(34,211,238,0.28)] active:scale-[0.99] sm:w-auto"
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
        className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm font-semibold text-white transition duration-300 hover:scale-[1.01] hover:border-violet-300/25 hover:bg-white/10 hover:shadow-[0_0_28px_rgba(139,92,246,0.13)] active:scale-[0.99] sm:w-auto"
      >
        {children}
      </a>
    </Magnetic>
  );
}
