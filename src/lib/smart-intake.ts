export type SmartServiceType =
  | "Website Build"
  | "Automation"
  | "Branding"
  | "AI Systems";

export const smartServiceTypes: SmartServiceType[] = [
  "Website Build",
  "Automation",
  "Branding",
  "AI Systems",
];

export const serviceQuestions: Record<
  SmartServiceType,
  { primary: string; secondary: string; systems: string[]; goals: string[] }
> = {
  "Website Build": {
    primary: "What kind of site do you need?",
    secondary: "What pages or conversion paths matter most?",
    systems: ["Homepage", "Services", "Booking", "Pricing", "Contact"],
    goals: ["Trust", "Lead capture", "Bookings", "Portfolio proof"],
  },
  Automation: {
    primary: "What process feels too manual right now?",
    secondary: "Where should the workflow handoff or notification happen?",
    systems: ["Intake", "Email", "Admin view", "Reminders", "Exports"],
    goals: ["Less back-and-forth", "Cleaner handoff", "Faster response"],
  },
  Branding: {
    primary: "What visual direction needs the most clarity?",
    secondary: "What content or proof assets should feel more consistent?",
    systems: ["Logo usage", "Color direction", "Content flow", "Proof assets"],
    goals: ["Visual trust", "Offer clarity", "Premium presentation"],
  },
  "AI Systems": {
    primary: "What should AI help you create, organize, or automate?",
    secondary: "What tools, prompts, or dashboards need to connect?",
    systems: ["Prompt flows", "Dashboards", "Content support", "Internal tools"],
    goals: ["AI assistance", "Workflow speed", "Reusable systems"],
  },
};

export type SmartIntakeValues = {
  serviceType: SmartServiceType | "";
  primaryAnswer: string;
  secondaryAnswer: string;
  selectedSystems: string[];
  urgency: string;
  budget: string;
  goals: string[];
};

export function getComplexityTags(values: SmartIntakeValues) {
  const tags = new Set<string>();

  if (!values.serviceType) return ["New Lead"];

  if (values.serviceType === "Branding") tags.add("Branding Focused");
  if (values.serviceType === "AI Systems") tags.add("AI Assisted");
  if (values.serviceType === "Automation") tags.add("Automation Heavy");

  if (values.selectedSystems.length >= 4 || values.goals.length >= 3) {
    tags.add("Medium Infrastructure");
  } else {
    tags.add("Small Build");
  }

  return Array.from(tags);
}

export function getRecommendedNextStep(values: SmartIntakeValues) {
  if (values.urgency === "This week" || values.budget === "$5k+") {
    return "Premium planning session";
  }

  if (
    values.serviceType === "Automation" ||
    values.serviceType === "AI Systems"
  ) {
    return "Discovery call with workflow map";
  }

  return "Free clarity call";
}

export function buildSmartIntakeSummary(values: SmartIntakeValues) {
  const complexity = getComplexityTags(values);
  const recommendedNextStep = getRecommendedNextStep(values);

  return [
    "--- Smart Intake ---",
    `Service Type: ${values.serviceType || "Unselected"}`,
    `Primary Need: ${values.primaryAnswer || "N/A"}`,
    `Secondary Context: ${values.secondaryAnswer || "N/A"}`,
    `Selected Systems: ${values.selectedSystems.join(", ") || "N/A"}`,
    `Project Goals: ${values.goals.join(", ") || "N/A"}`,
    `Urgency: ${values.urgency || "N/A"}`,
    `Budget Range: ${values.budget || "N/A"}`,
    `Complexity Tags: ${complexity.join(", ")}`,
    `Recommended Next Step: ${recommendedNextStep}`,
  ].join("\n");
}

function readLine(details: string, label: string) {
  const match = details.match(new RegExp(`^${label}:\\s*(.+)$`, "im"));
  return match?.[1]?.trim() || "";
}

export function parseSmartIntakeSummary(details?: string | null) {
  const source = String(details ?? "");

  return {
    serviceType: readLine(source, "Service Type"),
    clientGoals: readLine(source, "Project Goals"),
    selectedSystems: readLine(source, "Selected Systems"),
    urgency: readLine(source, "Urgency"),
    complexity: readLine(source, "Complexity Tags"),
    recommendedNextStep: readLine(source, "Recommended Next Step"),
    hasSummary: source.includes("--- Smart Intake ---"),
  };
}
