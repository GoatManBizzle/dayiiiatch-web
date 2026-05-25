export const portalNavItems = [
  { label: "Dashboard", href: "/portal/dashboard" },
  { label: "Projects", href: "/portal/projects" },
  { label: "Files", href: "/portal/files" },
  { label: "Messages", href: "/portal/messages" },
  { label: "Bookings", href: "/portal/bookings" },
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
    updated: "Today",
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
    updated: "Yesterday",
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
    updated: "2 days ago",
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

export const portalUploads = [
  { name: "logo-reference.png", type: "Logo", status: "Received" },
  { name: "workflow-notes.pdf", type: "PDF", status: "Reviewing" },
  { name: "brand-copy.docx", type: "Content", status: "Queued" },
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

export const fileCategories = [
  "Images",
  "PDFs",
  "Logos",
  "References",
  "Contracts",
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
};
