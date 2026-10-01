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
    <aside className="w-64 xl:w-68 shrink-0 hidden lg:block sticky top-[72px] h-[calc(100vh-5rem)] overflow-y-auto pr-4 pb-12">
      <div className="space-y-7">
        {/* Getting Started Group */}
        <div>
          <span className="text-[12px] font-semibold text-[#8b8d98] uppercase tracking-wider block mb-2.5 px-3">
            Getting Started
          </span>
          <div className="space-y-0.5">
            <Link
              href="/docs"
              className="flex items-center justify-between py-2 px-3 rounded-lg text-[14px] text-[#9ca3af] hover:text-white hover:bg-white/[0.05] transition-colors font-medium"
            >
              <span>Docs</span>
            </Link>
            <Link
              href="/blocks"
              className="flex items-center justify-between py-2 px-3 rounded-lg text-[14px] text-[#9ca3af] hover:text-white hover:bg-white/[0.05] transition-colors font-medium"
            >
              <span>Components</span>
            </Link>
            <Link
              href="/screens"
              className="flex items-center justify-between py-2 px-3 rounded-lg text-[14px] text-[#9ca3af] hover:text-white hover:bg-white/[0.05] transition-colors font-medium"
            >
              <span>Screens</span>
            </Link>
            <Link
              href="/blocks?category=charts"
              className="flex items-center justify-between py-2 px-3 rounded-lg text-[14px] text-[#9ca3af] hover:text-white hover:bg-white/[0.05] transition-colors font-medium"
            >
              <span>Charts</span>
            </Link>
            <Link
              href="/docs/cli"
              className="flex items-center justify-between py-2 px-3 rounded-lg text-[14px] text-[#9ca3af] hover:text-white hover:bg-white/[0.05] transition-colors font-medium"
            >
              <span>CLI</span>
            </Link>
            <Link
              href="/docs/theming"
              className="flex items-center justify-between py-2 px-3 rounded-lg text-[14px] text-[#9ca3af] hover:text-white hover:bg-white/[0.05] transition-colors font-medium"
            >
              <span>Theming</span>
            </Link>
          </div>
        </div>

        {/* Components Group */}
        <div>
          <span className="text-[12px] font-semibold text-[#8b8d98] uppercase tracking-wider block mb-2.5 px-3">
            Components
          </span>
          <div className="space-y-0.5">
            {blocks.map((item) => {
              const isSelected = item.slug === currentSlug;
              return (
                <Link
                  key={item.slug}
                  href={`/blocks/${item.slug}`}
                  className={cn(
                    "flex items-center justify-between py-2 px-3 rounded-lg text-[14px] transition-colors",
                    isSelected
                      ? "bg-white/[0.1] text-white font-semibold"
                      : "text-[#9ca3af] hover:text-white hover:bg-white/[0.05] font-medium"
                  )}
                >
                  <span className="truncate">{getShortTitle(item.slug, item.title)}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
