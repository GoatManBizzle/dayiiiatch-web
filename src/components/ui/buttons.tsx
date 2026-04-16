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
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="rounded-2xl border border-white/20 bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition duration-300 hover:scale-[1.04] hover:shadow-[0_0_28px_rgba(255,255,255,0.18)] active:scale-[0.99]"
    >
      {children}
    </a>
  );
}

export function PrimaryButton({
  href,
  children,
  external = false,
}: ButtonProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="pulse-glow rounded-2xl border border-cyan-400/40 bg-gradient-to-r from-cyan-400/15 to-violet-500/15 px-5 py-3 text-sm font-semibold text-cyan-100 transition duration-300 hover:scale-[1.04] hover:shadow-[0_0_32px_rgba(34,211,238,0.24)] active:scale-[0.99]"
    >
      {children}
    </a>
  );
}

export function GhostButton({
  href,
  children,
  external = false,
}: ButtonProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:scale-[1.03] hover:bg-white/10 hover:shadow-[0_0_24px_rgba(139,92,246,0.10)] active:scale-[0.99]"
    >
      {children}
    </a>
  );
}