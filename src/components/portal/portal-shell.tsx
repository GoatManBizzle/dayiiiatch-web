"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import SiteShell from "@/components/layout/site-shell";
import { portalNavItems } from "@/lib/portal-data";

type PortalShellProps = {
  children: React.ReactNode;
};

function isActivePath(pathname: string, href: string) {
  if (href === "/portal/dashboard") {
    return pathname === "/portal" || pathname === href;
  }

  return pathname === href;
}

export default function PortalShell({ children }: PortalShellProps) {
  const pathname = usePathname();

  return (
    <SiteShell fixedMainBackground compactMobileSpacing>
      <div className="grid gap-4 lg:grid-cols-[15rem_1fr]">
        <header className="rounded-[1.6rem] border border-white/10 bg-zinc-950/76 p-4 shadow-[0_0_46px_rgba(34,211,238,0.08)] backdrop-blur-xl sm:rounded-[2rem] sm:p-5 lg:col-span-2">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">
                  DAYIIIatch Client Portal
                </p>
                <span className="rounded-full border border-violet-300/25 bg-violet-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-violet-100">
                  Preview Mode
                </span>
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-300">
                Project visibility, files, messages, meetings, and future
                Damarko-assisted client guidance in one operational workspace.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/"
                className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-sm font-bold text-zinc-100 transition hover:border-cyan-300/28 hover:bg-white/10"
              >
                Return to Site
              </Link>
              <Link
                href="/book?service=free-call"
                className="rounded-2xl border border-cyan-300/28 bg-cyan-400/10 px-4 py-3 text-sm font-bold text-cyan-100 transition hover:bg-cyan-400/18"
              >
                Schedule Check-In
              </Link>
            </div>
          </div>

          <nav
            aria-label="Portal sections"
            className="mt-4 flex flex-wrap gap-2 lg:hidden"
          >
            {portalNavItems.map((item) => {
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full border px-3 py-2 text-xs font-black uppercase tracking-[0.12em] transition ${
                    active
                      ? "border-cyan-300/35 bg-cyan-400/14 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.12)]"
                      : "border-white/10 bg-black/24 text-zinc-300 hover:border-cyan-300/28 hover:bg-cyan-400/8 hover:text-cyan-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>

        <aside className="hidden lg:block">
          <div className="sticky top-6 rounded-[1.5rem] border border-white/10 bg-zinc-950/66 p-3 shadow-[0_0_34px_rgba(124,58,237,0.08)] backdrop-blur-xl">
            <p className="px-3 pt-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
              Workspace
            </p>
            <nav aria-label="Portal workspace" className="mt-3 grid gap-2">
              {portalNavItems.map((item) => {
                const active = isActivePath(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-2xl border px-4 py-3 text-sm font-black transition ${
                      active
                        ? "border-cyan-300/35 bg-cyan-400/12 text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.12)]"
                        : "border-white/10 bg-white/[0.035] text-zinc-300 hover:border-violet-300/26 hover:bg-violet-500/8 hover:text-violet-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-4 rounded-2xl border border-cyan-300/14 bg-cyan-400/[0.06] p-3 text-xs leading-5 text-cyan-100">
              Secure workspace shell ready for client auth, storage policies,
              and AI-guided status summaries.
            </div>
          </div>
        </aside>

        <main className="min-w-0">{children}</main>
      </div>
    </SiteShell>
  );
}
