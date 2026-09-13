import React from "react";
import { notFound } from "next/navigation";
import { DOC_CATEGORIES } from "@/lib/docs-data";
import { getDocContent } from "@/lib/docs";
import { DocViewer } from "../DocViewer";

export function generateStaticParams() {
  return DOC_CATEGORIES.flatMap((category) =>
    category.items.map((item) => ({
      slug: item.slug,
    }))
  );
}

export default async function DocSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = await getDocContent(slug);

  if (!doc) {
    notFound();
  }

  return <DocViewer slug={doc.slug} title={doc.title} html={doc.html} />;
}
