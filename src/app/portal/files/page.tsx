import {
  FileCategories,
  FileUploadCenter,
  PortalPageIntro,
} from "@/components/portal/portal-cards";

export default function PortalFilesPage() {
  return (
    <div className="grid gap-4">
      <PortalPageIntro
        title="File Upload Center"
        description="A clean asset hub for images, PDFs, logos, references, contracts, and future Supabase-backed client storage."
      />
      <FileCategories />
      <FileUploadCenter />
    </div>
  );
}
