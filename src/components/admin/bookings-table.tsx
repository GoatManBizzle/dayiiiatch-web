"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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
  derivePipelineStage,
  extractGrowthSource,
  leadSources,
  pipelineStages,
  type PipelineStage,
} from "@/lib/growth-ops";
import { parseSmartIntakeSummary } from "@/lib/smart-intake";
import { getLeadHeat } from "@/lib/operational-intelligence";
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
type PipelineOverrides = Record<string, PipelineStage>;
type ColumnKey =
  | "date"
  | "time"
  | "service"
  | "client"
  | "email"
  | "source"
  | "pipeline"
  | "status"
  | "notes"
  | "actions";

const tableColumns: { key: ColumnKey; label: string }[] = [
  { key: "date", label: "Date" },
  { key: "time", label: "Time" },
  { key: "service", label: "Service" },
  { key: "client", label: "Client" },
  { key: "email", label: "Email" },
  { key: "source", label: "Source" },
  { key: "pipeline", label: "Pipeline" },
  { key: "status", label: "Status" },
  { key: "notes", label: "Notes" },
  { key: "actions", label: "Actions" },
];

const defaultVisibleColumns = tableColumns.map((column) => column.key);
const essentialVisibleColumns: ColumnKey[] = [
  "date",
  "time",
  "client",
  "service",
  "pipeline",
  "status",
  "actions",
];

function getStoredPipelineOverrides(): PipelineOverrides {
  if (typeof window === "undefined") return {};

  try {
    const stored = window.localStorage.getItem(
      "dayiiiatch_pipeline_overrides",
    );
    return stored ? (JSON.parse(stored) as PipelineOverrides) : {};
  } catch {
    return {};
  }
}

function getStoredVisibleColumns(): ColumnKey[] {
  if (typeof window === "undefined") return defaultVisibleColumns;

  try {
    const storedColumns = window.localStorage.getItem(
      "dayiiiatch_booking_columns",
    );
    if (!storedColumns) return defaultVisibleColumns;
    const parsed = JSON.parse(storedColumns) as ColumnKey[];
    const valid = parsed.filter((column) =>
      defaultVisibleColumns.includes(column),
    );
    return valid.length ? valid : defaultVisibleColumns;
  } catch {
    return defaultVisibleColumns;
  }
}

function getLinkedClientName(booking: Booking) {
  return booking.client?.name || booking.name;
}

function getLinkedClientStatus(booking: Booking) {
  return booking.client?.status || (booking.client_id ? "linked" : "legacy");
}

function getPortalStatus(booking: Booking) {
  if (!booking.client_id) return "No client link";
  return booking.client?.portal_enabled ? "Portal enabled" : "Portal off";
}

export default function BookingsTable({ bookings }: Props) {
  const router = useRouter();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [pipelineFilter, setPipelineFilter] = useState("all");
  const [pipelineOverrides, setPipelineOverrides] = useState<PipelineOverrides>(
    getStoredPipelineOverrides,
  );
  const [visibleColumns, setVisibleColumns] = useState<ColumnKey[]>(
    getStoredVisibleColumns,
  );
  const [columnPanelOpen, setColumnPanelOpen] = useState(false);
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

  const getPipelineStage = useCallback((booking: Booking) => {
    return (
      pipelineOverrides[booking.id] ??
      derivePipelineStage({
        service: booking.service,
        status: booking.status,
        details: booking.details,
      })
    );
  }, [pipelineOverrides]);

  function updatePipelineStage(booking: Booking, stage: PipelineStage) {
    setPipelineOverrides((current) => {
      const next = { ...current, [booking.id]: stage };
      window.localStorage.setItem(
        "dayiiiatch_pipeline_overrides",
        JSON.stringify(next),
      );
      return next;
    });
    pushAdminNotification(
      "status-updated",
      `${booking.name} pipeline moved to ${stage}.`,
      stage,
    );
  }

  function persistVisibleColumns(columns: ColumnKey[]) {
    setVisibleColumns(columns);
    window.localStorage.setItem(
      "dayiiiatch_booking_columns",
      JSON.stringify(columns),
    );
  }

  function toggleColumn(column: ColumnKey) {
    const next = visibleColumns.includes(column)
      ? visibleColumns.filter((item) => item !== column)
      : [...visibleColumns, column];

    persistVisibleColumns(next.length ? next : ["actions"]);
  }

  function isColumnVisible(column: ColumnKey) {
    return visibleColumns.includes(column);
  }

  const visibleColumnCount = visibleColumns.length + 1;

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
        (booking.client?.name || "").toLowerCase().includes(search) ||
        (booking.client?.status || "").toLowerCase().includes(search) ||
        (booking.details || "").toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "all" || booking.status === statusFilter;

      const matchesService =
        serviceFilter === "all" || booking.service === serviceFilter;
      const bookingSource = extractGrowthSource(booking.details);
      const matchesSource =
        sourceFilter === "all" || bookingSource === sourceFilter;
      const bookingPipeline = getPipelineStage(booking);
      const matchesPipeline =
        pipelineFilter === "all" || bookingPipeline === pipelineFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesService &&
        matchesSource &&
        matchesPipeline
      );
    });
  }, [
    bookings,
    searchTerm,
    statusFilter,
    serviceFilter,
    sourceFilter,
    pipelineFilter,
    getPipelineStage,
  ]);

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
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setColumnPanelOpen((open) => !open)}
                  className="rounded-xl border border-violet-400/20 bg-violet-400/10 px-3 py-2 text-xs font-bold text-violet-100 hover:bg-violet-400/20"
                >
                  Columns
                </button>

                {columnPanelOpen && (
                  <div className="absolute right-0 top-11 z-40 w-72 rounded-2xl border border-white/10 bg-[#080b12]/96 p-3 shadow-[0_0_40px_rgba(34,211,238,0.12)] backdrop-blur-xl">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
                        View Fields
                      </p>
                      <button
                        type="button"
                        onClick={() => setColumnPanelOpen(false)}
                        className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-bold text-zinc-300 hover:bg-white/10"
                      >
                        Close
                      </button>
                    </div>

                    <div className="grid gap-1.5">
                      {tableColumns.map((column) => (
                        <label
                          key={column.key}
                          className="flex min-h-9 cursor-pointer items-center justify-between rounded-xl border border-white/8 bg-white/[0.035] px-3 py-2 text-xs font-bold text-zinc-200 hover:border-cyan-300/20 hover:bg-cyan-400/8"
                        >
                          <span>{column.label}</span>
                          <input
                            type="checkbox"
                            checked={isColumnVisible(column.key)}
                            onChange={() => toggleColumn(column.key)}
                          />
                        </label>
                      ))}
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => persistVisibleColumns(defaultVisibleColumns)}
                        className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-xs font-black text-cyan-100 hover:bg-cyan-400/18"
                      >
                        Show All
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          persistVisibleColumns(essentialVisibleColumns)
                        }
                        className="rounded-xl border border-white/10 bg-white/[0.055] px-3 py-2 text-xs font-black text-zinc-100 hover:bg-white/10"
                      >
                        Essential View
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

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

          <div className="grid w-full gap-3 md:grid-cols-5">
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

            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none"
            >
              <option value="all">All Sources</option>
              {leadSources.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>

            <select
              value={pipelineFilter}
              onChange={(e) => setPipelineFilter(e.target.value)}
              className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none"
            >
              <option value="all">All Pipeline Stages</option>
              {pipelineStages.map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
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
            <table className="w-full min-w-[1080px] table-auto text-left text-xs xl:min-w-0">
              <thead className="bg-black/30 text-[10px] uppercase tracking-[0.16em] text-zinc-400">
                <tr>
                  <th className="w-9 px-2.5 py-3">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAll}
                    />
                  </th>
                  {isColumnVisible("date") && (
                    <th className="px-2.5 py-3">Date</th>
                  )}
                  {isColumnVisible("time") && (
                    <th className="px-2.5 py-3">Time</th>
                  )}
                  {isColumnVisible("service") && (
                    <th className="px-2.5 py-3">Service</th>
                  )}
                  {isColumnVisible("client") && (
                    <th className="px-2.5 py-3">Client</th>
                  )}
                  {isColumnVisible("email") && (
                    <th className="px-2.5 py-3">Email</th>
                  )}
                  {isColumnVisible("source") && (
                    <th className="px-2.5 py-3">Source</th>
                  )}
                  {isColumnVisible("pipeline") && (
                    <th className="px-2.5 py-3">Pipeline</th>
                  )}
                  {isColumnVisible("status") && (
                    <th className="px-2.5 py-3">Status</th>
                  )}
                  {isColumnVisible("notes") && (
                    <th className="px-2.5 py-3">Notes</th>
                  )}
                  {isColumnVisible("actions") && (
                    <th className="px-2.5 py-3">Actions</th>
                  )}
                </tr>
              </thead>

              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-t border-white/10">
                    <td className="px-2.5 py-3 align-top">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(booking.id)}
                        onChange={() => toggleOne(booking.id)}
                      />
                    </td>

                    {isColumnVisible("date") && (
                      <td className="whitespace-nowrap px-2.5 py-3 align-top font-semibold">
                        {booking.date.slice(5)}
                      </td>
                    )}
                    {isColumnVisible("time") && (
                      <td className="whitespace-nowrap px-2.5 py-3 align-top">
                        {formatBookingTime(booking.time)}
                      </td>
                    )}
                    {isColumnVisible("service") && (
                      <td
                        className="max-w-[130px] truncate px-2.5 py-3 align-top"
                        title={booking.service_label}
                      >
                        {booking.service_label}
                      </td>
                    )}
                    {isColumnVisible("client") && (
                      <td
                        className="max-w-[170px] px-2.5 py-3 align-top"
                        title={`${getLinkedClientName(booking)} / ${getLinkedClientStatus(booking)} / ${getPortalStatus(booking)}`}
                      >
                        <p className="truncate font-semibold text-white">
                          {getLinkedClientName(booking)}
                        </p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          <span className="inline-flex rounded-full border border-cyan-300/18 bg-cyan-400/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.1em] text-cyan-100">
                            {getLinkedClientStatus(booking)}
                          </span>
                          <span className="inline-flex rounded-full border border-violet-300/16 bg-violet-500/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.1em] text-violet-100">
                            {booking.client?.portal_enabled
                              ? "Portal"
                              : "No Portal"}
                          </span>
                        </div>
                      </td>
                    )}
                    {isColumnVisible("email") && (
                      <td
                        className="max-w-[170px] truncate px-2.5 py-3 align-top text-cyan-200"
                        title={booking.email}
                      >
                        {booking.email}
                      </td>
                    )}
                    {isColumnVisible("source") && (
                      <td className="px-2.5 py-3 align-top">
                        <span className="inline-flex rounded-full border border-violet-300/18 bg-violet-500/10 px-2 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-violet-100">
                          {extractGrowthSource(booking.details)}
                        </span>
                      </td>
                    )}
                    {isColumnVisible("pipeline") && (
                      <td className="px-2.5 py-3 align-top">
                        <PipelineStageSelect
                          value={getPipelineStage(booking)}
                          onChange={(stage) =>
                            updatePipelineStage(booking, stage)
                          }
                        />
                      </td>
                    )}
                    {isColumnVisible("status") && (
                      <td className="px-2.5 py-3 align-top">
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
                          <p className="mt-2 inline-flex rounded-full border border-violet-400/20 bg-violet-400/10 px-2 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-violet-100">
                            Follow-up
                          </p>
                        )}
                      </td>
                    )}
                    {isColumnVisible("notes") && (
                      <td
                        className="max-w-[190px] px-2.5 py-3 align-top text-zinc-300"
                        title={booking.details || "N/A"}
                      >
                        <p className="line-clamp-2 leading-5">
                          {booking.details || "N/A"}
                        </p>
                      </td>
                    )}
                    {isColumnVisible("actions") && (
                      <td className="px-2.5 py-3 align-top">
                        <BookingActions
                          bookingId={booking.id}
                          email={booking.email}
                          name={booking.name}
                          serviceLabel={booking.service_label}
                          date={booking.date}
                          time={booking.time}
                          status={booking.status}
                          onViewDetails={() => setActiveBooking(booking)}
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
                    )}
                  </tr>
                ))}

                {filteredBookings.length === 0 && (
                  <tr>
                    <td
                      colSpan={visibleColumnCount}
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
              <Detail
                label="Linked Client"
                value={
                  activeBooking.client_id
                    ? getLinkedClientName(activeBooking)
                    : "Legacy booking / no client link"
                }
              />
              <Detail
                label="Client Status"
                value={`${getLinkedClientStatus(activeBooking)} / ${getPortalStatus(activeBooking)}`}
              />
              <Detail
                label="Lead Source"
                value={extractGrowthSource(activeBooking.details)}
              />
              <Detail
                label="Pipeline"
                value={getPipelineStage(activeBooking)}
              />
              <LeadHeatDetail booking={activeBooking} />

              <IntakeSummaryCard details={activeBooking.details} />

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

function IntakeSummaryCard({ details }: { details?: string | null }) {
  const summary = parseSmartIntakeSummary(details);
  if (!summary.hasSummary) return null;

  return (
    <div className="rounded-2xl border border-cyan-300/14 bg-cyan-400/8 p-4 md:col-span-2">
      <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">
        Smart Intake Summary
      </p>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <SummaryItem label="Client Goals" value={summary.clientGoals} />
        <SummaryItem label="Selected Systems" value={summary.selectedSystems} />
        <SummaryItem label="Urgency" value={summary.urgency} />
        <SummaryItem label="Complexity" value={summary.complexity} />
        <SummaryItem
          label="Recommended Next Step"
          value={summary.recommendedNextStep}
        />
      </div>
    </div>
  );
}

function LeadHeatDetail({ booking }: { booking: Booking }) {
  const heat = getLeadHeat(booking);
  const heatStyles = {
    Cold: "border-zinc-400/20 bg-zinc-400/10 text-zinc-100",
    Warm: "border-cyan-400/25 bg-cyan-400/10 text-cyan-100",
    Hot: "border-amber-400/25 bg-amber-400/10 text-amber-100",
    Priority: "border-rose-400/25 bg-rose-400/10 text-rose-100",
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
        Lead Heat
      </p>
      <p
        className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.14em] ${heatStyles[heat.heat]}`}
      >
        {heat.heat}
      </p>
      <p className="mt-2 text-xs leading-5 text-zinc-400">
        Score {heat.score}: {heat.reasons.join(", ")}
      </p>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/24 px-3 py-2">
      <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-bold text-zinc-100">{value || "N/A"}</p>
    </div>
  );
}

function PipelineStageSelect({
  value,
  onChange,
}: {
  value: PipelineStage;
  onChange: (stage: PipelineStage) => void;
}) {
  const stageStyles: Record<PipelineStage, string> = {
    "New Lead": "border-yellow-400/25 bg-yellow-400/10 text-yellow-100",
    Contacted: "border-sky-400/25 bg-sky-400/10 text-sky-100",
    "Discovery Scheduled":
      "border-cyan-400/25 bg-cyan-400/10 text-cyan-100",
    "Proposal Sent":
      "border-violet-400/25 bg-violet-400/10 text-violet-100",
    "Active Build":
      "border-emerald-400/25 bg-emerald-400/10 text-emerald-100",
    Completed: "border-white/20 bg-white/10 text-white",
  };

  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value as PipelineStage)}
      className={`max-w-[150px] rounded-xl border px-2.5 py-2 text-[11px] font-black outline-none transition ${stageStyles[value]}`}
    >
      {pipelineStages.map((stage) => (
        <option key={stage} value={stage} className="bg-black text-white">
          {stage}
        </option>
      ))}
    </select>
  );
}
