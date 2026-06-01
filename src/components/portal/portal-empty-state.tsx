export default function PortalEmptyState({
  title = "Your workspace is being prepared.",
  description = "DAYIIIatch is connecting your client records, project assets, approvals, meetings, and activity. Check back soon for live workspace data.",
  label = "Client Workspace",
}: {
  title?: string;
  description?: string;
  label?: string;
}) {
  return (
    <section className="rounded-[1.6rem] border border-cyan-300/16 bg-cyan-400/[0.055] p-5 shadow-[0_0_42px_rgba(34,211,238,0.07)] backdrop-blur-xl sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">
            {label}
          </p>
          <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">
            {title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-zinc-300">
            {description}
          </p>
        </div>
        <span className="rounded-full border border-emerald-300/18 bg-emerald-400/[0.08] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-emerald-100">
          Client Workspace
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {["Client profile linked", "Data syncing", "Preview preserved"].map(
          (item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-black/24 px-4 py-3 text-sm font-bold text-zinc-200"
            >
              {item}
            </div>
          ),
        )}
      </div>
    </section>
  );
}
