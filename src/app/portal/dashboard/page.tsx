import {
  DashboardOverview,
  type PortalProjectCardData,
  PortalPageIntro,
} from "@/components/portal/portal-cards";
import PortalEmptyState from "@/components/portal/portal-empty-state";
import {
  getActivityEventsByClient,
  mapActivityEventForPortal,
} from "@/lib/activity-events";
import { getCurrentPortalClient } from "@/lib/portal-client";
import type { ProjectRow } from "@/types/workspace";

export const dynamic = "force-dynamic";

function mapProject(project: ProjectRow): PortalProjectCardData {
  return {
    title: project.name,
    status: project.status === "active" ? "In Progress" : project.status,
    progress: project.progress,
    nextStep: project.current_phase
      ? `Continue ${project.current_phase} review`
      : "Review project status",
    nextAction: "Review latest workspace activity and confirm the next milestone.",
    updated: new Date(project.updated_at).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
    stage: project.current_phase ?? "Build",
    activity: [
      project.description ?? "Project record loaded from Supabase workspace data.",
    ],
  };
}

export default async function PortalDashboardPage() {
  const portalClient = await getCurrentPortalClient();
  const workspaceData = portalClient.workspaceData;
  const activityData =
    portalClient.mode === "auth"
      ? await getActivityEventsByClient(portalClient.client_id, 5)
      : { events: [], source: "preview" as const };
  const activityEvents =
    activityData.source === "supabase" && activityData.events.length > 0
      ? activityData.events.map(mapActivityEventForPortal)
      : undefined;
  const projects =
    workspaceData.projects.length > 0
      ? workspaceData.projects.map(mapProject)
      : undefined;

  return (
    <div className="grid gap-4">
      <PortalPageIntro
        title="Client Dashboard"
        description="Project health, updates, meetings, recent uploads, and operational status in one clean workspace view."
      />
      {portalClient.mode === "auth" && !projects ? (
        <PortalEmptyState />
      ) : (
        <DashboardOverview
          projects={projects}
          isPreviewData={!projects}
          activityEvents={activityEvents}
        />
      )}
    </div>
  );
}
