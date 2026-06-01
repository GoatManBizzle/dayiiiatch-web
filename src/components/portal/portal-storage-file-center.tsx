"use client";

import { useRef, useState } from "react";

import {
  createFileSignedUrl,
  downloadWorkspaceFile,
  uploadWorkspaceFile,
  type UploadCategory,
} from "@/lib/storage-data";
import type { FileRow, ProjectRow } from "@/types/workspace";

const categories: UploadCategory[] = [
  "Brand Assets",
  "Project References",
  "Contracts",
  "Deliverables",
  "Media Uploads",
];

function StatusPill({ status }: { status: string }) {
  return (
    <span className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-cyan-100">
      {status.replaceAll("_", " ")}
    </span>
  );
}

export default function PortalStorageFileCenter({
  clientId,
  projects,
  initialFiles,
}: {
  clientId: string;
  projects: ProjectRow[];
  initialFiles: FileRow[];
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileRow[]>(initialFiles);
  const [category, setCategory] = useState<UploadCategory>("Project References");
  const [projectId, setProjectId] = useState(projects[0]?.id ?? "");
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  async function uploadFiles(fileList: FileList | null) {
    if (!fileList?.length) return;

    setIsUploading(true);
    setMessage("");

    const uploadedRows: FileRow[] = [];

    for (const file of Array.from(fileList)) {
      const result = await uploadWorkspaceFile({
        clientId,
        projectId: projectId || null,
        category,
        file,
      });

      if (result.error) {
        setMessage(result.error);
      }

      if (result.fileRow) {
        uploadedRows.push(result.fileRow);
      }
    }

    if (uploadedRows.length > 0) {
      setFiles((current) => [...uploadedRows, ...current]);
      setMessage(`${uploadedRows.length} file uploaded.`);
    }

    setIsUploading(false);
  }

  async function openPreview(file: FileRow) {
    const result = await createFileSignedUrl(file);

    if (result.url) {
      window.open(result.url, "_blank", "noopener,noreferrer");
    } else if (result.error) {
      setMessage(result.error);
    }
  }

  async function downloadFile(file: FileRow) {
    const result = await downloadWorkspaceFile(file);

    if (result.error) {
      setMessage(result.error);
    }
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
      <section className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(34,211,238,0.06)] backdrop-blur-xl sm:p-5">
        <div
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            void uploadFiles(event.dataTransfer.files);
          }}
          className="rounded-[1.25rem] border border-dashed border-cyan-300/28 bg-cyan-400/[0.07] p-5 text-center shadow-[inset_0_0_28px_rgba(34,211,238,0.06)] sm:p-7"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/25 bg-black/28 text-2xl font-black text-cyan-100">
            +
          </div>
          <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
            Real Upload Center
          </p>
          <h2 className="mt-3 text-2xl font-black text-white">
            Upload project assets to begin.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-zinc-300">
            Files are staged for Supabase Storage under
            client_id/project_id/category/file_name and recorded in the files
            table for portal visibility.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <label className="grid gap-2 text-left">
              <span className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                Category
              </span>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value as UploadCategory)}
                className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300/45"
              >
                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-left">
              <span className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                Project
              </span>
              <select
                value={projectId}
                onChange={(event) => setProjectId(event.target.value)}
                className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300/45"
              >
                <option value="">General workspace</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <input
            ref={inputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(event) => void uploadFiles(event.target.files)}
          />

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={isUploading}
            className="mt-6 rounded-2xl border border-cyan-300/28 bg-cyan-400/12 px-5 py-3 text-sm font-black text-cyan-100 transition hover:-translate-y-0.5 hover:bg-cyan-400/18 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isUploading ? "Uploading..." : "Select Files"}
          </button>
        </div>

        {message ? (
          <p className="mt-4 rounded-2xl border border-white/10 bg-black/24 px-4 py-3 text-xs leading-5 text-zinc-300">
            {message}
          </p>
        ) : null}
      </section>

      <section className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(124,58,237,0.06)] backdrop-blur-xl sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-200">
              Files Table
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              Client Uploads
            </h2>
          </div>
          <span className="rounded-full border border-cyan-300/18 bg-cyan-400/[0.07] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-cyan-100">
            {files.length} files
          </span>
        </div>

        <div className="mt-4 grid gap-3">
          {files.length === 0 ? (
            <div className="rounded-2xl border border-cyan-300/14 bg-cyan-400/[0.06] p-5">
              <p className="font-black text-white">
                Upload project assets to begin.
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-300">
                Your files will appear here after upload with signed URL view
                and download actions.
              </p>
            </div>
          ) : (
            files.map((file) => (
              <article
                key={file.id}
                className="min-w-0 rounded-2xl border border-white/10 bg-black/24 p-3"
              >
                <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="min-w-0 break-words font-black text-white">
                        {file.file_name}
                      </p>
                      <StatusPill status={file.status} />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs font-bold uppercase tracking-[0.12em] text-zinc-500">
                      <span>{file.category}</span>
                      <span>{file.file_type ?? "file"}</span>
                      <span>{new Date(file.uploaded_at).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-end">
                    <button
                      type="button"
                      onClick={() => void openPreview(file)}
                      className="rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-black text-zinc-200 transition hover:border-cyan-300/28 hover:bg-cyan-400/10 hover:text-cyan-100"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      onClick={() => void downloadFile(file)}
                      className="rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-black text-zinc-200 transition hover:border-cyan-300/28 hover:bg-cyan-400/10 hover:text-cyan-100"
                    >
                      Download
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
