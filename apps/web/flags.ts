import { flag } from "flags/next";

/**
 * RNBlocks Feature Flags
 *
 * Connected to Vercel Web Analytics & Vercel Flags Explorer.
 * Any flag emitted to the DOM or reported server-side automatically
 * enriches Vercel Web Analytics events and page views.
 */

export const showExperimentalBlocks = flag<boolean>({
  key: "showExperimentalBlocks",
  description: "Display in-progress or experimental React Native components in the registry",
  defaultValue: false,
  options: [
    { value: false, label: "Off (Stable only)" },
    { value: true, label: "On (Show experimental)" },
  ],
  decide: () => process.env.ENABLE_EXPERIMENTAL_BLOCKS === "true",
});

export const newCardInteractions = flag<boolean>({
  key: "newCardInteractions",
  description: "Enable micro-animations, copy feedback, and interactive replay on block cards",
  defaultValue: true,
  options: [
    { value: true, label: "Active" },
    { value: false, label: "Standard" },
  ],
  decide: () => true,
});

export const cliTelemetryV2 = flag<boolean>({
  key: "cliTelemetryV2",
  description: "Anonymous CLI telemetry ingestion and usage enrichment",
  defaultValue: true,
  options: [
    { value: true, label: "Enabled" },
    { value: false, label: "Disabled" },
  ],
  decide: () => true,
});

export const registryFlags = {
  showExperimentalBlocks,
  newCardInteractions,
  cliTelemetryV2,
};

/**
 * Returns the default/static flag values to emit to the DOM
 * for Vercel Web Analytics attribution without blocking static rendering.
 */
export function getDefaultFlagValues(): Record<string, boolean> {
  return {
    showExperimentalBlocks: process.env.ENABLE_EXPERIMENTAL_BLOCKS === "true",
    newCardInteractions: true,
    cliTelemetryV2: true,
  };
}
