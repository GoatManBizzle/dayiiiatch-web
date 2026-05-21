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
      <div className="grid w-[210px] grid-cols-2 gap-2">
        {/* Spot 2 */}
        <button
          type="button"
          onClick={openEmailModal}
          className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-center text-xs font-bold text-cyan-100 transition hover:bg-cyan-400/20"
        >
          Email Client
        </button>

        {/* Spot 3 */}
        <button
          type="button"
          onClick={onReschedule}
          className="rounded-xl border border-violet-400/20 bg-violet-400/10 px-3 py-2 text-xs font-bold text-violet-100 transition hover:bg-violet-400/20"
        >
          Reschedule
        </button>

        {/* Spot 4 */}
        <button
          type="button"
          onClick={sendReminder}
          disabled={sendingReminder}
          className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-xs font-bold text-cyan-100 transition hover:bg-cyan-400/20 disabled:opacity-50"
        >
          {sendingReminder ? "Sending..." : "Reminder"}
        </button>

        {/* Spot 5 */}
        <button
          type="button"
          onClick={deleteBooking}
          className="rounded-xl border border-red-400/20 bg-red-400/10 px-3 py-2 text-xs font-bold text-red-100 transition hover:bg-red-400/20"
        >
          Delete
        </button>

        {/* Spot 6 */}
        <button
          type="button"
          onClick={cancelBooking}
          className="rounded-xl border border-yellow-400/20 bg-yellow-400/10 px-3 py-2 text-xs font-bold text-yellow-100 transition hover:bg-yellow-400/20"
        >
          Cancel
        </button>
      </div>

      {actionError && (
        <div className="mt-2 w-[210px] rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs font-bold text-red-100">
          {actionError}
        </div>
      )}

      {actionSuccess && (
        <div className="mt-2 w-[210px] rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-100">
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
