import {
  DashboardOverview,
  PortalPageIntro,
} from "@/components/portal/portal-cards";

export default function PortalDashboardPage() {
  return (
    <div className="grid gap-4">
      <PortalPageIntro
        title="Client Dashboard"
        description="Project health, updates, meetings, recent uploads, and operational status in one clean workspace view."
      />
      <DashboardOverview />
    </div>
  );
}
