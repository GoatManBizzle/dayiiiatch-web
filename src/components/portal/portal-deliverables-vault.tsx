"use client";

import { useState } from "react";

import PortalRevisionModal from "@/components/portal/portal-revision-modal";
import {
  deliverableCategories,
  portalDeliverables,
  statusTone,
} from "@/lib/portal-data";
import { createFileSignedUrl, downloadWorkspaceFile } from "@/lib/storage-data";
import type { ApprovalRequestRow } from "@/lib/approval-data";
import type { FileRow } from "@/types/workspace";

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

function displayApprovalStatus(status?: string) {
  if (status === "approved") return "Approved";
  if (status === "rejected") return "Rejected";
  if (status === "needs_revision") return "Needs Revision";
  if (status === "pending_review") return "Pending Review";
  return "Pending Review";
}

function mapStorageFile(file: FileRow, approvals: ApprovalRequestRow[] = []) {
  const approval = approvals.find(
    (item) => item.deliverable_id === file.id || item.title === file.file_name,
  );

  return {
    title: file.file_name,
    category: file.category,
    added: new Date(file.uploaded_at).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
    status: file.status === "received" ? "Ready" : file.status,
    approvalStatus: displayApprovalStatus(approval?.status),
    fileType: file.file_type ?? "File",
    summary: `Stored at ${file.storage_path}`,
    storageFile: file,
  };
}

type StorageDeliverable = ReturnType<typeof mapStorageFile>;

function hasStorageFile(
  deliverable: StorageDeliverable | (typeof portalDeliverables)[number],
): deliverable is StorageDeliverable {
  return "storageFile" in deliverable;
}

export default function PortalDeliverablesVault({
  files,
  approvals,
}: {
  files?: FileRow[];
  approvals?: ApprovalRequestRow[];
}) {
  const [revisionItem, setRevisionItem] = useState<string | null>(null);
  const deliverables = files?.length
    ? files
        .filter((file) => file.category === "Deliverables")
        .map((file) => mapStorageFile(file, approvals))
    : portalDeliverables;
  const readyCount = deliverables.filter(
    (deliverable) => deliverable.status === "Ready",
  ).length;
  const reviewCount = deliverables.filter(
    (deliverable) => deliverable.status === "In Review",
  ).length;
  const approvalCount = deliverables.filter(
    (deliverable) => deliverable.status === "Needs Approval",
  ).length;

  async function openStorageFile(deliverable: (typeof deliverables)[number]) {
    if (!hasStorageFile(deliverable)) return;

    const result = await createFileSignedUrl(deliverable.storageFile);

    if (result.url) {
      window.open(result.url, "_blank", "noopener,noreferrer");
    }
  }

  async function downloadStorageFile(deliverable: (typeof deliverables)[number]) {
    if (!hasStorageFile(deliverable)) return;

    await downloadWorkspaceFile(deliverable.storageFile);
  }

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
                deliverables.filter(
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
                ["Total Files", deliverables.length.toString()],
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
              {deliverables.length} files
            </span>
          </div>

          <div className="mt-4 grid items-stretch gap-3 lg:grid-cols-2">
            {deliverables.length === 0 ? (
              <div className="rounded-2xl border border-cyan-300/14 bg-cyan-400/[0.06] p-5 lg:col-span-2">
                <p className="font-black text-white">
                  Upload project assets to begin.
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  Deliverables uploaded to the Deliverables category will appear
                  here with signed URL view and download actions.
                </p>
              </div>
            ) : deliverables.map((deliverable) => (
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

                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                      Category / Type
                    </p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.1em] text-zinc-300">
                      {deliverable.category} / {deliverable.fileType}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                      Approval Status
                    </p>
                    <div className="mt-2">
                      <StatusPill status={deliverable.approvalStatus} />
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs font-bold uppercase tracking-[0.12em] text-zinc-500">
                  <span>Added {deliverable.added}</span>
                  <span>Vault status {deliverable.status}</span>
                </div>

                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => void openStorageFile(deliverable)}
                    className="rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-black text-zinc-200 transition hover:border-cyan-300/28 hover:bg-cyan-400/10 hover:text-cyan-100"
                  >
                    View
                  </button>
                  <button
                    type="button"
                    onClick={() => void downloadStorageFile(deliverable)}
                    className="rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-black text-zinc-200 transition hover:border-cyan-300/28 hover:bg-cyan-400/10 hover:text-cyan-100"
                  >
                    Download
                  </button>
                  <button
                    type="button"
                    onClick={() => setRevisionItem(deliverable.title)}
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
          itemTitle={revisionItem}
          onClose={() => setRevisionItem(null)}
          onSubmit={() => setRevisionItem(null)}
        />
      ) : null}
    </div>
  );
}
