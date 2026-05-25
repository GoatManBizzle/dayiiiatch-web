"use client";

type PromoClipControlsProps = {
  enabled: boolean;
};

const sectionPresets = [
  { label: "Hero", target: "promo-hero" },
  { label: "Systems", target: "proof-systems" },
  { label: "Work", target: "how-we-work" },
  { label: "Journey", target: "client-journey" },
  { label: "Authority", target: "authority-stack" },
  { label: "Content", target: "content-engine" },
  { label: "Platforms", target: "platform-conversion" },
  { label: "Demos", target: "interactive-showcase" },
  { label: "Ops", target: "agency-operations" },
  { label: "Checklist", target: "checklist-capture" },
];

const captureLinks = [
  {
    label: "Modal",
    href: "/?promo=1&capture=systems-modal&project=project-damarko#proof-systems",
  },
  {
    label: "Gallery",
    href: "/?promo=1&capture=systems-lightbox&project=project-damarko#proof-systems",
  },
  {
    label: "Booking",
    href: "/book?service=free-call&promo=1",
  },
];

export default function PromoClipControls({ enabled }: PromoClipControlsProps) {
  if (!enabled) return null;

  function scrollToTarget(target: string) {
    const node = document.getElementById(target);
    if (!node) return;

    node.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    window.history.replaceState(null, "", `?promo=1#${target}`);
  }

  return (
    <aside
      className="fixed bottom-4 left-3 z-[90] max-w-[calc(100vw-1.5rem)] rounded-[1.2rem] border border-cyan-300/20 bg-zinc-950/82 p-2 shadow-[0_0_34px_rgba(34,211,238,0.15)] backdrop-blur-2xl sm:bottom-5 sm:left-5"
      aria-label="Promo clip capture controls"
    >
      <p className="px-2 pb-1 text-[10px] font-black uppercase tracking-[0.16em] text-cyan-200/80">
        Promo Clip
      </p>

      <div className="grid grid-cols-4 gap-1.5 sm:flex sm:flex-wrap">
        {sectionPresets.map((preset) => (
          <button
            key={preset.target}
            type="button"
            onClick={() => scrollToTarget(preset.target)}
            data-growth-event="promo-section-jump"
            data-growth-target={preset.target}
            className="inline-flex min-h-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-2.5 py-2 text-[10px] font-bold text-zinc-200 transition hover:border-cyan-300/28 hover:bg-cyan-400/10 hover:text-cyan-100 active:scale-[0.97]"
          >
            {preset.label}
          </button>
        ))}

        {captureLinks.map((preset) => (
          <a
            key={preset.label}
            href={preset.href}
            data-growth-event="promo-capture-link"
            data-growth-target={preset.label.toLowerCase()}
            className="inline-flex min-h-9 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-400/8 px-2.5 py-2 text-center text-[10px] font-bold text-cyan-100 transition hover:border-cyan-300/36 hover:bg-cyan-400/14 active:scale-[0.97]"
          >
            {preset.label}
          </a>
        ))}
      </div>
    </aside>
  );
}
