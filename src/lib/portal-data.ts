export const portalNavItems = [
  { label: "Dashboard", href: "/portal/dashboard" },
  { label: "Success Center", href: "/portal/success-center" },
  { label: "Projects", href: "/portal/projects" },
  { label: "Timeline", href: "/portal/timeline" },
  { label: "Files", href: "/portal/files" },
  { label: "Deliverables", href: "/portal/deliverables" },
  { label: "Invoices", href: "/portal/invoices" },
  { label: "Approvals", href: "/portal/approvals" },
  { label: "Activity", href: "/portal/activity" },
  { label: "Messages", href: "/portal/messages" },
  { label: "Bookings", href: "/portal/bookings" },
  { label: "Onboarding", href: "/portal/onboarding" },
  { label: "Damarko Concierge", href: "/portal/concierge", icon: "AI" },
  { label: "Project Manager", href: "/portal/project-manager", icon: "PM" },
  { label: "Settings", href: "/portal/settings" },
];

export const projectStages = [
  "Discovery",
  "Strategy",
  "Build",
  "Review",
  "Launch",
  "Optimization",
];

export const clientProjects = [
  {
    title: "Scheduler Platform Expansion",
    status: "In Progress",
    progress: 72,
    nextStep: "Review admin workflow notes",
    nextAction: "Confirm the admin workflow notes before the final QA pass.",
    updated: "May 30, 2026",
    stage: "Build",
    activity: [
      "Mobile booking QA passed with time slots stacked under form fields.",
      "Admin action layout moved into a cleaner 2-column operation grid.",
      "Email diagnostic response layer added for production booking checks.",
    ],
  },
  {
    title: "Brand Presence Upgrade",
    status: "Review Ready",
    progress: 88,
    nextStep: "Approve homepage proof section",
    nextAction: "Review proof cards, systems visuals, and screenshot capture framing.",
    updated: "May 29, 2026",
    stage: "Review",
    activity: [
      "Systems proof section upgraded with modal, gallery, and video slots.",
      "Authority stack and content engine sections added for platform trust.",
      "Main public background and mobile luxury spacing pass completed.",
    ],
  },
  {
    title: "Automation Support Layer",
    status: "Awaiting Assets",
    progress: 46,
    nextStep: "Upload process references",
    nextAction: "Upload workflow notes, examples, and repeated manual task references.",
    updated: "May 28, 2026",
    stage: "Strategy",
    activity: [
      "Smart intake engine structure prepared for service-specific routing.",
      "Lead source and CRM pipeline hooks added to the operational layer.",
      "Audit checklist delivery now supports PDF download and Resend email flow.",
    ],
  },
];

export const portalUpdates = [
  "Booking funnel QA passed on mobile.",
  "Smart intake summary added to project notes.",
  "Homepage proof assets queued for review.",
];

export const portalActivityFeed = [
  {
    title: "Homepage proof section approved",
    description:
      "Client approved the proof card order and visual framing for the public homepage.",
    timestamp: "May 30, 2026 / 4:18 PM",
    status: "Done",
    icon: "HP",
  },
  {
    title: "Strategy call completed",
    description:
      "Reviewed project priorities, launch expectations, and next decision points.",
    timestamp: "May 30, 2026 / 2:40 PM",
    status: "Done",
    icon: "SC",
  },
  {
    title: "Brand assets uploaded",
    description:
      "Logo reference, intro clip, and service agreement files were added to the asset center.",
    timestamp: "May 30, 2026 / 11:25 AM",
    status: "New",
    icon: "BA",
  },
  {
    title: "Revision request received",
    description:
      "Premium service positioning update requested for clearer offer priority.",
    timestamp: "May 29, 2026 / 5:05 PM",
    status: "Needs Review",
    icon: "RR",
  },
  {
    title: "Booking flow tested on mobile",
    description:
      "Mobile scheduler flow passed layout checks for stacked fields and time slots.",
    timestamp: "May 29, 2026 / 1:12 PM",
    status: "Done",
    icon: "BF",
  },
  {
    title: "Automation support layer queued",
    description:
      "Workflow notes and repeated task references are queued for automation planning.",
    timestamp: "May 28, 2026 / 3:45 PM",
    status: "Queued",
    icon: "AS",
  },
];

export const portalActivityEventTypes = [
  "All",
  "Approvals",
  "Meetings",
  "Deliverables",
  "Files",
  "Invoices",
  "Timeline",
];

export const portalMasterActivityEvents = [
  {
    id: "evt-homepage-approved",
    eventType: "Approvals",
    title: "Homepage Design Approved",
    description:
      "The homepage design package was approved and moved into the final launch preparation queue.",
    timestamp: "2 minutes ago",
    createdAt: "May 31, 2026 / 3:58 PM",
    createdBy: "Client Owner",
    status: "Approved",
    icon: "AP",
    relatedProject: "Brand Presence Upgrade",
    relatedDeliverable: "Final Homepage Export",
  },
  {
    id: "evt-meeting-scheduled",
    eventType: "Meetings",
    title: "Meeting Scheduled",
    description:
      "A QA review session was scheduled to confirm launch blockers, mobile checks, and approval status.",
    timestamp: "1 hour ago",
    createdAt: "May 31, 2026 / 2:44 PM",
    createdBy: "DAYIIIatch Admin",
    status: "Confirmed",
    icon: "MT",
    relatedProject: "Scheduler Platform Expansion",
    relatedDeliverable: "Client Portal Walkthrough",
  },
  {
    id: "evt-assets-uploaded",
    eventType: "Files",
    title: "Brand Assets Uploaded",
    description:
      "Logo references, media files, and brand source materials were added to the client asset center.",
    timestamp: "Yesterday",
    createdAt: "May 30, 2026 / 11:25 AM",
    createdBy: "Team Member",
    status: "Received",
    icon: "FL",
    relatedProject: "Brand Presence Upgrade",
    relatedDeliverable: "Approved Brand Asset Pack",
  },
  {
    id: "evt-deliverable-updated",
    eventType: "Deliverables",
    title: "Deliverable Updated",
    description:
      "The launch readiness checklist was refreshed with portal, booking, and admin QA notes.",
    timestamp: "2 days ago",
    createdAt: "May 29, 2026 / 4:15 PM",
    createdBy: "DAYIIIatch Admin",
    status: "Updated",
    icon: "DV",
    relatedProject: "Scheduler Platform Expansion",
    relatedDeliverable: "Launch Readiness Checklist",
  },
  {
    id: "evt-approval-requested",
    eventType: "Approvals",
    title: "Approval Requested",
    description:
      "Automation maps were submitted for client review with requested feedback on support routing.",
    timestamp: "3 days ago",
    createdAt: "May 28, 2026 / 5:20 PM",
    createdBy: "DAYIIIatch Admin",
    status: "Pending Review",
    icon: "AR",
    relatedProject: "Automation Support Layer",
    relatedDeliverable: "Automation Intake Map",
  },
  {
    id: "evt-timeline-active",
    eventType: "Timeline",
    title: "Build Phase Marked Active",
    description:
      "The project timeline moved from design into active build with homepage approval as the next milestone.",
    timestamp: "4 days ago",
    createdAt: "May 27, 2026 / 10:05 AM",
    createdBy: "Damarko System",
    status: "Active",
    icon: "TL",
    relatedProject: "Scheduler Platform Expansion",
    relatedDeliverable: "Project Timeline",
  },
  {
    id: "evt-invoice-generated",
    eventType: "Invoices",
    title: "Invoice Generated",
    description:
      "The premium strategy session invoice was generated and added to the billing workspace.",
    timestamp: "5 days ago",
    createdAt: "May 26, 2026 / 9:30 AM",
    createdBy: "DAYIIIatch Admin",
    status: "Due Soon",
    icon: "IN",
    relatedProject: "Brand Presence Upgrade",
    relatedDeliverable: "Premium Strategy Session",
  },
  {
    id: "evt-portal-access",
    eventType: "Portal Access",
    title: "Portal Access Granted",
    description:
      "Preview workspace access was opened for client review and operational walkthroughs.",
    timestamp: "6 days ago",
    createdAt: "May 25, 2026 / 1:10 PM",
    createdBy: "DAYIIIatch Admin",
    status: "New",
    icon: "PA",
    relatedProject: "DAYIIIatch Workspace OS",
    relatedDeliverable: "Client Portal",
  },
];

export const portalProjectMilestones = [
  {
    title: "Discovery",
    status: "Done",
    description:
      "Goals, constraints, audience needs, and platform priorities were mapped.",
    progress: 100,
  },
  {
    title: "Strategy",
    status: "Done",
    description:
      "Offer positioning, client journey, and operational priorities were translated into a build path.",
    progress: 100,
  },
  {
    title: "Build",
    status: "Active",
    description:
      "Portal, scheduler, proof systems, and client-facing workflows are moving through implementation.",
    progress: 72,
  },
  {
    title: "Review",
    status: "Queued",
    description:
      "Client review pass will validate content, visual hierarchy, and workflow clarity.",
    progress: 35,
  },
  {
    title: "Launch",
    status: "Queued",
    description:
      "Production readiness, final QA, and launch support checks will be completed.",
    progress: 10,
  },
  {
    title: "Optimization",
    status: "Queued",
    description:
      "Post-launch improvements will tune conversion flow, automation, and client support loops.",
    progress: 0,
  },
];

export const portalMeetings = [
  {
    title: "Strategy Call",
    date: "May 28",
    time: "12:30 PM",
    status: "Confirmed",
  },
  {
    title: "Review Session",
    date: "Jun 03",
    time: "2:00 PM",
    status: "Needs confirmation",
  },
];

export const bookingTimelineStages = [
  "Requested",
  "Confirmed",
  "Reminder Sent",
  "Completed",
  "Follow-Up",
];

export const portalClientBookings = [
  {
    serviceName: "Strategy Call",
    date: "Jun 03, 2026",
    time: "2:00 PM",
    status: "Confirmed",
    meetingType: "Video call",
    notes:
      "Review project momentum, approve homepage proof order, and confirm next scheduler QA priorities.",
    currentStage: "Confirmed",
  },
  {
    serviceName: "Premium Session",
    date: "Jun 10, 2026",
    time: "11:30 AM",
    status: "Needs confirmation",
    meetingType: "Planning session",
    notes:
      "Map automation support layer requirements, asset gaps, and launch support expectations.",
    currentStage: "Requested",
  },
  {
    serviceName: "Launch Prep Check-In",
    date: "Jun 17, 2026",
    time: "1:00 PM",
    status: "Reminder Sent",
    meetingType: "Project review",
    notes:
      "Final readiness review for booking flow, admin tools, client portal polish, and follow-up tasks.",
    currentStage: "Reminder Sent",
  },
];

export const portalUploads = [
  {
    name: "primary-logo-reference.png",
    category: "Brand Assets",
    type: "Logo",
    uploaded: "May 30, 2026",
    status: "Received",
  },
  {
    name: "workflow-notes.pdf",
    category: "Project References",
    type: "PDF",
    uploaded: "May 29, 2026",
    status: "Needs Review",
  },
  {
    name: "service-agreement-v2.pdf",
    category: "Contracts",
    type: "Contract",
    uploaded: "May 28, 2026",
    status: "Approved",
  },
  {
    name: "homepage-proof-pack.zip",
    category: "Deliverables",
    type: "Archive",
    uploaded: "May 27, 2026",
    status: "Replaced",
  },
  {
    name: "brand-intro-clip.mp4",
    category: "Media Uploads",
    type: "Video",
    uploaded: "May 26, 2026",
    status: "Received",
  },
];

export const portalMessages = [
  {
    author: "DAYIIIatch",
    type: "Update note",
    message: "The booking flow is stable. Next pass is proof content polish.",
    time: "Today",
  },
  {
    author: "Client",
    type: "Revision request",
    message: "Can we make the premium build option feel more direct?",
    time: "Yesterday",
  },
  {
    author: "DAYIIIatch",
    type: "Project comment",
    message: "Assets received. I will fold them into the review board.",
    time: "2 days ago",
  },
];

export const portalConversations = [
  {
    title: "Project Update",
    summary: "Build progress and current QA checkpoints.",
    status: "New",
    lastActivity: "May 30, 2026 / 10:42 AM",
    messages: [
      {
        sender: "DAYIIIatch",
        timestamp: "May 30, 2026 / 10:42 AM",
        status: "New",
        text: "Scheduler expansion is moving through the build phase. Admin flow notes are ready for one final confirmation before QA.",
      },
      {
        sender: "Client",
        timestamp: "May 30, 2026 / 11:08 AM",
        status: "Replied",
        text: "Confirmed. The current admin workflow direction looks right, especially the simpler action layout.",
      },
    ],
  },
  {
    title: "Asset Review",
    summary: "Brand references and homepage proof assets.",
    status: "Needs Review",
    lastActivity: "May 29, 2026 / 3:16 PM",
    messages: [
      {
        sender: "DAYIIIatch",
        timestamp: "May 29, 2026 / 3:16 PM",
        status: "Needs Review",
        text: "The homepage proof section is ready for review. Please check the proof cards, screenshot framing, and visual priority.",
      },
      {
        sender: "Client",
        timestamp: "May 29, 2026 / 4:04 PM",
        status: "Replied",
        text: "The proof cards are close. I want the strongest result to appear first before we approve the section.",
      },
    ],
  },
  {
    title: "Revision Request",
    summary: "Premium offer copy and service positioning.",
    status: "Replied",
    lastActivity: "May 28, 2026 / 1:22 PM",
    messages: [
      {
        sender: "Client",
        timestamp: "May 28, 2026 / 1:22 PM",
        status: "Replied",
        text: "Can the premium build option feel more direct and less like a secondary choice?",
      },
      {
        sender: "DAYIIIatch",
        timestamp: "May 28, 2026 / 2:10 PM",
        status: "Resolved",
        text: "Yes. I tightened the framing so the premium option reads like the recommended growth path instead of an add-on.",
      },
    ],
  },
  {
    title: "Launch Prep",
    summary: "Final checklist for deploy readiness.",
    status: "Resolved",
    lastActivity: "May 27, 2026 / 9:30 AM",
    messages: [
      {
        sender: "DAYIIIatch",
        timestamp: "May 27, 2026 / 9:30 AM",
        status: "Resolved",
        text: "Launch prep checklist is staged: booking flow, admin checks, proof content, and production environment review.",
      },
    ],
  },
];

export const fileCategories = [
  "Brand Assets",
  "Project References",
  "Contracts",
  "Deliverables",
  "Media Uploads",
];

export const deliverableCategories = [
  "Launch Files",
  "Strategy Docs",
  "Brand Assets",
  "Automation Docs",
  "Videos / Walkthroughs",
  "Final Exports",
];

export const portalDeliverables = [
  {
    title: "Launch Readiness Checklist",
    category: "Launch Files",
    added: "May 30, 2026",
    status: "Ready",
    approvalStatus: "Pending Review",
    fileType: "PDF",
    summary:
      "Final pre-launch checks for booking flow, admin tools, client portal routes, and production handoff.",
  },
  {
    title: "Growth Strategy Blueprint",
    category: "Strategy Docs",
    added: "May 29, 2026",
    status: "Updated",
    approvalStatus: "Approved",
    fileType: "DOCX",
    summary:
      "Client-facing roadmap for positioning, service flow, proof hierarchy, and next-stage conversion priorities.",
  },
  {
    title: "Approved Brand Asset Pack",
    category: "Brand Assets",
    added: "May 29, 2026",
    status: "Ready",
    approvalStatus: "Approved",
    fileType: "ZIP",
    summary:
      "Logo references, proof screenshots, visual accents, and prepared brand assets for launch use.",
  },
  {
    title: "Automation Intake Map",
    category: "Automation Docs",
    added: "May 28, 2026",
    status: "In Review",
    approvalStatus: "Needs Revision",
    fileType: "PDF",
    summary:
      "Workflow map for repeated client tasks, support triggers, and future Damarko-assisted routing.",
  },
  {
    title: "Client Portal Walkthrough",
    category: "Videos / Walkthroughs",
    added: "May 27, 2026",
    status: "Needs Approval",
    approvalStatus: "Pending Review",
    fileType: "MP4",
    summary:
      "Guided walkthrough of dashboard, projects, files, deliverables, messages, and scheduler workspaces.",
  },
  {
    title: "Final Homepage Export",
    category: "Final Exports",
    added: "May 26, 2026",
    status: "Updated",
    approvalStatus: "Approved",
    fileType: "PNG",
    summary:
      "Launch-ready visual export of the public homepage proof stack and conversion sections.",
  },
];

export const portalApprovalQueue = [
  {
    title: "Homepage Designs",
    category: "Design",
    dateSubmitted: "May 31, 2026",
    status: "Pending Review",
    project: "Brand Presence Upgrade",
    description:
      "Review the homepage proof layout, proof hierarchy, and launch-ready design direction.",
  },
  {
    title: "Brand Guides",
    category: "Brand Assets",
    dateSubmitted: "May 30, 2026",
    status: "Approved",
    project: "Brand Presence Upgrade",
    description:
      "Approved guidance for typography, accent usage, logo handling, and client-facing brand consistency.",
  },
  {
    title: "Strategy Documents",
    category: "Strategy Docs",
    dateSubmitted: "May 30, 2026",
    status: "Pending Review",
    project: "Scheduler Platform Expansion",
    description:
      "Client strategy notes covering project priorities, launch sequence, and post-launch support focus.",
  },
  {
    title: "Automation Maps",
    category: "Automation Docs",
    dateSubmitted: "May 29, 2026",
    status: "Needs Revision",
    project: "Automation Support Layer",
    description:
      "Workflow map needs client feedback on repeated support triggers and approval routing.",
  },
  {
    title: "Videos",
    category: "Videos / Walkthroughs",
    dateSubmitted: "May 28, 2026",
    status: "Pending Review",
    project: "Scheduler Platform Expansion",
    description:
      "Portal walkthrough video is staged for review before it becomes part of the client handoff package.",
  },
  {
    title: "Exports",
    category: "Final Exports",
    dateSubmitted: "May 27, 2026",
    status: "Rejected",
    project: "Brand Presence Upgrade",
    description:
      "One export package was rejected so the final asset naming and dimensions can be corrected.",
  },
];

export const portalApprovalHistory = [
  {
    date: "May 31, 2026",
    user: "Client Owner",
    action: "Revision Requested",
    item: "Automation Maps",
  },
  {
    date: "May 30, 2026",
    user: "DAYIIIatch Admin",
    action: "Approved",
    item: "Brand Guides",
  },
  {
    date: "May 27, 2026",
    user: "Client Owner",
    action: "Rejected",
    item: "Exports",
  },
];

export const portalApprovalItems = [
  {
    title: "Homepage Proof Section",
    project: "Brand Presence Upgrade",
    category: "Design Proof",
    dueDate: "Jun 04, 2026",
    status: "Awaiting Approval",
    description:
      "Review the proof card order, modal framing, and homepage credibility section before final launch polish.",
  },
  {
    title: "Brand Asset Pack",
    project: "Brand Presence Upgrade",
    category: "Brand Assets",
    dueDate: "Jun 05, 2026",
    status: "In Review",
    description:
      "Confirm logo references, screenshots, visual accents, and brand files are ready for client-facing use.",
  },
  {
    title: "Booking Flow QA",
    project: "Scheduler Platform Expansion",
    category: "Quality Assurance",
    dueDate: "Jun 06, 2026",
    status: "Approved",
    description:
      "Mobile scheduler layout, available time slots, and admin booking actions passed the current QA pass.",
  },
  {
    title: "Client Portal Walkthrough",
    project: "Scheduler Platform Expansion",
    category: "Video / Walkthrough",
    dueDate: "Jun 07, 2026",
    status: "Awaiting Approval",
    description:
      "Approve the walkthrough narrative for dashboard, projects, files, deliverables, messages, and bookings.",
  },
  {
    title: "Automation Intake Map",
    project: "Automation Support Layer",
    category: "Automation Docs",
    dueDate: "Jun 08, 2026",
    status: "Revision Requested",
    description:
      "Review workflow routing, repeated task references, and future support automation priorities.",
  },
];

export const portalPermissionAreas = [
  "Dashboard",
  "Projects",
  "Files",
  "Deliverables",
  "Messages",
  "Bookings",
  "Approvals",
];

export const portalRoles = [
  {
    role: "Client Owner",
    summary: "Primary client decision-maker with full workspace visibility.",
    badge: "Owner",
    permissions: {
      Dashboard: "Full",
      Projects: "Full",
      Files: "Full",
      Deliverables: "Approve",
      Messages: "Full",
      Bookings: "Full",
      Approvals: "Final",
    },
  },
  {
    role: "Team Member",
    summary: "Collaborator who can review work, comment, and upload assets.",
    badge: "Collaborator",
    permissions: {
      Dashboard: "View",
      Projects: "Comment",
      Files: "Upload",
      Deliverables: "Review",
      Messages: "Reply",
      Bookings: "Request",
      Approvals: "Request",
    },
  },
  {
    role: "Viewer",
    summary: "Read-only stakeholder access for project visibility.",
    badge: "Read Only",
    permissions: {
      Dashboard: "View",
      Projects: "View",
      Files: "View",
      Deliverables: "View",
      Messages: "View",
      Bookings: "View",
      Approvals: "None",
    },
  },
  {
    role: "DAYIIIatch Admin",
    summary: "Internal operator role for managing client workspace delivery.",
    badge: "Internal",
    permissions: {
      Dashboard: "Admin",
      Projects: "Admin",
      Files: "Admin",
      Deliverables: "Admin",
      Messages: "Admin",
      Bookings: "Admin",
      Approvals: "Admin",
    },
  },
];

export const portalInvoiceSummary = [
  { label: "Total Invoiced", value: "$7,950", status: "Outstanding" },
  { label: "Paid", value: "$4,800", status: "Paid" },
  { label: "Outstanding", value: "$3,150", status: "Outstanding" },
  { label: "Due Soon", value: "$2,400", status: "Due Soon" },
];

export const portalInvoices = [
  {
    invoiceNumber: "INV-2026-001",
    title: "Website Build Deposit",
    amount: "$750",
    tax: "$0",
    total: "$750",
    dueDate: "June 18, 2026",
    paidDate: "May 29, 2026",
    status: "Paid",
    project: "Scheduler Platform Expansion",
    services: ["Website system build deposit", "Portal workspace setup"],
  },
  {
    invoiceNumber: "INV-2026-002",
    title: "Brand Presence Upgrade",
    amount: "$4,800",
    tax: "$0",
    total: "$4,800",
    dueDate: "May 28, 2026",
    paidDate: "May 28, 2026",
    status: "Paid",
    project: "Brand Presence Upgrade",
    services: ["Homepage proof system", "Brand asset preparation"],
  },
  {
    invoiceNumber: "INV-2026-003",
    title: "Automation Support Layer",
    amount: "$2,400",
    tax: "$0",
    total: "$2,400",
    dueDate: "June 12, 2026",
    paidDate: "",
    status: "Due Soon",
    project: "Automation Support Layer",
    services: ["Automation intake map", "Support routing architecture"],
  },
  {
    invoiceNumber: "INV-2026-004",
    title: "Admin QA Recovery",
    amount: "$750",
    tax: "$0",
    total: "$750",
    dueDate: "May 24, 2026",
    paidDate: "",
    status: "Overdue",
    project: "Scheduler Platform Expansion",
    services: ["Admin QA pass", "Reschedule workflow review"],
  },
  {
    invoiceNumber: "INV-2026-005",
    title: "Premium Strategy Session",
    amount: "$650",
    tax: "$0",
    total: "$650",
    dueDate: "June 18, 2026",
    paidDate: "",
    status: "Draft",
    project: "Strategy Support",
    services: ["Premium strategy session", "Executive notes summary"],
  },
];

export const portalPaymentHistory = [
  {
    invoice: "INV-2026-002",
    date: "May 28, 2026",
    amount: "$4,800",
    status: "Paid",
  },
  {
    invoice: "INV-2026-001",
    date: "May 29, 2026",
    amount: "$750",
    status: "Paid",
  },
  {
    invoice: "INV-2026-003",
    date: "Scheduled for June 12, 2026",
    amount: "$2,400",
    status: "Due Soon",
  },
];

export const portalOnboardingChecklist = [
  {
    task: "Upload Assets",
    status: "Active",
    progress: 65,
    description: "Logos, brand references, files, and media are being collected.",
  },
  {
    task: "Complete Intake",
    status: "Done",
    progress: 100,
    description: "Business goals, service priorities, and launch constraints are documented.",
  },
  {
    task: "Schedule Kickoff Call",
    status: "Done",
    progress: 100,
    description: "Kickoff session is scheduled and linked to the client workspace.",
  },
  {
    task: "Review Roadmap",
    status: "Queued",
    progress: 35,
    description: "Roadmap review will confirm phases, decisions, and delivery order.",
  },
  {
    task: "Confirm Requirements",
    status: "Queued",
    progress: 20,
    description: "Final scope details and operational requirements are pending client signoff.",
  },
];

export const portalRequiredAssets = [
  {
    category: "Logos",
    status: "Received",
    description: "Primary mark, alternate mark, and transparent logo references.",
  },
  {
    category: "Brand Assets",
    status: "Approved",
    description: "Colors, typography references, proof screenshots, and visual samples.",
  },
  {
    category: "References",
    status: "Received",
    description: "Competitor links, inspiration notes, and existing workflow examples.",
  },
  {
    category: "Documents",
    status: "Pending",
    description: "Service documents, agreements, process notes, and internal handoff files.",
  },
  {
    category: "Website Links",
    status: "Received",
    description: "Current website, booking pages, social profiles, and priority landing pages.",
  },
  {
    category: "Media Files",
    status: "Pending",
    description: "Video, photography, walkthrough clips, and launch-ready promotional media.",
  },
];

export const portalOnboardingStages = [
  {
    title: "Discovery",
    status: "Done",
    progress: 100,
    description: "Capture goals, audience, constraints, assets, and operational context.",
  },
  {
    title: "Strategy",
    status: "Active",
    progress: 70,
    description: "Translate intake details into a roadmap, service flow, and build priorities.",
  },
  {
    title: "Build",
    status: "Queued",
    progress: 25,
    description: "Move approved requirements into implementation and project tracking.",
  },
  {
    title: "Review",
    status: "Queued",
    progress: 10,
    description: "Validate proofs, deliverables, booking paths, and client-facing content.",
  },
  {
    title: "Launch",
    status: "Queued",
    progress: 0,
    description: "Complete launch checks, handoff, support setup, and optimization planning.",
  },
];

export const portalKickoffPrep = {
  goals: [
    "Confirm the highest-priority business outcome for this build.",
    "Review asset readiness, approval owners, and launch constraints.",
    "Align on milestones, communication rhythm, and decision checkpoints.",
  ],
  expectations: [
    "DAYIIIatch will translate inputs into an operational roadmap.",
    "Client feedback will be captured through portal messages and approvals.",
    "Any missing assets will stay visible in the onboarding asset queue.",
  ],
  preparation: [
    "Upload brand and reference files before the kickoff call.",
    "Bring launch deadlines, must-have pages, and booking workflow notes.",
    "Confirm who can approve deliverables and revision requests.",
  ],
};

export const portalConciergeInsights = [
  { label: "Project Progress", value: "62%", status: "Active" },
  { label: "Open Approvals", value: "3", status: "Awaiting Approval" },
  { label: "Pending Assets", value: "3", status: "Pending" },
  { label: "Next Meeting", value: "Jun 03", status: "Confirmed" },
  { label: "Launch Readiness", value: "78%", status: "In Review" },
];

export const portalConciergeQuestions = [
  {
    title: "What's Next?",
    status: "Active",
    summary: "See the current milestone, next action, and timing.",
    answer: {
      headline: "Homepage Review",
      rows: [
        ["Current milestone", "Homepage Review"],
        ["Next action", "Approve homepage design."],
        ["Expected timeline", "2 business days."],
      ],
      notes: [
        "The brand presence work is in review while scheduler expansion continues in build.",
        "Approving the homepage proof section unlocks final polish and launch preparation.",
      ],
    },
  },
  {
    title: "Missing Assets",
    status: "Pending",
    summary: "Check which client assets are still needed.",
    answer: {
      headline: "Still needed",
      rows: [
        ["Brand Colors", "Pending"],
        ["Social Links", "Pending"],
        ["Logo Variations", "Pending"],
      ],
      notes: [
        "Upload missing assets in Files or Onboarding so DAYIIIatch can keep build momentum clean.",
      ],
    },
  },
  {
    title: "Project Status",
    status: "In Progress",
    summary: "Understand progress, phase, and the next phase.",
    answer: {
      headline: "Build phase is active",
      rows: [
        ["Progress", "62%"],
        ["Current phase", "Build"],
        ["Next phase", "Internal QA"],
      ],
      notes: [
        "Scheduler expansion, portal polish, and proof review are the current operational priorities.",
      ],
    },
  },
  {
    title: "Upcoming Meetings",
    status: "Confirmed",
    summary: "Preview the next scheduled client touchpoint.",
    answer: {
      headline: "Strategy Call",
      rows: [
        ["Date", "Jun 03, 2026"],
        ["Time", "2:00 PM"],
        ["Focus", "Roadmap decisions and scheduler QA priorities"],
      ],
      notes: [
        "Bring final asset notes, launch constraints, and any approval blockers to the call.",
      ],
    },
  },
  {
    title: "Pending Approvals",
    status: "Awaiting Approval",
    summary: "Find approvals that need client action.",
    answer: {
      headline: "Action needed",
      rows: [
        ["Homepage Proof Section", "Awaiting Approval"],
        ["Client Portal Walkthrough", "Awaiting Approval"],
        ["Automation Intake Map", "Revision Requested"],
      ],
      notes: [
        "Use the Approvals page to approve items or request focused revisions.",
      ],
    },
  },
  {
    title: "Launch Readiness",
    status: "In Review",
    summary: "Check readiness and remaining blockers.",
    answer: {
      headline: "78% ready",
      rows: [
        ["Current readiness", "78%"],
        ["Pending", "Client Approval"],
        ["Pending", "Final Asset Review"],
      ],
      notes: [
        "Launch confidence improves once approvals are complete and final assets are marked approved.",
      ],
    },
  },
];

export const portalSuccessHeroStats = [
  { label: "Project Health", value: "92%", status: "Healthy" },
  { label: "Launch Readiness", value: "78%", status: "In Review" },
  { label: "Current Phase", value: "Build", status: "Active" },
  { label: "Next Milestone", value: "Homepage Approval", status: "Awaiting Approval" },
];

export const portalSuccessMetrics = [
  {
    label: "Onboarding Progress",
    value: 64,
    status: "Active",
    detail: "Kickoff path is moving with roadmap and requirements still open.",
  },
  {
    label: "Asset Completion",
    value: 72,
    status: "Needs Attention",
    detail: "Core assets are received, but logo variations and social links remain.",
  },
  {
    label: "Approval Completion",
    value: 58,
    status: "Awaiting Approval",
    detail: "Homepage and walkthrough approvals need client action.",
  },
  {
    label: "Meeting Readiness",
    value: 86,
    status: "Healthy",
    detail: "Next strategy call is confirmed with agenda priorities ready.",
  },
  {
    label: "Invoice Status",
    value: 75,
    status: "Due Soon",
    detail: "One upcoming invoice is due soon and one legacy balance is overdue.",
  },
  {
    label: "Project Completion",
    value: 69,
    status: "Active",
    detail: "Build phase is active across scheduler, brand, and automation work.",
  },
];

export const portalHealthSignals = {
  levels: [
    { label: "Healthy", status: "Healthy", description: "Core project path is stable." },
    {
      label: "Needs Attention",
      status: "Needs Attention",
      description: "Client action is needed to protect momentum.",
    },
    { label: "Blocked", status: "Blocked", description: "A critical dependency is stuck." },
  ],
  missingAssets: ["Logo Variations", "Brand Colors", "Social Links"],
  overdueApprovals: ["Homepage Proof Section", "Client Portal Walkthrough"],
  upcomingMilestones: ["Homepage Approval", "Internal QA", "Launch Prep"],
  riskIndicators: [
    "Final asset review is still pending.",
    "Automation intake map has an open revision request.",
    "Invoice follow-up should be resolved before launch handoff.",
  ],
};

export const portalSuccessActions = [
  { title: "Upload Logo Variations", priority: "High", status: "Pending" },
  { title: "Approve Homepage Design", priority: "High", status: "Awaiting Approval" },
  { title: "Review Automation Flow", priority: "Medium", status: "In Review" },
  { title: "Confirm Launch Date", priority: "Low", status: "Queued" },
];

export const portalSuccessActivity = [
  {
    title: "Assets uploaded",
    description: "Primary logo reference and homepage proof pack were added.",
    timestamp: "May 30, 2026 / 11:25 AM",
    status: "Received",
  },
  {
    title: "Meeting completed",
    description: "Strategy call completed with roadmap decisions captured.",
    timestamp: "May 30, 2026 / 2:40 PM",
    status: "Done",
  },
  {
    title: "Approval submitted",
    description: "Booking Flow QA was approved for the current pass.",
    timestamp: "May 29, 2026 / 4:12 PM",
    status: "Approved",
  },
  {
    title: "Invoice generated",
    description: "Website System Build Deposit invoice is ready for payment.",
    timestamp: "May 29, 2026 / 10:05 AM",
    status: "Due Soon",
  },
  {
    title: "Deliverable updated",
    description: "Growth Strategy Blueprint was updated for client review.",
    timestamp: "May 28, 2026 / 5:35 PM",
    status: "Updated",
  },
];

export const portalLaunchReadiness = [
  { category: "Assets", status: "Pending", score: 72 },
  { category: "Approvals", status: "Needs Review", score: 58 },
  { category: "QA", status: "Ready", score: 84 },
  { category: "Scheduling", status: "Ready", score: 90 },
  { category: "Launch Prep", status: "Pending", score: 74 },
];

export const portalSuccessQuickAccess = [
  { label: "Projects", href: "/portal/projects" },
  { label: "Files", href: "/portal/files" },
  { label: "Deliverables", href: "/portal/deliverables" },
  { label: "Approvals", href: "/portal/approvals" },
  { label: "Invoices", href: "/portal/invoices" },
  { label: "Bookings", href: "/portal/bookings" },
  { label: "Concierge", href: "/portal/concierge" },
];

export const portalProjectManagerSnapshot = [
  { label: "Current Phase", value: "Build", status: "Active" },
  { label: "Progress", value: "62%", status: "In Progress" },
  { label: "Next Milestone", value: "Homepage Review", status: "Awaiting Approval" },
  { label: "Upcoming Meeting", value: "Jun 03 / 2:00 PM", status: "Confirmed" },
  { label: "Launch Readiness", value: "78%", status: "In Review" },
];

export const portalProjectManagerBlockers = [
  {
    title: "Missing Assets",
    severity: "High",
    status: "Pending",
    description:
      "Logo variations, social links, and final brand colors are still needed for launch polish.",
  },
  {
    title: "Pending Approvals",
    severity: "High",
    status: "Awaiting Approval",
    description:
      "Homepage proof and portal walkthrough approvals need client review before final QA.",
  },
  {
    title: "Overdue Reviews",
    severity: "Medium",
    status: "Needs Review",
    description:
      "Automation intake map revision needs a focused pass before workflow mapping closes.",
  },
  {
    title: "Scheduling Delays",
    severity: "Low",
    status: "Confirmed",
    description:
      "Next strategy review is confirmed, but launch date confirmation is still queued.",
  },
];

export const portalProjectManagerActions = [
  {
    title: "Upload logo variations",
    priority: "High",
    description: "Add alternate logo files so final brand exports can be checked.",
  },
  {
    title: "Approve homepage design",
    priority: "High",
    description: "Approve the homepage proof section or request one final revision.",
  },
  {
    title: "Review onboarding checklist",
    priority: "Medium",
    description: "Confirm roadmap and requirements tasks before the build handoff.",
  },
  {
    title: "Schedule strategy review",
    priority: "Low",
    description: "Keep the next review call aligned with internal QA and launch prep.",
  },
];

export const portalDamarkoInsights = [
  {
    title: "Project progressing on schedule.",
    status: "Healthy",
    description:
      "Build progress remains steady because the main scheduler and portal workstreams are active.",
  },
  {
    title: "Asset completion slowing progress.",
    status: "Needs Attention",
    description:
      "A small set of missing brand assets can slow final polish and launch readiness.",
  },
  {
    title: "Launch readiness improved this week.",
    status: "In Review",
    description:
      "Booking QA, proof updates, and deliverable organization increased readiness confidence.",
  },
];

export const portalTimelineHeroStats = [
  { label: "Current Phase", value: "Build", status: "Active" },
  { label: "Progress", value: "68%", status: "In Progress" },
  { label: "Estimated Completion", value: "June 18, 2026", status: "Due Soon" },
  { label: "Next Milestone", value: "Homepage Approval", status: "Awaiting Approval" },
];

export const portalTimelineMilestones = [
  {
    name: "Discovery",
    status: "Completed",
    progress: 100,
    startDate: "May 20, 2026",
    targetDate: "May 22, 2026",
    assignedTeam: "DAYIIIatch Strategy",
    description:
      "Project goals, audience needs, constraints, and operational context were collected and organized.",
  },
  {
    name: "Strategy",
    status: "Completed",
    progress: 100,
    startDate: "May 23, 2026",
    targetDate: "May 27, 2026",
    assignedTeam: "DAYIIIatch Strategy",
    description:
      "Offer positioning, service flow, project priorities, and roadmap decisions were translated into a build path.",
  },
  {
    name: "Design",
    status: "Completed",
    progress: 92,
    startDate: "May 28, 2026",
    targetDate: "June 03, 2026",
    assignedTeam: "DAYIIIatch Creative",
    description:
      "Homepage proof structure, brand presence upgrades, and client-facing presentation patterns were prepared.",
  },
  {
    name: "Build",
    status: "Active",
    progress: 68,
    startDate: "June 04, 2026",
    targetDate: "June 18, 2026",
    assignedTeam: "DAYIIIatch Development",
    description:
      "Portal workspaces, booking systems, operational dashboards, and client-facing workflows are being assembled.",
  },
  {
    name: "QA",
    status: "Upcoming",
    progress: 20,
    startDate: "June 18, 2026",
    targetDate: "June 21, 2026",
    assignedTeam: "DAYIIIatch QA",
    description:
      "Mobile checks, booking flow review, portal route checks, approvals, and final launch blockers will be validated.",
  },
  {
    name: "Launch",
    status: "Blocked",
    progress: 10,
    startDate: "June 21, 2026",
    targetDate: "June 24, 2026",
    assignedTeam: "DAYIIIatch Launch",
    description:
      "Launch depends on homepage approval, final asset review, and confirmation of the launch date.",
  },
  {
    name: "Support",
    status: "Upcoming",
    progress: 0,
    startDate: "June 25, 2026",
    targetDate: "Ongoing",
    assignedTeam: "DAYIIIatch Support",
    description:
      "Post-launch support, optimization, documentation, and client operating rhythm will continue after launch.",
  },
];

export const portalTimelineHealth = [
  { label: "Assets", status: "Needs Review", detail: "Logo variations and final colors are still open." },
  { label: "Approvals", status: "Needs Review", detail: "Homepage approval is the next major client action." },
  { label: "Meetings", status: "Healthy", detail: "Strategy review and QA call are on track." },
  { label: "Deliverables", status: "Healthy", detail: "Core deliverables are staged and review-ready." },
];

export const portalTimelineActions = [
  { title: "Approve Homepage", priority: "High", status: "Awaiting Approval" },
  { title: "Upload Logo Variations", priority: "High", status: "Pending" },
  { title: "Review Brand Guide", priority: "Medium", status: "Needs Review" },
  { title: "Schedule QA Call", priority: "Low", status: "Queued" },
];

export const portalTimelineActivity = [
  {
    title: "Homepage Completed",
    timestamp: "May 31, 2026 / 10:15 AM",
    status: "Completed",
    description: "Homepage proof section moved into approval-ready review.",
  },
  {
    title: "Brand Assets Uploaded",
    timestamp: "May 30, 2026 / 11:25 AM",
    status: "Received",
    description: "Primary logo reference and media files were added to the asset center.",
  },
  {
    title: "QA Scheduled",
    timestamp: "May 30, 2026 / 2:40 PM",
    status: "Confirmed",
    description: "Internal QA window was mapped to follow build completion.",
  },
  {
    title: "Review Requested",
    timestamp: "May 29, 2026 / 5:05 PM",
    status: "Needs Review",
    description: "Automation intake map needs one final review pass.",
  },
];

export const statusTone: Record<string, string> = {
  "In Progress": "border-cyan-300/25 bg-cyan-400/10 text-cyan-100",
  "Review Ready": "border-violet-300/25 bg-violet-500/10 text-violet-100",
  "Awaiting Assets": "border-amber-300/25 bg-amber-400/10 text-amber-100",
  "Revision Requested": "border-rose-300/25 bg-rose-400/10 text-rose-100",
  "Deployment Scheduled":
    "border-emerald-300/25 bg-emerald-400/10 text-emerald-100",
  Confirmed: "border-emerald-300/25 bg-emerald-400/10 text-emerald-100",
  "Needs confirmation": "border-amber-300/25 bg-amber-400/10 text-amber-100",
  "Reminder Sent": "border-violet-300/25 bg-violet-500/10 text-violet-100",
  Completed: "border-emerald-300/25 bg-emerald-400/10 text-emerald-100",
  "Follow-Up": "border-cyan-300/25 bg-cyan-400/10 text-cyan-100",
  Received: "border-cyan-300/25 bg-cyan-400/10 text-cyan-100",
  "Needs Review": "border-amber-300/25 bg-amber-400/10 text-amber-100",
  Approved: "border-emerald-300/25 bg-emerald-400/10 text-emerald-100",
  Replaced: "border-violet-300/25 bg-violet-500/10 text-violet-100",
  New: "border-cyan-300/25 bg-cyan-400/10 text-cyan-100",
  Replied: "border-violet-300/25 bg-violet-500/10 text-violet-100",
  Resolved: "border-emerald-300/25 bg-emerald-400/10 text-emerald-100",
  Done: "border-emerald-300/25 bg-emerald-400/10 text-emerald-100",
  Active: "border-cyan-300/25 bg-cyan-400/10 text-cyan-100",
  Queued: "border-zinc-300/18 bg-white/[0.045] text-zinc-300",
  Ready: "border-emerald-300/25 bg-emerald-400/10 text-emerald-100",
  "In Review": "border-amber-300/25 bg-amber-400/10 text-amber-100",
  Updated: "border-cyan-300/25 bg-cyan-400/10 text-cyan-100",
  "Needs Approval": "border-violet-300/25 bg-violet-500/10 text-violet-100",
  "Awaiting Approval": "border-amber-300/25 bg-amber-400/10 text-amber-100",
  "Pending Review": "border-cyan-300/25 bg-cyan-400/10 text-cyan-100",
  "Needs Revision": "border-amber-300/25 bg-amber-400/10 text-amber-100",
  Rejected: "border-rose-300/25 bg-rose-400/10 text-rose-100",
  Paid: "border-emerald-300/25 bg-emerald-400/10 text-emerald-100",
  Outstanding: "border-cyan-300/25 bg-cyan-400/10 text-cyan-100",
  "Due Soon": "border-amber-300/25 bg-amber-400/10 text-amber-100",
  Overdue: "border-rose-300/25 bg-rose-400/10 text-rose-100",
  Draft: "border-violet-300/25 bg-violet-500/10 text-violet-100",
  Pending: "border-amber-300/25 bg-amber-400/10 text-amber-100",
  Healthy: "border-emerald-300/25 bg-emerald-400/10 text-emerald-100",
  "Needs Attention": "border-amber-300/25 bg-amber-400/10 text-amber-100",
  Blocked: "border-rose-300/25 bg-rose-400/10 text-rose-100",
  High: "border-rose-300/25 bg-rose-400/10 text-rose-100",
  Medium: "border-amber-300/25 bg-amber-400/10 text-amber-100",
  Low: "border-cyan-300/25 bg-cyan-400/10 text-cyan-100",
  "Upcoming": "border-zinc-300/18 bg-white/[0.045] text-zinc-300",
};
