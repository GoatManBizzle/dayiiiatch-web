import { createClient } from "@supabase/supabase-js";

import { createActivityEvent } from "@/lib/activity-events";
import { createBrowserSupabaseClient } from "@/lib/portal-auth";

export type ApprovalRequestRow = {
  id: string;
  client_id: string | null;
  project_id: string | null;
  deliverable_id: string | null;
  title: string;
  category: string | null;
  status: string;
  due_date: string | null;
  submitted_at: string;
  decided_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ApprovalCommentRow = {
  id: string;
  approval_id: string | null;
  commenter_role: string;
  commenter_name: string;
  comment: string;
  created_at: string;
};

export type ApprovalHistoryRow = {
  id: string;
  approval_id: string | null;
  action: string;
  actor_role: string;
  actor_name: string;
  created_at: string;
};

export type ApprovalDataSet = {
  approvals: ApprovalRequestRow[];
  comments: ApprovalCommentRow[];
  history: ApprovalHistoryRow[];
  source: "supabase" | "preview";
  error?: string;
};

function getServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    },
  });
}

export async function getPortalApprovalData(
  clientId?: string | null,
): Promise<ApprovalDataSet> {
  if (!clientId) {
    return { approvals: [], comments: [], history: [], source: "preview" };
  }

  const supabase = getServerSupabaseClient();

  if (!supabase) {
    return {
      approvals: [],
      comments: [],
      history: [],
      source: "preview",
      error: "Supabase environment is not configured.",
    };
  }

  try {
    const { data: approvals, error: approvalsError } = await supabase
      .from("approval_requests")
      .select("*")
      .eq("client_id", clientId)
      .order("submitted_at", { ascending: false });

    if (approvalsError) {
      return {
        approvals: [],
        comments: [],
        history: [],
        source: "preview",
        error: approvalsError.message,
      };
    }

    const approvalIds = (approvals ?? []).map((approval) => approval.id);

    if (approvalIds.length === 0) {
      return { approvals: [], comments: [], history: [], source: "supabase" };
    }

    const [comments, history] = await Promise.all([
      supabase
        .from("approval_comments")
        .select("*")
        .in("approval_id", approvalIds)
        .order("created_at", { ascending: false }),
      supabase
        .from("approval_history")
        .select("*")
        .in("approval_id", approvalIds)
        .order("created_at", { ascending: false }),
    ]);

    return {
      approvals: (approvals ?? []) as ApprovalRequestRow[],
      comments: (comments.data ?? []) as ApprovalCommentRow[],
      history: (history.data ?? []) as ApprovalHistoryRow[],
      source: "supabase",
      error: comments.error?.message ?? history.error?.message,
    };
  } catch (error) {
    return {
      approvals: [],
      comments: [],
      history: [],
      source: "preview",
      error: error instanceof Error ? error.message : "Approval read failed.",
    };
  }
}

function statusForAction(action: "approve" | "revision" | "reject") {
  if (action === "approve") return "approved";
  if (action === "reject") return "rejected";
  return "needs_revision";
}

function activityTypeForAction(action: "approve" | "revision" | "reject") {
  if (action === "approve") return "approval_approved";
  if (action === "reject") return "approval_rejected";
  return "revision_requested";
}

export async function submitApprovalDecision({
  approval,
  action,
  actorName,
  feedback,
}: {
  approval: ApprovalRequestRow;
  action: "approve" | "revision" | "reject";
  actorName: string;
  feedback?: string;
}) {
  const supabase = createBrowserSupabaseClient();

  if (!supabase) {
    return { error: "Supabase is not configured." };
  }

  const status = statusForAction(action);
  const now = new Date().toISOString();

  const { error: updateError } = await supabase
    .from("approval_requests")
    .update({
      status,
      decided_at: action === "revision" ? null : now,
      updated_at: now,
    })
    .eq("id", approval.id);

  if (updateError) {
    return { error: updateError.message };
  }

  if (action === "revision" && feedback?.trim()) {
    const { error: commentError } = await supabase
      .from("approval_comments")
      .insert({
        approval_id: approval.id,
        commenter_role: "client",
        commenter_name: actorName,
        comment: feedback.trim(),
      });

    if (commentError) {
      return { error: commentError.message };
    }
  }

  const { error: historyError } = await supabase.from("approval_history").insert({
    approval_id: approval.id,
    action: status,
    actor_role: "client",
    actor_name: actorName,
  });

  if (historyError) {
    return { error: historyError.message };
  }

  const activityResult = await createActivityEvent({
    clientId: approval.client_id,
    projectId: approval.project_id,
    actorRole: "client",
    actorName,
    eventType: activityTypeForAction(action),
    title: approval.title,
    description:
      action === "revision"
        ? "Client requested revisions on an approval item."
        : action === "approve"
          ? "Client approved an approval item."
          : "Client rejected an approval item.",
    metadata: {
      approval_id: approval.id,
      status,
    },
  });

  return { error: activityResult.error };
}
