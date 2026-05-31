import { PortalPageIntro } from "@/components/portal/portal-cards";
import PortalProjectManagerWorkspace from "@/components/portal/portal-project-manager-workspace";

export default function PortalProjectManagerPage() {
  return (
    <div className="grid gap-4">
      <PortalPageIntro
        eyebrow="Damarko Operations"
        title="Project Manager"
        description="A project intelligence layer for status snapshots, blockers, recommended next actions, and rule-based Damarko insights."
      />
      <PortalProjectManagerWorkspace />
    </div>
  );
}
