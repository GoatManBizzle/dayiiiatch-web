"use client";

import { links } from "@/config/links";
import { getCtaToneClass } from "@/components/ui/cta-tone";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import NeonImageButton from "../ui/neon-image-button";
import { normalizeLeadSource, type LeadSource } from "@/lib/growth-ops";
import {
  buildSmartIntakeSummary,
  getComplexityTags,
  getRecommendedNextStep,
  serviceQuestions,
  smartServiceTypes,
  type SmartIntakeValues,
  type SmartServiceType,
} from "@/lib/smart-intake";

type SubmitState = "idle" | "loading" | "success" | "error";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mdayoagd";

const contactTrustNotes = [
  "No spam.",
  "Clear next steps.",
  "Response window: 24-48 hours.",
  "If urgent, book a call.",
];

type FloatingFieldProps = {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
};

function FloatingField({
  id,
  name,
  label,
  type = "text",
  required = false,
  disabled = false,
  value,
  onChange,
  multiline = false,
  rows = 6,
  placeholder = " ",
}: FloatingFieldProps) {
  const sharedClassName =
    "peer w-full rounded-2xl border border-white/10 bg-black/35 px-4 pb-3 pt-6 text-base text-white placeholder:text-transparent outline-none backdrop-blur-md transition-all duration-300 focus:border-cyan-400/50 focus:bg-black/45 focus:shadow-[0_0_22px_rgba(34,211,238,0.12)] disabled:cursor-not-allowed disabled:opacity-70 sm:text-sm";

  const labelClassName =
    "pointer-events-none absolute left-4 top-4 origin-left text-sm text-zinc-300 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-zinc-400 peer-focus:top-2 peer-focus:scale-[0.8] peer-focus:text-cyan-300 peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:scale-[0.8] peer-[&:not(:placeholder-shown)]:text-cyan-300";

  return (
    <div className="relative">
      {multiline ? (
        <textarea
          id={id}
          name={name}
          required={required}
          disabled={disabled}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={sharedClassName}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          disabled={disabled}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={sharedClassName}
        />
      )}

      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
    </div>
  );
}

function IntakeChipGroup({
  label,
  items,
  selected,
  onToggle,
}: {
  label: string;
  items: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-zinc-400">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const active = selected.includes(item);
          return (
            <button
              key={item}
              type="button"
              onClick={() => onToggle(item)}
              className={`rounded-full border px-3 py-2 text-xs font-bold transition duration-300 active:scale-[0.98] ${
                active
                  ? "border-cyan-300/45 bg-cyan-400/16 text-cyan-50 shadow-[0_0_18px_rgba(34,211,238,0.12)]"
                  : "border-white/10 bg-white/[0.045] text-zinc-300 hover:border-cyan-300/24 hover:bg-cyan-400/8"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ContactFormSection() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successVisible, setSuccessVisible] = useState(false);
  const [successExiting, setSuccessExiting] = useState(false);
  const [leadSource, setLeadSource] = useState<LeadSource>("Direct");

  const successTimerRef = useRef<number | null>(null);
  const successExitTimerRef = useRef<number | null>(null);

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [intakeValues, setIntakeValues] = useState<SmartIntakeValues>({
    serviceType: "",
    primaryAnswer: "",
    secondaryAnswer: "",
    selectedSystems: [],
    urgency: "",
    budget: "",
    goals: [],
  });

  const activeQuestions = intakeValues.serviceType
    ? serviceQuestions[intakeValues.serviceType]
    : null;
  const complexityTags = getComplexityTags(intakeValues);
  const recommendedNextStep = getRecommendedNextStep(intakeValues);

  useEffect(() => {
    setLeadSource(
      normalizeLeadSource(
        new URLSearchParams(window.location.search).get("source"),
      ),
    );

    return () => {
      if (successTimerRef.current) {
        window.clearTimeout(successTimerRef.current);
      }

      if (successExitTimerRef.current) {
        window.clearTimeout(successExitTimerRef.current);
      }
    };
  }, []);

  const statusBox = useMemo(() => {
    if (submitState === "success" && successVisible) {
      return (
        <div
          className={`rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100 transition-all duration-500 ${
            successExiting
              ? "translate-y-2 opacity-0"
              : "translate-y-0 opacity-100"
          }`}
        >
          Inquiry transmitted successfully.
        </div>
      );
    }

    if (submitState === "error") {
      return (
        <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
          {errorMessage || "Something glitched. Please try again."}
        </div>
      );
    }

    return null;
  }, [errorMessage, submitState, successExiting, successVisible]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitState === "loading") return;

    setSubmitState("loading");
    setErrorMessage("");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formValues.name,
          email: formValues.email,
          projectType: intakeValues.serviceType,
          message: formValues.message,
          source: leadSource,
          pipelineStage: "New Lead",
          smartIntakeSummary: buildSmartIntakeSummary(intakeValues),
          complexityTags: complexityTags.join(", "),
          recommendedNextStep,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to send inquiry.");
      }

      setFormValues({
        name: "",
        email: "",
        message: "",
      });
      setIntakeValues({
        serviceType: "",
        primaryAnswer: "",
        secondaryAnswer: "",
        selectedSystems: [],
        urgency: "",
        budget: "",
        goals: [],
      });

      setSubmitState("success");
      setSuccessVisible(true);
      setSuccessExiting(false);

      if (successTimerRef.current) {
        window.clearTimeout(successTimerRef.current);
      }

      if (successExitTimerRef.current) {
        window.clearTimeout(successExitTimerRef.current);
      }

      successTimerRef.current = window.setTimeout(() => {
        setSuccessExiting(true);

        successExitTimerRef.current = window.setTimeout(() => {
          setSuccessVisible(false);
          setSuccessExiting(false);
          setSubmitState("idle");
        }, 450);
      }, 2600);
    } catch (error) {
      console.error(error);
      setSubmitState("error");
      setErrorMessage(
        "Something glitched while sending. Hit us directly below.",
      );
    }
  }

  function withSource(href: string) {
    if (href.startsWith("#")) return href;
    const separator = href.includes("?") ? "&" : "?";
    return `${href}${separator}source=${encodeURIComponent(leadSource)}`;
  }

  function setServiceType(serviceType: SmartServiceType | "") {
    setIntakeValues({
      serviceType,
      primaryAnswer: "",
      secondaryAnswer: "",
      selectedSystems: [],
      urgency: "",
      budget: "",
      goals: [],
    });
  }

  function toggleIntakeValue(key: "selectedSystems" | "goals", value: string) {
    setIntakeValues((current) => {
      const selected = current[key];
      return {
        ...current,
        [key]: selected.includes(value)
          ? selected.filter((item) => item !== value)
          : [...selected, value],
      };
    });
  }

  return (
    <section
      id="contact-form"
      className="relative mt-10 overflow-hidden rounded-[1.5rem] border border-white/10 shadow-[0_0_40px_rgba(34,211,238,0.05)] sm:rounded-[2rem] md:mt-16"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/contact-bg.png')" }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(5,8,20,0.94),rgba(9,16,36,0.86),rgba(0,90,120,0.30))]" />
      <div className="absolute inset-0 backdrop-blur-[3px]" />

      <div className="pointer-events-none absolute -left-16 top-10 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-[1px] rounded-[2rem] border border-cyan-300/10" />

      <div className="relative z-10 p-4 sm:p-8 md:p-10">
        <div className="mb-6 text-center sm:mb-8">
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/80 sm:text-sm sm:tracking-[0.25em]">
            Contact / Inquiry
          </p>

          <h3 className="mt-2 text-2xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
            Send the project details. Choose the best next step.
          </h3>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-300 sm:mt-4 sm:leading-7">
            Use the form for custom website builds, booking systems,
            automation ideas, visual direction, and digital cleanup. Need quick
            clarity first? Book the free call. Need deeper planning? Choose the
            premium session.
          </p>
        </div>

        <div className="mx-auto mb-6 grid max-w-4xl gap-3 md:grid-cols-3">
          <a
            href={withSource(links.freeCall)}
            data-growth-source={leadSource}
            data-growth-event="cta-click"
            data-cta-type="book-free-call"
            className={`rounded-2xl border px-4 py-3 text-center text-sm font-semibold transition duration-500 ease-out hover:scale-[1.012] focus:outline-none focus:ring-2 focus:ring-cyan-300/30 ${getCtaToneClass("Book Free Call", links.freeCall)}`}
          >
            Book Free Call
          </a>

          <a
            href={withSource(links.premiumSession)}
            data-growth-source={leadSource}
            data-growth-event="cta-click"
            data-cta-type="book-premium-session"
            className={`rounded-2xl border px-4 py-3 text-center text-sm font-semibold transition duration-500 ease-out hover:scale-[1.012] focus:outline-none focus:ring-2 focus:ring-cyan-300/30 ${getCtaToneClass("Book Premium Session", links.premiumSession)}`}
          >
            Book Premium Session
          </a>

          <a
            href="#services"
            data-growth-source={leadSource}
            data-growth-event="cta-click"
            data-cta-type="return-to-services"
            className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-center text-sm font-semibold text-zinc-300 transition duration-500 ease-out hover:scale-[1.008] hover:border-cyan-400/25 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-300/25"
          >
            Return to Services
          </a>
        </div>

        <div className="mx-auto mb-6 grid max-w-4xl gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {contactTrustNotes.map((note) => (
            <div
              key={note}
              className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.12em] text-zinc-300 backdrop-blur-md"
            >
              {note}
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2"
        >
          <FloatingField
            id="name"
            name="name"
            label="Name"
            required
            disabled={submitState === "loading"}
            value={formValues.name}
            onChange={(value) =>
              setFormValues((prev) => ({ ...prev, name: value }))
            }
          />

          <FloatingField
            id="email"
            name="email"
            label="Email"
            type="email"
            required
            disabled={submitState === "loading"}
            value={formValues.email}
            onChange={(value) =>
              setFormValues((prev) => ({ ...prev, email: value }))
            }
          />

          <div className="md:col-span-2">
            <div className="rounded-[1.5rem] border border-cyan-300/12 bg-black/24 p-4 shadow-[0_0_28px_rgba(34,211,238,0.05)] backdrop-blur-md sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
                    Smart Intake
                  </p>
                  <h4 className="mt-2 text-xl font-black text-white">
                    Route the project before the first call.
                  </h4>
                </div>
                <p className="max-w-md text-xs leading-5 text-zinc-400">
                  Choose the closest lane. The follow-up questions adapt so the
                  project arrives with cleaner context.
                </p>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="projectType"
                  className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-zinc-400"
                >
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="project_type"
                  value={intakeValues.serviceType}
                  disabled={submitState === "loading"}
                  onChange={(event) =>
                    setServiceType(event.target.value as SmartServiceType | "")
                  }
                  className="w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-4 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:shadow-[0_0_22px_rgba(34,211,238,0.12)]"
                >
                  <option value="">Select a service lane</option>
                  {smartServiceTypes.map((serviceType) => (
                    <option key={serviceType} value={serviceType}>
                      {serviceType}
                    </option>
                  ))}
                </select>
              </div>

              {activeQuestions && (
                <div className="mt-4 grid gap-4 transition-all duration-500 md:grid-cols-2">
                  <FloatingField
                    id="primaryAnswer"
                    name="primary_answer"
                    label={activeQuestions.primary}
                    disabled={submitState === "loading"}
                    value={intakeValues.primaryAnswer}
                    onChange={(value) =>
                      setIntakeValues((prev) => ({
                        ...prev,
                        primaryAnswer: value,
                      }))
                    }
                  />

                  <FloatingField
                    id="secondaryAnswer"
                    name="secondary_answer"
                    label={activeQuestions.secondary}
                    disabled={submitState === "loading"}
                    value={intakeValues.secondaryAnswer}
                    onChange={(value) =>
                      setIntakeValues((prev) => ({
                        ...prev,
                        secondaryAnswer: value,
                      }))
                    }
                  />

                  <IntakeChipGroup
                    label="Systems Needed"
                    items={activeQuestions.systems}
                    selected={intakeValues.selectedSystems}
                    onToggle={(value) =>
                      toggleIntakeValue("selectedSystems", value)
                    }
                  />

                  <IntakeChipGroup
                    label="Project Goals"
                    items={activeQuestions.goals}
                    selected={intakeValues.goals}
                    onToggle={(value) => toggleIntakeValue("goals", value)}
                  />

                  <select
                    value={intakeValues.urgency}
                    disabled={submitState === "loading"}
                    onChange={(event) =>
                      setIntakeValues((prev) => ({
                        ...prev,
                        urgency: event.target.value,
                      }))
                    }
                    className="rounded-2xl border border-white/10 bg-black/35 px-4 py-4 text-sm text-white outline-none transition focus:border-cyan-400/50"
                  >
                    <option value="">Urgency</option>
                    <option value="This week">This week</option>
                    <option value="This month">This month</option>
                    <option value="Planning ahead">Planning ahead</option>
                  </select>

                  <select
                    value={intakeValues.budget}
                    disabled={submitState === "loading"}
                    onChange={(event) =>
                      setIntakeValues((prev) => ({
                        ...prev,
                        budget: event.target.value,
                      }))
                    }
                    className="rounded-2xl border border-white/10 bg-black/35 px-4 py-4 text-sm text-white outline-none transition focus:border-cyan-400/50"
                  >
                    <option value="">Budget Range</option>
                    <option value="$500-$1.5k">$500-$1.5k</option>
                    <option value="$1.5k-$3k">$1.5k-$3k</option>
                    <option value="$3k-$5k">$3k-$5k</option>
                    <option value="$5k+">$5k+</option>
                  </select>

                  <div className="rounded-2xl border border-violet-300/14 bg-violet-500/8 p-4 md:col-span-2">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-100">
                      Internal Tags
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {complexityTags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-cyan-300/18 bg-cyan-400/8 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-cyan-100"
                        >
                          {tag}
                        </span>
                      ))}
                      <span className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-zinc-300">
                        {recommendedNextStep}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <FloatingField
              id="message"
              name="message"
              label="Project Details"
              required
              disabled={submitState === "loading"}
              value={formValues.message}
              onChange={(value) =>
                setFormValues((prev) => ({ ...prev, message: value }))
              }
              multiline
              rows={6}
            />
          </div>

          <div className="md:col-span-2">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 p-4 backdrop-blur-md sm:p-5">
              <div
                className="absolute inset-0 h-full w-full scale-105 bg-cover bg-center animate-[ctaDrift_18s_ease-in-out_infinite_alternate]"
                style={{
                  backgroundImage: "url('/images/contact-cta-bg.png')",
                }}
              />

              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(12,16,34,0.78),rgba(18,24,50,0.58),rgba(60,0,100,0.10))]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(34,211,238,0.10),transparent_28%),radial-gradient(circle_at_80%_40%,rgba(168,85,247,0.10),transparent_30%)]" />

              <div className="pointer-events-none absolute -left-10 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-3xl" />
              <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-cyan-400/10 blur-3xl" />

              <div className="pointer-events-none absolute inset-[1px] rounded-[1.5rem] border border-cyan-300/10" />

              <div className="relative z-10">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <p className="max-w-2xl text-xs leading-6 text-zinc-200">
                    Submit the form for custom project requests. Use the free
                    call for quick clarity, or book the premium session when
                    you want deeper planning before a build.
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2 lg:flex lg:flex-wrap lg:justify-end">
                    <NeonImageButton
                      href={withSource(links.freeCall)}
                      data-growth-source={leadSource}
                      data-growth-event="cta-click"
                      data-cta-type="book-free-call"
                      disabled={submitState === "loading"}
                      defaultImage="/images/contact-btn-default.png"
                      hoverImage="/images/contact-btn-hover.png"
                    >
                      Book Free Call
                    </NeonImageButton>

                    <NeonImageButton
                      href={withSource(links.premiumSession)}
                      data-growth-source={leadSource}
                      data-growth-event="cta-click"
                      data-cta-type="book-premium-session"
                      minWidthClassName="min-w-[190px]"
                      disabled={submitState === "loading"}
                      defaultImage="/images/contact-btn-default.png"
                      hoverImage="/images/contact-btn-hover.png"
                    >
                      Book Premium Session
                    </NeonImageButton>

                    <NeonImageButton
                      type="submit"
                      data-growth-source={leadSource}
                      data-growth-event="contact-submit"
                      data-cta-type="send-project-inquiry"
                      minWidthClassName="min-w-[210px]"
                      loading={submitState === "loading"}
                      disabled={submitState === "loading"}
                      successPulse={submitState === "success"}
                      defaultImage="/images/contact-btn-default.png"
                      hoverImage="/images/contact-btn-hover.png"
                      successImage="/images/success-btn.png"
                    >
                      {submitState === "loading"
                        ? "Sending..."
                        : submitState === "success"
                          ? "Inquiry Sent"
                          : "Send Project Inquiry"}
                    </NeonImageButton>
                  </div>
                </div>

                {statusBox && <div className="mt-4">{statusBox}</div>}
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
