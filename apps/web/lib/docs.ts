import "server-only";
import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import { DOC_CATEGORIES, DocCategory, DocItem } from "./docs-data";

export { DOC_CATEGORIES, type DocCategory, type DocItem };

export function findDocsDir(): string {
  const candidates = [
    path.join(process.cwd(), "docs"),
    path.join(process.cwd(), "..", "..", "docs"),
    path.join(process.cwd(), "..", "docs"),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
      return candidate;
    }
  }

  let current = process.cwd();
  for (let i = 0; i < 6; i++) {
    const candidate = path.join(current, "docs");
    if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
      return candidate;
    }
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }
  return path.join(process.cwd(), "docs");
}

export async function getDocContent(slug: string): Promise<{
  slug: string;
  title: string;
  html: string;
  raw: string;
} | null> {
  const docsDir = findDocsDir();
  const filePath = path.join(docsDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf-8");

  // Extract title from first # heading or lookup in categories
  let title = slug;
  const headingMatch = raw.match(/^#\s+(.+)$/m);
  if (headingMatch) {
    title = headingMatch[1].trim();
  } else {
    for (const cat of DOC_CATEGORIES) {
      const match = cat.items.find((i) => i.slug === slug);
      if (match) {
        title = match.title;
        break;
      }
    }
  }

  const html = await marked.parse(raw);

  return {
    slug,
    title,
    html,
    raw,
  };
}
