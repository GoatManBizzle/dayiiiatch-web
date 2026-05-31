import {
  FileCategories,
  FileUploadCenter,
  PortalPageIntro,
} from "@/components/portal/portal-cards";

export default function PortalFilesPage() {
  return (
    <div className="grid gap-4">
      <PortalPageIntro
        title="Client Asset Center"
        description="Upload, review, replace, and organize brand assets, references, contracts, deliverables, and media files in one client workspace."
      />
      <FileCategories />
      <FileUploadCenter />
    </div>
  );
}
