import {
  DashboardOverview,
  Panel,
  PortalPageIntro,
} from "@/components/portal/portal-cards";

export default function PortalHomePage() {
  return (
    <div className="grid gap-4">
      <PortalPageIntro
        title="DAYIIIatch Client Workspace"
        description="A premium operational workspace foundation for project visibility, assets, messages, meetings, and future Damarko-assisted client guidance."
      />
      <Panel title="Portal Access Preview" eyebrow="Workspace Foundation">
        <div className="rounded-2xl border border-cyan-300/14 bg-cyan-400/8 px-4 py-4 text-sm leading-6 text-zinc-200">
          Client authentication, storage, and project-specific permissions can
          connect here next. This v1 establishes the route structure and
          operational workspace UI.
        </div>
      </Panel>
      <DashboardOverview />
    </div>
  );
}
