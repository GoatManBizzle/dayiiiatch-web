export const crmOverviewCards = [
  { label: "Total Leads", value: "24", status: "Active" },
  { label: "Active Clients", value: "7", status: "Healthy" },
  { label: "Open Projects", value: "5", status: "In Progress" },
  { label: "Pending Approvals", value: "6", status: "Pending Review" },
  { label: "Outstanding Invoices", value: "$3.1k", status: "Outstanding" },
  { label: "Upcoming Bookings", value: "4", status: "Confirmed" },
];

export const crmPipelineStages = [
  {
    stage: "New Lead",
    cards: [
      {
        name: "Maya Stone",
        email: "maya@stonestudio.co",
        source: "Homepage CTA",
        serviceInterest: "Brand Presence Upgrade",
        heat: "Hot",
        nextAction: "Send project fit follow-up",
      },
      {
        name: "Jordan Miles",
        email: "jordan@northline.io",
        source: "Checklist Download",
        serviceInterest: "Automation Support Layer",
        heat: "Warm",
        nextAction: "Review intake answers",
      },
    ],
  },
  {
    stage: "Contacted",
    cards: [
      {
        name: "Nia Carter",
        email: "nia@brightbay.com",
        source: "Referral",
        serviceInterest: "Premium Strategy Session",
        heat: "Priority",
        nextAction: "Confirm decision-maker availability",
      },
    ],
  },
  {
    stage: "Discovery Scheduled",
    cards: [
      {
        name: "Theo Grant",
        email: "theo@grantworks.dev",
        source: "Book Free Call",
        serviceInterest: "Scheduler Platform Expansion",
        heat: "Hot",
        nextAction: "Prepare discovery brief",
      },
    ],
  },
  {
    stage: "Proposal Sent",
    cards: [
      {
        name: "Avery Quinn",
        email: "avery@quinncollective.com",
        source: "Premium Session",
        serviceInterest: "Workspace OS Build",
        heat: "Warm",
        nextAction: "Follow up on proposal",
      },
    ],
  },
  {
    stage: "Active Build",
    cards: [
      {
        name: "DAYIIIatch Client",
        email: "client@dayiiiatch-preview.com",
        source: "Client Portal",
        serviceInterest: "Client Workspace OS",
        heat: "Priority",
        nextAction: "Move approvals through portal",
      },
    ],
  },
  {
    stage: "Completed",
    cards: [
      {
        name: "Elena Brooks",
        email: "elena@brooksgrowth.com",
        source: "Referral",
        serviceInterest: "Launch System",
        heat: "Cold",
        nextAction: "Schedule optimization check-in",
      },
    ],
  },
];

export const crmClientRecords = [
  {
    clientName: "DAYIIIatch Preview Client",
    company: "DAYIIIatch Workspace OS",
    email: "client@dayiiiatch-preview.com",
    activeProject: "Scheduler Platform Expansion",
    portalStatus: "Active",
    invoiceStatus: "Due Soon",
    lastActivity: "Homepage design approved 2 minutes ago",
  },
  {
    clientName: "Maya Stone",
    company: "Stone Studio",
    email: "maya@stonestudio.co",
    activeProject: "Brand Presence Upgrade",
    portalStatus: "Invite Pending",
    invoiceStatus: "Draft",
    lastActivity: "Proposal follow-up queued today",
  },
  {
    clientName: "Theo Grant",
    company: "Grant Works",
    email: "theo@grantworks.dev",
    activeProject: "Scheduler Platform Expansion",
    portalStatus: "Not Created",
    invoiceStatus: "Outstanding",
    lastActivity: "Discovery scheduled for June 3",
  },
];

export const crmSystemConnections = [
  {
    title: "Bookings connected to clients",
    description:
      "Scheduler requests can become client records once a lead is qualified.",
    status: "Connected",
  },
  {
    title: "Projects connected to approvals",
    description:
      "Project milestones can generate approval requests and revision loops.",
    status: "Ready",
  },
  {
    title: "Invoices connected to projects",
    description:
      "Billing records are shaped to reference client projects and payment state.",
    status: "Ready",
  },
  {
    title: "Portal access connected to clients",
    description:
      "Workspace access can be granted per client record, role, and project.",
    status: "Preview",
  },
];
