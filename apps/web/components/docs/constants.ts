export interface TocSection {
  id: string;
  title: string;
}

export const TOC_SECTIONS: TocSection[] = [
  { id: "preview", title: "Preview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "props", title: "Props & API" },
  { id: "accessibility", title: "Accessibility" },
];

/**
 * Concise, 1-line descriptions matching modern docs aesthetic
 * (replaces long run-on sentences with clean, crisp summaries)
 */
export const BLOCK_CONCISE_DESCRIPTIONS: Record<string, string> = {
  "bar-chart":
    "A rounded bar chart with smooth animations, touch scrubbing, and responsive layout.",
  "grouped-bar-chart":
    "A multi-category bar chart with responsive columns and interactive hover tooltips.",
  "donut-chart":
    "A radial donut chart with segment selection and central metric display.",
  "pie-chart":
    "An interactive pie chart with gesture responder, slice callouts, and smooth animations.",
  "comparison-chart":
    "A dual-series comparison spline chart with interactive touch scrubbing and tooltips.",
  "trend-chart":
    "A gradient area trend chart with real-time scrub indicators and value tracking.",
  "interactive-calendar":
    "A touch-friendly monthly calendar with marked dates and range selection.",
  "floating-docker":
    "A macOS-inspired floating dock navigation with magnification and spring physics.",
  "social-auth-buttons":
    "Branded OAuth authentication buttons for Apple, Google, and GitHub.",
};

export function getShortTitle(slug: string, fallback: string): string {
  switch (slug) {
    case "bar-chart":
      return "Bar Chart";
    case "grouped-bar-chart":
      return "Grouped Bar Chart";
    case "donut-chart":
      return "Donut Chart";
    case "pie-chart":
      return "Pie Chart";
    case "comparison-chart":
      return "Comparison Chart";
    case "trend-chart":
      return "Trend Chart";
    case "interactive-calendar":
      return "Calendar";
    case "floating-docker":
      return "Floating Docker";
    case "social-auth-buttons":
      return "Social Auth Buttons";
    default:
      return fallback;
  }
}

export function getConciseDescription(slug: string, fallback: string): string {
  return BLOCK_CONCISE_DESCRIPTIONS[slug] || fallback;
}
