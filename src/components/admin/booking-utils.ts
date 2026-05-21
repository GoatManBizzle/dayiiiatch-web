export const RESCHEDULE_TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
] as const;

export type RescheduleTimeSlot = (typeof RESCHEDULE_TIME_SLOTS)[number];

export function isRescheduleTimeSlot(time: string): time is RescheduleTimeSlot {
  return (RESCHEDULE_TIME_SLOTS as readonly string[]).includes(time);
}

export function formatAdminTimestamp(date: Date) {
  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function formatBookingTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;

  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function getStatusPillClass(status: string) {
  const statusStyles: Record<string, string> = {
    pending: "border-yellow-500/30 bg-yellow-500/10 text-yellow-100",
    confirmed: "border-emerald-500/30 bg-emerald-500/10 text-emerald-100",
    completed: "border-cyan-500/30 bg-cyan-500/10 text-cyan-100",
    cancelled: "border-red-500/30 bg-red-500/10 text-red-100",
  };

  return (
    statusStyles[status] ?? "border-white/10 bg-white/[0.04] text-zinc-200"
  );
}
