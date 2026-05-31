import {
  PortalPageIntro,
} from "@/components/portal/portal-cards";
import PortalProjectsWorkspace from "@/components/portal/portal-projects-workspace";

export default function PortalProjectsPage() {
  return (
    <div className="grid gap-4">
      <PortalPageIntro
        title="Project Workspace"
        description="Track active builds, review status, milestone movement, recent activity, and next actions across the client project pipeline."
      />
      <PortalProjectsWorkspace />
    </div>
  );
}
