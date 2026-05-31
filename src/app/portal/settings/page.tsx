import {
  PortalPageIntro,
  PortalSettingsWorkspace,
} from "@/components/portal/portal-cards";

export default function PortalSettingsPage() {
  return (
    <div className="grid gap-4">
      <PortalPageIntro
        title="Workspace Settings"
        description="Preview client roles, team access, notification preferences, and future permission rules before real account management is connected."
      />
      <PortalSettingsWorkspace />
    </div>
  );
}
