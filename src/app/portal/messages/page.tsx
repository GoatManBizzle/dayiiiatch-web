import {
  MessagesLayer,
  PortalPageIntro,
} from "@/components/portal/portal-cards";

export default function PortalMessagesPage() {
  return (
    <div className="grid gap-4">
      <PortalPageIntro
        title="Communication Workspace"
        description="Track project updates, asset reviews, revision requests, and launch prep conversations in one clean client message center."
      />
      <MessagesLayer />
    </div>
  );
}
