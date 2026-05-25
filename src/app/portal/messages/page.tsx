import {
  MessagesLayer,
  PortalPageIntro,
} from "@/components/portal/portal-cards";

export default function PortalMessagesPage() {
  return (
    <div className="grid gap-4">
      <PortalPageIntro
        title="Client Messages"
        description="Lightweight project communication for update notes, revision requests, and operational comments."
      />
      <MessagesLayer />
    </div>
  );
}
