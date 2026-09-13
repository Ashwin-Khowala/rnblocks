import React from "react";
import { notFound } from "next/navigation";
import { getDocContent } from "@/lib/docs";
import { DocViewer } from "./DocViewer";

export default async function DocsIndexPage() {
  const doc = await getDocContent("getting-started");

  if (!doc) {
    notFound();
  }

  return <DocViewer slug={doc.slug} title={doc.title} html={doc.html} />;
}
