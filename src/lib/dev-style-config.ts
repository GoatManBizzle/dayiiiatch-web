export type DevStyleControlType = "range" | "color" | "text";

export type DevStyleControl = {
  label: string;
  cssVar: string;
  type: DevStyleControlType;
  defaultValue: string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  placeholder?: string;
};

export type DevStyleSection = {
  id: string;
  label: string;
  selector: string;
  controls: DevStyleControl[];
};

export type DevStylePageConfig = {
  pageId: string;
  label: string;
  sections: DevStyleSection[];
};

const sectionSurfaceControls: DevStyleControl[] = [
  {
    label: "Width",
    cssVar: "--dse-width",
    type: "range",
    defaultValue: "100%",
    min: 40,
    max: 100,
    step: 1,
    unit: "%",
  },
  {
    label: "Max width",
    cssVar: "--dse-max-width",
    type: "range",
    defaultValue: "1280px",
    min: 640,
    max: 1680,
    step: 10,
    unit: "px",
  },
  {
    label: "Section background",
    cssVar: "--dse-section-bg",
    type: "color",
    defaultValue: "#071220",
  },
  {
    label: "Card background",
    cssVar: "--dse-card-bg",
    type: "color",
    defaultValue: "#0b1220",
  },
  {
    label: "Border color",
    cssVar: "--dse-border-color",
    type: "color",
    defaultValue: "#22d3ee",
  },
  {
    label: "Accent color",
    cssVar: "--dse-accent-color",
    type: "color",
    defaultValue: "#22d3ee",
  },
  {
    label: "Heading color",
    cssVar: "--dse-heading-color",
    type: "color",
    defaultValue: "#ffffff",
  },
  {
    label: "Body text color",
    cssVar: "--dse-body-color",
    type: "color",
    defaultValue: "#cbd5e1",
  },
  {
    label: "Button background",
    cssVar: "--dse-button-bg",
    type: "color",
    defaultValue: "#0e7490",
  },
  {
    label: "Button text",
    cssVar: "--dse-button-text",
    type: "color",
    defaultValue: "#ffffff",
  },
  {
    label: "Glow color",
    cssVar: "--dse-glow-color",
    type: "color",
    defaultValue: "#22d3ee",
  },
  {
    label: "Glow intensity",
    cssVar: "--dse-glow-intensity",
    type: "range",
    defaultValue: "28px",
    min: 0,
    max: 90,
    step: 1,
    unit: "px",
  },
  {
    label: "Padding",
    cssVar: "--dse-padding",
    type: "range",
    defaultValue: "24px",
    min: 0,
    max: 96,
    step: 1,
    unit: "px",
  },
  {
    label: "Margin top",
    cssVar: "--dse-margin-top",
    type: "range",
    defaultValue: "40px",
    min: 0,
    max: 140,
    step: 1,
    unit: "px",
  },
  {
    label: "Border radius",
    cssVar: "--dse-radius",
    type: "range",
    defaultValue: "28px",
    min: 0,
    max: 56,
    step: 1,
    unit: "px",
  },
  {
    label: "Border width",
    cssVar: "--dse-border-width",
    type: "range",
    defaultValue: "1px",
    min: 0,
    max: 6,
    step: 1,
    unit: "px",
  },
  {
    label: "Font size",
    cssVar: "--dse-font-size",
    type: "range",
    defaultValue: "16px",
    min: 12,
    max: 28,
    step: 1,
    unit: "px",
  },
  {
    label: "Card gap",
    cssVar: "--dse-card-gap",
    type: "range",
    defaultValue: "16px",
    min: 0,
    max: 56,
    step: 1,
    unit: "px",
  },
  {
    label: "Blur intensity",
    cssVar: "--dse-blur",
    type: "range",
    defaultValue: "16px",
    min: 0,
    max: 48,
    step: 1,
    unit: "px",
  },
  {
    label: "Opacity",
    cssVar: "--dse-opacity",
    type: "range",
    defaultValue: "1",
    min: 0.2,
    max: 1,
    step: 0.01,
  },
  {
    label: "Section image URL",
    cssVar: "--dse-section-bg-image",
    type: "text",
    defaultValue: "",
    placeholder: "/images/example.png",
  },
  {
    label: "Overlay color",
    cssVar: "--dse-overlay-color",
    type: "color",
    defaultValue: "#000000",
  },
  {
    label: "Overlay opacity",
    cssVar: "--dse-overlay-opacity",
    type: "range",
    defaultValue: "0",
    min: 0,
    max: 0.95,
    step: 0.01,
  },
];

const globalControls: DevStyleControl[] = [
  {
    label: "Page max width",
    cssVar: "--dse-page-max-width",
    type: "range",
    defaultValue: "1280px",
    min: 960,
    max: 1680,
    step: 10,
    unit: "px",
  },
  {
    label: "Page horizontal padding",
    cssVar: "--dse-page-padding-x",
    type: "range",
    defaultValue: "32px",
    min: 0,
    max: 96,
    step: 1,
    unit: "px",
  },
  {
    label: "Section gap",
    cssVar: "--dse-section-gap",
    type: "range",
    defaultValue: "48px",
    min: 8,
    max: 140,
    step: 1,
    unit: "px",
  },
  {
    label: "Main background image",
    cssVar: "--dse-main-bg-image",
    type: "text",
    defaultValue: "/bg-main.png",
    placeholder: "/bg-main.png",
  },
  {
    label: "Background overlay strength",
    cssVar: "--dse-page-overlay-opacity",
    type: "range",
    defaultValue: "0",
    min: 0,
    max: 0.95,
    step: 0.01,
  },
  {
    label: "Background overlay color",
    cssVar: "--dse-page-overlay-color",
    type: "color",
    defaultValue: "#000000",
  },
];

function section(id: string, label: string, selector: string): DevStyleSection {
  return {
    id,
    label,
    selector,
    controls: sectionSurfaceControls,
  };
}

export const devStylePages: DevStylePageConfig[] = [
  {
    pageId: "home",
    label: "Homepage",
    sections: [
      {
        id: "global",
        label: "Global Page",
        selector: ":root",
        controls: globalControls,
      },
      section("header-video", "Header / Video Banner", "[data-style-section='header-video']"),
      section("navigation", "Navigation", "[data-style-section='navigation']"),
      section("about", "About Section", "[data-style-section='about']"),
      section(
        "commercial",
        "Services / Offers / Packages",
        "[data-style-section='commercial']",
      ),
      section("proof", "Proof Systems", "[data-style-section='proof']"),
      section("damarko", "Damarko Section", "[data-style-section='damarko']"),
      section("faq", "FAQ", "[data-style-section='faq']"),
      section("audit", "Audit Checklist", "[data-style-section='audit']"),
      section("contact", "Contact", "[data-style-section='contact']"),
      section("footer", "Footer", "[data-style-section='footer']"),
    ],
  },
  {
    pageId: "how-we-work",
    label: "How We Work",
    sections: [
      {
        id: "global",
        label: "Global Page",
        selector: ":root",
        controls: globalControls,
      },
      section("navigation", "Navigation", "[data-style-section='navigation']"),
      section("workflow-hero", "Workflow Hero", "[data-style-section='workflow-hero']"),
      section("how-work", "How We Work", "[data-style-section='how-work']"),
      section("client-journey", "Client Journey", "[data-style-section='client-journey']"),
      section("timeline", "Project Timeline", "[data-style-section='timeline']"),
      section("footer", "Footer", "[data-style-section='footer']"),
    ],
  },
];

export function getDevStylePageConfig(pathname: string) {
  if (pathname === "/how-we-work") {
    return devStylePages.find((page) => page.pageId === "how-we-work")!;
  }

  return devStylePages.find((page) => page.pageId === "home")!;
}
