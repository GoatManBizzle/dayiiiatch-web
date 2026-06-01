import { createActivityEvent } from "@/lib/activity-events";
import { createBrowserSupabaseClient } from "@/lib/portal-auth";
import { createClient } from "@supabase/supabase-js";

export type MessageThreadRow = {
  id: string;
  client_id: string | null;
  project_id: string | null;
  subject: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type MessageRow = {
  id: string;
  thread_id: string | null;
  sender_role: string;
  sender_name: string;
  sender_email: string | null;
  body: string;
  created_at: string;
  read_at: string | null;
};

export type MessageAttachmentRow = {
  id: string;
  message_id: string | null;
  file_name: string;
  file_type: string | null;
  storage_path: string;
  uploaded_at: string;
};

export type MessagingDataSet = {
  threads: MessageThreadRow[];
  messages: MessageRow[];
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

export async function getPortalMessagingData(
  clientId?: string | null,
): Promise<MessagingDataSet> {
  if (!clientId) {
    return { threads: [], messages: [], source: "preview" };
  }

  const supabase = getServerSupabaseClient();

  if (!supabase) {
    return {
      threads: [],
      messages: [],
      source: "preview",
      error: "Supabase environment is not configured.",
    };
  }

  try {
    const { data: threads, error: threadError } = await supabase
      .from("message_threads")
      .select("*")
      .eq("client_id", clientId)
      .order("updated_at", { ascending: false });

    if (threadError) {
      return {
        threads: [],
        messages: [],
        source: "preview",
        error: threadError.message,
      };
    }

    const threadIds = (threads ?? []).map((thread) => thread.id);

    if (threadIds.length === 0) {
      return { threads: [], messages: [], source: "supabase" };
    }

    const { data: messages, error: messageError } = await supabase
      .from("messages")
      .select("*")
      .in("thread_id", threadIds)
      .order("created_at", { ascending: true });

    return {
      threads: (threads ?? []) as MessageThreadRow[],
      messages: (messages ?? []) as MessageRow[],
      source: "supabase",
      error: messageError?.message,
    };
  } catch (error) {
    return {
      threads: [],
      messages: [],
      source: "preview",
      error: error instanceof Error ? error.message : "Messaging read failed.",
    };
  }
}

export async function sendPortalMessage({
  threadId,
  clientId,
  projectId,
  senderName,
  senderEmail,
  body,
}: {
  threadId: string;
  clientId?: string | null;
  projectId?: string | null;
  senderName: string;
  senderEmail?: string | null;
  body: string;
}) {
  const supabase = createBrowserSupabaseClient();

  if (!supabase) {
    return { message: null, error: "Supabase is not configured." };
  }

  const { data, error } = await supabase
    .from("messages")
    .insert({
      thread_id: threadId,
      sender_role: "client",
      sender_name: senderName,
      sender_email: senderEmail ?? null,
      body,
    })
    .select("*")
    .single();

  if (error) {
    return {
      message: null,
      error: error.message,
    };
  }

  await createActivityEvent({
    clientId,
    projectId,
    actorRole: "client",
    actorName: senderName,
    eventType: "message_sent",
    title: "Message sent",
    description: "Client sent a workspace message.",
    metadata: {
      thread_id: threadId,
      sender_email: senderEmail,
    },
  });

  return {
    message: (data as MessageRow | null) ?? null,
    error: null,
  };
}

// Future realtime: createBrowserSupabaseClient()
//   ?.channel(`messages:${threadId}`)
//   .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, handler)
//   .subscribe();
