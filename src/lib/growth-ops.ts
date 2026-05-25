export const leadSources = [
  "Fiverr",
  "Upwork",
  "LinkedIn",
  "Direct",
  "Referral",
  "Audit PDF",
] as const;

export type LeadSource = (typeof leadSources)[number];

export const pipelineStages = [
  "New Lead",
  "Contacted",
  "Discovery Scheduled",
  "Proposal Sent",
  "Active Build",
  "Completed",
] as const;

export type PipelineStage = (typeof pipelineStages)[number];

const sourceAliases: Record<string, LeadSource> = {
  fiverr: "Fiverr",
  upwork: "Upwork",
  linkedin: "LinkedIn",
  linked_in: "LinkedIn",
  direct: "Direct",
  website: "Direct",
  referral: "Referral",
  refer: "Referral",
  audit: "Audit PDF",
  audit_pdf: "Audit PDF",
  "audit-pdf": "Audit PDF",
  pdf: "Audit PDF",
};

export function normalizeLeadSource(value: unknown): LeadSource {
  const raw = String(value ?? "").trim();
  if (!raw) return "Direct";

  const exact = leadSources.find(
    (source) => source.toLowerCase() === raw.toLowerCase(),
  );

  if (exact) return exact;

  const normalized = raw.toLowerCase().replace(/[\s-]+/g, "_");
  return sourceAliases[normalized] ?? "Direct";
}

export function buildGrowthMetadata({
  source,
  pipelineStage = "New Lead",
}: {
  source: LeadSource;
  pipelineStage?: PipelineStage;
}) {
  return [`Growth Source: ${source}`, `Pipeline Stage: ${pipelineStage}`].join(
    "\n",
  );
}

export function appendGrowthMetadata(
  details: string,
  metadata: { source: LeadSource; pipelineStage?: PipelineStage },
) {
  const cleanDetails = details.trim() || "No notes provided.";
  return `${cleanDetails}\n\n--- Growth Ops ---\n${buildGrowthMetadata(
    metadata,
  )}`;
}

export function extractGrowthSource(details?: string | null): LeadSource {
  const match = String(details ?? "").match(/^Growth Source:\s*(.+)$/im);
  return normalizeLeadSource(match?.[1]);
}

export function extractPipelineStage(
  details?: string | null,
): PipelineStage | null {
  const match = String(details ?? "").match(/^Pipeline Stage:\s*(.+)$/im);
  const value = String(match?.[1] ?? "").trim();
  return pipelineStages.find((stage) => stage === value) ?? null;
}

export function derivePipelineStage({
  service,
  status,
  details,
}: {
  service: string;
  status: string;
  details?: string | null;
}): PipelineStage {
  const embeddedStage = extractPipelineStage(details);
  if (embeddedStage) return embeddedStage;

  if (status === "completed") return "Completed";
  if (status === "pending") return "New Lead";
  if (status === "confirmed" && service === "premium-session") {
    return "Proposal Sent";
  }
  if (status === "confirmed") return "Discovery Scheduled";

  return "Contacted";
}

export function getTrackingAttributes({
  source = "Direct",
  event,
  ctaType,
  target,
}: {
  source?: LeadSource;
  event: string;
  ctaType?: string;
  target?: string;
}) {
  return {
    "data-growth-source": source,
    "data-growth-event": event,
    "data-cta-type": ctaType,
    "data-growth-target": target,
  };
}
