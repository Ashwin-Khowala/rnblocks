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
    <div className="pt-8 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-4">
      {prevBlock ? (
        <Link
          href={`/blocks/${prevBlock.slug}`}
          className="flex flex-col gap-1 p-4 rounded-xl border border-white/[0.08] bg-[#09090d] hover:bg-white/[0.04] hover:border-white/[0.15] transition-all group"
        >
          <span className="flex items-center gap-1 text-[11px] font-mono text-[#71717a] group-hover:text-[#32c798] transition-colors">
            <ChevronLeft size={13} />
            <span>Previous</span>
          </span>
          <span className="font-semibold text-sm text-white group-hover:text-white">
            {getShortTitle(prevBlock.slug, prevBlock.title)}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {nextBlock && (
        <Link
          href={`/blocks/${nextBlock.slug}`}
          className="flex flex-col items-end gap-1 p-4 rounded-xl border border-white/[0.08] bg-[#09090d] hover:bg-white/[0.04] hover:border-white/[0.15] transition-all group text-right"
        >
          <span className="flex items-center gap-1 text-[11px] font-mono text-[#71717a] group-hover:text-[#32c798] transition-colors">
            <span>Next</span>
            <ChevronRight size={13} />
          </span>
          <span className="font-semibold text-sm text-white group-hover:text-white">
            {getShortTitle(nextBlock.slug, nextBlock.title)}
          </span>
        </Link>
      )}
    </div>
  );
}
