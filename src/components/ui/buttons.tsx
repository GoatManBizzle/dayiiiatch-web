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
      className="rounded-2xl border border-white/20 bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(255,255,255,0.18)]"
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
      className="rounded-2xl border border-cyan-400/40 bg-gradient-to-r from-cyan-400/15 to-violet-500/15 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(34,211,238,0.20)]"
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
      className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.03] hover:bg-white/10"
    >
      {children}
    </a>
  );
}