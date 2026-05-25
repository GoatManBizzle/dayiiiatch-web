import {
  PortalPageIntro,
} from "@/components/portal/portal-cards";
import PortalProjectsWorkspace from "@/components/portal/portal-projects-workspace";

export default function PortalProjectsPage() {
  return (
    <div className="grid gap-4">
      <PortalPageIntro
        title="Project Tracker"
        description="Track milestone movement from discovery through optimization with progress bars, activity stages, and status clarity."
      />
      <PortalProjectsWorkspace />
    </div>
  );
}
