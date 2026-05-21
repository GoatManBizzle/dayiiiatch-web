"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import BookingActions from "@/components/admin/booking-actions";
import BookingsCalendar from "@/components/admin/bookings-calendar";
import type { Booking } from "@/components/admin/booking-types";
import {
  formatAdminTimestamp,
  formatBookingTime,
} from "@/components/admin/booking-utils";
import BookingStatusSelect from "@/components/admin/booking-status-select";
import NotificationsCenter from "@/components/admin/notifications-center";
import RescheduleModal from "@/components/admin/reschedule-modal";
import {
  pushNotification,
  type AdminNotification,
  type AdminNotificationType,
} from "@/lib/admin-notifications";

type Props = {
  bookings: Booking[];
};

type ExportMode = "filtered" | "selected" | "confirmed" | "premium" | "today";
type ViewMode = "table" | "calendar";

export default function BookingsTable({ bookings }: Props) {
  const router = useRouter();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [exportMode, setExportMode] = useState<ExportMode>("filtered");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);
  const [rescheduleBooking, setRescheduleBooking] = useState<Booking | null>(
    null,
  );
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [liveRefreshEnabled, setLiveRefreshEnabled] = useState(true);
  const [dashboardError, setDashboardError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(() =>
    formatAdminTimestamp(new Date()),
  );
  const [notifications, setNotifications] = useState<AdminNotification[]>(() =>
    pushNotification([], "login", "Admin dashboard session active."),
  );
  const knownBookingIdsRef = useRef<Set<string> | null>(null);

  const liveRefreshPaused =
    activeBooking !== null ||
    rescheduleBooking !== null ||
    emailModalOpen ||
    selectedIds.length > 0;

  useEffect(() => {
    if (!liveRefreshEnabled || liveRefreshPaused) return;

    const interval = window.setInterval(() => {
      router.refresh();
      setLastUpdated(formatAdminTimestamp(new Date()));
    }, 30000);

    return () => window.clearInterval(interval);
  }, [liveRefreshEnabled, liveRefreshPaused, router]);

  useEffect(() => {
    const currentIds = new Set(bookings.map((booking) => booking.id));

    if (knownBookingIdsRef.current) {
      const newBookings = bookings.filter(
        (booking) => !knownBookingIdsRef.current?.has(booking.id),
      );

      newBookings.forEach((booking) => {
        pushAdminNotification(
          "booking-created",
          `New booking created for ${booking.name}.`,
          booking.status,
        );
      });
    }

    knownBookingIdsRef.current = currentIds;
  }, [bookings]);

  function pushAdminNotification(
    type: AdminNotificationType,
    message: string,
    status?: string,
  ) {
    setNotifications((current) =>
      pushNotification(current, type, message, status),
    );
  }

  function markAllNotificationsRead() {
    setNotifications((current) =>
      current.map((notification) => ({ ...notification, read: true })),
    );
  }

  function clearNotifications() {
    setNotifications([]);
  }

  const filteredBookings = useMemo(() => {
    const search = searchTerm.toLowerCase();

    return bookings.filter((booking) => {
      const matchesSearch =
        booking.name.toLowerCase().includes(search) ||
        booking.email.toLowerCase().includes(search) ||
        booking.date.toLowerCase().includes(search) ||
        booking.time.toLowerCase().includes(search) ||
        booking.service_label.toLowerCase().includes(search) ||
        (booking.company || "").toLowerCase().includes(search) ||
        (booking.details || "").toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "all" || booking.status === statusFilter;

      const matchesService =
        serviceFilter === "all" || booking.service === serviceFilter;

      return matchesSearch && matchesStatus && matchesService;
    });
  }, [bookings, searchTerm, statusFilter, serviceFilter]);

  const allSelected =
    filteredBookings.length > 0 &&
    selectedIds.length === filteredBookings.length;

  function toggleOne(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }

  function toggleAll() {
    setSelectedIds(allSelected ? [] : filteredBookings.map((b) => b.id));
  }

  async function runBulkAction(action: "cancel" | "delete") {
    if (selectedIds.length === 0) return;

    const confirmed = confirm(
      action === "delete"
        ? `Permanently delete ${selectedIds.length} selected booking(s)? This cannot be undone.`
        : `Cancel ${selectedIds.length} selected booking(s) and mark them cancelled?`,
    );

    if (!confirmed) return;

    setDashboardError("");

    const response = await fetch("/api/admin/bulk-bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, ids: selectedIds }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setDashboardError(data?.error || `Bulk ${action} failed.`);
      return;
    }

    setSelectedIds([]);
    pushAdminNotification(
      action === "delete" ? "booking-cancelled" : "booking-cancelled",
      action === "delete"
        ? `Deleted ${selectedIds.length} selected booking(s).`
        : `Cancelled ${selectedIds.length} selected booking(s).`,
      action === "delete" ? "deleted" : "cancelled",
    );
    router.refresh();
    setLastUpdated(formatAdminTimestamp(new Date()));
  }

  function handleRescheduled() {
    if (rescheduleBooking) {
      pushAdminNotification(
        "booking-rescheduled",
        `Booking rescheduled for ${rescheduleBooking.name}.`,
        "confirmed",
      );
    }

    router.refresh();
    setLastUpdated(formatAdminTimestamp(new Date()));
  }

  async function exportCSV() {
    let rowsToExport = [...filteredBookings];
    setDashboardError("");

    if (exportMode === "selected") {
      rowsToExport = filteredBookings.filter((booking) =>
        selectedIds.includes(booking.id),
      );
    }

    if (exportMode === "confirmed") {
      rowsToExport = filteredBookings.filter(
        (booking) => booking.status === "confirmed",
      );
    }

    if (exportMode === "premium") {
      rowsToExport = filteredBookings.filter(
        (booking) => booking.service === "premium-session",
      );
    }

    if (exportMode === "today") {
      const today = new Date().toISOString().split("T")[0];
      rowsToExport = filteredBookings.filter(
        (booking) => booking.date === today,
      );
    }

    if (rowsToExport.length === 0) {
      alert("No bookings available for this export mode.");
      return;
    }

    const response = await fetch("/api/admin/export-bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookings: rowsToExport,
        mode: exportMode,
        openFolder: true,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setDashboardError(data?.error || "Export failed.");
      return;
    }

    if (data.csv && data.localExport === false) {
      const blob = new Blob([data.csv], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = data.filename;
      link.click();
      URL.revokeObjectURL(url);

      pushAdminNotification(
        "export-completed",
        `Browser download ready: ${data.filename}`,
        `${rowsToExport.length} rows`,
      );
      return;
    }

    pushAdminNotification(
      "export-completed",
      `Export completed: ${data.filename}`,
      `${rowsToExport.length} rows`,
    );
    alert(`Export saved:\n${data.filename}`);
  }

  return (
    <>
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 p-5">
          <div>
            <h2 className="text-2xl font-black">Bookings</h2>
            <p
              suppressHydrationWarning
              className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-zinc-500"
            >
              Last updated: {lastUpdated}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex rounded-xl border border-white/10 bg-black/35 p-1">
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  viewMode === "table"
                    ? "bg-cyan-400/20 text-cyan-100"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Table View
              </button>

              <button
                type="button"
                onClick={() => setViewMode("calendar")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  viewMode === "calendar"
                    ? "bg-cyan-400/20 text-cyan-100"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Calendar View
              </button>
            </div>

            <button
              type="button"
              onClick={() => setLiveRefreshEnabled((enabled) => !enabled)}
              className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-xs font-bold text-cyan-100 hover:bg-cyan-400/20"
            >
              Live Refresh: {liveRefreshEnabled ? "On" : "Off"}
            </button>

            <NotificationsCenter
              notifications={notifications}
              onMarkAllRead={markAllNotificationsRead}
              onClear={clearNotifications}
            />

            {liveRefreshEnabled && liveRefreshPaused && (
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-yellow-100">
                Paused
              </span>
            )}

            <span className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
              Selected: {selectedIds.length}
            </span>

            <select
              value={exportMode}
              onChange={(e) => setExportMode(e.target.value as ExportMode)}
              className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs font-bold text-white outline-none"
            >
              <option value="filtered">Filtered Results</option>
              <option value="selected">Selected Rows</option>
              <option value="confirmed">Confirmed Only</option>
              <option value="premium">Premium Sessions</option>
              <option value="today">Today&apos;s Schedule</option>
            </select>

            <button
              onClick={exportCSV}
              className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-xs font-bold text-cyan-100 hover:bg-cyan-400/20"
            >
              Export CSV
            </button>

            {viewMode === "table" && (
              <>
                <button
                  disabled={selectedIds.length === 0}
                  onClick={() => runBulkAction("cancel")}
                  className="rounded-xl border border-yellow-400/20 bg-yellow-400/10 px-3 py-2 text-xs font-bold text-yellow-100 disabled:opacity-40"
                >
                  Cancel Selected
                </button>

                <button
                  disabled={selectedIds.length === 0}
                  onClick={() => runBulkAction("delete")}
                  className="rounded-xl border border-red-400/20 bg-red-400/10 px-3 py-2 text-xs font-bold text-red-100 disabled:opacity-40"
                >
                  Delete Selected
                </button>
              </>
            )}
          </div>

          <div className="grid w-full gap-3 md:grid-cols-3">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search bookings..."
              className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none"
            >
              <option value="all">All Services</option>
              <option value="free-call">Free Call</option>
              <option value="premium-session">Premium Session</option>
            </select>
          </div>

          {dashboardError && (
            <div className="w-full rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-100">
              {dashboardError}
            </div>
          )}
        </div>

        {viewMode === "table" ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1240px] text-left text-sm">
              <thead className="bg-black/30 text-xs uppercase tracking-[0.2em] text-zinc-400">
                <tr>
                  <th className="px-5 py-4">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAll}
                    />
                  </th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Time</th>
                  <th className="px-5 py-4">Service</th>
                  <th className="px-5 py-4">Client</th>
                  <th className="px-5 py-4">Email</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Notes</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-t border-white/10">
                    <td className="px-5 py-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(booking.id)}
                        onChange={() => toggleOne(booking.id)}
                      />
                    </td>

                    <td className="px-5 py-4 font-semibold">{booking.date}</td>
                    <td className="px-5 py-4">
                      {formatBookingTime(booking.time)}
                    </td>
                    <td className="px-5 py-4">{booking.service_label}</td>
                    <td className="px-5 py-4 font-semibold">{booking.name}</td>
                    <td className="px-5 py-4 text-cyan-200">
                      {booking.email}
                    </td>

                    <td className="px-5 py-4">
                      <BookingStatusSelect
                        bookingId={booking.id}
                        currentStatus={booking.status}
                        onStatusUpdated={(status) => {
                          pushAdminNotification(
                            "status-updated",
                            `${booking.name} status updated to ${status}.`,
                            status,
                          );

                          if (status === "completed") {
                            pushAdminNotification(
                              "status-updated",
                              `Follow-up ready for ${booking.name}.`,
                              "follow-up ready",
                            );
                          }
                        }}
                      />

                      {booking.status === "completed" && (
                        <p className="mt-2 inline-flex rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-violet-100">
                          Follow-up ready
                        </p>
                      )}
                    </td>

                    <td className="max-w-[320px] px-5 py-4 text-zinc-300">
                      {booking.details || "N/A"}
                    </td>

                    <td className="px-5 py-4">
                      <div className="mb-2">
                        <button
                          type="button"
                          onClick={() => setActiveBooking(booking)}
                          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-white hover:bg-white/10"
                        >
                          View Details
                        </button>
                      </div>

                      <BookingActions
                        bookingId={booking.id}
                        email={booking.email}
                        name={booking.name}
                        serviceLabel={booking.service_label}
                        date={booking.date}
                        time={booking.time}
                        status={booking.status}
                        onReschedule={() => setRescheduleBooking(booking)}
                        onEmailOpenChange={setEmailModalOpen}
                        onActionComplete={(action) => {
                          pushAdminNotification(
                            "booking-cancelled",
                            action === "deleted"
                              ? `Booking deleted for ${booking.name}.`
                              : `Booking cancelled for ${booking.name}.`,
                            action,
                          );
                          router.refresh();
                          setLastUpdated(formatAdminTimestamp(new Date()));
                        }}
                        onReminderSent={() =>
                          pushAdminNotification(
                            "reminder-sent",
                            `Reminder email sent to ${booking.name}.`,
                            booking.status,
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}

                {filteredBookings.length === 0 && (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-5 py-10 text-center text-zinc-400"
                    >
                      No bookings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <BookingsCalendar
            bookings={filteredBookings}
            onSelectBooking={setActiveBooking}
          />
        )}
      </div>

      {activeBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-6 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-[#080b12] p-6 text-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">
                  Booking Details
                </p>
                <h3 className="mt-2 text-3xl font-black">
                  {activeBooking.name}
                </h3>
                <p className="mt-1 text-sm text-zinc-400">
                  {activeBooking.service_label}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveBooking(null)}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold hover:bg-white/10"
              >
                Close
              </button>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Detail label="Date" value={activeBooking.date} />
              <Detail
                label="Time"
                value={formatBookingTime(activeBooking.time)}
              />
              <Detail label="Email" value={activeBooking.email} cyan />
              <Detail label="Status" value={activeBooking.status} />

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 md:col-span-2">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Company
                </p>
                <p className="mt-2 font-bold">
                  {activeBooking.company || "N/A"}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 md:col-span-2">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Notes
                </p>
                <p className="mt-2 whitespace-pre-wrap text-zinc-200">
                  {activeBooking.details || "No notes provided."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {rescheduleBooking && (
        <RescheduleModal
          booking={rescheduleBooking}
          onClose={() => setRescheduleBooking(null)}
          onRescheduled={handleRescheduled}
        />
      )}
    </>
  );
}

function Detail({
  label,
  value,
  cyan,
}: {
  label: string;
  value: string;
  cyan?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
        {label}
      </p>
      <p className={`mt-2 font-bold ${cyan ? "text-cyan-200" : "text-white"}`}>
        {value}
      </p>
    </div>
  );
}
