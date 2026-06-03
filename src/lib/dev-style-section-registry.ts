import type { DevStylePageScope } from "@/lib/dev-style-page-scope";

export type DevStyleSectionTarget = {
  id: string;
  label: string;
  selector: string;
  global?: boolean;
};

export type DevStyleSectionRegistryEntry = {
  pageScope: DevStylePageScope;
  label: string;
  sections: DevStyleSectionTarget[];
};

const globalSection: DevStyleSectionTarget = {
  id: "global",
  label: "Global Page",
  selector: ":root",
  global: true,
};

function section(id: string, label: string): DevStyleSectionTarget {
  return {
    id,
    label,
    selector: `[data-style-section="${id}"]`,
  };
}

export const devStyleSectionRegistry: Record<
  DevStylePageScope,
  DevStyleSectionRegistryEntry
> = {
  "public.homepage": {
    pageScope: "public.homepage",
    label: "Homepage",
    sections: [
      globalSection,
      section("home-hero", "Header Wrapper"),
      section("home-hero-media-frame", "Header Media"),
      section("nav", "Navigation"),
      section("about", "About Section"),
      section("commercial", "Services Offers Packages"),
      section("proof", "Proof Systems"),
      section("damarko", "Damarko Section"),
      section("contact", "Contact Section"),
      section("footer", "Footer"),
      section("sticky-cta", "Sticky CTA"),
    ],
  },
  "public.book": {
    pageScope: "public.book",
    label: "Booking Page",
    sections: [
      globalSection,
      section("nav", "Navigation"),
      section("booking-hero", "Booking Hero"),
      section("booking-slots", "Time Slots"),
      section("booking-form", "Booking Form"),
      section("footer", "Footer"),
    ],
  },
  "public.how-we-work": {
    pageScope: "public.how-we-work",
    label: "How We Work",
    sections: [
      globalSection,
      section("nav", "Navigation"),
      section("workflow-hero", "Workflow Hero"),
      section("how-work", "How We Work"),
      section("client-journey", "Client Journey"),
      section("timeline", "Project Timeline"),
      section("footer", "Footer"),
    ],
  },
  "admin.bookings": {
    pageScope: "admin.bookings",
    label: "Admin Bookings",
    sections: [
      globalSection,
      section("admin-page-shell", "Admin Page Shell"),
      section("admin-hero", "Admin Header"),
      section("booking-filters", "Booking Filters"),
      section("booking-table", "Booking Table"),
      section("booking-row", "Booking Row"),
      section("action-buttons", "Action Buttons"),
      section("admin-panels", "Admin Panels"),
    ],
  },
  "admin.crm": {
    pageScope: "admin.crm",
    label: "Admin CRM",
    sections: [
      globalSection,
      section("admin-page-shell", "Admin Page Shell"),
      section("crm-nav", "CRM Navigation"),
      section("crm-hero", "CRM Hero"),
      section("crm-overview", "CRM Overview"),
      section("crm-pipeline", "CRM Pipeline"),
      section("crm-panels", "CRM Panels"),
    ],
  },
  "portal.dashboard": {
    pageScope: "portal.dashboard",
    label: "Portal Dashboard",
    sections: [
      globalSection,
      section("portal-shell", "Portal Shell"),
      section("portal-sidebar", "Sidebar"),
      section("portal-page-intro", "Hero Summary"),
      section("project-cards", "Project Cards"),
      section("activity-feed", "Activity Feed"),
      section("cta-panels", "CTA Panels"),
      section("portal-footer", "Footer"),
    ],
  },
  "portal.projects": {
    pageScope: "portal.projects",
    label: "Portal Projects",
    sections: [
      globalSection,
      section("portal-shell", "Portal Shell"),
      section("portal-sidebar", "Sidebar"),
      section("portal-page-intro", "Project Summary"),
      section("project-cards", "Project Cards"),
      section("project-workspace", "Project Workspace"),
    ],
  },
  "portal.files": {
    pageScope: "portal.files",
    label: "Portal Files",
    sections: [globalSection, section("portal-page-intro", "Files Summary"), section("portal-files", "Files")],
  },
  "portal.deliverables": {
    pageScope: "portal.deliverables",
    label: "Portal Deliverables",
    sections: [globalSection, section("portal-page-intro", "Deliverables Summary"), section("portal-deliverables", "Deliverables")],
  },
  "portal.approvals": {
    pageScope: "portal.approvals",
    label: "Portal Approvals",
    sections: [globalSection, section("portal-page-intro", "Approvals Summary"), section("portal-approvals", "Approvals")],
  },
  "portal.activity": {
    pageScope: "portal.activity",
    label: "Portal Activity",
    sections: [globalSection, section("portal-page-intro", "Activity Summary"), section("activity-feed", "Activity Feed")],
  },
  "portal.invoices": {
    pageScope: "portal.invoices",
    label: "Portal Invoices",
    sections: [globalSection, section("portal-page-intro", "Invoices Summary"), section("portal-invoices", "Invoices")],
  },
  "portal.bookings": {
    pageScope: "portal.bookings",
    label: "Portal Bookings",
    sections: [globalSection, section("portal-page-intro", "Bookings Summary"), section("portal-bookings", "Bookings")],
  },
  "portal.messages": {
    pageScope: "portal.messages",
    label: "Portal Messages",
    sections: [globalSection, section("portal-page-intro", "Messages Summary"), section("portal-messages", "Messages")],
  },
};

export function getDevStyleSectionsForScope(pageScope: DevStylePageScope) {
  return devStyleSectionRegistry[pageScope];
}
