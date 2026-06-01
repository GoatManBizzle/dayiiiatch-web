import { PortalPageIntro } from "@/components/portal/portal-cards";
import PortalEmptyState from "@/components/portal/portal-empty-state";
import PortalTimelineWorkspace from "@/components/portal/portal-timeline-workspace";
import { getCurrentPortalClient } from "@/lib/portal-client";

export const dynamic = "force-dynamic";

export default async function PortalTimelinePage() {
  const portalClient = await getCurrentPortalClient();
  const workspaceData = portalClient.workspaceData;
  const activeProject = workspaceData.projects[0];

  return (
    <div className="grid gap-4">
      <PortalPageIntro
        eyebrow="Project Progression"
        title="Timeline"
        description="A visual project progression engine showing completed work, the active phase, upcoming milestones, blockers, and next client actions."
      />
      {portalClient.mode === "auth" && !activeProject ? (
        <PortalEmptyState />
      ) : (
        <PortalTimelineWorkspace
          project={
            activeProject
              ? {
                  currentPhase: activeProject.current_phase ?? "Build",
                  progress: activeProject.progress,
                  launchReadiness: activeProject.launch_readiness,
                  name: activeProject.name,
                }
              : null
          }
          isPreviewData={!activeProject}
        />
      )}
    </div>
  );
}
