"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { links } from "@/config/links";
import NeonImageButton from "../ui/neon-image-button";

type SubmitState = "idle" | "loading" | "success" | "error";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mdayoagd";

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
    "peer w-full rounded-2xl border border-white/10 bg-black/35 px-4 pb-3 pt-6 text-sm text-white placeholder:text-transparent outline-none backdrop-blur-md transition-all duration-300 focus:border-cyan-400/50 focus:bg-black/45 focus:shadow-[0_0_22px_rgba(34,211,238,0.12)] disabled:cursor-not-allowed disabled:opacity-70";

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

      <label
        htmlFor={id}
        className="
          pointer-events-none absolute left-4 top-4 origin-left text-sm text-zinc-300
          transition-all duration-300
          peer-placeholder-shown:top-4
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:text-zinc-400
          peer-focus:top-2
          peer-focus:scale-[0.8]
          peer-focus:text-cyan-300
          peer-[&:not(:placeholder-shown)]:top-2
          peer-[&:not(:placeholder-shown)]:scale-[0.8]
          peer-[&:not(:placeholder-shown)]:text-cyan-300
        "
      >
        {label}
      </label>
    </div>
  );
}

export default function ContactFormSection() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successVisible, setSuccessVisible] = useState(false);
  const [successExiting, setSuccessExiting] = useState(false);

  const successTimerRef = useRef<number | null>(null);
  const successExitTimerRef = useRef<number | null>(null);

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });

  useEffect(() => {
    return () => {
      if (successTimerRef.current) window.clearTimeout(successTimerRef.current);
      if (successExitTimerRef.current) window.clearTimeout(successExitTimerRef.current);
    };
  }, []);

  const statusBox = useMemo(() => {
    if (submitState === "error") {
      return (
        <div className="rounded-[1.25rem] border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-red-100 shadow-[0_0_22px_rgba(239,68,68,0.12)] animate-[statusFadeInUp_300ms_ease-out]">
          {errorMessage || "Something went wrong while sending your inquiry. Please try again."}
        </div>
      );
    }

    if (successVisible) {
      return (
        <div
          className={`rounded-[1.25rem] border border-emerald-400/25 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100 shadow-[0_0_22px_rgba(16,185,129,0.12)] ${
            successExiting
              ? "animate-[statusFadeOut_500ms_ease-in_forwards]"
              : "animate-[statusFadeInUp_300ms_ease-out]"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-300/30 bg-emerald-400/10 shadow-[0_0_18px_rgba(16,185,129,0.35)] animate-[checkPop_350ms_ease-out] overflow-hidden">
              <img
                src="/images/check-success.png"
                alt="Success"
                className="h-5 w-5 object-contain animate-[checkGlow_1.2s_ease-in-out]"
              />
            </span>

            <span>
              Project inquiry sent successfully. We’ll tap in with you soon.
            </span>
          </div>
        </div>
      );
    }

    return null;
  }, [submitState, errorMessage, successVisible, successExiting]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (submitState === "loading") return;

    setSubmitState("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        let message = "Unable to send your inquiry right now.";

        try {
          const data = await response.json();
          if (data?.errors?.length) {
            message = data.errors
              .map((err: { message?: string }) => err.message)
              .filter(Boolean)
              .join(" ");
          }
        } catch {
          // keep fallback
        }

        throw new Error(message);
      }

      setFormValues({
        name: "",
        email: "",
        projectType: "",
        message: "",
      });

      form.reset();
      setSubmitState("success");
      setSuccessVisible(true);
      setSuccessExiting(false);

      if (successTimerRef.current) window.clearTimeout(successTimerRef.current);
      if (successExitTimerRef.current) window.clearTimeout(successExitTimerRef.current);

      successTimerRef.current = window.setTimeout(() => {
        setSuccessExiting(true);

        successExitTimerRef.current = window.setTimeout(() => {
          setSuccessVisible(false);
          setSuccessExiting(false);
          setSubmitState("idle");
        }, 500);
      }, 3500);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while sending your inquiry.";

      setErrorMessage(message);
      setSubmitState("error");
    }
  }

  return (
    <section
      id="contact-form"
      className="relative mt-16 overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_0_40px_rgba(34,211,238,0.05)]"
    >
      {/* Main contact background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/contact-bg.png')" }}
      />

      {/* Main overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(5,8,20,0.94),rgba(9,16,36,0.86),rgba(0,90,120,0.30))]" />
      <div className="absolute inset-0 backdrop-blur-[3px]" />

      {/* Section glows */}
      <div className="pointer-events-none absolute -left-16 top-10 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-[1px] rounded-[2rem] border border-cyan-300/10" />

      <div className="relative z-10 p-8 md:p-10">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/80">
            Contact
          </p>

          <h3 className="mt-2 text-4xl font-black text-white md:text-5xl">
            Send a direct project inquiry
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-zinc-300">
            Use the form below for custom builds, collaborations, website requests,
            automation ideas, and digital support.
          </p>
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
            <FloatingField
              id="projectType"
              name="project_type"
              label="Project Type"
              disabled={submitState === "loading"}
              value={formValues.projectType}
              onChange={(value) =>
                setFormValues((prev) => ({ ...prev, projectType: value }))
              }
            />
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
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 p-4 backdrop-blur-md">
              {/* CTA strip background */}
              <div
                className="absolute inset-0 h-full w-full scale-105 bg-cover bg-center animate-[ctaDrift_18s_ease-in-out_infinite_alternate]"
                style={{ backgroundImage: "url('/images/contact-cta-bg.png')" }}
              />

              {/* CTA strip overlays */}
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(12,16,34,0.78),rgba(18,24,50,0.58),rgba(60,0,100,0.10))]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(34,211,238,0.10),transparent_28%),radial-gradient(circle_at_80%_40%,rgba(168,85,247,0.10),transparent_30%)]" />

              {/* CTA glows */}
              <div className="pointer-events-none absolute -left-10 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-3xl" />
              <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-cyan-400/10 blur-3xl" />

              {/* CTA border */}
              <div className="pointer-events-none absolute inset-[1px] rounded-[1.5rem] border border-cyan-300/10" />

              <div className="relative z-10">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-2xl text-xs leading-6 text-zinc-200">
                    Prefer a call first? Book the free strategy call or jump straight
                    into a direct project inquiry.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <NeonImageButton
                      href={links.freeCall}
                      external
                      disabled={submitState === "loading"}
                      defaultImage="/images/contact-btn-default.png"
                      hoverImage="/images/contact-btn-hover.png"
                    >
                      Free Call
                    </NeonImageButton>

                    <NeonImageButton
                      type="submit"
                      minWidthClassName="min-w-[190px]"
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
                        : "Send Inquiry"}
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