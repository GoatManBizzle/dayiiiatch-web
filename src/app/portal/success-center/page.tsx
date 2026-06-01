import { PortalPageIntro } from "@/components/portal/portal-cards";
import PortalEmptyState from "@/components/portal/portal-empty-state";
import PortalSuccessCenterWorkspace from "@/components/portal/portal-success-center-workspace";
import {
  getActivityEventsByClient,
  mapActivityEventForPortal,
} from "@/lib/activity-events";
import { getCurrentPortalClient } from "@/lib/portal-client";

export const dynamic = "force-dynamic";

export default async function PortalSuccessCenterPage() {
  const portalClient = await getCurrentPortalClient();
  const activityData =
    portalClient.mode === "auth"
      ? await getActivityEventsByClient(portalClient.client_id, 5)
      : { events: [], source: "preview" as const };
  const activityEvents =
    activityData.source === "supabase" && activityData.events.length > 0
      ? activityData.events.map(mapActivityEventForPortal)
      : undefined;

  return (
    <div className="grid gap-4">
      <PortalPageIntro
        eyebrow="Client Success"
        title="Success Center"
        description="An executive command center for project progress, onboarding, approvals, assets, meetings, invoices, risks, and launch readiness."
      />
      {portalClient.mode === "auth" &&
      portalClient.workspaceData.projects.length === 0 ? (
        <PortalEmptyState />
      ) : (
        <PortalSuccessCenterWorkspace activityEvents={activityEvents} />
      )}
    </div>
  );
}
