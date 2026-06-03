import {
  FileCategories,
  FileUploadCenter,
  PortalPageIntro,
} from "@/components/portal/portal-cards";
import PortalStorageFileCenter from "@/components/portal/portal-storage-file-center";
import { getCurrentPortalClient } from "@/lib/portal-client";

export const dynamic = "force-dynamic";

export default async function PortalFilesPage() {
  const portalClient = await getCurrentPortalClient();

  return (
    <div data-style-section="portal-files" className="grid gap-4">
      <PortalPageIntro
        title="Client Asset Center"
        description="Upload, review, replace, and organize brand assets, references, contracts, deliverables, and media files in one client workspace."
      />
      {portalClient.mode === "auth" && portalClient.client_id ? (
        <PortalStorageFileCenter
          clientId={portalClient.client_id}
          projects={portalClient.workspaceData.projects}
          initialFiles={portalClient.workspaceData.files}
        />
      ) : (
        <>
          <FileCategories />
          <FileUploadCenter />
        </>
      )}
    </div>
  );
}
