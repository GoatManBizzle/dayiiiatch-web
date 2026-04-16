export function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-center shadow-lg shadow-violet-500/5">
      <p className="text-2xl font-black text-white">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-zinc-400">{label}</p>
    </div>
  );
}