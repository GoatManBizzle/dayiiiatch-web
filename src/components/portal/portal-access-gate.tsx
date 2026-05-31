"use client";

import { useEffect, useState } from "react";

import SiteShell from "@/components/layout/site-shell";
import PortalShell from "@/components/portal/portal-shell";

type PortalAccessGateProps = {
  children: React.ReactNode;
};

type PortalSessionMode = "client" | "preview";

const PORTAL_SESSION_KEY = "dayiiiatch-portal-session";

function readPortalSession(): PortalSessionMode | null {
  try {
    const stored = window.localStorage.getItem(PORTAL_SESSION_KEY);

    if (stored === "client" || stored === "preview") {
      return stored;
    }
  } catch {
    return null;
  }

  return null;
}

export default function PortalAccessGate({ children }: PortalAccessGateProps) {
  const [mounted, setMounted] = useState(false);
  const [sessionMode, setSessionMode] = useState<PortalSessionMode | null>(
    null,
  );
  const [email, setEmail] = useState("");
  const [accessCode, setAccessCode] = useState("");

  useEffect(() => {
    setSessionMode(readPortalSession());
    setMounted(true);
  }, []);

  function saveSession(nextMode: PortalSessionMode) {
    // Future: replace this local preview/session handoff with Supabase Auth and a project membership lookup.
    window.localStorage.setItem(PORTAL_SESSION_KEY, nextMode);
    setSessionMode(nextMode);
  }

  if (!mounted) {
    return (
      <SiteShell fixedMainBackground compactMobileSpacing>
        <div className="min-h-[55vh] rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_34px_rgba(34,211,238,0.06)] backdrop-blur-xl" />
      </SiteShell>
    );
  }

  if (!sessionMode) {
    return (
      <SiteShell fixedMainBackground compactMobileSpacing>
        <main className="grid min-h-[70vh] place-items-center">
          <section className="w-full max-w-2xl rounded-[1.5rem] border border-white/10 bg-zinc-950/76 p-4 shadow-[0_0_54px_rgba(34,211,238,0.1)] backdrop-blur-xl sm:p-6">
            <div className="rounded-[1.25rem] border border-cyan-300/16 bg-cyan-400/[0.055] p-5">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
                  Client Portal Access
                </p>
                <span className="rounded-full border border-violet-300/24 bg-violet-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-violet-100">
                  Preview Safe
                </span>
              </div>
              <h1 className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl">
                Enter the DAYIIIatch workspace
              </h1>
              <p className="mt-3 text-sm leading-6 text-zinc-300">
                Use client access details when available, or open the preview
                demo while auth and project permissions are being wired.
              </p>
            </div>

            <div className="mt-4 grid gap-3">
              <label className="grid gap-2">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
                  Email
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="client@example.com"
                  className="w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-cyan-300/45"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
                  Access Code
                </span>
                <input
                  type="password"
                  value={accessCode}
                  onChange={(event) => setAccessCode(event.target.value)}
                  placeholder="Enter access code"
                  className="w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-cyan-300/45"
                />
              </label>
            </div>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => saveSession("client")}
                disabled={!email || !accessCode}
                className="rounded-2xl border border-cyan-300/28 bg-cyan-400/12 px-5 py-3 text-sm font-black text-cyan-100 transition hover:-translate-y-0.5 hover:bg-cyan-400/18 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/[0.035] disabled:text-zinc-600"
              >
                Continue
              </button>
              <button
                type="button"
                onClick={() => saveSession("preview")}
                className="rounded-2xl border border-violet-300/24 bg-violet-500/10 px-5 py-3 text-sm font-black text-violet-100 transition hover:-translate-y-0.5 hover:bg-violet-500/16"
              >
                Preview Mode
              </button>
            </div>

            <p className="mt-4 rounded-2xl border border-white/10 bg-black/24 px-4 py-3 text-xs leading-5 text-zinc-500">
              Demo gate only. Supabase Auth, server-side sessions, client
              project membership, and row-level permissions can replace this
              local preview state before production launch.
            </p>
          </section>
        </main>
      </SiteShell>
    );
  }

  return (
    <PortalShell sessionMode={sessionMode}>
      {children}
    </PortalShell>
  );
}
