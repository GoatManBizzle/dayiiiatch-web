"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import SiteShell from "@/components/layout/site-shell";
import PortalShell from "@/components/portal/portal-shell";
import { resolveCurrentPortalAuth } from "@/lib/portal-auth";
import {
  parsePortalSession,
  PORTAL_SESSION_KEY,
  persistPortalSessionBrowser,
  type PortalSession,
} from "@/lib/portal-session";

type PortalAccessGateProps = {
  children: React.ReactNode;
};

function readPortalSession(): PortalSession | null {
  try {
    return parsePortalSession(window.localStorage.getItem(PORTAL_SESSION_KEY));
  } catch {
    return null;
  }
}

export default function PortalAccessGate({ children }: PortalAccessGateProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [portalSession, setPortalSession] = useState<PortalSession | null>(
    null,
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const storedSession = readPortalSession();

      if (storedSession) {
        setPortalSession(storedSession);
        setMounted(true);
        return;
      }

      resolveCurrentPortalAuth()
        .then((resolution) => {
          if (resolution.session) {
            persistPortalSessionBrowser(resolution.session);
            setPortalSession(resolution.session);
          }
        })
        .finally(() => setMounted(true));
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted || portalSession || pathname === "/portal/access") return;

    window.location.assign("/portal/access");
  }, [mounted, pathname, portalSession]);

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

  if (!portalSession) {
    return (
      <SiteShell fixedMainBackground compactMobileSpacing>
        <div className="min-h-[55vh] rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_34px_rgba(34,211,238,0.06)] backdrop-blur-xl" />
      </SiteShell>
    );
  }

  return (
    <PortalShell session={portalSession}>
      {children}
    </PortalShell>
  );
}
