export function getCtaToneClass(label: string, href: string) {
  const normalizedLabel = label.toLowerCase();

  if (href.includes("free-call") || normalizedLabel.includes("free")) {
    return "border-white/25 bg-white text-zinc-950 shadow-[0_0_26px_rgba(255,255,255,0.10)] hover:border-white/40 hover:bg-cyan-50 hover:shadow-[0_0_34px_rgba(255,255,255,0.20)]";
  }

  if (
    href.includes("premium-session") ||
    normalizedLabel.includes("premium")
  ) {
    return "border-cyan-400/35 bg-cyan-400/12 text-cyan-100 hover:border-cyan-300/55 hover:bg-cyan-400/18 hover:shadow-[0_0_30px_rgba(34,211,238,0.20)]";
  }

  return "border-white/12 bg-white/[0.055] text-zinc-100 hover:border-violet-300/28 hover:bg-white/10 hover:shadow-[0_0_24px_rgba(168,85,247,0.12)]";
}

export function getCtaSupportCopy(label: string, href: string) {
  const normalizedLabel = label.toLowerCase();

  if (href.includes("free-call") || normalizedLabel.includes("free")) {
    return "Best first step when you want quick clarity.";
  }

  if (
    href.includes("premium-session") ||
    normalizedLabel.includes("premium")
  ) {
    return "Use when the project needs deeper planning.";
  }

  return "Low-pressure path for custom project details.";
}
