export interface DocItem {
  slug: string;
  title: string;
  category: string;
  description: string;
}

export interface DocCategory {
  title: string;
  items: DocItem[];
}

export const DOC_CATEGORIES: DocCategory[] = [
  {
    title: "Getting Started",
    items: [
      {
        slug: "getting-started",
        title: "Introduction & Quick Start",
        category: "Getting Started",
        description: "Core philosophy, installation, and usage across Expo and React Native.",
      },
    ],
  },
  {
    title: "Using RNBlocks",
    items: [
      {
        slug: "cli",
        title: "CLI Reference",
        category: "Using RNBlocks",
        description: "Complete command guide for npx @rnblocks/cli add, list, and init.",
      },
      {
        slug: "styling-guide",
        title: "Styling & Customization",
        category: "Using RNBlocks",
        description: "StyleSheet philosophy, theme palettes, NativeWind adaptation, and fluid layout rules.",
      },
    ],
  },
  {
    title: "Creating Blocks",
    items: [
      {
        slug: "creating-a-block",
        title: "Creating a Block",
        category: "Creating Blocks",
        description: "Step-by-step authoring walkthrough: component files, metadata, and testing.",
      },
      {
        slug: "quality-standards",
        title: "Quality Standards",
        category: "Creating Blocks",
        description: "6-part checklist for functionality, layout, styling, a11y, and performance.",
      },
    ],
  },
  {
    title: "Registry Specification",
    items: [
      {
        slug: "registry-format",
        title: "Registry Schema Format",
        category: "Registry Specification",
        description: "Complete reference for registry.json schema, fields, and validation rules.",
      },
      {
        slug: "architecture",
        title: "Monorepo Architecture",
        category: "Registry Specification",
        description: "Turborepo layout, workspace packages, and end-to-end data flow.",
      },
    ],
  },
  {
    title: "Contributing",
    items: [
      {
        slug: "contributing",
        title: "Contribution Guide",
        category: "Contributing",
        description: "Local setup, PR submission checklist, commit conventions, and licensing.",
      },
    ],
  },
];
