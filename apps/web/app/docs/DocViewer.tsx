import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { GitHubIcon, BackIcon, NextIcon } from "@/components/icons";
import { DOC_CATEGORIES, DocItem } from "@/lib/docs-data";

interface DocViewerProps {
  slug: string;
  title: string;
  html: string;
}

export function DocViewer({ slug, title, html }: DocViewerProps) {
  const allItems: DocItem[] = DOC_CATEGORIES.flatMap((cat) => cat.items);
  const currentIndex = allItems.findIndex((item) => item.slug === slug);
  const currentItem = allItems[currentIndex];
  const prevItem = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const nextItem = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  return (
    <article className="doc-article">
      {/* Breadcrumbs */}
      <div className="doc-breadcrumbs">
        <Link href="/docs" className="breadcrumb-link">
          Docs
        </Link>
        <ChevronRight size={13} className="breadcrumb-separator" />
        <span className="breadcrumb-current">
          {currentItem ? currentItem.category : "Guide"}
        </span>
      </div>

      {/* Rendered Markdown HTML */}
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* GitHub Source Footer */}
      <div className="doc-meta-footer">
        <a
          href={`https://github.com/Ashwin-Khowala/rnblocks/blob/master/docs/${slug}.md`}
          target="_blank"
          rel="noopener noreferrer"
          className="github-source-link"
        >
          <GitHubIcon size={14} />
          <span>View source file on GitHub (docs/{slug}.md)</span>
        </a>
      </div>

      {/* Prev / Next Navigation */}
      <div className="doc-pagination">
        {prevItem ? (
          <Link href={`/docs/${prevItem.slug}`} className="pagination-card prev">
            <span className="pagination-label">
              <BackIcon size={14} /> Previous
            </span>
            <span className="pagination-title">{prevItem.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {nextItem ? (
          <Link href={`/docs/${nextItem.slug}`} className="pagination-card next">
            <span className="pagination-label">
              Next <NextIcon size={14} />
            </span>
            <span className="pagination-title">{nextItem.title}</span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </article>
  );
}
