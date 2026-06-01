import {
  PortalBookings,
  PortalPageIntro,
} from "@/components/portal/portal-cards";
import PortalEmptyState from "@/components/portal/portal-empty-state";
import { getCurrentPortalClient } from "@/lib/portal-client";

export const dynamic = "force-dynamic";

export default async function PortalBookingsPage() {
  const portalClient = await getCurrentPortalClient();

  return (
    <div className="grid gap-4">
      <PortalPageIntro
        title="Meeting Scheduler"
        description="Manage upcoming sessions, agenda notes, confirmation status, reschedule requests, and new booking paths from one client workspace."
      />
      {portalClient.mode === "auth" &&
      portalClient.workspaceData.bookings.length === 0 ? (
        <PortalEmptyState />
      ) : (
        <PortalBookings />
      )}
    </div>
  );
}
