import type { Booking } from "@/components/admin/booking-types";

const DAY_MS = 24 * 60 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;

export type BookingAutomationPlan = {
  bookingId: string;
  clientName: string;
  serviceLabel: string;
  date: string;
  time: string;
  status: string;
  reminder24HourReady: boolean;
  reminder1HourReady: boolean;
  followUpReady: boolean;
};

export type DailySummary = {
  generatedAt: string;
  today: string;
  tomorrow: string;
  todayBookings: Booking[];
  tomorrowBookings: Booking[];
  pendingBookings: Booking[];
  premiumSessions: Booking[];
  cancelledBookings: Booking[];
  automationPlans: BookingAutomationPlan[];
  reminder24HourReady: BookingAutomationPlan[];
  reminder1HourReady: BookingAutomationPlan[];
  followUpReady: BookingAutomationPlan[];
};

export function getLocalDateString(date = new Date()) {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

  return localDate.toISOString().split("T")[0];
}

export function getOffsetDateString(days: number, from = new Date()) {
  return getLocalDateString(new Date(from.getTime() + days * DAY_MS));
}

export function getBookingDateTime(booking: Pick<Booking, "date" | "time">) {
  return new Date(`${booking.date}T${booking.time}`);
}

export function getBookingAutomationPlan(
  booking: Booking,
  now = new Date(),
): BookingAutomationPlan {
  const bookingDateTime = getBookingDateTime(booking);
  const timeUntilBooking = bookingDateTime.getTime() - now.getTime();
  const isConfirmed = booking.status === "confirmed";

  return {
    bookingId: booking.id,
    clientName: booking.name,
    serviceLabel: booking.service_label,
    date: booking.date,
    time: booking.time,
    status: booking.status,
    reminder24HourReady:
      isConfirmed && timeUntilBooking > 0 && timeUntilBooking <= DAY_MS,
    reminder1HourReady:
      isConfirmed && timeUntilBooking > 0 && timeUntilBooking <= HOUR_MS,
    followUpReady: booking.status === "completed",
  };
}

export function buildDailySummary(
  bookings: Booking[],
  now = new Date(),
): DailySummary {
  const today = getLocalDateString(now);
  const tomorrow = getOffsetDateString(1, now);
  const automationPlans = bookings.map((booking) =>
    getBookingAutomationPlan(booking, now),
  );

  return {
    generatedAt: now.toISOString(),
    today,
    tomorrow,
    todayBookings: bookings.filter((booking) => booking.date === today),
    tomorrowBookings: bookings.filter((booking) => booking.date === tomorrow),
    pendingBookings: bookings.filter((booking) => booking.status === "pending"),
    premiumSessions: bookings.filter(
      (booking) => booking.service === "premium-session",
    ),
    cancelledBookings: bookings.filter(
      (booking) => booking.status === "cancelled",
    ),
    automationPlans,
    reminder24HourReady: automationPlans.filter(
      (plan) => plan.reminder24HourReady,
    ),
    reminder1HourReady: automationPlans.filter(
      (plan) => plan.reminder1HourReady,
    ),
    followUpReady: automationPlans.filter((plan) => plan.followUpReady),
  };
}

export function canWriteLocalAutomationLog() {
  return process.env.NODE_ENV !== "production" && process.env.VERCEL !== "1";
}
