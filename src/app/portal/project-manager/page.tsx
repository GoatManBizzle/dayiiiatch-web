import { PortalPageIntro } from "@/components/portal/portal-cards";
import PortalEmptyState from "@/components/portal/portal-empty-state";
import PortalProjectManagerWorkspace from "@/components/portal/portal-project-manager-workspace";
import {
  getActivityEventsByClient,
  mapActivityEventForPortal,
} from "@/lib/activity-events";
import { getCurrentPortalClient } from "@/lib/portal-client";

export const dynamic = "force-dynamic";

export default async function PortalProjectManagerPage() {
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
        eyebrow="Damarko Operations"
        title="Project Manager"
        description="A project intelligence layer for status snapshots, blockers, recommended next actions, and rule-based Damarko insights."
      />
      {portalClient.mode === "auth" &&
      portalClient.workspaceData.projects.length === 0 ? (
        <PortalEmptyState />
      ) : (
        <PortalProjectManagerWorkspace activityEvents={activityEvents} />
      )}
    </div>
  );
}
