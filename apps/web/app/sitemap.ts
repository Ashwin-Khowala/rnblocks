import type { MetadataRoute } from "next";
import { DOC_CATEGORIES } from "@/lib/docs-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://rnblocks.vercel.app";
  const lastModified = new Date();

  // Core high-level pages
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blocks`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/contribute`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/submit`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  // Documentation pages from DOC_CATEGORIES
  for (const category of DOC_CATEGORIES) {
    for (const item of category.items) {
      routes.push({
        url: `${baseUrl}/docs/${item.slug}`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  // Registry blocks
  const blockSlugs = [
    "floating-docker",
    "interactive-calendar",
    "social-auth-buttons",
    "trend-chart",
  ];

  for (const slug of blockSlugs) {
    routes.push({
      url: `${baseUrl}/blocks?name=${slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.75,
    });
  }

  return routes;
}
