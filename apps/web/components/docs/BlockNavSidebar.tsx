"use client";

import React from "react";
import Link from "next/link";
import { BlockItem } from "@/data/blocks";
import { getShortTitle } from "./constants";
import { cn } from "@/lib/utils";

interface BlockNavSidebarProps {
  blocks: BlockItem[];
  currentSlug: string;
}

export function BlockNavSidebar({ blocks, currentSlug }: BlockNavSidebarProps) {
  return (
    <aside className="w-64 xl:w-68 shrink-0 hidden lg:block sticky top-[72px] h-[calc(100vh-5rem)] overflow-y-auto pr-4 pb-12 font-mono">
      <div className="space-y-6">
        {/* Getting Started Group */}
        <div>
          <span className="text-[10px] font-bold text-[#00f5c8] uppercase tracking-wider block mb-2 px-2.5">
            // SYSTEM MANUAL
          </span>
          <div className="space-y-1">
            <Link
              href="/docs"
              className="nav-hud-item flex items-center justify-between py-1.5 px-2.5 rounded-[4px] text-xs text-[#929da4] hover:bg-[#151d20] border border-transparent transition-all"
            >
              <span>[DOCS_INDEX]</span>
              <span className="text-[10px] text-[#718087]">→</span>
            </Link>
            <Link
              href="/blocks"
              className="nav-hud-item flex items-center justify-between py-1.5 px-2.5 rounded-[4px] text-xs text-[#929da4] hover:bg-[#151d20] border border-transparent transition-all"
            >
              <span>[ALL_COMPONENTS]</span>
              <span className="text-[10px] text-[#718087]">→</span>
            </Link>
            <Link
              href="/docs/cli"
              className="nav-hud-item flex items-center justify-between py-1.5 px-2.5 rounded-[4px] text-xs text-[#929da4] hover:bg-[#151d20] border border-transparent transition-all"
            >
              <span>[CLI_TOOLING]</span>
              <span className="text-[10px] text-[#718087]">→</span>
            </Link>
            <Link
              href="/docs/theming"
              className="nav-hud-item flex items-center justify-between py-1.5 px-2.5 rounded-[4px] text-xs text-[#929da4] hover:bg-[#151d20] border border-transparent transition-all"
            >
              <span>[THEME_SYSTEM]</span>
              <span className="text-[10px] text-[#718087]">→</span>
            </Link>
            <Link
              href="/contribute"
              className="nav-hud-item flex items-center justify-between py-1.5 px-2.5 rounded-[4px] text-xs text-[#929da4] hover:bg-[#151d20] border border-transparent transition-all"
            >
              <span>[CONTRIBUTE]</span>
              <span className="text-[10px] text-[#718087]">→</span>
            </Link>
          </div>
        </div>

        {/* Components Group */}
        <div>
          <span className="text-[10px] font-bold text-[#00d9ff] uppercase tracking-wider block mb-2 px-2.5">
            // REGISTRY UNITS [{blocks.length}]
          </span>
          <div className="space-y-1">
            {blocks.map((item) => {
              const isSelected = item.slug === currentSlug;
              return (
                <Link
                  key={item.slug}
                  href={`/blocks/${item.slug}`}
                  className={cn(
                    "flex items-center justify-between py-1.5 px-2.5 rounded-[4px] text-xs transition-all",
                    isSelected
                      ? "bg-[#00f5c8]/10 text-[#00f5c8] font-bold border border-[#00f5c8]/30 shadow-[0_0_12px_rgba(0,245,200,0.15)]"
                      : "nav-hud-item text-[#929da4] hover:bg-[#151d20] border border-transparent"
                  )}
                >
                  <span className="truncate">{getShortTitle(item.slug, item.title)}</span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#00f5c8] shadow-[0_0_6px_#00f5c8] shrink-0" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}

