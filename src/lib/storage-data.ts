import { createActivityEvent } from "@/lib/activity-events";
import { createBrowserSupabaseClient } from "@/lib/portal-auth";
import type { FileRow } from "@/types/workspace";

export const storageBuckets = [
  "client-files",
  "deliverables",
  "brand-assets",
  "project-references",
] as const;

export type StorageBucket = (typeof storageBuckets)[number];

export type UploadCategory =
  | "Brand Assets"
  | "Project References"
  | "Contracts"
  | "Deliverables"
  | "Media Uploads";

const categoryBucketMap: Record<UploadCategory, StorageBucket> = {
  "Brand Assets": "brand-assets",
  "Project References": "project-references",
  Contracts: "client-files",
  Deliverables: "deliverables",
  "Media Uploads": "client-files",
};

function cleanPathPart(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getStorageBucketForCategory(category: UploadCategory) {
  return categoryBucketMap[category] ?? "client-files";
}

export function buildClientStoragePath({
  clientId,
  projectId,
  category,
  fileName,
}: {
  clientId: string;
  projectId?: string | null;
  category: string;
  fileName: string;
}) {
  return [
    clientId,
    projectId ? cleanPathPart(projectId) : "general",
    cleanPathPart(category),
    `${Date.now()}-${cleanPathPart(fileName)}`,
  ].join("/");
}

export async function uploadWorkspaceFile({
  clientId,
  projectId,
  category,
  file,
}: {
  clientId: string;
  projectId?: string | null;
  category: UploadCategory;
  file: File;
}) {
  const supabase = createBrowserSupabaseClient();

  if (!supabase) {
    return { fileRow: null, error: "Supabase is not configured." };
  }

  const bucket = getStorageBucketForCategory(category);
  const storagePath = buildClientStoragePath({
    clientId,
    projectId,
    category,
    fileName: file.name,
  });

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(storagePath, file, {
      contentType: file.type || undefined,
      upsert: false,
    });

  if (uploadError) {
    return { fileRow: null, error: uploadError.message };
  }

  const { data, error: insertError } = await supabase
    .from("files")
    .insert({
      client_id: clientId,
      project_id: projectId ?? null,
      file_name: file.name,
      file_type: file.type || "application/octet-stream",
      storage_path: `${bucket}/${storagePath}`,
      category,
      status: "received",
    })
    .select("*")
    .single();

  if (insertError) {
    return { fileRow: null, error: insertError.message };
  }

  await createActivityEvent({
    clientId,
    projectId,
    actorRole: "client",
    actorName: "Client",
    eventType: "file_uploaded",
    title: "File uploaded",
    description: `${file.name} was uploaded to ${category}.`,
    metadata: {
      file_id: data.id,
      record_label: file.name,
      category,
      file_type: file.type || "application/octet-stream",
    },
  });

  return { fileRow: data as FileRow, error: null };
}

function splitStoragePath(storagePath: string) {
  const [bucket, ...pathParts] = storagePath.split("/");
  return {
    bucket: bucket as StorageBucket,
    path: pathParts.join("/"),
  };
}

export async function createFileSignedUrl(file: FileRow, expiresIn = 600) {
  const supabase = createBrowserSupabaseClient();

  if (!supabase) {
    return { url: null, error: "Supabase is not configured." };
  }

  const { bucket, path } = splitStoragePath(file.storage_path);
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, expiresIn);

  return { url: data?.signedUrl ?? null, error: error?.message ?? null };
}

export async function downloadWorkspaceFile(file: FileRow) {
  const { url, error } = await createFileSignedUrl(file);

  if (url) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return { url, error };
}
