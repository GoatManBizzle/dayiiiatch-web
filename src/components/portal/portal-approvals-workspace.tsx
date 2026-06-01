"use client";

import { useMemo, useState } from "react";

import {
  portalApprovalHistory,
  portalApprovalQueue,
  statusTone,
} from "@/lib/portal-data";
import {
  submitApprovalDecision,
  type ApprovalHistoryRow,
  type ApprovalRequestRow,
} from "@/lib/approval-data";

type ApprovalItem = (typeof portalApprovalQueue)[number] & {
  id?: string;
  client_id?: string | null;
  project_id?: string | null;
  deliverable_id?: string | null;
  raw?: ApprovalRequestRow;
};
type ApprovalStatus = "Pending Review" | "Approved" | "Needs Revision" | "Rejected";
type DecisionType = "approve" | "revision" | "reject";
type HistoryItem = (typeof portalApprovalHistory)[number];

function displayStatus(status: string): ApprovalStatus {
  if (status === "approved") return "Approved";
  if (status === "rejected") return "Rejected";
  if (status === "needs_revision") return "Needs Revision";
  return "Pending Review";
}

function mapApprovalRequest(approval: ApprovalRequestRow): ApprovalItem {
  return {
    id: approval.id,
    client_id: approval.client_id,
    project_id: approval.project_id,
    deliverable_id: approval.deliverable_id,
    title: approval.title,
    category: approval.category ?? "Approval",
    dateSubmitted: new Date(approval.submitted_at).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
    status: displayStatus(approval.status),
    project: approval.project_id ?? "Linked project",
    description: approval.due_date
      ? `Due ${approval.due_date}. Review this item and choose approve, revision, or reject.`
      : "Review this item and choose approve, revision, or reject.",
    raw: approval,
  };
}

function mapApprovalHistory(history: ApprovalHistoryRow[]): HistoryItem[] {
  return history.map((entry) => ({
    date: new Date(entry.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
    user: entry.actor_name,
    action: displayStatus(entry.action),
    item: entry.approval_id ?? "Approval item",
  }));
}

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

function actionLabel(action: DecisionType) {
  if (action === "approve") {
    return "Approve";
  }

  if (action === "reject") {
    return "Reject";
  }

  return "Request Revision";
}

function nextStatus(action: DecisionType): ApprovalStatus {
  if (action === "approve") {
    return "Approved";
  }

  if (action === "reject") {
    return "Rejected";
  }

  return "Needs Revision";
}

export default function PortalApprovalsWorkspace({
  mode = "preview",
  approvals,
  approvalHistory,
  actorName = "Client",
}: {
  mode?: "preview" | "auth";
  approvals?: ApprovalRequestRow[];
  approvalHistory?: ApprovalHistoryRow[];
  actorName?: string | null;
}) {
  const [items, setItems] = useState<ApprovalItem[]>(
    approvals?.length ? approvals.map(mapApprovalRequest) : portalApprovalQueue,
  );
  const [history, setHistory] = useState<HistoryItem[]>(
    approvalHistory?.length
      ? mapApprovalHistory(approvalHistory)
      : portalApprovalHistory,
  );
  const [decision, setDecision] = useState<{
    action: DecisionType;
    item: ApprovalItem;
  } | null>(null);
  const [feedback, setFeedback] = useState("");

  const metrics = useMemo(
    () => [
      {
        label: "Pending Review",
        value: items.filter((item) => item.status === "Pending Review").length,
        status: "Pending Review",
      },
      {
        label: "Approved",
        value: items.filter((item) => item.status === "Approved").length,
        status: "Approved",
      },
      {
        label: "Needs Revision",
        value: items.filter((item) => item.status === "Needs Revision").length,
        status: "Needs Revision",
      },
      {
        label: "Rejected",
        value: items.filter((item) => item.status === "Rejected").length,
        status: "Rejected",
      },
    ],
    [items],
  );

  function openDecision(action: DecisionType, item: ApprovalItem) {
    setFeedback("");
    setDecision({ action, item });
  }

  async function confirmDecision() {
    if (!decision) {
      return;
    }

    const status = nextStatus(decision.action);
    const historyAction =
      decision.action === "revision" ? "Revision Requested" : status;

    if (mode === "auth" && decision.item.raw) {
      const result = await submitApprovalDecision({
        approval: decision.item.raw,
        action: decision.action,
        actorName: actorName ?? "Client",
        feedback,
      });

      if (result.error) {
        setFeedback(result.error);
        return;
      }
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.title === decision.item.title ? { ...item, status } : item,
      ),
    );

    setHistory((currentHistory) => [
      {
        date: "May 31, 2026",
        user: actorName ?? "Client",
        action: historyAction,
        item: decision.item.title,
      },
      ...currentHistory,
    ]);

    setDecision(null);
    setFeedback("");
  }

  return (
    <div className="grid gap-4">
      <section className="rounded-[1.5rem] border border-cyan-300/16 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_34%),rgba(255,255,255,0.045)] p-5 shadow-[0_0_34px_rgba(34,211,238,0.055)] backdrop-blur-xl sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
              Approval Dashboard
            </p>
            <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">
              Structured approval pipeline
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-300">
              Centralize deliverable decisions, revision feedback, and approval
              history so launch-critical work does not disappear into email
              threads.
            </p>
          </div>
          <StatusPill status="Pending Review" />
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-white/10 bg-black/24 px-4 py-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                  {metric.label}
                </p>
                <StatusPill status={metric.status} />
              </div>
              <p className="mt-3 text-3xl font-black text-white">
                {metric.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.7fr)]">
        <div className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(124,58,237,0.055)] backdrop-blur-xl sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-200">
                Approval Queue
              </p>
              <h2 className="mt-2 text-2xl font-black text-white">
                Items ready for decision
              </h2>
            </div>
            <span className="rounded-full border border-cyan-300/18 bg-cyan-400/[0.07] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-cyan-100">
              {items.length} requests
            </span>
          </div>

          <div className="mt-4 grid items-stretch gap-3 lg:grid-cols-2">
            {items.map((item) => (
              <article
                key={item.title}
                className="flex min-w-0 flex-col rounded-2xl border border-white/10 bg-black/24 p-4 transition hover:border-cyan-300/22 hover:bg-cyan-400/[0.045]"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                      {item.category}
                    </p>
                    <h3 className="mt-2 break-words text-lg font-black text-white">
                      {item.title}
                    </h3>
                  </div>
                  <StatusPill status={item.status} />
                </div>

                <p className="mt-3 text-sm leading-6 text-zinc-300">
                  {item.description}
                </p>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                      Date Submitted
                    </p>
                    <p className="mt-1 font-bold text-zinc-100">
                      {item.dateSubmitted}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                      Project
                    </p>
                    <p className="mt-1 font-bold text-zinc-100">
                      {item.project}
                    </p>
                  </div>
                </div>

                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  <button
                    type="button"
                    onClick={() => openDecision("approve", item)}
                    className="rounded-xl border border-emerald-300/24 bg-emerald-400/10 px-3 py-2 text-xs font-black text-emerald-100 transition hover:bg-emerald-400/16"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => openDecision("revision", item)}
                    className="rounded-xl border border-amber-300/24 bg-amber-400/10 px-3 py-2 text-xs font-black text-amber-100 transition hover:bg-amber-400/16"
                  >
                    Request Revision
                  </button>
                  <button
                    type="button"
                    onClick={() => openDecision("reject", item)}
                    className="rounded-xl border border-rose-300/24 bg-rose-400/10 px-3 py-2 text-xs font-black text-rose-100 transition hover:bg-rose-400/16"
                  >
                    Reject
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="grid min-w-0 content-start gap-4">
          <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(34,211,238,0.04)] backdrop-blur-xl sm:p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
              Approval History
            </p>
            <div className="mt-4 grid gap-3">
              {history.map((entry, index) => (
                <div
                  key={`${entry.item}-${entry.action}-${index}`}
                  className="relative rounded-2xl border border-white/10 bg-black/24 px-4 py-3"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-black text-white">{entry.item}</p>
                      <p className="mt-1 text-xs font-bold text-zinc-400">
                        {entry.date} / {entry.user}
                      </p>
                    </div>
                    <StatusPill status={entry.action} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[1.25rem] border border-violet-300/14 bg-violet-500/[0.06] px-4 py-4 text-sm leading-6 text-zinc-300">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-100">
              Admin Hooks
            </p>
            <p className="mt-2">
              Future Supabase structure: approval_requests for queue state,
              approval_comments for revision feedback, and approval_history for
              immutable decision events.
            </p>
            {/* Future: write decisions to approval_requests, append notes to approval_comments, and broadcast approval_history updates over Supabase realtime. */}
          </section>
        </aside>
      </section>

      {decision ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-[1.5rem] border border-white/10 bg-zinc-950/95 p-5 shadow-[0_0_60px_rgba(34,211,238,0.16)]">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
                  Confirm Decision
                </p>
                <h2 className="mt-2 text-2xl font-black text-white">
                  {actionLabel(decision.action)} {decision.item.title}
                </h2>
              </div>
              <StatusPill status={nextStatus(decision.action)} />
            </div>

            <p className="mt-3 text-sm leading-6 text-zinc-300">
              {mode === "preview"
                ? "This preview updates local portal state only."
                : "This will update the approval request, add history, and create an activity event."}
            </p>

            {decision.action === "revision" ? (
              <label className="mt-4 block">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-zinc-400">
                  Feedback / Requested Changes
                </span>
                <textarea
                  value={feedback}
                  onChange={(event) => setFeedback(event.target.value)}
                  rows={5}
                  placeholder="Describe what needs to change before this item can be approved."
                  className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-300/35 focus:bg-cyan-400/[0.04]"
                />
              </label>
            ) : null}

            <div className="mt-5 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={() => setDecision(null)}
                className="rounded-xl border border-white/10 bg-white/[0.045] px-4 py-2 text-xs font-black text-zinc-200 transition hover:border-white/20 hover:bg-white/[0.07]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void confirmDecision()}
                className="rounded-xl border border-cyan-300/26 bg-cyan-400/12 px-4 py-2 text-xs font-black text-cyan-100 transition hover:bg-cyan-400/18"
              >
                Confirm {actionLabel(decision.action)}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
