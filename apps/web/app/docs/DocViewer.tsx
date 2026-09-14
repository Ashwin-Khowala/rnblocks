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
    <article className="flex flex-col gap-5">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-xs text-[#71717a] mb-2">
        <Link href="/docs" className="hover:text-[#f5f5f5] transition-colors">
          Docs
        </Link>
        <ChevronRight size={13} />
        <span className="text-[#a1a1aa]">
          {currentItem ? currentItem.category : "Guide"}
        </span>
      </div>

      {/* Rendered Markdown HTML */}
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* GitHub Source Footer */}
      <div className="mt-10 pt-5 border-t border-white/[0.08]">
        <a
          href={`https://github.com/Ashwin-Khowala/rnblocks/blob/master/docs/${slug}.md`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[13px] text-[#71717a] hover:text-[#f5f5f5] transition-colors"
        >
          <GitHubIcon size={14} />
          <span>View source file on GitHub (docs/{slug}.md)</span>
        </a>
      </div>

      {/* Prev / Next Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 pt-5 border-t border-white/[0.08]">
        {prevItem ? (
          <Link
            href={`/docs/${prevItem.slug}`}
            className="flex flex-col gap-1 p-4 bg-[#0d0d12] border border-white/[0.08] hover:border-white/[0.16] hover:bg-[#14141c] rounded-xl transition-all"
          >
            <span className="font-mono text-[11px] uppercase text-[#71717a] inline-flex items-center gap-1">
              <BackIcon size={14} /> Previous
            </span>
            <span className="text-sm font-semibold text-[#f5f5f5]">{prevItem.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {nextItem ? (
          <Link
            href={`/docs/${nextItem.slug}`}
            className="flex flex-col gap-1 p-4 bg-[#0d0d12] border border-white/[0.08] hover:border-white/[0.16] hover:bg-[#14141c] rounded-xl text-right items-end transition-all"
          >
            <span className="font-mono text-[11px] uppercase text-[#71717a] inline-flex items-center gap-1">
              Next <NextIcon size={14} />
            </span>
            <span className="text-sm font-semibold text-[#f5f5f5]">{nextItem.title}</span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </article>
  );
}
