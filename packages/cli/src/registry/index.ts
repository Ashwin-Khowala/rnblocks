import fs from "node:fs";
import path from "node:path";
import {
  RegistryItem,
  RegistryItemSchema,
  RegistryItemWithCode,
  getRegistryItemWithFiles,
  listRegistryItems,
  findRegistryDir,
} from "@rnblocks/registry";

const GITHUB_RAW_BASE =
  process.env.RNBLOCKS_REGISTRY_URL ||
  "https://raw.githubusercontent.com/Ashwin-Khowala/rnblocks/master/registry";

export async function resolveRegistryItem(
  name: string
): Promise<RegistryItemWithCode | null> {
  // 1. Try local filesystem if inside or adjacent to monorepo
  try {
    const localDir = findRegistryDir();
    if (fs.existsSync(localDir)) {
      const item = getRegistryItemWithFiles(name, localDir);
      if (item) return item;
    }
  } catch {
    // Ignore local lookup error, fall through to network
  }

  // 2. Fetch from remote repository
  try {
    // Try block first, then screen
    for (const type of ["blocks", "screens"]) {
      const metaUrl = `${GITHUB_RAW_BASE}/${type}/${name}/registry.json`;
      const res = await fetch(metaUrl);
      if (res.ok) {
        const rawJson = await res.json();
        const parsed = RegistryItemSchema.parse(rawJson);

        const codeFiles: { path: string; content: string }[] = [];
        for (const file of parsed.files) {
          const fileUrl = `${GITHUB_RAW_BASE}/${type}/${name}/${file.path}`;
          const fileRes = await fetch(fileUrl);
          if (fileRes.ok) {
            codeFiles.push({
              path: file.path,
              content: await fileRes.text(),
            });
          }
        }

        return {
          ...parsed,
          codeFiles,
        };
      }
    }
  } catch (err) {
    console.error("Network error fetching registry item:", err);
  }

  return null;
}

export async function fetchAvailableItems(): Promise<RegistryItem[]> {
  // 1. Local filesystem
  try {
    const localDir = findRegistryDir();
    if (fs.existsSync(localDir)) {
      return listRegistryItems(localDir);
    }
  } catch {
    // Fall through
  }

  // 2. Remote manifest
  try {
    const res = await fetch(`${GITHUB_RAW_BASE}/registry.json`);
    if (res.ok) {
      const data = await res.json();
      return data.items || [];
    }
  } catch {
    // Ignore
  }

  return [];
}
