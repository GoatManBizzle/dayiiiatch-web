"use client";

type PortalRevisionModalProps = {
  itemTitle: string;
  onClose: () => void;
  onSubmit: () => void;
};

export default function PortalRevisionModal({
  itemTitle,
  onClose,
  onSubmit,
}: PortalRevisionModalProps) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/76 px-4 py-6 backdrop-blur-md"
      onClick={onClose}
    >
      <form
        className="w-full max-w-2xl rounded-[1.5rem] border border-cyan-300/20 bg-zinc-950/94 p-4 shadow-[0_0_70px_rgba(34,211,238,0.16)] backdrop-blur-2xl sm:p-6"
        onClick={(event) => event.stopPropagation()}
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
              Request Revision
            </p>
            <h2 className="mt-2 break-words text-2xl font-black text-white">
              {itemTitle}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-zinc-200 transition hover:border-cyan-300/28 hover:text-cyan-100"
          >
            Close
          </button>
        </div>

        <label className="mt-5 grid gap-2">
          <span className="text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
            Revision Notes
          </span>
          <textarea
            rows={5}
            required
            placeholder="Describe what should change, where it appears, and what outcome you want..."
            className="w-full resize-none rounded-2xl border border-white/10 bg-black/35 px-4 py-4 text-sm leading-6 text-white outline-none placeholder:text-zinc-600 focus:border-cyan-300/45"
          />
        </label>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
              Priority
            </span>
            <select className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300/45">
              <option>Normal</option>
              <option>High</option>
              <option>Launch blocker</option>
            </select>
          </label>

          <div className="rounded-2xl border border-dashed border-violet-300/24 bg-violet-500/[0.06] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-100">
              Optional Attachment
            </p>
            <p className="mt-2 text-sm leading-5 text-zinc-400">
              Placeholder for screenshots, marked-up files, or replacement
              assets.
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-white/10 bg-white/[0.045] px-5 py-3 text-sm font-black text-zinc-200 transition hover:border-violet-300/28 hover:bg-violet-500/10 hover:text-violet-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-2xl border border-cyan-300/28 bg-cyan-400/12 px-5 py-3 text-sm font-black text-cyan-100 transition hover:-translate-y-0.5 hover:bg-cyan-400/18"
          >
            Submit Revision Request
          </button>
        </div>

        <p className="mt-4 text-xs leading-5 text-zinc-500">
          UI-only workflow. Future submission should write to
          revision_requests, notify subscribers in realtime, and link this item
          to project, deliverable, and user records.
        </p>
      </form>
    </div>
  );
}
