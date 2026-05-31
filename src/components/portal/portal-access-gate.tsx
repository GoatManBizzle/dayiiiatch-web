"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import SiteShell from "@/components/layout/site-shell";
import PortalShell from "@/components/portal/portal-shell";

type PortalAccessGateProps = {
  children: React.ReactNode;
};

type PortalSessionMode = "client" | "preview";

const PORTAL_SESSION_KEY = "dayiiiatch-portal-session";

function readPortalSession(): PortalSessionMode | null {
  try {
    const stored = window.localStorage.getItem(PORTAL_SESSION_KEY);

    if (stored === "client" || stored === "preview") {
      return stored;
    }
  } catch {
    return null;
  }

  return null;
}

export default function PortalAccessGate({ children }: PortalAccessGateProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [sessionMode, setSessionMode] = useState<PortalSessionMode | null>(
    null,
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSessionMode(readPortalSession());
      setMounted(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted || sessionMode || pathname === "/portal/access") return;

    window.location.assign("/portal/access");
  }, [mounted, pathname, sessionMode]);

  if (pathname === "/portal/access") {
    return <>{children}</>;
  }

  if (!mounted) {
    return (
      <SiteShell fixedMainBackground compactMobileSpacing>
        <div className="min-h-[55vh] rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_34px_rgba(34,211,238,0.06)] backdrop-blur-xl" />
      </SiteShell>
    );
  }

  if (!sessionMode) {
    return (
      <SiteShell fixedMainBackground compactMobileSpacing>
        <div className="min-h-[55vh] rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_34px_rgba(34,211,238,0.06)] backdrop-blur-xl" />
      </SiteShell>
    );
  }

  return (
    <PortalShell sessionMode={sessionMode}>
      {children}
    </PortalShell>
  );
}
