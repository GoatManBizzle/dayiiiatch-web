import {
  type PortalProjectCardData,
  PortalPageIntro,
} from "@/components/portal/portal-cards";
import PortalEmptyState from "@/components/portal/portal-empty-state";
import PortalProjectsWorkspace from "@/components/portal/portal-projects-workspace";
import { getCurrentPortalClient } from "@/lib/portal-client";
import type { ProjectRow } from "@/types/workspace";

export const dynamic = "force-dynamic";

function mapProject(project: ProjectRow): PortalProjectCardData {
  return {
    title: project.name,
    status: project.status === "active" ? "In Progress" : project.status,
    progress: project.progress,
    nextStep: project.current_phase
      ? `Complete ${project.current_phase} milestone`
      : "Confirm next project milestone",
    nextAction:
      "Confirm project status, review linked approvals, and keep the next milestone moving.",
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

export default async function PortalProjectsPage() {
  const portalClient = await getCurrentPortalClient();
  const workspaceData = portalClient.workspaceData;
  const projects =
    workspaceData.projects.length > 0
      ? workspaceData.projects.map(mapProject)
      : undefined;

  return (
    <div className="grid gap-4">
      <PortalPageIntro
        title="Project Workspace"
        description="Track active builds, review status, milestone movement, recent activity, and next actions across the client project pipeline."
      />
      {portalClient.mode === "auth" && !projects ? (
        <PortalEmptyState />
      ) : (
        <PortalProjectsWorkspace projects={projects} isPreviewData={!projects} />
      )}
    </div>
  );
}
