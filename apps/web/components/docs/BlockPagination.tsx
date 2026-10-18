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
    <div className="pt-8 pb-4 border-t border-[#263238] flex items-center justify-between gap-3 font-mono">
      {prevBlock ? (
        <Link
          href={`/blocks/${prevBlock.slug}`}
          className="inline-flex items-center gap-2.5 px-3.5 py-2.5 rounded-[4px] border border-[#263238] bg-[#101719] hover:bg-[#151d20] hover:border-[#00f5c8]/40 transition-all group max-w-[48%] sm:max-w-[42%]"
        >
          <ChevronLeft size={14} className="text-[#718087] group-hover:text-[#00f5c8] group-hover:-translate-x-0.5 transition-all shrink-0" />
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-[10px] text-[#00f5c8] shrink-0 font-bold">
              [PREV]
            </span>
            <span className="text-[#263238] hidden sm:inline">|</span>
            <span className="text-xs font-semibold text-[#929da4] group-hover:text-[#f3f6f5] transition-colors truncate">
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
          className="inline-flex items-center gap-2.5 px-3.5 py-2.5 rounded-[4px] border border-[#263238] bg-[#101719] hover:bg-[#151d20] hover:border-[#00f5c8]/40 transition-all group ml-auto max-w-[48%] sm:max-w-[42%]"
        >
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-xs font-semibold text-[#929da4] group-hover:text-[#f3f6f5] transition-colors truncate">
              {getShortTitle(nextBlock.slug, nextBlock.title)}
            </span>
            <span className="text-[#263238] hidden sm:inline">|</span>
            <span className="text-[10px] text-[#00f5c8] shrink-0 font-bold">
              [NEXT]
            </span>
          </div>
          <ChevronRight size={14} className="text-[#718087] group-hover:text-[#00f5c8] group-hover:translate-x-0.5 transition-all shrink-0" />
        </Link>
      )}
    </div>
  );
}

