import { PortalPageIntro } from "@/components/portal/portal-cards";
import PortalSuccessCenterWorkspace from "@/components/portal/portal-success-center-workspace";

export default function PortalSuccessCenterPage() {
  return (
    <div className="grid gap-4">
      <PortalPageIntro
        eyebrow="Client Success"
        title="Success Center"
        description="An executive command center for project progress, onboarding, approvals, assets, meetings, invoices, risks, and launch readiness."
      />
      <PortalSuccessCenterWorkspace />
    </div>
  );
}
