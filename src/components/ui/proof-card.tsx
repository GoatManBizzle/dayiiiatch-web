import Magnetic from "@/components/ui/magnetic";

type ProofCardProps = {
  title: string;
  subtitle: string;
  problem: string;
  solution: string;
  result: string;
  cta: string;
  href: string;
  status: string;
};

export default function ProofCard({
  title,
  subtitle,
  problem,
  solution,
  result,
  cta,
  href,
  status,
}: ProofCardProps) {
  const rows = [
    { label: "Problem", text: problem },
    { label: "Solution", text: solution },
    { label: "Result", text: result },
  ];

  return (
    <Magnetic as="div" className="h-full" strength={0.04} scale={1.002}>
      <div className="card-sheen flex h-full flex-col rounded-[1.6rem] border border-white/10 bg-white/[0.055] p-5 transition duration-500 hover:-translate-y-1 hover:scale-[1.006] hover:border-cyan-400/30 hover:shadow-[0_0_40px_rgba(34,211,238,0.13)] sm:rounded-[1.8rem] sm:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">
          {subtitle}
        </p>

        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-200">
          {status}
        </span>
      </div>

      <h3 className="text-xl font-bold text-white sm:text-2xl">{title}</h3>

      <div className="mt-5 space-y-3">
        {rows.map((row) => (
          <div
            key={row.label}
            className="rounded-2xl border border-white/10 bg-zinc-900/60 px-4 py-3 transition duration-300 hover:border-cyan-400/20 hover:bg-zinc-900/80"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-300">
              {row.label}
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-200">{row.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <Magnetic className="inline-flex w-full" strength={0.1}>
          <a
            href={href}
            className="inline-flex w-full items-center justify-center rounded-2xl border border-cyan-400/30 bg-gradient-to-r from-cyan-400/16 to-violet-500/16 px-4 py-3 text-center text-sm font-semibold text-cyan-100 transition duration-300 hover:scale-[1.01] hover:border-cyan-300/55 hover:shadow-[0_0_32px_rgba(34,211,238,0.22)]"
          >
            {cta}
          </a>
        </Magnetic>
      </div>
      </div>
    </Magnetic>
  );
}
