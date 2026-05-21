"use client";

import { useMemo } from "react";

import type { Booking } from "@/components/admin/booking-types";
import {
  formatBookingTime,
  getStatusPillClass,
} from "@/components/admin/booking-utils";

type Props = {
  bookings: Booking[];
  onSelectBooking: (booking: Booking) => void;
};

function formatDateHeading(date: string) {
  const parsed = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BookingsCalendar({
  bookings,
  onSelectBooking,
}: Props) {
  const groupedBookings = useMemo(() => {
    const groups = new Map<string, Booking[]>();

    bookings.forEach((booking) => {
      const existing = groups.get(booking.date) ?? [];
      groups.set(booking.date, [...existing, booking]);
    });

    return Array.from(groups.entries()).map(([date, items]) => ({
      date,
      bookings: [...items].sort((a, b) => a.time.localeCompare(b.time)),
    }));
  }, [bookings]);

  if (groupedBookings.length === 0) {
    return (
      <div className="border-t border-white/10 px-5 py-10 text-center text-zinc-400">
        No bookings found.
      </div>
    );
  }

  return (
    <div className="grid gap-4 border-t border-white/10 p-5 lg:grid-cols-2">
      {groupedBookings.map((group) => (
        <section
          key={group.date}
          className="rounded-3xl border border-white/10 bg-black/25 p-4"
        >
          <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
                {group.date}
              </p>
              <h3 className="mt-1 text-lg font-black text-white">
                {formatDateHeading(group.date)}
              </h3>
            </div>

            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-bold text-zinc-300">
              {group.bookings.length}
            </span>
          </div>

          <div className="mt-3 space-y-2">
            {group.bookings.map((booking) => (
              <button
                key={booking.id}
                type="button"
                onClick={() => onSelectBooking(booking)}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-left transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-black text-white">
                      {booking.name}
                    </p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-zinc-400">
                      {booking.service_label}
                    </p>
                  </div>

                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-bold capitalize ${getStatusPillClass(
                      booking.status,
                    )}`}
                  >
                    {booking.status}
                  </span>
                </div>

                <p className="mt-3 text-sm font-bold text-cyan-100">
                  {formatBookingTime(booking.time)}
                </p>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
