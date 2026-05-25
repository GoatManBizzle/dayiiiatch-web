import type { Booking } from "@/components/admin/booking-types";
import {
  derivePipelineStage,
  extractGrowthSource,
  type LeadSource,
} from "@/lib/growth-ops";
import { parseSmartIntakeSummary } from "@/lib/smart-intake";

export type LeadHeat = "Cold" | "Warm" | "Hot" | "Priority";

function countBy<T extends string>(items: T[]) {
  return items.reduce<Record<T, number>>(
    (counts, item) => ({
      ...counts,
      [item]: (counts[item] ?? 0) + 1,
    }),
    {} as Record<T, number>,
  );
}

function topEntry<T extends string>(counts: Record<T, number>) {
  return (
    Object.entries(counts).sort((a, b) => Number(b[1]) - Number(a[1]))[0] ?? [
      "N/A",
      0,
    ]
  );
}

export function getLeadHeat(booking: Booking): {
  heat: LeadHeat;
  score: number;
  reasons: string[];
} {
  const summary = parseSmartIntakeSummary(booking.details);
  const source = extractGrowthSource(booking.details);
  const detailsLength = String(booking.details ?? "").trim().length;
  let score = 0;
  const reasons: string[] = [];

  if (booking.service === "premium-session") {
    score += 3;
    reasons.push("Premium path");
  }

  if (summary.urgency === "This week") {
    score += 3;
    reasons.push("High urgency");
  } else if (summary.urgency === "This month") {
    score += 2;
    reasons.push("Near-term timeline");
  }

  if (detailsLength > 420) {
    score += 2;
    reasons.push("Detailed inquiry");
  } else if (detailsLength > 180) {
    score += 1;
    reasons.push("Useful context");
  }

  if (summary.complexity.includes("Automation Heavy")) {
    score += 2;
    reasons.push("Automation signal");
  }

  if (summary.complexity.includes("AI Assisted")) {
    score += 2;
    reasons.push("AI systems signal");
  }

  if (source === "Audit PDF" || source === "Referral") {
    score += 1;
    reasons.push(`${source} source`);
  }

  if (summary.recommendedNextStep.includes("Premium")) {
    score += 2;
    reasons.push("Premium recommended");
  }

  if (score >= 8) return { heat: "Priority", score, reasons };
  if (score >= 5) return { heat: "Hot", score, reasons };
  if (score >= 2) return { heat: "Warm", score, reasons };
  return { heat: "Cold", score, reasons: reasons.length ? reasons : ["Low context"] };
}

export function buildOperationalIntelligence(bookings: Booking[]) {
  const activeBookings = bookings.filter(
    (booking) => booking.status !== "cancelled",
  );
  const serviceCounts = countBy(
    activeBookings.map((booking) => booking.service_label || booking.service),
  );
  const sourceCounts = countBy(
    activeBookings.map((booking) => extractGrowthSource(booking.details)),
  );
  const pipelineCounts = countBy(
    activeBookings.map((booking) =>
      derivePipelineStage({
        service: booking.service,
        status: booking.status,
        details: booking.details,
      }),
    ),
  );
  const inquiryTypes = countBy(
    activeBookings.map((booking) => {
      const summary = parseSmartIntakeSummary(booking.details);
      return summary.serviceType || booking.service_label || "Unknown";
    }),
  );
  const leadHeat = activeBookings.map(getLeadHeat);
  const heatCounts = countBy(leadHeat.map((item) => item.heat));
  const [topService, topServiceCount] = topEntry(serviceCounts);
  const [topSource, topSourceCount] = topEntry(sourceCounts as Record<LeadSource, number>);
  const [topPipeline, topPipelineCount] = topEntry(pipelineCounts);
  const [topInquiryType, topInquiryCount] = topEntry(inquiryTypes);
  const auditCount = Number(sourceCounts["Audit PDF"] ?? 0);
  const premiumCount = activeBookings.filter(
    (booking) => booking.service === "premium-session",
  ).length;
  const freeCallCount = activeBookings.filter(
    (booking) => booking.service === "free-call",
  ).length;
  const priorityCount = Number(heatCounts.Priority ?? 0);
  const hotCount = Number(heatCounts.Hot ?? 0);
  const mobilePreference =
    activeBookings.filter((booking) =>
      String(booking.details ?? "").toLowerCase().includes("mobile"),
    ).length || "Watch";

  const recommendationCards = [
    auditCount > 0
      ? "Audit checklist engagement is creating measurable source signal."
      : "Audit checklist is ready to become a stronger lead source.",
    premiumCount >= freeCallCount && premiumCount > 0
      ? "Premium session demand is rising. Keep deep-planning CTAs visible."
      : "Free call remains the clearest low-friction entry point.",
    String(topInquiryType).toLowerCase().includes("automation")
      ? "Automation inquiries are increasing. Prepare workflow-map templates."
      : "Keep using Smart Intake to identify automation opportunities earlier.",
  ];

  return {
    opportunitySignals: [
      {
        label: "Most Selected Service",
        value: String(topService),
        detail: `${topServiceCount} active lead(s)`,
      },
      {
        label: "Most Common Lead Source",
        value: String(topSource),
        detail: `${topSourceCount} tracked source hit(s)`,
      },
      {
        label: "Highest Interaction CTA",
        value: premiumCount > freeCallCount ? "Premium Session" : "Book Free Call",
        detail: "Derived from booking path mix",
      },
      {
        label: "Audit Checklist Engagement",
        value: auditCount,
        detail: "Audit PDF sourced bookings",
      },
      {
        label: "Mobile Booking Preference",
        value: mobilePreference,
        detail: "Detected from inquiry language",
      },
    ],
    insightCards: [
      {
        label: "Highest Converting Path",
        value: premiumCount > freeCallCount ? "Premium Session" : "Free Call",
        detail: `${Math.max(premiumCount, freeCallCount)} active booking(s)`,
      },
      {
        label: "Most Active Funnel",
        value: String(topSource),
        detail: `${topSourceCount} tracked lead(s)`,
      },
      {
        label: "Fastest Response Window",
        value: "24-48h",
        detail: "Current public promise",
      },
      {
        label: "Current Lead Momentum",
        value: priorityCount + hotCount,
        detail: "Hot or priority leads",
      },
      {
        label: "Top Inquiry Type",
        value: String(topInquiryType),
        detail: `${topInquiryCount} detected lead(s)`,
      },
    ],
    recommendationCards,
    leadHeatCounts: heatCounts,
    topPipeline: {
      label: String(topPipeline),
      count: topPipelineCount,
    },
  };
}
