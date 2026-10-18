"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { BlockItem } from "@/data/blocks";
import { getShortTitle } from "./constants";
import { Layers, ChevronRight, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlockMobileBarProps {
  blocks: BlockItem[];
  currentBlock: BlockItem;
}

export function BlockMobileBar({ blocks, currentBlock }: BlockMobileBarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const openDrawer = () => {
    setIsRendered(true);
    // Double RAF to guarantee the elements are in the DOM before animating in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setDrawerOpen(true);
      });
    });
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    // Wait for the 300ms transition to finish before unmounting to eliminate any shadow bleed
    setTimeout(() => {
      setIsRendered(false);
    }, 300);
  };

  // Lock body scroll and listen for Escape when mobile drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && drawerOpen) {
        closeDrawer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [drawerOpen]);

  // Filtered blocks inside the drawer search
  const filteredBlocks = useMemo(() => {
    if (!searchQuery.trim()) return blocks;
    const q = searchQuery.toLowerCase();
    return blocks.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.slug.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
    );
  }, [blocks, searchQuery]);

  return (
    <>
      {/* ── Static, In-Flow Mobile Header (Never Floats on Scroll) ───── */}
      <div className="lg:hidden flex items-center justify-between gap-3 pb-3 mb-4 border-b border-[#263238] font-mono">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs min-w-0">
          <Link href="/blocks" className="text-[#929da4] hover:text-[#00f5c8] transition-colors shrink-0">
            [BLOCKS]
          </Link>
          <span className="text-[#263238]">/</span>
          <span className="text-[#00f5c8] font-bold truncate">
            {getShortTitle(currentBlock.slug, currentBlock.title)}
          </span>
        </div>

        {/* Drawer Trigger Button (Fixed in-flow, scrolls away with page) */}
        <button
          onClick={openDrawer}
          className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-[#101719] hover:bg-[#151d20] border border-[#263238] hover:border-[#00f5c8]/40 text-xs font-mono text-[#f3f6f5] hover:text-[#00f5c8] transition-colors cursor-pointer"
          aria-label="Open components drawer"
        >
          <Layers size={13} className="text-[#00f5c8]" />
          <span>UNITS ({blocks.length})</span>
        </button>
      </div>

      {/* ── Slide-Over Mobile Drawer (Only in DOM when open or animating) ── */}
      {isRendered && (
        <>
          {/* Backdrop */}
          <div
            className={cn(
              "lg:hidden fixed inset-0 bg-black/80 backdrop-blur-md z-[100] transition-opacity duration-300 ease-out",
              drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}
            onClick={closeDrawer}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <aside
            className={cn(
              "lg:hidden fixed inset-y-0 left-0 w-[310px] max-w-[85vw] h-dvh min-h-[100dvh] max-h-screen z-[101] flex flex-col bg-[#07090b] border-r border-[#263238] transition-transform duration-300 ease-out font-mono",
              drawerOpen
                ? "translate-x-0 shadow-[20px_0_50px_rgba(0,0,0,0.95)] pointer-events-auto"
                : "-translate-x-full shadow-none pointer-events-none"
            )}
            aria-label="Component Navigation Drawer"
          >
            {/* Drawer Header */}
            <div className="shrink-0 px-4 py-3.5 border-b border-[#263238] flex items-center justify-between bg-[#0b1012]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-[4px] bg-[#101719] border border-[#263238] flex items-center justify-center text-[#00f5c8] shadow-[0_0_10px_rgba(0,245,200,0.2)]">
                  <Layers size={14} />
                </div>
                <div>
                  <span className="font-bold text-[13px] text-[#f3f6f5] tracking-tight block leading-tight">
                    REGISTRY UNITS
                  </span>
                  <span className="text-[10px] text-[#718087] block leading-tight">
                    SYS // EXP-52 NATIVE
                  </span>
                </div>
              </div>
              <button
                onClick={closeDrawer}
                className="w-7 h-7 rounded-[4px] bg-[#101719] hover:bg-[#151d20] border border-[#263238] flex items-center justify-center text-[#929da4] hover:text-[#00f5c8] transition-colors cursor-pointer"
                aria-label="Close drawer"
              >
                <X size={14} />
              </button>
            </div>

            {/* Search Input */}
            <div className="shrink-0 p-3 border-b border-[#263238]">
              <div className="relative flex items-center">
                <Search size={13} className="absolute left-3 text-[#718087] pointer-events-none" />
                <input
                  type="text"
                  placeholder="FILTER_UNITS..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#101719] hover:bg-[#151d20] border border-[#263238] focus:border-[#00f5c8]/50 focus:bg-[#151d20] rounded-[4px] pl-9 pr-8 py-2 text-xs text-[#f3f6f5] placeholder-[#718087] focus:outline-none transition-colors font-mono"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 p-0.5 text-[#718087] hover:text-white cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            </div>

            {/* Links List */}
            <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-5 no-scrollbar">
              {/* Getting Started */}
              <div>
                <span className="text-[10px] font-bold text-[#00f5c8] uppercase tracking-wider block mb-1.5 px-2">
                  // SYSTEM MANUAL
                </span>
                <div className="space-y-0.5">
                  <Link
                    href="/docs"
                    onClick={closeDrawer}
                    className="nav-hud-item flex items-center justify-between py-2 px-2.5 rounded-[4px] text-xs text-[#929da4] hover:bg-[#151d20] transition-colors"
                  >
                    <span>[DOCUMENTATION]</span>
                    <ChevronRight size={13} className="text-[#718087]" />
                  </Link>
                  <Link
                    href="/blocks"
                    onClick={closeDrawer}
                    className="nav-hud-item flex items-center justify-between py-2 px-2.5 rounded-[4px] text-xs text-[#929da4] hover:bg-[#151d20] transition-colors"
                  >
                    <span>[ALL_BLOCKS]</span>
                    <ChevronRight size={13} className="text-[#718087]" />
                  </Link>
                  <Link
                    href="/docs/cli"
                    onClick={closeDrawer}
                    className="nav-hud-item flex items-center justify-between py-2 px-2.5 rounded-[4px] text-xs text-[#929da4] hover:bg-[#151d20] transition-colors"
                  >
                    <span>[CLI_TOOLING]</span>
                    <ChevronRight size={13} className="text-[#718087]" />
                  </Link>
                  <Link
                    href="/contribute"
                    onClick={closeDrawer}
                    className="nav-hud-item flex items-center justify-between py-2 px-2.5 rounded-[4px] text-xs text-[#929da4] hover:bg-[#151d20] transition-colors"
                  >
                    <span>[CONTRIBUTE]</span>
                    <ChevronRight size={13} className="text-[#718087]" />
                  </Link>
                </div>
              </div>

              {/* Components List */}
              <div>
                <div className="flex items-center justify-between mb-1.5 px-2">
                  <span className="text-[10px] font-bold text-[#00d9ff] uppercase tracking-wider">
                    // UNITS [{filteredBlocks.length}]
                  </span>
                </div>
                <div className="space-y-0.5">
                  {filteredBlocks.map((item) => {
                    const isCurrent = item.slug === currentBlock.slug;
                    return (
                      <Link
                        key={item.slug}
                        href={`/blocks/${item.slug}`}
                        onClick={closeDrawer}
                        className={cn(
                          "flex items-center justify-between py-2 px-2.5 rounded-[4px] text-xs transition-colors",
                          isCurrent
                            ? "bg-[#00f5c8]/15 text-[#00f5c8] font-bold border border-[#00f5c8]/30 shadow-sm"
                            : "nav-hud-item text-[#929da4] hover:bg-[#151d20]"
                        )}
                      >
                        <span className="truncate">{getShortTitle(item.slug, item.title)}</span>
                        {isCurrent ? (
                          <span className="w-1.5 h-1.5 rounded-[1px] bg-[#00f5c8] shadow-[0_0_6px_#00f5c8] shrink-0" />
                        ) : (
                          <span className="text-[9.5px] font-mono text-[#718087] uppercase shrink-0">
                            {item.category}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                  {filteredBlocks.length === 0 && (
                    <div className="py-6 text-center text-xs text-[#718087] font-mono">
                      // NO_UNITS_MATCH &ldquo;{searchQuery}&rdquo;
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="shrink-0 px-4 py-3 pb-[max(14px,env(safe-area-inset-bottom))] border-t border-[#263238] bg-[#0b1012] flex items-center justify-between text-[10.5px] font-mono text-[#718087]">
              <span>RNBLOCKS // EXP-52</span>
              <a
                href="https://github.com/Ashwin-Khowala/rnblocks"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#929da4] hover:text-[#00f5c8] transition-colors"
              >
                GITHUB [↗]
              </a>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
