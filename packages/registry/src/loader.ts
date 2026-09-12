import fs from "node:fs";
import path from "node:path";
import {
  RegistryItemSchema,
  RegistryItem,
  RegistryManifest,
  RegistryManifestSchema,
} from "./schema.js";

export function findRegistryDir(startDir?: string): string {
  let current = startDir || process.cwd();
  for (let i = 0; i < 6; i++) {
    const candidate = path.join(current, "registry");
    if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
      return candidate;
    }
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }
  return path.join(process.cwd(), "registry");
}

export function listRegistryItems(registryDir?: string): RegistryItem[] {
  const dir = registryDir || findRegistryDir();
  const items: RegistryItem[] = [];

  const types = ["blocks", "screens"] as const;

  for (const type of types) {
    const typeDir = path.join(dir, type);
    if (!fs.existsSync(typeDir)) continue;

    const subdirs = fs
      .readdirSync(typeDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);

    for (const slug of subdirs) {
      const itemJsonPath = path.join(typeDir, slug, "registry.json");
      if (fs.existsSync(itemJsonPath)) {
        try {
          const raw = JSON.parse(fs.readFileSync(itemJsonPath, "utf-8"));
          const parsed = RegistryItemSchema.parse(raw);
          items.push(parsed);
        } catch (err) {
          console.warn(`[Registry Loader] Failed to parse ${itemJsonPath}:`, err);
        }
      }
    }
  }

  return items;
}

export function getRegistryItem(name: string, registryDir?: string): RegistryItem | null {
  const items = listRegistryItems(registryDir);
  return items.find((item) => item.name === name) || null;
}

export interface RegistryItemWithCode extends RegistryItem {
  codeFiles: { path: string; content: string }[];
}

export function getRegistryItemWithFiles(
  name: string,
  registryDir?: string
): RegistryItemWithCode | null {
  const dir = registryDir || findRegistryDir();
  const item = getRegistryItem(name, dir);
  if (!item) return null;

  const folder = item.type === "screen" ? "screens" : "blocks";
  const itemDir = path.join(dir, folder, item.name);

  const codeFiles: { path: string; content: string }[] = [];
  for (const file of item.files) {
    const filePath = path.join(itemDir, file.path);
    if (fs.existsSync(filePath)) {
      codeFiles.push({
        path: file.path,
        content: fs.readFileSync(filePath, "utf-8"),
      });
    }
  }

  return {
    ...item,
    codeFiles,
  };
}

export function generateManifest(registryDir?: string): RegistryManifest {
  const items = listRegistryItems(registryDir);
  const manifest: RegistryManifest = {
    version: "1.0.0",
    generatedAt: new Date().toISOString(),
    items,
  };
  return RegistryManifestSchema.parse(manifest);
}
