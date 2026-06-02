"use client";

import { FormEvent, useState } from "react";

import { links } from "@/config/links";
import { normalizeLeadSource, type LeadSource } from "@/lib/growth-ops";

type SubmitState = "idle" | "loading" | "success" | "error";

const checklistPdf = "/downloads/dayiiiatch-audit-checklist.pdf";

export default function LeadCaptureSection() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
  });
  const [leadSource] = useState<LeadSource>(() => {
    if (typeof window === "undefined") return "Direct";
    return normalizeLeadSource(
      new URLSearchParams(window.location.search).get("source"),
    );
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitState === "loading") return;

    setSubmitState("loading");
    setMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formValues.name,
          email: formValues.email,
          source: leadSource,
          interest: "audit-checklist",
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || "Unable to send checklist request.");
      }

      setSubmitState("success");
      setMessage(
        data?.message ||
          (data?.email?.sent
            ? "Checklist request received. Check your email."
            : "Checklist request saved, but email delivery failed."),
      );
      setFormValues({ name: "", email: "" });
    } catch (error) {
      setSubmitState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to send checklist request.",
      );
    }
  }

  function withSource(href: string) {
    if (href.startsWith("#")) return href;
    const separator = href.includes("?") ? "&" : "?";
    return `${href}${separator}source=${encodeURIComponent(leadSource)}`;
  }

  return (
    <section
      id="checklist-capture"
      data-style-section="audit"
      className="relative mt-10 overflow-hidden rounded-[1.5rem] border border-cyan-300/12 bg-white/[0.035] p-4 shadow-[0_0_46px_rgba(34,211,238,0.06)] backdrop-blur-xl sm:rounded-[2rem] sm:p-6 md:mt-16 md:p-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(34,211,238,0.13),transparent_32%),radial-gradient(circle_at_88%_18%,rgba(168,85,247,0.12),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.035),transparent_44%)]" />
      <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/45 to-transparent" />

      <div className="relative z-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-200 sm:text-sm sm:tracking-[0.25em]">
            Not ready to book?
          </p>

          <h3 className="mt-2 text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl">
            Get a Free Website / Workflow Audit Checklist
          </h3>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-300">
            Drop your email and we will queue up the checklist path for
            cleaner pages, stronger workflows, and better next-step clarity.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[1.35rem] border border-white/10 bg-zinc-950/62 p-3.5 shadow-[0_0_30px_rgba(34,211,238,0.04)] backdrop-blur-xl sm:rounded-[1.8rem] sm:p-5"
        >
          <div className="grid gap-3 md:grid-cols-[0.85fr_1fr]">
            <input
              value={formValues.name}
              onChange={(event) =>
                setFormValues((current) => ({
                  ...current,
                  name: event.target.value,
                }))
              }
              placeholder="Name optional"
              disabled={submitState === "loading"}
              className="min-h-12 rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-base text-white outline-none transition focus:border-cyan-400/50 focus:shadow-[0_0_22px_rgba(34,211,238,0.10)] disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
            />

            <input
              required
              type="email"
              value={formValues.email}
              onChange={(event) =>
                setFormValues((current) => ({
                  ...current,
                  email: event.target.value,
                }))
              }
              placeholder="Email address"
              disabled={submitState === "loading"}
              className="min-h-12 rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-base text-white outline-none transition focus:border-cyan-400/50 focus:shadow-[0_0_22px_rgba(34,211,238,0.10)] disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
            />
          </div>

          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={submitState === "loading"}
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-cyan-400/30 bg-gradient-to-r from-cyan-400/16 to-violet-500/16 px-5 py-3 text-center text-sm font-bold text-cyan-100 transition duration-300 hover:scale-[1.01] hover:border-cyan-300/50 hover:shadow-[0_0_28px_rgba(34,211,238,0.16)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitState === "loading"
                ? "Sending..."
                : "Send Checklist Request"}
            </button>

            <p className="text-xs leading-5 text-zinc-500">
              Source: {leadSource} / Interest: audit-checklist
            </p>
          </div>

          {submitState === "success" && message && (
            <div className="mt-4 rounded-[1.35rem] border border-emerald-300/25 bg-emerald-400/10 p-4 text-sm text-emerald-100 shadow-[0_0_30px_rgba(16,185,129,0.09)] backdrop-blur-xl">
              <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
                <p className="w-full text-base font-black leading-6 text-emerald-50">
                  {message}
                </p>

                <div className="grid w-full max-w-sm gap-2 sm:w-auto sm:max-w-none sm:grid-cols-3">
                  <a
                    href={checklistPdf}
                    download
                    data-lead-source="homepage"
                    data-growth-source={leadSource}
                    data-growth-event="pdf-download"
                    data-download-trigger="audit-checklist-success"
                    data-cta-type="download-checklist-pdf"
                    className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/20 bg-white px-3.5 py-2.5 text-center text-[11px] font-black text-zinc-950 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_26px_rgba(255,255,255,0.16)] active:scale-[0.98] sm:min-w-[150px]"
                  >
                    Download Checklist
                  </a>

                  <a
                    href={withSource(links.freeCall)}
                    data-lead-source="homepage"
                    data-growth-source={leadSource}
                    data-growth-event="cta-click"
                    data-download-trigger="audit-checklist-success"
                    data-cta-type="book-free-call"
                    className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-400/12 px-3.5 py-2.5 text-center text-[11px] font-black text-cyan-100 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_26px_rgba(34,211,238,0.18)] active:scale-[0.98] sm:min-w-[138px]"
                  >
                    Book Free Call
                  </a>

                  <a
                    href={withSource(links.premiumSession)}
                    data-lead-source="homepage"
                    data-growth-source={leadSource}
                    data-growth-event="cta-click"
                    data-download-trigger="audit-checklist-success"
                    data-cta-type="book-premium-session"
                    className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-violet-300/30 bg-violet-500/12 px-3.5 py-2.5 text-center text-[11px] font-black text-violet-100 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_26px_rgba(168,85,247,0.18)] active:scale-[0.98] sm:min-w-[138px]"
                  >
                    Premium Session
                  </a>
                </div>

                <p className="w-full text-xs leading-5 text-emerald-100/75">
                  The PDF is ready now, and the booking paths are here when you
                  want a guided next step.
                </p>
              </div>
            </div>
          )}

          {submitState === "error" && message && (
            <div className="mt-4 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
              {message}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
