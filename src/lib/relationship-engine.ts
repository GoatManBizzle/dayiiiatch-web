export type RelationshipStatus =
  | "Active"
  | "Pending Review"
  | "Approved"
  | "Due Soon"
  | "Outstanding"
  | "Healthy"
  | "Needs Review"
  | "Connected";

export type PortalAccount = {
  id: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
};

export type RelationshipActivity = {
  id: string;
  eventType: string;
  title: string;
  description: string;
  timestamp: string;
};

export type RelationshipInvoice = {
  id: string;
  invoiceNumber: string;
  projectId: string;
  title: string;
  amount: string;
  status: string;
  dueDate: string;
};

export type RelationshipApproval = {
  id: string;
  projectId: string;
  title: string;
  category: string;
  status: string;
  submitted: string;
};

export type RelationshipMeeting = {
  id: string;
  title: string;
  date: string;
  status: string;
};

export type RelationshipProject = {
  id: string;
  clientId: string;
  title: string;
  summary: string;
  phase: string;
  progress: number;
  timelineStatus: string;
  deliverables: string[];
  approvalIds: string[];
  invoiceIds: string[];
  activityIds: string[];
};

export type RelationshipClient = {
  id: string;
  name: string;
  company: string;
  email: string;
  source: string;
  serviceInterest: string;
  activeProjectIds: string[];
  invoiceIds: string[];
  meetingIds: string[];
  activityIds: string[];
  approvalIds: string[];
  portalAccount: PortalAccount;
};

export type CrmRelationshipMap = {
  leadId: string;
  clientId: string;
  projectIds: string[];
  portalUserId: string;
};

export const relationshipActivities: RelationshipActivity[] = [
  {
    id: "activity-homepage-approved",
    eventType: "Approval",
    title: "Homepage design approved",
    description: "Client approval moved the homepage package into launch prep.",
    timestamp: "May 31, 2026 / 3:58 PM",
  },
  {
    id: "activity-qa-scheduled",
    eventType: "Meeting",
    title: "QA review scheduled",
    description: "Launch QA review was scheduled for the scheduler build.",
    timestamp: "May 31, 2026 / 2:44 PM",
  },
  {
    id: "activity-assets-uploaded",
    eventType: "File Upload",
    title: "Brand assets uploaded",
    description: "Logo references and media files were added to the workspace.",
    timestamp: "May 30, 2026 / 11:25 AM",
  },
];

export const relationshipApprovals: RelationshipApproval[] = [
  {
    id: "approval-homepage-designs",
    projectId: "project-scheduler-platform",
    title: "Homepage Designs",
    category: "Design",
    status: "Approved",
    submitted: "May 31, 2026",
  },
  {
    id: "approval-automation-maps",
    projectId: "project-automation-layer",
    title: "Automation Maps",
    category: "Automation Docs",
    status: "Pending Review",
    submitted: "May 29, 2026",
  },
];

export const relationshipInvoices: RelationshipInvoice[] = [
  {
    id: "invoice-2026-001",
    invoiceNumber: "INV-2026-001",
    projectId: "project-scheduler-platform",
    title: "Website Build Deposit",
    amount: "$750",
    status: "Paid",
    dueDate: "June 18, 2026",
  },
  {
    id: "invoice-2026-003",
    invoiceNumber: "INV-2026-003",
    projectId: "project-automation-layer",
    title: "Automation Support Layer",
    amount: "$2,400",
    status: "Due Soon",
    dueDate: "June 12, 2026",
  },
];

export const relationshipMeetings: RelationshipMeeting[] = [
  {
    id: "meeting-qa-review",
    title: "QA Review Session",
    date: "June 03, 2026 / 2:00 PM",
    status: "Confirmed",
  },
  {
    id: "meeting-launch-prep",
    title: "Launch Prep Call",
    date: "June 10, 2026 / 11:00 AM",
    status: "Pending Review",
  },
];

export const relationshipProjects: RelationshipProject[] = [
  {
    id: "project-scheduler-platform",
    clientId: "client-dayiiiatch-preview",
    title: "Scheduler Platform Expansion",
    summary:
      "Booking, admin, portal, and launch visibility systems connected into one client operating flow.",
    phase: "Build",
    progress: 72,
    timelineStatus: "Active",
    deliverables: ["Launch Readiness Checklist", "Client Portal Walkthrough"],
    approvalIds: ["approval-homepage-designs"],
    invoiceIds: ["invoice-2026-001"],
    activityIds: ["activity-homepage-approved", "activity-qa-scheduled"],
  },
  {
    id: "project-automation-layer",
    clientId: "client-dayiiiatch-preview",
    title: "Automation Support Layer",
    summary:
      "Support routing, repeated workflow references, and future Damarko automation foundations.",
    phase: "Strategy",
    progress: 46,
    timelineStatus: "Needs Review",
    deliverables: ["Automation Intake Map"],
    approvalIds: ["approval-automation-maps"],
    invoiceIds: ["invoice-2026-003"],
    activityIds: ["activity-assets-uploaded"],
  },
];

export const relationshipClients: RelationshipClient[] = [
  {
    id: "client-dayiiiatch-preview",
    name: "DAYIIIatch Preview Client",
    company: "DAYIIIatch Workspace OS",
    email: "client@dayiiiatch-preview.com",
    source: "Client Portal",
    serviceInterest: "Workspace OS Build",
    activeProjectIds: ["project-scheduler-platform", "project-automation-layer"],
    invoiceIds: ["invoice-2026-001", "invoice-2026-003"],
    meetingIds: ["meeting-qa-review", "meeting-launch-prep"],
    activityIds: [
      "activity-homepage-approved",
      "activity-qa-scheduled",
      "activity-assets-uploaded",
    ],
    approvalIds: ["approval-homepage-designs", "approval-automation-maps"],
    portalAccount: {
      id: "portal-user-preview",
      email: "client@dayiiiatch-preview.com",
      role: "Client Owner",
      status: "Connected",
      lastLogin: "May 31, 2026 / 3:45 PM",
    },
  },
];

export const crmRelationshipMaps: CrmRelationshipMap[] = [
  {
    leadId: "lead-preview-client",
    clientId: "client-dayiiiatch-preview",
    projectIds: ["project-scheduler-platform", "project-automation-layer"],
    portalUserId: "portal-user-preview",
  },
];

export function getRelationshipClient(id: string) {
  return relationshipClients.find((client) => client.id === id);
}

export function getRelationshipProject(id: string) {
  return relationshipProjects.find((project) => project.id === id);
}

// Future Supabase hooks: hydrate this graph from clients, projects,
// client_projects, portal_users, activity_events, approvals, and invoices.
