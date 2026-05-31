"use client";

import { useState } from "react";

import PortalRevisionModal from "@/components/portal/portal-revision-modal";
import { portalApprovalItems, statusTone } from "@/lib/portal-data";

type ApprovalItem = (typeof portalApprovalItems)[number];

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

export default function PortalApprovalsWorkspace() {
  const [items, setItems] = useState<ApprovalItem[]>(portalApprovalItems);
  const [revisionItem, setRevisionItem] = useState<ApprovalItem | null>(null);

  function setApprovalStatus(title: string, status: string) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.title === title ? { ...item, status } : item,
      ),
    );
  }

  return (
    <>
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Open Approvals", items.filter((item) => item.status !== "Approved").length],
          ["Approved", items.filter((item) => item.status === "Approved").length],
          [
            "Revisions",
            items.filter((item) => item.status === "Revision Requested").length,
          ],
          ["Due Soon", "3"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-4 shadow-[0_0_24px_rgba(34,211,238,0.035)]"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
              {label}
            </p>
            <p className="mt-1 text-2xl font-black text-white">{value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.title}
            className="flex min-w-0 flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(124,58,237,0.05)] backdrop-blur-xl transition hover:border-cyan-300/24 hover:bg-cyan-400/[0.045] sm:p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-zinc-500">
                  {item.category}
                </p>
                <h2 className="mt-2 break-words text-xl font-black text-white">
                  {item.title}
                </h2>
              </div>
              <StatusPill status={item.status} />
            </div>

            <p className="mt-3 text-sm leading-6 text-zinc-300">
              {item.description}
            </p>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/24 px-3 py-3">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                  Project
                </p>
                <p className="mt-1 font-bold text-zinc-100">{item.project}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/24 px-3 py-3">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                  Due Date
                </p>
                <p className="mt-1 font-bold text-zinc-100">{item.dueDate}</p>
              </div>
            </div>

            <div className="mt-auto flex flex-wrap gap-2 pt-5">
              <button
                type="button"
                onClick={() => setApprovalStatus(item.title, "Approved")}
                className="rounded-xl border border-emerald-300/24 bg-emerald-400/10 px-3 py-2 text-xs font-black text-emerald-100 transition hover:bg-emerald-400/16"
              >
                Approve
              </button>
              <button
                type="button"
                onClick={() => setRevisionItem(item)}
                className="rounded-xl border border-violet-300/24 bg-violet-500/10 px-3 py-2 text-xs font-black text-violet-100 transition hover:bg-violet-500/16"
              >
                Request Revision
              </button>
              <button
                type="button"
                className="rounded-xl border border-cyan-300/24 bg-cyan-400/10 px-3 py-2 text-xs font-black text-cyan-100 transition hover:bg-cyan-400/18"
              >
                View Details
              </button>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-[1.25rem] border border-cyan-300/14 bg-cyan-400/[0.06] px-4 py-3 text-xs leading-5 text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.04)]">
        Future approval hooks: approvals table, revision_requests table,
        project_id, deliverable_id, user_id, and Supabase realtime
        notifications.
      </section>

      {revisionItem ? (
        <PortalRevisionModal
          itemTitle={revisionItem.title}
          onClose={() => setRevisionItem(null)}
          onSubmit={() => {
            setApprovalStatus(revisionItem.title, "Revision Requested");
            setRevisionItem(null);
          }}
        />
      ) : null}
    </>
  );
}
