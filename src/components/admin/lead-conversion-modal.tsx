"use client";

import { useMemo, useState } from "react";

export type LeadConversionTarget = {
  name: string;
  email: string;
  company?: string;
  serviceInterest: string;
  source?: string;
};

const projectStages = [
  "Discovery",
  "Strategy",
  "Build",
  "Review",
  "Launch",
  "Optimization",
];

export default function LeadConversionModal({
  lead,
  onClose,
  onConverted,
}: {
  lead: LeadConversionTarget;
  onClose: () => void;
  onConverted: (
    email: string,
    portalEnabled: boolean,
    inviteStatus: "Portal Ready" | "Invite Sent" | "Invite Failed" | "Not Requested",
  ) => void;
}) {
  const defaultProjectName = useMemo(
    () => `${lead.serviceInterest || "Client"} Project`,
    [lead.serviceInterest],
  );
  const [clientName, setClientName] = useState(lead.name);
  const [email, setEmail] = useState(lead.email);
  const [company, setCompany] = useState(lead.company ?? "");
  const [serviceInterest, setServiceInterest] = useState(lead.serviceInterest);
  const [starterProjectName, setStarterProjectName] =
    useState(defaultProjectName);
  const [projectType, setProjectType] = useState(lead.serviceInterest);
  const [initialPhase, setInitialPhase] = useState("Discovery");
  const [portalAccess, setPortalAccess] = useState(true);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitConversion() {
    if (!clientName.trim() || !email.trim() || !starterProjectName.trim()) {
      setMessage("Client name, email, and starter project are required.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    const response = await fetch("/api/admin/convert-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientName,
        email,
        company,
        serviceInterest,
        starterProjectName,
        projectType,
        initialPhase,
        portalAccess,
        source: lead.source,
      }),
    });
    const result = (await response.json().catch(() => null)) as {
      success?: boolean;
      mode?: "supabase" | "simulated";
      inviteStatus?: "Portal Ready" | "Invite Sent" | "Invite Failed" | "Not Requested";
      inviteError?: string | null;
      error?: string;
      message?: string;
    } | null;

    setIsSubmitting(false);

    if (!response.ok || !result?.success) {
      setMessage(result?.error ?? "Lead conversion failed.");
      return;
    }

    const inviteStatus =
      result.inviteStatus ?? (portalAccess ? "Portal Ready" : "Not Requested");

    onConverted(email, portalAccess, inviteStatus);
    setMessage(
      result.inviteError
        ? `${result.message ?? "Lead converted."} Invite diagnostic: ${
            result.inviteError
          }`
        : result.message ??
        `Lead converted${result.mode === "simulated" ? " in simulation mode" : ""}.`,
    );

    window.setTimeout(onClose, 900);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      <div className="w-full max-w-3xl rounded-[2rem] border border-white/10 bg-[#080b12] p-5 text-white shadow-[0_0_60px_rgba(34,211,238,0.14)] sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
              Lead Conversion
            </p>
            <h2 className="mt-2 text-3xl font-black">Convert to Client</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Create the client, starter project, portal access placeholder,
              and conversion activity in one admin action.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold hover:bg-white/10"
          >
            Close
          </button>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
              Client Name
            </span>
            <input
              value={clientName}
              onChange={(event) => setClientName(event.target.value)}
              className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300/45"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
              Email
            </span>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300/45"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
              Company
            </span>
            <input
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300/45"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
              Service / Interest
            </span>
            <input
              value={serviceInterest}
              onChange={(event) => setServiceInterest(event.target.value)}
              className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300/45"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
              Starter Project Name
            </span>
            <input
              value={starterProjectName}
              onChange={(event) => setStarterProjectName(event.target.value)}
              className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300/45"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
              Project Type
            </span>
            <input
              value={projectType}
              onChange={(event) => setProjectType(event.target.value)}
              className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300/45"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
              Initial Phase
            </span>
            <select
              value={initialPhase}
              onChange={(event) => setInitialPhase(event.target.value)}
              className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300/45"
            >
              {projectStages.map((stage) => (
                <option key={stage}>{stage}</option>
              ))}
            </select>
          </label>
          <label className="flex items-center justify-between gap-3 rounded-2xl border border-cyan-300/16 bg-cyan-400/[0.06] px-4 py-3">
            <span>
              <span className="block text-[10px] font-black uppercase tracking-[0.14em] text-cyan-100">
                Portal Access
              </span>
              <span className="mt-1 block text-xs text-zinc-300">
                Create linked portal user placeholder.
              </span>
            </span>
            <input
              type="checkbox"
              checked={portalAccess}
              onChange={(event) => setPortalAccess(event.target.checked)}
            />
          </label>
        </div>

        {message ? (
          <p className="mt-4 rounded-2xl border border-white/10 bg-black/24 px-4 py-3 text-sm font-bold text-cyan-100">
            {message}
          </p>
        ) : null}

        <div className="mt-5 flex flex-wrap justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-white/10 bg-white/[0.045] px-5 py-3 text-sm font-black text-zinc-200 hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => void submitConversion()}
            disabled={isSubmitting}
            className="rounded-2xl border border-cyan-300/28 bg-cyan-400/12 px-5 py-3 text-sm font-black text-cyan-100 transition hover:-translate-y-0.5 hover:bg-cyan-400/18 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Converting..." : "Convert Lead"}
          </button>
        </div>
      </div>
    </div>
  );
}
