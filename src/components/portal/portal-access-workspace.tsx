"use client";

import { useState } from "react";
import Link from "next/link";

type AccessTab = "sign-in" | "request-access";

const projectTypes = [
  "Website System Build",
  "Brand Presence Upgrade",
  "Automation Support",
  "Booking / Scheduler",
  "Ongoing Growth Support",
];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-cyan-300/45";

export default function PortalAccessWorkspace() {
  const [activeTab, setActiveTab] = useState<AccessTab>("sign-in");
  const [requestSent, setRequestSent] = useState(false);
  const [signInValues, setSignInValues] = useState({
    email: "",
    password: "",
  });
  const [requestValues, setRequestValues] = useState({
    name: "",
    email: "",
    company: "",
    projectType: projectTypes[0],
    message: "",
  });

  function enterPreviewWorkspace() {
    // Future: replace local session handoff with Supabase Auth, user_accounts, and workspace_members lookup.
    window.localStorage.setItem("dayiiiatch-portal-session", "preview");
    window.location.assign("/portal/dashboard");
  }

  function signIn() {
    if (!signInValues.email || !signInValues.password) return;
    enterPreviewWorkspace();
  }

  function submitRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Future: insert into access_requests and notify DAYIIIatch admin review queue.
    setRequestSent(true);
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,0.9fr)_minmax(24rem,1.1fr)] xl:items-stretch">
      <section className="relative min-w-0 overflow-hidden rounded-[1.6rem] border border-cyan-300/18 bg-cyan-400/[0.055] p-4 shadow-[0_0_46px_rgba(34,211,238,0.09)] backdrop-blur-xl sm:p-6">
        <div className="absolute right-8 top-8 h-24 w-24 rounded-full border border-cyan-300/20 bg-cyan-400/10 blur-xl motion-safe:animate-pulse" />
        <div className="relative">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
            DAYIIIatch Workspace OS
          </p>
          <h1 className="mt-3 break-words text-3xl font-black leading-tight text-white sm:text-5xl">
            Client Login
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-300">
            Enter the protected client workspace for project visibility,
            approvals, deliverables, meetings, invoices, and Damarko-assisted
            operational guidance.
          </p>
        </div>

        <div className="relative mt-6 grid gap-3 sm:grid-cols-3">
          {[
            ["Workspace", "Private portal"],
            ["Mode", "Preview-ready"],
            ["Access", "Client reviewed"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-black/24 px-3 py-3"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                {label}
              </p>
              <p className="mt-1 font-black text-zinc-100">{value}</p>
            </div>
          ))}
        </div>

        <div className="relative mt-6 rounded-[1.25rem] border border-violet-300/14 bg-violet-500/[0.06] p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-100">
            Admin Hooks Ready
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {["access_requests", "user_accounts", "workspace_members"].map(
              (hook) => (
                <div
                  key={hook}
                  className="rounded-2xl border border-white/10 bg-black/24 px-3 py-3 text-sm font-bold text-zinc-200"
                >
                  {hook}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="min-w-0 rounded-[1.6rem] border border-white/10 bg-zinc-950/76 p-4 shadow-[0_0_54px_rgba(124,58,237,0.1)] backdrop-blur-xl sm:p-6">
        <div className="grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-black/24 p-1">
          {[
            ["sign-in", "Sign In"],
            ["request-access", "Request Access"],
          ].map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                setActiveTab(key as AccessTab);
                setRequestSent(false);
              }}
              className={`rounded-xl px-4 py-3 text-sm font-black transition ${
                activeTab === key
                  ? "border border-cyan-300/28 bg-cyan-400/12 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.1)]"
                  : "text-zinc-400 hover:bg-white/[0.045] hover:text-zinc-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === "sign-in" ? (
          <form className="mt-5 grid gap-4" onSubmit={(event) => event.preventDefault()}>
            <Field label="Email">
              <input
                type="email"
                value={signInValues.email}
                onChange={(event) =>
                  setSignInValues((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
                placeholder="client@example.com"
                className={inputClass}
              />
            </Field>

            <Field label="Password">
              <input
                type="password"
                value={signInValues.password}
                onChange={(event) =>
                  setSignInValues((current) => ({
                    ...current,
                    password: event.target.value,
                  }))
                }
                placeholder="Enter password"
                className={inputClass}
              />
            </Field>

            <div className="grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={signIn}
                disabled={!signInValues.email || !signInValues.password}
                className="rounded-2xl border border-cyan-300/28 bg-cyan-400/12 px-5 py-3 text-sm font-black text-cyan-100 transition hover:-translate-y-0.5 hover:bg-cyan-400/18 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/[0.035] disabled:text-zinc-600"
              >
                Sign In
              </button>
              <button
                type="button"
                className="rounded-2xl border border-white/10 bg-white/[0.045] px-5 py-3 text-sm font-black text-zinc-300 transition hover:border-violet-300/28 hover:bg-violet-500/10 hover:text-violet-100"
              >
                Forgot Password
              </button>
            </div>

            <p className="rounded-2xl border border-white/10 bg-black/24 px-4 py-3 text-xs leading-5 text-zinc-500">
              Placeholder auth only. Production sign-in should validate through
              Supabase Auth, server sessions, and workspace membership checks.
              For now, successful sign-in enters Preview Mode.
            </p>
          </form>
        ) : null}

        {activeTab === "request-access" ? (
          requestSent ? (
            <div className="mt-5 rounded-[1.25rem] border border-emerald-300/20 bg-emerald-400/[0.08] p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-100">
                Workspace access request received.
              </p>
              <h2 className="mt-3 text-2xl font-black text-white">
                DAYIIIatch will review your workspace request.
              </h2>
              <p className="mt-3 text-sm leading-6 text-zinc-300">
                Next step: we will confirm the workspace owner, project scope,
                and access level before sending sign-in instructions.
              </p>
              <button
                type="button"
                onClick={() => setRequestSent(false)}
                className="mt-5 rounded-2xl border border-emerald-300/24 bg-emerald-400/10 px-5 py-3 text-sm font-black text-emerald-100 transition hover:-translate-y-0.5 hover:bg-emerald-400/16"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form className="mt-5 grid gap-4" onSubmit={submitRequest}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name">
                  <input
                    value={requestValues.name}
                    onChange={(event) =>
                      setRequestValues((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    placeholder="Your name"
                    className={inputClass}
                  />
                </Field>
                <Field label="Email">
                  <input
                    type="email"
                    value={requestValues.email}
                    onChange={(event) =>
                      setRequestValues((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                    placeholder="you@company.com"
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Company">
                  <input
                    value={requestValues.company}
                    onChange={(event) =>
                      setRequestValues((current) => ({
                        ...current,
                        company: event.target.value,
                      }))
                    }
                    placeholder="Company name"
                    className={inputClass}
                  />
                </Field>
                <Field label="Project Type">
                  <select
                    value={requestValues.projectType}
                    onChange={(event) =>
                      setRequestValues((current) => ({
                        ...current,
                        projectType: event.target.value,
                      }))
                    }
                    className={inputClass}
                  >
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Message">
                <textarea
                  value={requestValues.message}
                  onChange={(event) =>
                    setRequestValues((current) => ({
                      ...current,
                      message: event.target.value,
                    }))
                  }
                  placeholder="Tell us what workspace access should cover."
                  rows={5}
                  className={`${inputClass} resize-none`}
                />
              </Field>

              <button
                type="submit"
                disabled={
                  !requestValues.name ||
                  !requestValues.email ||
                  !requestValues.company
                }
                className="rounded-2xl border border-cyan-300/28 bg-cyan-400/12 px-5 py-3 text-sm font-black text-cyan-100 transition hover:-translate-y-0.5 hover:bg-cyan-400/18 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/[0.035] disabled:text-zinc-600"
              >
                Request Workspace Access
              </button>
            </form>
          )
        ) : null}

        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href="/"
            className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-sm font-bold text-zinc-100 transition hover:border-cyan-300/28 hover:bg-white/10"
          >
            Return to Site
          </Link>
          <button
            type="button"
            onClick={enterPreviewWorkspace}
            className="rounded-2xl border border-violet-300/24 bg-violet-500/10 px-4 py-3 text-sm font-bold text-violet-100 transition hover:bg-violet-500/16"
          >
            Preview Mode
          </button>
        </div>
      </section>
    </div>
  );
}
