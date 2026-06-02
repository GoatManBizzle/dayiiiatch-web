"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { setupPortalPassword } from "@/lib/portal-auth";

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-cyan-300/45";

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

export default function PortalPasswordSetupWorkspace() {
  const searchParams = useSearchParams();
  const invitedEmail = useMemo(
    () => searchParams.get("email")?.trim().toLowerCase() ?? "",
    [searchParams],
  );
  const inviteToken = searchParams.get("token") ?? "";
  const [email, setEmail] = useState(invitedEmail);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  async function submitSetup() {
    setMessage("");
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("Email, new password, and confirmation are required.");
      return;
    }

    if (password.length < 8) {
      setError("Use at least 8 characters for your workspace password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password confirmation does not match.");
      return;
    }

    setIsSubmitting(true);

    const result = await setupPortalPassword({ email, password });

    setIsSubmitting(false);

    if (!result.success) {
      setError(
        result.error
          ? "Password setup could not be completed. Please request a fresh workspace invite."
          : result.message,
      );
      return;
    }

    setIsComplete(true);
    setMessage(
      result.mode === "preview"
        ? "Workspace password setup preview complete."
        : result.message,
    );
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,0.95fr)_minmax(24rem,1.05fr)] xl:items-stretch">
      <section className="relative min-w-0 overflow-hidden rounded-[1.6rem] border border-cyan-300/18 bg-cyan-400/[0.055] p-4 shadow-[0_0_46px_rgba(34,211,238,0.09)] backdrop-blur-xl sm:p-6">
        <div className="absolute right-8 top-8 h-24 w-24 rounded-full border border-cyan-300/20 bg-cyan-400/10 blur-xl motion-safe:animate-pulse" />
        <div className="relative">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
            DAYIIIatch Workspace OS
          </p>
          <h1 className="mt-3 break-words text-3xl font-black leading-tight text-white sm:text-5xl">
            Set Up Workspace Password
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-300">
            Create your client workspace password so you can track project
            progress, upload assets, review deliverables, request revisions,
            and view bookings or invoices.
          </p>
        </div>

        <div className="relative mt-6 grid gap-3 sm:grid-cols-3">
          {[
            ["Invite", inviteToken ? "Token detected" : "Email link"],
            ["Auth", "Supabase ready"],
            ["Access", "Client login"],
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
            Security Prep
          </p>
          <p className="mt-3 text-sm leading-6 text-zinc-300">
            Future production flow should validate a secure invite token,
            enforce expiration, mark tokens one-time-use, and use Supabase Auth
            invite/password reset flows instead of email-only setup links.
          </p>
        </div>
      </section>

      <section className="min-w-0 rounded-[1.6rem] border border-white/10 bg-zinc-950/76 p-4 shadow-[0_0_54px_rgba(124,58,237,0.1)] backdrop-blur-xl sm:p-6">
        {isComplete ? (
          <div className="rounded-[1.25rem] border border-emerald-300/20 bg-emerald-400/[0.08] p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-100">
              Password Setup Complete
            </p>
            <h2 className="mt-3 text-2xl font-black text-white">
              {message}
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-300">
              You can now return to the Client Login screen and sign in with
              your workspace email and password.
            </p>
            <Link
              href="/portal/access"
              className="mt-5 inline-flex rounded-2xl border border-cyan-300/28 bg-cyan-400/12 px-5 py-3 text-sm font-black text-cyan-100 transition hover:-translate-y-0.5 hover:bg-cyan-400/18"
            >
              Go to Client Login
            </Link>
          </div>
        ) : (
          <form className="grid gap-4" onSubmit={(event) => event.preventDefault()}>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
                Workspace Access
              </p>
              <h2 className="mt-2 text-2xl font-black text-white">
                Create Workspace Password
              </h2>
            </div>

            <Field label="Email">
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="client@example.com"
                className={inputClass}
              />
            </Field>

            <Field label="New Password">
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Create password"
                className={inputClass}
              />
            </Field>

            <Field label="Confirm Password">
              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Confirm password"
                className={inputClass}
              />
            </Field>

            {error ? (
              <p className="rounded-2xl border border-rose-300/20 bg-rose-400/[0.08] px-4 py-3 text-xs leading-5 text-rose-100">
                {error}
              </p>
            ) : null}

            <div className="grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => void submitSetup()}
                disabled={isSubmitting}
                className="rounded-2xl border border-cyan-300/28 bg-cyan-400/12 px-5 py-3 text-sm font-black text-cyan-100 transition hover:-translate-y-0.5 hover:bg-cyan-400/18 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/[0.035] disabled:text-zinc-600"
              >
                {isSubmitting
                  ? "Creating Password..."
                  : "Create Workspace Password"}
              </button>
              <Link
                href="/portal/access"
                className="rounded-2xl border border-white/10 bg-white/[0.045] px-5 py-3 text-center text-sm font-black text-zinc-300 transition hover:border-violet-300/28 hover:bg-violet-500/10 hover:text-violet-100"
              >
                Return to Login
              </Link>
            </div>

            <p className="rounded-2xl border border-white/10 bg-black/24 px-4 py-3 text-xs leading-5 text-zinc-500">
              Current setup uses Supabase Auth when available. If Auth is not
              configured, this screen completes in safe preview mode without
              creating a real password.
            </p>
          </form>
        )}
      </section>
    </div>
  );
}
