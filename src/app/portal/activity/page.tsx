import PortalActivityWorkspace from "@/components/portal/portal-activity-workspace";
import PortalEmptyState from "@/components/portal/portal-empty-state";
import {
  getActivityEventsByClient,
  mapActivityEventForPortal,
} from "@/lib/activity-events";
import { getCurrentPortalClient } from "@/lib/portal-client";

export const dynamic = "force-dynamic";

export default async function PortalActivityPage() {
  const portalClient = await getCurrentPortalClient();
  const activityData =
    portalClient.mode === "auth"
      ? await getActivityEventsByClient(portalClient.client_id)
      : { events: [], source: "preview" as const };
  const events =
    activityData.source === "supabase" && activityData.events.length > 0
      ? activityData.events.map(mapActivityEventForPortal)
      : undefined;

  if (
    portalClient.mode === "auth" &&
    activityData.source === "supabase" &&
    activityData.events.length === 0
  ) {
    return (
      <div data-style-section="activity-feed">
      <PortalEmptyState
        title="No activity yet. Project events will appear here."
        description="Approvals, uploads, messages, invoices, bookings, and project updates will populate this operational timeline once records are created."
      />
      </div>
    );
  }

  return (
    <div data-style-section="activity-feed">
      <PortalActivityWorkspace events={events} isPreviewData={!events} />
    </div>
  );
}
