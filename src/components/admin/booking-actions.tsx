"use client";

import { useState } from "react";

import EmailTemplateModal from "@/components/admin/email-template-modal";

type Props = {
  bookingId: string;
  email: string;
  name: string;
  serviceLabel: string;
  date: string;
  time: string;
  status: string;
  onViewDetails: () => void;
  onReschedule: () => void;
  onEmailOpenChange?: (open: boolean) => void;
  onActionComplete?: (action: "cancelled" | "deleted") => void;
  onReminderSent?: () => void;
};

export default function BookingActions({
  bookingId,
  email,
  name,
  serviceLabel,
  date,
  time,
  status,
  onViewDetails,
  onReschedule,
  onEmailOpenChange,
  onActionComplete,
  onReminderSent,
}: Props) {
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [actionError, setActionError] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");
  const [sendingReminder, setSendingReminder] = useState(false);

  function openEmailModal() {
    setEmailModalOpen(true);
    onEmailOpenChange?.(true);
  }

  function closeEmailModal() {
    setEmailModalOpen(false);
    onEmailOpenChange?.(false);
  }

  async function sendReminder() {
    const confirmed = confirm(`Send a reminder email to ${name}?`);
    if (!confirmed) return;

    setActionError("");
    setActionSuccess("");
    setSendingReminder(true);

    const response = await fetch("/api/admin/send-reminder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookingId }),
    });

    const data = await response.json().catch(() => null);
    setSendingReminder(false);

    if (!response.ok) {
      setActionError(data?.error || "Failed to send reminder email.");
      return;
    }

    setActionSuccess("Reminder email sent.");
    onReminderSent?.();
  }

  async function cancelBooking() {
    const confirmed = confirm(
      `Cancel ${name}'s booking and mark it cancelled?`,
    );
    if (!confirmed) return;

    setActionError("");
    setActionSuccess("");

    const response = await fetch("/api/admin/update-booking-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookingId,
        status: "cancelled",
      }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setActionError(data?.error || "Failed to cancel booking.");
      return;
    }

    if (onActionComplete) {
      onActionComplete("cancelled");
      return;
    }

    window.location.reload();
  }

  async function deleteBooking() {
    const confirmed = confirm(
      `Permanently delete ${name}'s booking? This cannot be undone.`,
    );
    if (!confirmed) return;

    setActionError("");
    setActionSuccess("");

    const response = await fetch("/api/delete-booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: bookingId,
      }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setActionError(data?.error || "Failed to delete booking.");
      return;
    }

    if (onActionComplete) {
      onActionComplete("deleted");
      return;
    }

    window.location.reload();
  }

  return (
    <>
      <div className="grid w-full min-w-[210px] max-w-[240px] grid-cols-1 gap-1.5 sm:grid-cols-2">
        <button
          type="button"
          onClick={onViewDetails}
          className="inline-flex min-h-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.055] px-2.5 py-2 text-center text-[11px] font-black text-zinc-100 shadow-[0_0_18px_rgba(255,255,255,0.03)] transition duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_0_22px_rgba(255,255,255,0.06)] active:scale-[0.98]"
        >
          View Details
        </button>

        <button
          type="button"
          onClick={openEmailModal}
          className="inline-flex min-h-10 items-center justify-center rounded-xl border border-cyan-400/24 bg-cyan-400/10 px-2.5 py-2 text-center text-[11px] font-black text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.05)] transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-cyan-400/18 hover:shadow-[0_0_24px_rgba(34,211,238,0.12)] active:scale-[0.98]"
        >
          Email Client
        </button>

        <button
          type="button"
          onClick={sendReminder}
          disabled={sendingReminder}
          className="inline-flex min-h-10 items-center justify-center rounded-xl border border-emerald-400/24 bg-emerald-400/10 px-2.5 py-2 text-center text-[11px] font-black text-emerald-100 shadow-[0_0_18px_rgba(16,185,129,0.05)] transition duration-300 hover:-translate-y-0.5 hover:border-emerald-300/40 hover:bg-emerald-400/18 hover:shadow-[0_0_24px_rgba(16,185,129,0.12)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
        >
          {sendingReminder ? "Sending..." : "Reminder"}
        </button>

        <button
          type="button"
          onClick={onReschedule}
          className="inline-flex min-h-10 items-center justify-center rounded-xl border border-violet-400/24 bg-violet-400/10 px-2.5 py-2 text-center text-[11px] font-black text-violet-100 shadow-[0_0_18px_rgba(168,85,247,0.05)] transition duration-300 hover:-translate-y-0.5 hover:border-violet-300/40 hover:bg-violet-400/18 hover:shadow-[0_0_24px_rgba(168,85,247,0.12)] active:scale-[0.98]"
        >
          Reschedule
        </button>

        <button
          type="button"
          onClick={cancelBooking}
          className="inline-flex min-h-10 items-center justify-center rounded-xl border border-amber-400/24 bg-amber-400/10 px-2.5 py-2 text-center text-[11px] font-black text-amber-100 shadow-[0_0_18px_rgba(251,191,36,0.05)] transition duration-300 hover:-translate-y-0.5 hover:border-amber-300/40 hover:bg-amber-400/18 hover:shadow-[0_0_24px_rgba(251,191,36,0.12)] active:scale-[0.98]"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={deleteBooking}
          className="inline-flex min-h-10 items-center justify-center rounded-xl border border-red-400/24 bg-red-400/10 px-2.5 py-2 text-center text-[11px] font-black text-red-100 shadow-[0_0_18px_rgba(248,113,113,0.05)] transition duration-300 hover:-translate-y-0.5 hover:border-red-300/40 hover:bg-red-400/18 hover:shadow-[0_0_24px_rgba(248,113,113,0.12)] active:scale-[0.98]"
        >
          Delete
        </button>
      </div>

      {actionError && (
        <div className="mt-2 w-full min-w-[210px] max-w-[240px] rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs font-bold text-red-100">
          {actionError}
        </div>
      )}

      {actionSuccess && (
        <div className="mt-2 w-full min-w-[210px] max-w-[240px] rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-100">
          {actionSuccess}
        </div>
      )}

      {emailModalOpen && (
        <EmailTemplateModal
          email={email}
          name={name}
          serviceLabel={serviceLabel}
          date={date}
          time={time}
          status={status}
          onClose={closeEmailModal}
        />
      )}
    </>
  );
}
