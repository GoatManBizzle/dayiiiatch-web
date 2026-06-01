"use client";

import { useMemo, useState } from "react";

import { portalConversations, statusTone } from "@/lib/portal-data";
import {
  sendPortalMessage,
  type MessageRow,
  type MessageThreadRow,
} from "@/lib/messaging-data";

type Conversation = {
  id: string;
  clientId?: string | null;
  projectId?: string | null;
  title: string;
  summary: string;
  status: string;
  lastActivity: string;
  messages: {
    id: string;
    sender: string;
    senderEmail?: string | null;
    timestamp: string;
    status: string;
    text: string;
  }[];
};

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

function mapPreviewConversations(): Conversation[] {
  return portalConversations.map((conversation) => ({
    id: conversation.title,
    title: conversation.title,
    summary: conversation.summary,
    status: conversation.status,
    lastActivity: conversation.lastActivity,
    messages: conversation.messages.map((message) => ({
      id: `${conversation.title}-${message.sender}-${message.timestamp}`,
      sender: message.sender,
      timestamp: message.timestamp,
      status: message.status,
      text: message.text,
    })),
  }));
}

function mapAuthConversations({
  threads,
  messages,
}: {
  threads: MessageThreadRow[];
  messages: MessageRow[];
}): Conversation[] {
  return threads.map((thread) => ({
    id: thread.id,
    clientId: thread.client_id,
    projectId: thread.project_id,
    title: thread.subject,
    summary: `Project thread / ${thread.status}`,
    status: thread.status === "open" ? "New" : thread.status,
    lastActivity: new Date(thread.updated_at).toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }),
    messages: messages
      .filter((message) => message.thread_id === thread.id)
      .map((message) => ({
        id: message.id,
        sender: message.sender_name,
        senderEmail: message.sender_email,
        timestamp: new Date(message.created_at).toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }),
        status: message.read_at ? "Resolved" : "New",
        text: message.body,
      })),
  }));
}

export default function PortalMessagesWorkspace({
  mode,
  clientName,
  clientEmail,
  threads,
  messages,
}: {
  mode: "preview" | "auth";
  clientName?: string | null;
  clientEmail?: string | null;
  threads: MessageThreadRow[];
  messages: MessageRow[];
}) {
  const initialConversations = useMemo(
    () =>
      mode === "preview"
        ? mapPreviewConversations()
        : mapAuthConversations({ threads, messages }),
    [messages, mode, threads],
  );
  const [conversations, setConversations] =
    useState<Conversation[]>(initialConversations);
  const [selectedId, setSelectedId] = useState(initialConversations[0]?.id ?? "");
  const [body, setBody] = useState("");
  const [notice, setNotice] = useState("");
  const selectedConversation =
    conversations.find((conversation) => conversation.id === selectedId) ??
    conversations[0];

  async function submitMessage() {
    if (!body.trim() || !selectedConversation) return;

    const messageText = body.trim();
    setBody("");
    setNotice("");

    if (mode === "preview") {
      setConversations((current) =>
        current.map((conversation) =>
          conversation.id === selectedConversation.id
            ? {
                ...conversation,
                status: "Replied",
                messages: [
                  ...conversation.messages,
                  {
                    id: `preview-${Date.now()}`,
                    sender: "Client",
                    timestamp: "Just now",
                    status: "Replied",
                    text: messageText,
                  },
                ],
              }
            : conversation,
        ),
      );
      setNotice("Preview message added locally.");
      return;
    }

    const result = await sendPortalMessage({
      threadId: selectedConversation.id,
      clientId: selectedConversation.clientId,
      projectId: selectedConversation.projectId,
      senderName: clientName ?? "Client",
      senderEmail: clientEmail,
      body: messageText,
    });

    if (result.error || !result.message) {
      setNotice(result.error ?? "Unable to send message.");
      setBody(messageText);
      return;
    }

    const sentMessage = result.message;

    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === selectedConversation.id
          ? {
              ...conversation,
              status: "Replied",
              messages: [
                ...conversation.messages,
                {
                  id: sentMessage.id,
                  sender: sentMessage.sender_name,
                  senderEmail: sentMessage.sender_email,
                  timestamp: "Just now",
                  status: "Replied",
                  text: sentMessage.body,
                },
              ],
            }
          : conversation,
      ),
    );
    setNotice("Message sent.");
  }

  if (mode === "auth" && conversations.length === 0) {
    return (
      <section className="rounded-[1.6rem] border border-cyan-300/16 bg-cyan-400/[0.055] p-5 shadow-[0_0_42px_rgba(34,211,238,0.07)] backdrop-blur-xl sm:p-6">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">
          Message Center
        </p>
        <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">
          No messages yet. Your workspace communication will appear here.
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-300">
          DAYIIIatch will use this space for project updates, revisions,
          approvals, handoff notes, and future realtime communication.
        </p>
      </section>
    );
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
      <section className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(34,211,238,0.05)] backdrop-blur-xl sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
              Conversations
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              Message Center
            </h2>
          </div>
          <span className="rounded-full border border-cyan-300/18 bg-cyan-400/[0.07] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-cyan-100">
            {conversations.length} threads
          </span>
        </div>

        <div className="mt-4 grid gap-3">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              type="button"
              onClick={() => setSelectedId(conversation.id)}
              className={`min-w-0 rounded-2xl border p-3 text-left transition ${
                conversation.id === selectedConversation?.id
                  ? "border-cyan-300/28 bg-cyan-400/[0.08] shadow-[0_0_22px_rgba(34,211,238,0.08)]"
                  : "border-white/10 bg-black/24 hover:border-violet-300/24 hover:bg-violet-500/[0.06]"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="break-words font-black text-white">
                    {conversation.title}
                  </p>
                  <p className="mt-1 text-sm leading-5 text-zinc-400">
                    {conversation.summary}
                  </p>
                </div>
                <StatusPill status={conversation.status} />
              </div>
              <p className="mt-3 text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                {conversation.lastActivity}
              </p>
            </button>
          ))}
        </div>
      </section>

      <section className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(124,58,237,0.06)] backdrop-blur-xl sm:p-5">
        {selectedConversation ? (
          <>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-200">
                  Selected Thread
                </p>
                <h2 className="mt-2 break-words text-2xl font-black text-white">
                  {selectedConversation.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {selectedConversation.summary}
                </p>
              </div>
              <StatusPill status={selectedConversation.status} />
            </div>

            <div className="mt-5 grid gap-3">
              {selectedConversation.messages.map((message) => (
                <article
                  key={message.id}
                  className="min-w-0 rounded-2xl border border-white/10 bg-black/24 p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-black text-white">{message.sender}</p>
                      <p className="mt-1 text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                        {message.timestamp}
                      </p>
                    </div>
                    <StatusPill status={message.status} />
                  </div>
                  <p className="mt-3 break-words text-sm leading-6 text-zinc-300">
                    {message.text}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-4 rounded-[1.25rem] border border-cyan-300/16 bg-cyan-400/[0.055] p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
                  Composer
                </p>
                <span className="rounded-full border border-violet-300/18 bg-violet-500/[0.08] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-violet-100">
                  Attachments soon
                </span>
              </div>
              <textarea
                rows={5}
                value={body}
                onChange={(event) => setBody(event.target.value)}
                placeholder="Write a message, update, revision note, or client-facing response..."
                className="mt-3 w-full resize-none rounded-2xl border border-white/10 bg-black/35 px-4 py-4 text-sm leading-6 text-white outline-none placeholder:text-zinc-500 focus:border-cyan-300/45"
              />
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-between">
                <button className="rounded-2xl border border-white/10 bg-white/[0.045] px-5 py-3 text-sm font-black text-zinc-200 transition hover:border-violet-300/28 hover:bg-violet-500/10 hover:text-violet-100">
                  Attach File
                </button>
                <button
                  type="button"
                  onClick={() => void submitMessage()}
                  disabled={!body.trim()}
                  className="rounded-2xl border border-cyan-300/28 bg-cyan-400/12 px-5 py-3 text-sm font-black text-cyan-100 transition hover:-translate-y-0.5 hover:bg-cyan-400/18 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Send Message
                </button>
              </div>
              {notice ? (
                <p className="mt-3 text-xs leading-5 text-zinc-400">{notice}</p>
              ) : null}
              <p className="mt-3 text-xs leading-5 text-zinc-500">
                Realtime subscriptions and attachment uploads are structured for
                the next Supabase messaging pass.
              </p>
            </div>
          </>
        ) : null}
      </section>
    </div>
  );
}
