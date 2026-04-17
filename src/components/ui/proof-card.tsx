type ProofCardProps = {
  title: string;
  subtitle: string;
  summary: string;
  points: string[];
  result: string;
  status: string;
};

export default function ProofCard({
  title,
  subtitle,
  summary,
  points,
  result,
  status,
}: ProofCardProps) {
  return (
    <div className="card-sheen rounded-[1.8rem] border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-cyan-400/20 hover:shadow-[0_0_36px_rgba(34,211,238,0.08)]">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">
          {subtitle}
        </p>

        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-200">
          {status}
        </span>
      </div>

      <h3 className="text-2xl font-bold text-white">{title}</h3>

      <p className="mt-4 text-sm leading-7 text-zinc-300">{summary}</p>

      <div className="mt-5 space-y-3">
        {points.map((point) => (
          <div
            key={point}
            className="rounded-2xl border border-white/10 bg-zinc-900/60 px-4 py-3 text-sm text-zinc-200 transition duration-300 hover:border-cyan-400/20 hover:bg-zinc-900/80"
          >
            {point}
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-violet-400/20 bg-gradient-to-r from-violet-500/10 to-cyan-400/10 px-4 py-4">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
          Result
        </p>
        <p className="mt-2 text-sm font-semibold text-white">{result}</p>
      </div>
    </div>
  );
}