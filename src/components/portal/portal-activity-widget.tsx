import { portalMasterActivityEvents, statusTone } from "@/lib/portal-data";
import type { PortalActivityEvent } from "@/lib/activity-events";

function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${
        statusTone[status] ?? "border-white/10 bg-white/[0.045] text-zinc-200"
      }`}
    >
      {status}
    </span>
  );
}

export default function PortalActivityWidget({
  title = "Recent Activity",
  eyebrow = "Workspace Stream",
  limit = 5,
  events,
  isPreviewData = true,
}: {
  title?: string;
  eyebrow?: string;
  limit?: number;
  events?: PortalActivityEvent[];
  isPreviewData?: boolean;
}) {
  const feed = events?.length ? events : portalMasterActivityEvents;

  return (
    <section className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(34,211,238,0.045)] backdrop-blur-xl sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
            {eyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-black text-white">{title}</h2>
        </div>
        <span className="rounded-full border border-cyan-300/18 bg-cyan-400/[0.07] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-cyan-100">
          {isPreviewData ? "Preview" : "Live"} / Latest {limit}
        </span>
      </div>

      <div className="mt-4 grid gap-3">
        {feed.slice(0, limit).map((event) => (
          <article
            key={event.id}
            className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-2xl border border-white/10 bg-black/24 p-3"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 text-[10px] font-black text-cyan-100">
              {event.icon}
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="break-words font-black text-white">
                  {event.title}
                </h3>
                <StatusPill status={event.status} />
              </div>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">
                {event.eventType} / {event.timestamp}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Future: hydrate from activity_events by client_id/project_id and stream inserts through Supabase realtime. */}
    </section>
  );
}
