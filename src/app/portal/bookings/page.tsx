import {
  PortalBookings,
  PortalPageIntro,
} from "@/components/portal/portal-cards";

export default function PortalBookingsPage() {
  return (
    <div className="grid gap-4">
      <PortalPageIntro
        title="Meeting Scheduler"
        description="Manage upcoming sessions, agenda notes, confirmation status, reschedule requests, and new booking paths from one client workspace."
      />
      <PortalBookings />
    </div>
  );
}
