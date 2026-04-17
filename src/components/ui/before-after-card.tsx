type BeforeAfterCardProps = {
  beforeTitle: string;
  beforePoints: string[];
  afterTitle: string;
  afterPoints: string[];
  label: string;
};

export default function BeforeAfterCard({
  beforeTitle,
  beforePoints,
  afterTitle,
  afterPoints,
  label,
}: BeforeAfterCardProps) {
  return (
    <div className="card-sheen rounded-[1.9rem] border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-cyan-400/20 hover:shadow-[0_0_36px_rgba(34,211,238,0.08)]">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white">{label}</h3>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-300">
          Proof Mock
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.4rem] border border-white/10 bg-zinc-900/60 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            {beforeTitle}
          </p>
          <div className="mt-4 space-y-3">
            {beforePoints.map((point) => (
              <div
                key={point}
                className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-zinc-400"
              >
                {point}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.4rem] border border-cyan-400/20 bg-cyan-400/8 p-4 shadow-[0_0_24px_rgba(34,211,238,0.06)]">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">
            {afterTitle}
          </p>
          <div className="mt-4 space-y-3">
            {afterPoints.map((point) => (
              <div
                key={point}
                className="rounded-xl border border-cyan-400/15 bg-zinc-950/50 px-3 py-2 text-sm text-zinc-200"
              >
                {point}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}