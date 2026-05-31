"use client";

import { useState } from "react";

import PortalRevisionModal from "@/components/portal/portal-revision-modal";
import {
  deliverableCategories,
  portalDeliverables,
  statusTone,
} from "@/lib/portal-data";

type Deliverable = (typeof portalDeliverables)[number];

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

export default function PortalDeliverablesVault() {
  const [revisionItem, setRevisionItem] = useState<Deliverable | null>(null);
  const readyCount = portalDeliverables.filter(
    (deliverable) => deliverable.status === "Ready",
  ).length;
  const reviewCount = portalDeliverables.filter(
    (deliverable) => deliverable.status === "In Review",
  ).length;
  const approvalCount = portalDeliverables.filter(
    (deliverable) => deliverable.status === "Needs Approval",
  ).length;

  return (
    <div className="grid gap-4">
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        {deliverableCategories.map((category) => (
          <article
            key={category}
            className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-4 shadow-[0_0_24px_rgba(124,58,237,0.04)] transition hover:-translate-y-0.5 hover:border-cyan-300/24 hover:bg-cyan-400/[0.06]"
          >
            <p className="break-words text-sm font-black text-zinc-100">
              {category}
            </p>
            <p className="mt-2 text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
              {
                portalDeliverables.filter(
                  (deliverable) => deliverable.category === category,
                ).length
              }{" "}
              item
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-12">
        <div className="grid min-w-0 content-start gap-4 xl:col-span-4">
          <div className="rounded-[1.25rem] border border-cyan-300/18 bg-cyan-400/[0.06] p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
              Deliverables Vault
            </p>
            <h2 className="mt-3 text-2xl font-black text-white">
              Launch-ready materials
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-300">
              Finished assets, docs, walkthroughs, exports, and approval-ready
              materials live here before they move into long-term client
              storage.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
              {[
                ["Total Files", portalDeliverables.length.toString()],
                ["Ready", readyCount.toString()],
                ["In Review", reviewCount.toString()],
                ["Needs Approval", approvalCount.toString()],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-black/24 px-3 py-3"
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                    {label}
                  </p>
                  <p className="mt-1 text-2xl font-black text-white">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.25rem] border border-violet-300/14 bg-violet-500/[0.06] px-4 py-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-100">
              Damarko Summary Placeholder
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-300">
              Future summaries can explain what changed, why each deliverable
              matters, and what the client should approve next.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            {["Signed URLs", "Permissions", "Revision Flow"].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-black/24 px-3 py-3 text-sm font-bold text-zinc-200"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(124,58,237,0.06)] backdrop-blur-xl sm:p-5 xl:col-span-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-200">
                Vault List
              </p>
              <h2 className="mt-2 text-2xl font-black text-white">
                Client Deliverables
              </h2>
            </div>
            <span className="rounded-full border border-cyan-300/18 bg-cyan-400/[0.07] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-cyan-100">
              {portalDeliverables.length} files
            </span>
          </div>

          <div className="mt-4 grid items-stretch gap-3 lg:grid-cols-2">
            {portalDeliverables.map((deliverable) => (
              <article
                key={deliverable.title}
                className="flex min-w-0 flex-col rounded-2xl border border-white/10 bg-black/24 p-4 transition hover:border-cyan-300/22 hover:bg-cyan-400/[0.045]"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="min-w-0 break-words font-black text-white">
                    {deliverable.title}
                  </h3>
                  <StatusPill status={deliverable.status} />
                </div>

                <p className="mt-3 text-sm leading-6 text-zinc-300">
                  {deliverable.summary}
                </p>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs font-bold uppercase tracking-[0.12em] text-zinc-500">
                  <span>{deliverable.category}</span>
                  <span>{deliverable.fileType}</span>
                  <span>{deliverable.added}</span>
                </div>

                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                  <button
                    type="button"
                    className="rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-black text-zinc-200 transition hover:border-cyan-300/28 hover:bg-cyan-400/10 hover:text-cyan-100"
                  >
                    View
                  </button>
                  <button
                    type="button"
                    className="rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-black text-zinc-200 transition hover:border-cyan-300/28 hover:bg-cyan-400/10 hover:text-cyan-100"
                  >
                    Download
                  </button>
                  <button
                    type="button"
                    onClick={() => setRevisionItem(deliverable)}
                    className="rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-black text-zinc-200 transition hover:border-violet-300/28 hover:bg-violet-500/10 hover:text-violet-100"
                  >
                    Request Revision
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {revisionItem ? (
        <PortalRevisionModal
          itemTitle={revisionItem.title}
          onClose={() => setRevisionItem(null)}
          onSubmit={() => setRevisionItem(null)}
        />
      ) : null}
    </div>
  );
}
