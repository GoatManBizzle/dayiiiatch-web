"use client";

import { useEffect, useMemo, useState } from "react";
import SiteShell from "@/components/layout/site-shell";
import HeaderSection from "@/components/sections/header";
import { GhostButton } from "@/components/ui/buttons";

type ServiceKey = "free-call" | "premium-session";

type BookingPayload = {
  service: ServiceKey;
  date: string;
  time: string;
  name: string;
  email: string;
  company?: string;
  details?: string;
};

const SERVICES: {
  key: ServiceKey;
  label: string;
  badge: string;
  duration: string;
  description: string;
}[] = [
  {
    key: "free-call",
    label: "Free Strategy Call",
    badge: "Best first step",
    duration: "15 min",
    description:
      "Best for quick clarity, direction, and figuring out the right next move.",
  },
  {
    key: "premium-session",
    label: "Premium Session",
    badge: "Serious clients",
    duration: "45 min",
    description:
      "Best for deeper planning, focused troubleshooting, and real strategy work.",
  },
];

const TIME_SLOTS = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];

function formatTime(time24: string) {
  const [hourStr, minute] = time24.split(":");
  const hour = Number(hourStr);
  const suffix = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minute} ${suffix}`;
}

function getTodayLocalDate() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60 * 1000);
  return local.toISOString().split("T")[0];
}

export default function BookingSchedulerPage() {
  const [selectedService, setSelectedService] = useState<ServiceKey>("free-call");
  const [selectedDate, setSelectedDate] = useState(getTodayLocalDate());
  const [selectedTime, setSelectedTime] = useState("");
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    details: "",
  });

  const [submitState, setSubmitState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get("service");

    if (serviceParam === "premium-session" || serviceParam === "free-call") {
      setSelectedService(serviceParam);
    }
  }, []);

  useEffect(() => {
    async function loadBookedSlots() {
      setLoadingSlots(true);
      setSelectedTime("");

      try {
        const params = new URLSearchParams({
          service: selectedService,
          date: selectedDate,
        });

        const response = await fetch(`/api/book?${params.toString()}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || "Failed to load booking slots.");
        }

        setBookedTimes(Array.isArray(data.bookedTimes) ? data.bookedTimes : []);
      } catch (error) {
        console.error(error);
        setBookedTimes([]);
      } finally {
        setLoadingSlots(false);
      }
    }

    if (selectedDate) {
      loadBookedSlots();
    }
  }, [selectedService, selectedDate]);

  const availableSlots = useMemo(() => {
    return TIME_SLOTS.map((time) => ({
      time,
      isBooked: bookedTimes.includes(time),
    }));
  }, [bookedTimes]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!selectedTime) {
      setSubmitState("error");
      setStatusMessage("Pick an available time slot before booking.");
      return;
    }

    setSubmitState("loading");
    setStatusMessage("");

    const payload: BookingPayload = {
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      name: formData.name.trim(),
      email: formData.email.trim(),
      company: formData.company.trim(),
      details: formData.details.trim(),
    };

    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "That slot is no longer available. Please pick another one."
        );
      }

      setSubmitState("success");
      setStatusMessage(
        "Booked successfully. Confirmation sent and your slot is locked in."
      );
      setBookedTimes((prev) => [...prev, selectedTime]);
      setSelectedTime("");
      setFormData({
        name: "",
        email: "",
        company: "",
        details: "",
      });
    } catch (error) {
      setSubmitState("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Booking failed. Please try again."
      );
    }
  }

  const activeService = SERVICES.find((service) => service.key === selectedService)!;

  return (
    <SiteShell>
      <HeaderSection />

      <section className="mt-6 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
        <div className="space-y-6">
          <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.25em] text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.12)]">
            DAYIIIatch Scheduler
          </div>

          <div className="space-y-4">
            <h1 className="max-w-4xl text-4xl font-black leading-[0.95] md:text-7xl">
              Book your next move without leaving the site.
            </h1>

            <p className="max-w-2xl text-base leading-7 text-zinc-300 md:text-lg">
              Pick the right session, choose an open time, and lock it in.
              Already-booked slots get blocked automatically, so no overbooking
              nonsense.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {SERVICES.map((service) => {
              const active = selectedService === service.key;

              return (
                <button
                  key={service.key}
                  type="button"
                  onClick={() => setSelectedService(service.key)}
                  className={`text-left rounded-[1.75rem] border p-5 transition-all duration-300 ${
                    active
                      ? "border-cyan-400/40 bg-cyan-400/10 shadow-[0_0_30px_rgba(34,211,238,0.14)]"
                      : "border-white/10 bg-white/5 hover:border-violet-400/25 hover:bg-white/8"
                  }`}
                >
                  <p
                    className={`text-xs uppercase tracking-[0.25em] ${
                      active ? "text-cyan-200" : "text-violet-200"
                    }`}
                  >
                    {service.badge}
                  </p>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <h3 className="text-xl font-bold">{service.label}</h3>
                    <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-zinc-200">
                      {service.duration}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-zinc-300">
                    {service.description}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-200">
                  Selected session
                </p>
                <h2 className="mt-2 text-3xl font-black">{activeService.label}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300">
                  {activeService.description}
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-[220px_1fr]">
                <div className="space-y-2">
                  <label
                    htmlFor="booking-date"
                    className="text-xs uppercase tracking-[0.25em] text-zinc-400"
                  >
                    Pick a date
                  </label>

                  <input
                    id="booking-date"
                    type="date"
                    min={getTodayLocalDate()}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-400/35 focus:ring-2 focus:ring-cyan-400/15"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">
                      Available time slots
                    </p>

                    {loadingSlots && (
                      <span className="text-xs text-cyan-200">Loading slots...</span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {availableSlots.map(({ time, isBooked }) => {
                      const isSelected = selectedTime === time;

                      return (
                        <button
                          key={time}
                          type="button"
                          disabled={isBooked || loadingSlots}
                          onClick={() => setSelectedTime(time)}
                          className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition-all ${
                            isBooked
                              ? "cursor-not-allowed border-red-400/15 bg-red-500/10 text-red-200 opacity-65"
                              : isSelected
                              ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-100 shadow-[0_0_18px_rgba(16,185,129,0.18)]"
                              : "border-white/10 bg-zinc-900/70 text-zinc-100 hover:border-cyan-400/30 hover:bg-cyan-400/8"
                          }`}
                        >
                          {isBooked ? `${formatTime(time)} • Booked` : formatTime(time)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-400/10" />

          <div className="relative space-y-5">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-violet-200">
                Booking details
              </p>
              <h3 className="mt-2 text-3xl font-black">Lock in your slot</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-300">
                Fill this out, hit submit, and the backend checks the slot again
                before saving. That’s the anti-overbooking gatekeeper.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-zinc-950/55 p-4 text-sm text-zinc-200">
              <div className="flex items-center justify-between gap-3">
                <span className="text-zinc-400">Service</span>
                <span>{activeService.label}</span>
              </div>
              <div className="mt-2 flex items-center justify-between gap-3">
                <span className="text-zinc-400">Date</span>
                <span>{selectedDate || "Select a date"}</span>
              </div>
              <div className="mt-2 flex items-center justify-between gap-3">
                <span className="text-zinc-400">Time</span>
                <span>{selectedTime ? formatTime(selectedTime) : "Select a slot"}</span>
              </div>
            </div>

            {(submitState === "error" || submitState === "success") && (
              <div
                className={`rounded-2xl border px-4 py-3 text-sm ${
                  submitState === "success"
                    ? "border-emerald-400/25 bg-emerald-500/10 text-emerald-100"
                    : "border-red-400/25 bg-red-500/10 text-red-100"
                }`}
              >
                {statusMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.25em] text-zinc-400">
                    Name
                  </label>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-400/35 focus:ring-2 focus:ring-cyan-400/15"
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.25em] text-zinc-400">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-400/35 focus:ring-2 focus:ring-cyan-400/15"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.25em] text-zinc-400">
                  Company / Brand
                </label>
                <input
                  value={formData.company}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, company: e.target.value }))
                  }
                  className="w-full rounded-2xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-400/35 focus:ring-2 focus:ring-cyan-400/15"
                  placeholder="Optional"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.25em] text-zinc-400">
                  What do you need help with?
                </label>
                <textarea
                  rows={5}
                  value={formData.details}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, details: e.target.value }))
                  }
                  className="w-full rounded-2xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-400/35 focus:ring-2 focus:ring-cyan-400/15"
                  placeholder="Quick project summary, goals, current issue, timeline, etc."
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={submitState === "loading"}
                  className={`inline-flex min-w-[180px] items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ${
                    submitState === "loading"
                      ? "cursor-not-allowed bg-emerald-500/60"
                      : "bg-gradient-to-r from-cyan-500 to-violet-500 shadow-[0_0_24px_rgba(34,211,238,0.2)] hover:-translate-y-[1px] hover:scale-[1.01]"
                  }`}
                >
                  {submitState === "loading" ? "Locking slot..." : "Book now"}
                </button>

                <GhostButton href="#contact-form">Need a custom route?</GhostButton>
              </div>
            </form>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}