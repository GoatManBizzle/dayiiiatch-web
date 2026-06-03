export type DevStylePageScope =
  | "public.homepage"
  | "public.book"
  | "public.how-we-work"
  | "admin.bookings"
  | "admin.crm"
  | "portal.dashboard"
  | "portal.projects"
  | "portal.files"
  | "portal.deliverables"
  | "portal.approvals"
  | "portal.activity"
  | "portal.invoices"
  | "portal.bookings"
  | "portal.messages";

export const defaultDevStylePageScope: DevStylePageScope = "public.homepage";

export function detectDevStylePageScope(pathname: string): DevStylePageScope {
  const cleanPath = pathname.split("?")[0].replace(/\/+$/, "") || "/";

  if (cleanPath === "/") return "public.homepage";
  if (cleanPath === "/book") return "public.book";
  if (cleanPath === "/how-we-work") return "public.how-we-work";
  if (cleanPath === "/admin/bookings") return "admin.bookings";
  if (cleanPath === "/admin/crm") return "admin.crm";
  if (cleanPath === "/portal" || cleanPath === "/portal/dashboard") {
    return "portal.dashboard";
  }
  if (cleanPath === "/portal/projects") return "portal.projects";
  if (cleanPath === "/portal/files") return "portal.files";
  if (cleanPath === "/portal/deliverables") return "portal.deliverables";
  if (cleanPath === "/portal/approvals") return "portal.approvals";
  if (cleanPath === "/portal/activity") return "portal.activity";
  if (cleanPath === "/portal/invoices") return "portal.invoices";
  if (cleanPath === "/portal/bookings") return "portal.bookings";
  if (cleanPath === "/portal/messages") return "portal.messages";

  return defaultDevStylePageScope;
}
