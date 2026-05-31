"use client";

import { useState } from "react";

import {
  portalConciergeInsights,
  portalConciergeQuestions,
  statusTone,
} from "@/lib/portal-data";

type ConciergeQuestion = (typeof portalConciergeQuestions)[number];

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

function AnswerPanel({ question }: { question: ConciergeQuestion }) {
  return (
    <section className="min-w-0 rounded-[1.5rem] border border-cyan-300/16 bg-cyan-400/[0.055] p-4 shadow-[0_0_34px_rgba(34,211,238,0.07)] backdrop-blur-xl sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
            Concierge Response
          </p>
          <h2 className="mt-2 break-words text-2xl font-black text-white">
            {question.answer.headline}
          </h2>
        </div>
        <StatusPill status={question.status} />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {question.answer.rows.map(([label, value], index) => (
          <div
            key={`${question.title}-${label}-${index}`}
            className="rounded-2xl border border-white/10 bg-black/24 px-3 py-3"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
              {label}
            </p>
            <p className="mt-1 break-words font-black text-zinc-100">
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-2">
        {question.answer.notes.map((note) => (
          <p
            key={note}
            className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm leading-6 text-zinc-300"
          >
            {note}
          </p>
        ))}
      </div>
    </section>
  );
}

export default function PortalConciergeWorkspace() {
  const [selectedQuestion, setSelectedQuestion] = useState(
    portalConciergeQuestions[0],
  );

  return (
    <div className="grid gap-4">
      <section className="grid gap-4 xl:grid-cols-12">
        <div className="relative min-w-0 overflow-hidden rounded-[1.5rem] border border-cyan-300/18 bg-cyan-400/[0.055] p-4 shadow-[0_0_40px_rgba(34,211,238,0.08)] backdrop-blur-xl sm:p-6 xl:col-span-7">
          <div className="absolute right-6 top-6 h-20 w-20 rounded-full border border-cyan-300/20 bg-cyan-400/10 blur-xl motion-safe:animate-pulse" />
          <div className="relative flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">
                AI Assistant Layer
              </p>
              <h1 className="mt-2 break-words text-3xl font-black text-white sm:text-4xl">
                Damarko Concierge
              </h1>
              <p className="mt-2 text-lg font-bold text-violet-100">
                Your project intelligence assistant.
              </p>
            </div>
            <StatusPill status="Active" />
          </div>

          <p className="relative mt-5 max-w-3xl text-sm leading-6 text-zinc-300">
            Need help understanding where your project stands? I&apos;m here to
            guide you through the next steps, surface missing assets, explain
            approvals, and keep launch readiness visible.
          </p>

          <div className="relative mt-5 rounded-[1.25rem] border border-white/10 bg-black/24 p-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
              Project Awareness
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-300">
              Damarko is reading from preview-safe portal data today: projects,
              approvals, onboarding assets, bookings, invoices, and milestone
              progress. Future responses can be generated from live project
              records.
            </p>
          </div>
        </div>

        <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:col-span-5">
          {portalConciergeInsights.map((insight) => (
            <article
              key={insight.label}
              className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 shadow-[0_0_24px_rgba(124,58,237,0.04)]"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                  {insight.label}
                </p>
                <StatusPill status={insight.status} />
              </div>
              <p className="mt-3 text-2xl font-black text-white">
                {insight.value}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-12">
        <div className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(124,58,237,0.06)] backdrop-blur-xl sm:p-5 xl:col-span-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-200">
                Quick Questions
              </p>
              <h2 className="mt-2 text-2xl font-black text-white">
                Ask the workspace
              </h2>
            </div>
            <span className="rounded-full border border-violet-300/18 bg-violet-500/[0.08] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-violet-100">
              {portalConciergeQuestions.length} prompts
            </span>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
            {portalConciergeQuestions.map((question) => {
              const active = question.title === selectedQuestion.title;

              return (
                <button
                  key={question.title}
                  type="button"
                  onClick={() => setSelectedQuestion(question)}
                  className={`min-w-0 rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${
                    active
                      ? "border-cyan-300/30 bg-cyan-400/[0.08] shadow-[0_0_24px_rgba(34,211,238,0.1)]"
                      : "border-white/10 bg-black/24 hover:border-violet-300/24 hover:bg-violet-500/[0.06]"
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="break-words font-black text-white">
                      {question.title}
                    </h3>
                    <StatusPill status={question.status} />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">
                    {question.summary}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid min-w-0 content-start gap-4 xl:col-span-7">
          <AnswerPanel question={selectedQuestion} />

          <section className="rounded-[1.25rem] border border-cyan-300/14 bg-cyan-400/[0.06] px-4 py-3 text-xs leading-5 text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.04)]">
            Future Damarko hooks: project summaries, milestone summaries, AI
            recommendations, portal knowledge base retrieval, Supabase project
            data, and real Damarko integration with client-safe permissions.
          </section>

          {/* Future: replace static responses with project-aware AI summaries from Supabase records and a guarded portal knowledge base. */}
        </div>
      </section>
    </div>
  );
}
