"use client";

import React from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { BlockItem } from "@/data/blocks";
import { CopyButton } from "@/components/CopyButton";
import {
  ArrowUpRightIcon,
  SlidersIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";

interface BlockListItemProps {
  block: BlockItem;
  isSelected?: boolean;
  onInspect: (block: BlockItem) => void;
  className?: string;
}

export function BlockListItem({
  block,
  isSelected = false,
  onInspect,
  className,
}: BlockListItemProps) {
  const { slug, title, category, description, dependencies } = block;

  return (
    <div
      className={cn(
        "group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border transition-all duration-200 bg-[#07070a]",
        isSelected
          ? "border-white/30 bg-white/[0.03] shadow-md shadow-black/50"
          : "border-white/[0.08] hover:border-white/[0.18] hover:bg-[#0a0a0f]",
        className
      )}
    >
      {/* Left: Metadata */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-300 bg-white/[0.05] border border-white/[0.08] px-2 py-0.5 rounded-md">
            {category}
          </span>
          <span className="text-[10px] font-mono text-zinc-500">
            {dependencies.join(", ")}
          </span>
        </div>

        <Link
          href={`/blocks/${slug}`}
          className="text-sm font-semibold text-zinc-100 group-hover:text-white transition-colors truncate block"
        >
          {title}
        </Link>

        <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
          {description}
        </p>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
        <CopyButton
          text={`npx @rnblocks/cli add ${slug}`}
          className="!bg-white/[0.04] !border-white/[0.08] hover:!border-white/[0.2] !rounded-lg !px-2.5 !py-1.5 !text-xs !font-mono text-zinc-300 hover:text-white"
          label="CLI"
        />

        <button
          onClick={() => {
            try { track("inspect_block", { block: slug, source: "list" }); } catch {}
            onInspect(block);
          }}
          className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer",
            isSelected
              ? "bg-white/10 border-white/20 text-white"
              : "bg-white/[0.04] border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/[0.08]"
          )}
          title="Quick inspect in pane"
        >
          <SlidersIcon size={12} />
          <span>Inspect</span>
        </button>

        <Link
          href={`/blocks/${slug}`}
          className="p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors"
          title="Open documentation"
        >
          <ArrowUpRightIcon size={14} />
        </Link>
      </div>
    </div>
  );
}
