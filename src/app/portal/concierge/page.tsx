import PortalConciergeWorkspace from "@/components/portal/portal-concierge-workspace";
import { PortalPageIntro } from "@/components/portal/portal-cards";

export default function PortalConciergePage() {
  return (
    <div className="grid gap-4">
      <PortalPageIntro
        eyebrow="Damarko Intelligence"
        title="Damarko Concierge"
        description="Project-aware guidance for status, next steps, missing assets, approvals, meetings, and launch readiness inside the client portal."
      />
      <PortalConciergeWorkspace />
    </div>
  );
}
