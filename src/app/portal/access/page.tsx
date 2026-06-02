import type { Metadata } from "next";

import SiteShell from "@/components/layout/site-shell";
import PortalAccessWorkspace from "@/components/portal/portal-access-workspace";

export const metadata: Metadata = {
  title: "Client Login | DAYIIIatch Workspace OS",
  description:
    "Client sign-in and workspace access request page for the DAYIIIatch Workspace OS.",
};

export default function PortalAccessPage() {
  return (
    <SiteShell fixedMainBackground compactMobileSpacing publicThemeSurface>
      <main className="grid gap-4">
        <PortalAccessWorkspace />
      </main>
    </SiteShell>
  );
}
