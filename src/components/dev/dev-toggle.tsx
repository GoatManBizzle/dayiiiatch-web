"use client";

type DevToggleProps = {
  label: string;
  enabled: boolean;
  onToggle: () => void;
};

export default function DevToggle({
  label,
  enabled,
  onToggle,
}: DevToggleProps) {
  return (
    <div className="fixed bottom-5 right-5 z-[999] rounded-2xl border border-cyan-400/20 bg-zinc-950/85 p-3 shadow-[0_0_28px_rgba(34,211,238,0.18)] backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-400">
            Dev Toggle
          </p>
          <p className="mt-1 text-sm font-semibold text-white">{label}</p>
        </div>

        <button
          type="button"
          onClick={onToggle}
          className={`relative h-8 w-16 rounded-full border transition ${
            enabled
              ? "border-cyan-400/40 bg-cyan-400/15"
              : "border-white/10 bg-white/5"
          }`}
          aria-pressed={enabled}
          aria-label={`Toggle ${label}`}
        >
          <span
            className={`absolute top-1 h-6 w-6 rounded-full transition ${
              enabled
                ? "left-9 bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.45)]"
                : "left-1 bg-zinc-300"
            }`}
          />
        </button>
      </div>

      <p
        className={`mt-2 text-xs font-medium ${
          enabled ? "text-cyan-300" : "text-zinc-400"
        }`}
      >
        {enabled ? "ON" : "OFF"}
      </p>
    </div>
  );
}