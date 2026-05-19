"use client";

import { useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useEffect, useMemo, useState } from "react";

import SiteShell from "@/components/layout/site-shell";
import HeaderSection from "@/components/sections/header";
import { GhostButton, PrimaryButton, SolidCTA } from "@/components/ui/buttons";

type SubmitState = "idle" | "loading" | "success" | "error";

const serviceMap = {
  "free-call": {
    label: "Free Strategy Call",
    duration: "15 minutes",
    slotStep: 15,
    eyebrow: "Free Strategy Call",
    title: "Book your free 15-minute strategy call.",
    text: "Use this quick call to explain what you need, where you’re stuck, and what kind of DAYIIIatch Solutions support makes the most sense.",
  },
  "premium-session": {
    label: "Premium Strategy Session",
    duration: "30+ minutes",
    slotStep: 30,
    eyebrow: "Premium Strategy Session",
    title: "Book your paid deep strategy session.",
    text: "This is for serious clients who want focused planning, clearer direction, and a stronger action path before a build or larger service.",
  },
};

function to12Hour(time: string) {
  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
}

function buildSlots(step: number) {
  const slots: string[] = [];
  const start = 12 * 60;
  const end = 16 * 60;

  for (let minutes = start; minutes <= end; minutes += step) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
  }

  return slots;
}

function BookingPageContent() {
  const searchParams = useSearchParams();
  const serviceKey = searchParams.get("service") ?? "free-call";

  const selected =
    serviceMap[serviceKey as keyof typeof serviceMap] ??
    serviceMap["free-call"];

  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    notes: "",
  });

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);
  const availableSlots = useMemo(
    () => buildSlots(selected.slotStep),
    [selected.slotStep],
  );

  const selectedSlotIsValid =
    formValues.preferredTime &&
    availableSlots.includes(formValues.preferredTime) &&
    !bookedTimes.includes(formValues.preferredTime);

  useEffect(() => {
    let ignore = false;

    async function loadBookedTimes() {
      if (!formValues.preferredDate) return;

      try {
        const response = await fetch(
          `/api/book?service=${serviceKey}&date=${formValues.preferredDate}`,
        );

        const data = await response.json().catch(() => null);

        if (!ignore && response.ok && Array.isArray(data?.bookedTimes)) {
          setBookedTimes(data.bookedTimes);
        }
      } catch {
        if (!ignore) {
          setBookedTimes([]);
        }
      }
    }

    loadBookedTimes();

    return () => {
      ignore = true;
    };
  }, [formValues.preferredDate, serviceKey]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitState === "loading") return;

    setSubmitState("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service: serviceKey,
          serviceType: serviceKey,
          serviceLabel: selected.label,
          duration: selected.duration,

          name: formValues.name,
          email: formValues.email,
          phone: formValues.phone,

          date: formValues.preferredDate,
          time: formValues.preferredTime,
          preferredDate: formValues.preferredDate,
          preferredTime: formValues.preferredTime,

          message: formValues.notes,
          notes: formValues.notes,
          details: formValues.notes,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || "Booking request failed.");
      }

      setSubmitState("success");
      setBookedTimes((prev) => [...prev, formValues.preferredTime]);

      setFormValues({
        name: "",
        email: "",
        phone: "",
        preferredDate: "",
        preferredTime: "",
        notes: "",
      });
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something glitched while booking. Please try again.",
      );
    }
  }

  return (
    <SiteShell>
      <HeaderSection />

      <section className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="space-y-6">
          <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.25em] text-cyan-200">
            {selected.eyebrow}
          </div>

          <div className="space-y-4">
            <h1 className="max-w-4xl text-4xl font-black leading-[0.95] md:text-7xl">
              {selected.title}
            </h1>

            <p className="max-w-2xl text-base leading-7 text-zinc-300 md:text-lg">
              {selected.text}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <SolidCTA href="/book?service=free-call">Free Call</SolidCTA>

            <PrimaryButton href="/book?service=premium-session">
              Premium Session
            </PrimaryButton>

            <GhostButton href="/#contact-form">Contact</GhostButton>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-zinc-200">
              Selected: {selected.label}
            </div>

            <div className="rounded-2xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-zinc-200">
              Duration: {selected.duration}
            </div>
          </div>
        </div>

        <div
          id="booking-form"
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl"
        >
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-400/10" />

          <div className="relative">
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-200">
              DAYIIIatch Scheduler
            </p>

            <h2 className="mt-2 text-3xl font-black">
              Choose your booking time
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-300">
              Pick a clean {selected.slotStep}-minute slot. You’ll get a
              confirmation once the booking is locked in.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
              <input
                required
                value={formValues.name}
                onChange={(e) =>
                  setFormValues((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                placeholder="Name"
                className="rounded-2xl border border-white/10 bg-black/35 px-4 py-4 text-sm text-white outline-none focus:border-cyan-400/50"
              />

              <input
                required
                type="email"
                value={formValues.email}
                onChange={(e) =>
                  setFormValues((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                placeholder="Email"
                className="rounded-2xl border border-white/10 bg-black/35 px-4 py-4 text-sm text-white outline-none focus:border-cyan-400/50"
              />

              <input
                type="tel"
                value={formValues.phone}
                onChange={(e) =>
                  setFormValues((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
                placeholder="Phone number"
                className="rounded-2xl border border-white/10 bg-black/35 px-4 py-4 text-sm text-white outline-none focus:border-cyan-400/50"
              />

              <input
                required
                type="date"
                min={today}
                value={formValues.preferredDate}
                onChange={(e) =>
                  setFormValues((prev) => ({
                    ...prev,
                    preferredDate: e.target.value,
                    preferredTime: "",
                  }))
                }
                className="rounded-2xl border border-white/10 bg-black/35 px-4 py-4 text-sm text-white outline-none focus:border-cyan-400/50"
              />

              <div className="grid gap-3">
                <p className="text-xs uppercase tracking-[0.24em] text-zinc-400">
                  Available Time Slots
                </p>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {availableSlots.map((slot) => {
                    const isBooked = bookedTimes.includes(slot);
                    const isSelected = formValues.preferredTime === slot;

                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={!formValues.preferredDate || isBooked}
                        onClick={() =>
                          setFormValues((prev) => ({
                            ...prev,
                            preferredTime: slot,
                          }))
                        }
                        className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                          isSelected
                            ? "border-cyan-300 bg-cyan-400/20 text-cyan-100 shadow-[0_0_22px_rgba(34,211,238,0.18)]"
                            : "border-white/10 bg-black/35 text-zinc-200 hover:border-cyan-400/30 hover:bg-cyan-400/10"
                        } disabled:cursor-not-allowed disabled:opacity-35`}
                      >
                        {isBooked ? "Booked" : to12Hour(slot)}
                      </button>
                    );
                  })}
                </div>
              </div>

              <textarea
                rows={5}
                value={formValues.notes}
                onChange={(e) =>
                  setFormValues((prev) => ({
                    ...prev,
                    notes: e.target.value,
                  }))
                }
                placeholder="Quick notes about what you need help with"
                className="rounded-2xl border border-white/10 bg-black/35 px-4 py-4 text-sm text-white outline-none focus:border-cyan-400/50"
              />

              {submitState === "success" && (
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
                  Booking request sent successfully.
                </div>
              )}

              {submitState === "error" && (
                <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={submitState === "loading" || !selectedSlotIsValid}
                className="rounded-2xl border border-cyan-400/30 bg-gradient-to-r from-cyan-400/20 to-violet-500/20 px-5 py-4 text-sm font-bold text-cyan-100 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitState === "loading"
                  ? "Sending Booking..."
                  : `Request ${selected.label}`}
              </button>
            </form>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

export default function BookingLandingPage() {
  return (
    <Suspense fallback={null}>
      <BookingPageContent />
    </Suspense>
  );
}
