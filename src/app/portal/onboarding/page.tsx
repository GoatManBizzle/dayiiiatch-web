import { PortalPageIntro } from "@/components/portal/portal-cards";
import PortalOnboardingWorkspace from "@/components/portal/portal-onboarding-workspace";

export default function PortalOnboardingPage() {
  return (
    <div className="grid gap-4">
      <PortalPageIntro
        eyebrow="Client Onboarding"
        title="Onboarding Center"
        description="Guide new clients through kickoff preparation, required assets, onboarding tasks, and the operational route from discovery to launch."
      />
      <PortalOnboardingWorkspace />
    </div>
  );
}
