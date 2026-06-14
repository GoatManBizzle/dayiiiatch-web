"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import { links } from "@/config/links";
import { normalizeLeadSource, type LeadSource } from "@/lib/growth-ops";

type Interest = "Website" | "Booking / Automation" | "Branding" | "AI Workflow" | "Not Sure";
type Urgency = "This week" | "This month" | "Planning ahead";
type Goal = "Quick clarity" | "Deep planning" | "Full build";
type Recommendation = {
  label: string;
  href: string;
  path: "free-call" | "premium-session" | "project-inquiry" | "audit-checklist";
  reason: string;
};

const interests: Interest[] = [
  "Website",
  "Booking / Automation",
  "Branding",
  "AI Workflow",
  "Not Sure",
];

const urgencies: Urgency[] = ["This week", "This month", "Planning ahead"];
const goals: Goal[] = ["Quick clarity", "Deep planning", "Full build"];

function getRecommendation(
  interest: Interest | "",
  urgency: Urgency | "",
  goal: Goal | "",
): Recommendation {
  if (!interest || !urgency || !goal) {
    return {
      label: "Download Audit Checklist",
      href: "#checklist-capture",
      path: "audit-checklist",
      reason: "Start with a lightweight audit to get clearer before choosing a build path.",
    };
  }

  if (goal === "Quick clarity" || interest === "Not Sure") {
    return {
      label: "Book Free Call",
      href: links.freeCall,
      path: "free-call",
      reason: "Based on your answers, this path gives you the fastest clarity.",
    };
  }

  if (goal === "Deep planning" || urgency === "This week") {
    return {
      label: "Premium Session",
      href: links.premiumSession,
      path: "premium-session",
      reason: "Your answers point to a planning-heavy path where a deeper session will save time.",
    };
  }

  if (goal === "Full build") {
    return {
      label: "Send Project Inquiry",
      href: links.contactForm,
      path: "project-inquiry",
      reason: "This looks like a build request, so the project inquiry gives the cleanest next step.",
    };
  }

  return {
    label: "Download Audit Checklist",
    href: "#checklist-capture",
    path: "audit-checklist",
    reason: "The audit checklist will help frame the next decision before a call.",
  };
}

export default function DamarkoAssistant() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [interest, setInterest] = useState<Interest | "">("");
  const [urgency, setUrgency] = useState<Urgency | "">("");
  const [goal, setGoal] = useState<Goal | "">("");
  const [leadSource] = useState<LeadSource>(() => {
    if (typeof window === "undefined") return "Direct";
    return normalizeLeadSource(
      new URLSearchParams(window.location.search).get("source"),
    );
  });
  const isDev = useMemo(() => process.env.NODE_ENV !== "production", []);

  if (pathname !== "/") return null;

  const recommendation = getRecommendation(interest, urgency, goal);
  const complete = Boolean(interest && urgency && goal);

  function withSource(href: string) {
    if (href.startsWith("#")) return href;
    const separator = href.includes("?") ? "&" : "?";
    return `${href}${separator}source=${encodeURIComponent(leadSource)}`;
  }

  return (
    <aside
      className={`promo-floating fixed left-3 z-[var(--z-damarko)] w-[calc(100vw-1.5rem)] max-w-sm transition duration-500 sm:left-5 ${
        isDev ? "bottom-56 sm:bottom-24" : "bottom-24 sm:bottom-5"
      }`}
      aria-label="Damarko guided assistant"
    >
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          data-growth-event="assistant-open"
          data-growth-source={leadSource}
          className="inline-flex min-h-12 items-center gap-3 rounded-full border border-violet-300/30 bg-[#0b0718]/88 px-4 py-3 text-left text-sm font-black text-cyan-50 shadow-[0_0_34px_rgba(168,85,247,0.20),0_0_24px_rgba(34,211,238,0.10)] backdrop-blur-2xl transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/45 hover:bg-violet-500/16 active:scale-[0.98]"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-violet-300 shadow-[0_0_16px_rgba(168,85,247,0.55)]" />
          Ask Damarko
        </button>
      ) : (
        <div className="relative overflow-hidden rounded-[1.35rem] border border-violet-300/24 bg-[#0b0718]/92 p-3 shadow-[0_0_48px_rgba(168,85,247,0.22),0_0_28px_rgba(34,211,238,0.10)] backdrop-blur-2xl sm:p-4">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_0%,rgba(168,85,247,0.20),transparent_34%),radial-gradient(circle_at_90%_12%,rgba(34,211,238,0.14),transparent_32%)]" />
          <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-violet-200">
                Project Damarko AI
              </p>
              <h3 className="mt-1 text-lg font-black text-white">
                Intelligent next-step routing
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-xl border border-white/10 bg-white/[0.055] px-3 py-2 text-xs font-bold text-zinc-300 hover:bg-white/10"
            >
              Close
            </button>
          </div>

          <div className="mt-3 grid gap-3">
            <ChoiceGroup
              label="What do you need help with?"
              options={interests}
              value={interest}
              onChange={(value) => setInterest(value as Interest)}
            />

            {interest && (
              <ChoiceGroup
                label="How urgent is it?"
                options={urgencies}
                value={urgency}
                onChange={(value) => setUrgency(value as Urgency)}
              />
            )}

            {interest && urgency && (
              <ChoiceGroup
                label="What kind of help do you want?"
                options={goals}
                value={goal}
                onChange={(value) => setGoal(value as Goal)}
              />
            )}
          </div>

          <div className="mt-4 rounded-2xl border border-violet-300/22 bg-violet-500/12 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-violet-100">
              Recommendation
            </p>
            <p className="mt-2 text-sm font-bold leading-5 text-white">
              {complete ? recommendation.label : "Answer the prompts for a guided path."}
            </p>
            <p className="mt-2 text-xs leading-5 text-zinc-400">
              {recommendation.reason}
            </p>

            <a
              href={withSource(recommendation.href)}
              data-growth-event="assistant-recommendation-click"
              data-growth-source={leadSource}
              data-assistant-interest={interest || "Unanswered"}
              data-assistant-urgency={urgency || "Unanswered"}
              data-assistant-goal={goal || "Unanswered"}
              data-recommended-path={recommendation.path}
              className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-2xl border border-cyan-300/32 bg-gradient-to-r from-violet-500/20 to-cyan-400/14 px-4 py-2.5 text-center text-xs font-black text-cyan-50 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-200/50 hover:shadow-[0_0_24px_rgba(34,211,238,0.16)] active:scale-[0.98]"
            >
              {complete ? recommendation.label : "Start with Checklist"}
            </a>
          </div>
        </div>
      )}
    </aside>
  );
}

function ChoiceGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-[10px] font-black uppercase tracking-[0.14em] text-zinc-400">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = value === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`rounded-full border px-3 py-2 text-[11px] font-bold transition duration-300 active:scale-[0.98] ${
                active
                  ? "border-cyan-300/45 bg-cyan-400/16 text-cyan-50 shadow-[0_0_18px_rgba(34,211,238,0.12)]"
                  : "border-white/10 bg-white/[0.045] text-zinc-300 hover:border-cyan-300/24 hover:bg-cyan-400/8"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
