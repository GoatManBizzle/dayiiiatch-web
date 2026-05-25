import {
  PortalBookings,
  PortalPageIntro,
} from "@/components/portal/portal-cards";

export default function PortalBookingsPage() {
  return (
    <div className="grid gap-4">
      <PortalPageIntro
        title="Client Bookings"
        description="Meeting visibility and scheduler actions connected to the existing DAYIIIatch booking path."
      />
      <PortalBookings />
    </div>
  );
}
