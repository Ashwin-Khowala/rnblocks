import fs from "node:fs";
import path from "node:path";
import { RegistryItemSchema } from "../packages/registry/src/schema";

const ROOT = process.cwd();
const REGISTRY_DIR = path.join(ROOT, "registry");
const OUTPUT_REGISTRY_JSON = path.join(REGISTRY_DIR, "registry.json");
const OUTPUT_WEB_DATA = path.join(ROOT, "apps", "web", "data", "blocks.tsx");
const OUTPUT_WEB_REGISTRY_DATA = path.join(ROOT, "apps", "web", "data", "registry-data.ts");

function generateRegistry() {
  console.log("Generating Registry from:", REGISTRY_DIR);

  const allItems: any[] = [];
  const imports: string[] = [];
  const dataItems: string[] = [];
  const webComponentItems: string[] = [];

  for (const type of ["blocks", "screens"] as const) {
    const typeDir = path.join(REGISTRY_DIR, type);
    if (!fs.existsSync(typeDir)) continue;

    const PREFERRED_BLOCK_ORDER = [
      "bar-chart",
      "grouped-bar-chart",
      "donut-chart",
      "interactive-calendar",
      "floating-docker",
      "comparison-chart",
      "social-auth-buttons",
      "trend-chart",
    ];

    const subdirs = fs
      .readdirSync(typeDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      .sort((a, b) => {
        const idxA = PREFERRED_BLOCK_ORDER.indexOf(a);
        const idxB = PREFERRED_BLOCK_ORDER.indexOf(b);
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;
        return a.localeCompare(b);
      });

    for (const slug of subdirs) {
      const itemDir = path.join(typeDir, slug);
      const metaPath = path.join(itemDir, "registry.json");

      if (!fs.existsSync(metaPath)) continue;

      const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
      const parsed = RegistryItemSchema.parse(meta);

      allItems.push(parsed);

      // Read all block files
      const codeFiles = parsed.files.map((file: any) => {
        const fPath = path.join(itemDir, file.path);
        return {
          path: file.path,
          content: fs.existsSync(fPath) ? fs.readFileSync(fPath, "utf-8") : "",
        };
      });

      // Legacy fallback: primary component file
      const primaryFile = parsed.files[0];
      const primaryFilePath = path.join(itemDir, primaryFile.path);
      const code = fs.existsSync(primaryFilePath)
        ? fs.readFileSync(primaryFilePath, "utf-8")
        : "";

      const compName =
        slug
          .split("-")
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join("") + "Component";

      // Relative import from apps/web/data/blocks.tsx to registry/
      const relImportPath = `../../../registry/${type}/${slug}/${primaryFile.path.replace(/\.tsx$/, "")}`;
      // For components that export demo props, import them for the web preview wrapper.
      // This keeps demo data out of the component's default props while still showing
      // a rich preview on the docs site.
      const previewWrapperImport = slug === "interactive-calendar"
        ? `import { DEMO_MARKED_DATES as _CalendarDemoData } from "${relImportPath}";`
        : null;

      imports.push(`import { default as ${compName} } from "${relImportPath}";`);
      if (previewWrapperImport) imports.push(previewWrapperImport);

      const authorStr = typeof parsed.author === "object" ? parsed.author.name : parsed.author;
      const primaryFramework = (parsed.frameworks && parsed.frameworks[0]) || parsed.framework || "react-native";

      const componentVal =
        slug === "interactive-calendar"
          ? `(() => {
      const Wrapped = (props: Record<string, unknown>) => <${compName} markedDates={_CalendarDemoData} {...props} />;
      Wrapped.displayName = "${compName}Wrapped";
      return Wrapped;
    })()`
          : compName;

      dataItems.push(`  {
    slug: "${slug}",
    name: "${parsed.name}",
    title: ${JSON.stringify(parsed.title)},
    description: ${JSON.stringify(parsed.description)},
    type: "${parsed.type}",
    category: "${parsed.category}",
    author: ${JSON.stringify(authorStr)},
    version: "${parsed.version}",
    platforms: ${JSON.stringify(parsed.platforms)},
    framework: "${primaryFramework}",
    frameworks: ${JSON.stringify(parsed.frameworks ?? [primaryFramework])},
    styling: ${JSON.stringify(parsed.styling)},
    themes: ${JSON.stringify(parsed.themes ?? [])},
    tags: ${JSON.stringify(parsed.tags ?? [])},
    dependencies: ${JSON.stringify(parsed.dependencies)},
    devDependencies: ${JSON.stringify(parsed.devDependencies ?? {})},
    registryDependencies: ${JSON.stringify(parsed.registryDependencies)},
    files: ${JSON.stringify(parsed.files)},
    code: ${JSON.stringify(code)},
    codeFiles: ${JSON.stringify(codeFiles)},
  }`);

      webComponentItems.push(`  {
    ...REGISTRY_DATA.find((item) => item.slug === "${slug}")!,
    Component: ${componentVal} as React.ComponentType,
  }`);
    }
  }

  // 1. Write root registry/registry.json
  const manifest = {
    version: "1.0.0",
    generatedAt: new Date().toISOString(),
    items: allItems,
  };

  fs.writeFileSync(
    OUTPUT_REGISTRY_JSON,
    JSON.stringify(manifest, null, 2),
    "utf-8"
  );
  console.log(`[OK] Generated ${OUTPUT_REGISTRY_JSON} with ${allItems.length} items.`);

  // 2. Ensure apps/web/data exists
  const webDataDir = path.dirname(OUTPUT_WEB_DATA);
  if (!fs.existsSync(webDataDir)) {
    fs.mkdirSync(webDataDir, { recursive: true });
  }

  // 3. Write apps/web/data/registry-data.ts (server-safe, no React components)
  const registryDataContent = `// AUTO-GENERATED BY scripts/generate-registry.ts — DO NOT EDIT DIRECTLY
export interface RegistryCodeFile {
  path: string;
  content: string;
}

export interface RegistryFileRef {
  path: string;
  type: string;
}

export interface RegistryItemData {
  slug: string;
  name: string;
  title: string;
  description: string;
  type: "block" | "screen";
  category: string;
  author: string;
  version: string;
  platforms: string[];
  framework: string;
  frameworks?: string[];
  styling: string[];
  themes?: string[];
  tags?: string[];
  dependencies: string[];
  devDependencies?: Record<string, string>;
  registryDependencies: string[];
  files?: RegistryFileRef[];
  code: string;
  codeFiles?: RegistryCodeFile[];
}

export const REGISTRY_DATA: RegistryItemData[] = [
${dataItems.join(",\n")}
];
`;
  fs.writeFileSync(OUTPUT_WEB_REGISTRY_DATA, registryDataContent, "utf-8");
  console.log(`[OK] Generated ${OUTPUT_WEB_REGISTRY_DATA}`);

  // 4. Write apps/web/data/blocks.tsx (client-safe with "use client", connects components for previews)
  const tsContent = `"use client";
// AUTO-GENERATED BY scripts/generate-registry.ts — DO NOT EDIT DIRECTLY
import React from "react";
import { REGISTRY_DATA, RegistryItemData } from "./registry-data";
${imports.join("\n")}

export interface RegistryWebItem extends RegistryItemData {
  Component: React.ComponentType;
}

export type BlockItem = RegistryWebItem;

export const REGISTRY_ITEMS: RegistryWebItem[] = [
${webComponentItems.join(",\n")}
];

export const BLOCKS_DATA: BlockItem[] = REGISTRY_ITEMS;
`;

  fs.writeFileSync(OUTPUT_WEB_DATA, tsContent, "utf-8");
  console.log(`[OK] Generated ${OUTPUT_WEB_DATA}`);
}

generateRegistry();
