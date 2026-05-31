import { PortalPageIntro } from "@/components/portal/portal-cards";
import PortalTimelineWorkspace from "@/components/portal/portal-timeline-workspace";

export default function PortalTimelinePage() {
  return (
    <div className="grid gap-4">
      <PortalPageIntro
        eyebrow="Project Progression"
        title="Timeline"
        description="A visual project progression engine showing completed work, the active phase, upcoming milestones, blockers, and next client actions."
      />
      <PortalTimelineWorkspace />
    </div>
  );
}
