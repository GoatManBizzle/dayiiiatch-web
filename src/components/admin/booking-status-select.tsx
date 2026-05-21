"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  bookingId: string;
  currentStatus: string;
  onStatusUpdated?: (status: string) => void;
};

export default function BookingStatusSelect({
  bookingId,
  currentStatus,
  onStatusUpdated,
}: Props) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const status = e.target.value;
    setErrorMessage("");

    try {
      const response = await fetch("/api/admin/update-booking-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId,
          status,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Failed to update booking status.");
      }

      onStatusUpdated?.(status);
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to update booking status.",
      );
    }
  };

  const statusStyles: Record<string, string> = {
    pending: "border-yellow-500/30 bg-yellow-500/10 text-white",

    confirmed: "border-emerald-500/30 bg-emerald-500/10 text-white",

    completed: "border-cyan-500/30 bg-cyan-500/10 text-white",

    cancelled: "border-red-500/30 bg-red-500/10 text-white",
  };

  return (
    <div className="space-y-2">
      <select
        value={currentStatus}
        onChange={handleStatusChange}
        className={`rounded-2xl border px-4 py-2 text-sm font-bold outline-none transition ${statusStyles[currentStatus]}`}
      >
        <option value="pending" className="bg-black text-white">
          Pending
        </option>

        <option value="confirmed" className="bg-black text-white">
          Confirmed
        </option>

        <option value="completed" className="bg-black text-white">
          Completed
        </option>

        <option value="cancelled" className="bg-black text-white">
          Cancelled
        </option>
      </select>

      {errorMessage && (
        <p className="max-w-[180px] text-xs font-bold text-red-100">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
