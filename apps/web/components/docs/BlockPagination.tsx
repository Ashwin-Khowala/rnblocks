"use client";

import React from "react";
import Link from "next/link";
import { BlockItem } from "@/data/blocks";
import { getShortTitle } from "./constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlockPaginationProps {
  prevBlock: BlockItem | null;
  nextBlock: BlockItem | null;
}

export function BlockPagination({ prevBlock, nextBlock }: BlockPaginationProps) {
  if (!prevBlock && !nextBlock) return null;

  return (
    <div className="pt-8 pb-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
      {prevBlock ? (
        <Link
          href={`/blocks/${prevBlock.slug}`}
          className="inline-flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2 rounded-lg border border-white/[0.08] bg-[#09090d] hover:bg-white/[0.06] hover:border-white/[0.18] transition-all group max-w-[48%] sm:max-w-[42%]"
        >
          <ChevronLeft size={14} className="text-[#71717a] group-hover:text-[#32c798] transition-colors shrink-0" />
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-[11px] font-mono text-[#71717a] group-hover:text-[#32c798] transition-colors shrink-0">
              Prev
            </span>
            <span className="text-white/20 hidden sm:inline">·</span>
            <span className="text-xs font-medium text-[#d1d5db] group-hover:text-white transition-colors truncate">
              {getShortTitle(prevBlock.slug, prevBlock.title)}
            </span>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {nextBlock && (
        <Link
          href={`/blocks/${nextBlock.slug}`}
          className="inline-flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2 rounded-lg border border-white/[0.08] bg-[#09090d] hover:bg-white/[0.06] hover:border-white/[0.18] transition-all group ml-auto max-w-[48%] sm:max-w-[42%]"
        >
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-[11px] font-mono text-[#71717a] group-hover:text-[#32c798] transition-colors shrink-0">
              Next
            </span>
            <span className="text-white/20 hidden sm:inline">·</span>
            <span className="text-xs font-medium text-[#d1d5db] group-hover:text-white transition-colors truncate">
              {getShortTitle(nextBlock.slug, nextBlock.title)}
            </span>
          </div>
          <ChevronRight size={14} className="text-[#71717a] group-hover:text-[#32c798] transition-colors shrink-0" />
        </Link>
      )}
    </div>
  );
}
