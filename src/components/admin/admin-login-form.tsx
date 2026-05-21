"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || "Invalid admin password.");
      }

      setPassword("");
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Invalid admin password.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-white/[0.04] p-6 text-white shadow-[0_0_60px_rgba(34,211,238,0.12)] backdrop-blur-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-violet-500/10" />

      <div className="relative">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-200">
          DAYIIIatch Admin
        </p>
        <h1 className="mt-3 text-3xl font-black">Unlock Dashboard</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Enter the local admin password to view booking requests, exports, and
          client details.
        </p>

        <label className="mt-6 block">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
            Password
          </span>
          <input
            required
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/50"
          />
        </label>

        {errorMessage && (
          <div className="mt-4 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-100">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-5 w-full rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-cyan-100 transition hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Unlocking..." : "Unlock Admin Dashboard"}
        </button>
      </div>
    </form>
  );
}
