import type { Metadata } from "next";

import PortalAccessGate from "@/components/portal/portal-access-gate";

export const metadata: Metadata = {
  title: "DAYIIIatch Client Portal | Workspace",
  description:
    "A private DAYIIIatch Solutions client workspace for project updates, files, messages, bookings, and operational progress.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PortalAccessGate>{children}</PortalAccessGate>;
}
