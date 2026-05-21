"use client";

import { useEffect, useState } from "react";

import type {
  AdminNotification,
  AdminNotificationType,
} from "@/lib/admin-notifications";

type Props = {
  notifications: AdminNotification[];
  onMarkAllRead: () => void;
  onClear: () => void;
};

const typeStyles: Record<
  AdminNotificationType,
  { label: string; accent: string; icon: string }
> = {
  "booking-created": {
    label: "New Booking",
    accent: "border-cyan-400/30 bg-cyan-400/10 text-cyan-100",
    icon: "N",
  },
  "booking-cancelled": {
    label: "Cancelled",
    accent: "border-red-400/30 bg-red-400/10 text-red-100",
    icon: "C",
  },
  "booking-rescheduled": {
    label: "Rescheduled",
    accent: "border-violet-400/30 bg-violet-400/10 text-violet-100",
    icon: "R",
  },
  "reminder-sent": {
    label: "Reminder",
    accent: "border-cyan-400/30 bg-cyan-400/10 text-cyan-100",
    icon: "M",
  },
  "status-updated": {
    label: "Status",
    accent: "border-emerald-400/30 bg-emerald-400/10 text-emerald-100",
    icon: "S",
  },
  "export-completed": {
    label: "Export",
    accent: "border-cyan-400/30 bg-cyan-400/10 text-cyan-100",
    icon: "E",
  },
  login: {
    label: "Login",
    accent: "border-emerald-400/30 bg-emerald-400/10 text-emerald-100",
    icon: "L",
  },
  logout: {
    label: "Logout",
    accent: "border-yellow-400/30 bg-yellow-400/10 text-yellow-100",
    icon: "O",
  },
};

function getRelativeTime(createdAt: number, now: number) {
  const seconds = Math.max(0, Math.floor((now - createdAt) / 1000));

  if (seconds < 10) return "just now";
  if (seconds < 60) return `${seconds}s ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;

  return `${Math.floor(hours / 24)} day ago`;
}

export default function NotificationsCenter({
  notifications,
  onMarkAllRead,
  onClear,
}: Props) {
  const [open, setOpen] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const unreadCount = notifications.filter((item) => !item.read).length;

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 60000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="relative rounded-xl border border-violet-400/20 bg-violet-400/10 px-3 py-2 text-xs font-bold text-violet-100 transition hover:bg-violet-400/20"
      >
        Notifications
        {unreadCount > 0 && (
          <span className="absolute -right-2 -top-2 rounded-full border border-black bg-cyan-300 px-1.5 py-0.5 text-[10px] font-black text-black">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-40 mt-3 w-[min(92vw,420px)] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#080b12]/95 text-white shadow-[0_0_50px_rgba(34,211,238,0.16)] backdrop-blur-xl">
          <div className="border-b border-white/10 bg-gradient-to-br from-cyan-400/10 via-transparent to-violet-500/10 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-200">
                  Admin Activity
                </p>
                <h3 className="mt-1 text-xl font-black">
                  Notifications
                </h3>
              </div>

              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-bold text-zinc-300">
                {unreadCount} unread
              </span>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={onMarkAllRead}
                className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-xs font-bold text-cyan-100 hover:bg-cyan-400/20"
              >
                Mark all read
              </button>
              <button
                type="button"
                onClick={onClear}
                className="rounded-xl border border-red-400/20 bg-red-400/10 px-3 py-2 text-xs font-bold text-red-100 hover:bg-red-400/20"
              >
                Clear notifications
              </button>
            </div>
          </div>

          <div className="max-h-[420px] space-y-2 overflow-y-auto p-3">
            {notifications.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-zinc-400">
                No notifications yet.
              </div>
            ) : (
              notifications.map((notification) => {
                const style = typeStyles[notification.type];

                return (
                  <div
                    key={notification.id}
                    className={`rounded-2xl border p-3 transition ${
                      notification.read
                        ? "border-white/10 bg-white/[0.03]"
                        : "border-cyan-400/20 bg-cyan-400/10"
                    }`}
                  >
                    <div className="flex gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs font-black ${style.accent}`}
                      >
                        {style.icon}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
                            {style.label}
                          </p>
                          {notification.status && (
                            <span className="rounded-full border border-white/10 bg-black/30 px-2 py-0.5 text-[10px] font-bold capitalize text-zinc-300">
                              {notification.status}
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm font-semibold leading-5 text-white">
                          {notification.message}
                        </p>
                        <p className="mt-1 text-xs text-zinc-500">
                          {getRelativeTime(notification.createdAt, now)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
