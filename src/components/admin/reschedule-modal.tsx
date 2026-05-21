"use client";

import { FormEvent, useMemo, useState } from "react";

import type { Booking } from "@/components/admin/booking-types";
import {
  formatBookingTime,
  RESCHEDULE_TIME_SLOTS,
} from "@/components/admin/booking-utils";

type Props = {
  booking: Booking;
  onClose: () => void;
  onRescheduled: () => void;
};

function getTodayDate() {
  const now = new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);

  return localDate.toISOString().split("T")[0];
}

export default function RescheduleModal({
  booking,
  onClose,
  onRescheduled,
}: Props) {
  const today = useMemo(() => getTodayDate(), []);
  const [date, setDate] = useState(booking.date >= today ? booking.date : today);
  const [time, setTime] = useState(booking.time);
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSaving) return;

    setIsSaving(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/admin/reschedule-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: booking.id,
          date,
          time,
          notes,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || "Unable to reschedule booking.");
      }

      setSuccessMessage("Booking rescheduled successfully.");
      onRescheduled();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to reschedule booking.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#080b12] p-5 text-white shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-violet-500/10" />

        <div className="relative flex max-h-[calc(90vh-2.5rem)] flex-col">
          <div className="flex shrink-0 items-start justify-between gap-3 border-b border-white/10 pb-3">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">
                Reschedule Booking
              </p>
              <h3 className="mt-2 text-2xl font-black">{booking.name}</h3>
              <p className="mt-1 text-sm text-zinc-400">
                {booking.service_label}
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

          <div className="overflow-y-auto pr-1">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <Detail label="Current Date" value={booking.date} />
              <Detail
                label="Current Time"
                value={formatBookingTime(booking.time)}
              />
              <Detail label="Client Name" value={booking.name} />
              <Detail label="Service Type" value={booking.service_label} />
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4 pb-1">
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                  New Date
                </span>
                <input
                  required
                  type="date"
                  min={today}
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-2.5 text-sm text-white outline-none focus:border-cyan-400/50"
                />
              </label>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                  New Time
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4">
                  {RESCHEDULE_TIME_SLOTS.map((slot) => {
                    const selected = time === slot;

                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTime(slot)}
                        className={`rounded-2xl border px-3 py-2.5 text-sm font-bold transition ${
                          selected
                            ? "border-cyan-300 bg-cyan-400/20 text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.22)]"
                            : "border-white/10 bg-black/35 text-zinc-200 hover:border-cyan-400/40 hover:bg-cyan-400/10"
                        }`}
                      >
                        {formatBookingTime(slot)}
                      </button>
                    );
                  })}
                </div>
              </div>

              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                  Reason / Internal Notes
                </span>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Reason / Internal Notes"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-2.5 text-sm text-white outline-none focus:border-cyan-400/50"
                />
              </label>

              {successMessage && (
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-2.5 text-sm font-bold text-emerald-100">
                  {successMessage}
                </div>
              )}

              {errorMessage && (
                <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-2.5 text-sm font-bold text-red-100">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSaving}
                className="w-full rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-cyan-100 transition hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save Reschedule"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
        {label}
      </p>
      <p className="mt-2 font-bold text-white">{value}</p>
    </div>
  );
}
