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
      <div className="lg:hidden flex items-center justify-between gap-3 pb-3 mb-4 border-b border-white/[0.06]">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs font-mono min-w-0">
          <Link href="/blocks" className="text-[#9ca3af] hover:text-white transition-colors shrink-0">
            Blocks
          </Link>
          <span className="text-[#71717a]">/</span>
          <span className="text-white font-medium truncate">
            {getShortTitle(currentBlock.slug, currentBlock.title)}
          </span>
        </div>

        {/* Drawer Trigger Button (Fixed in-flow, scrolls away with page) */}
        <button
          onClick={openDrawer}
          className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.09] text-xs font-mono text-[#d1d5db] hover:text-white transition-colors cursor-pointer"
          aria-label="Open components drawer"
        >
          <Layers size={13} className="text-[#32c798]" />
          <span>Components ({blocks.length})</span>
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
              "lg:hidden fixed inset-y-0 left-0 w-[310px] max-w-[85vw] h-dvh min-h-[100dvh] max-h-screen z-[101] flex flex-col bg-[#060609] border-r border-white/[0.08] transition-transform duration-300 ease-out",
              drawerOpen
                ? "translate-x-0 shadow-[20px_0_50px_rgba(0,0,0,0.95)] pointer-events-auto"
                : "-translate-x-full shadow-none pointer-events-none"
            )}
            aria-label="Component Navigation Drawer"
          >
            {/* Drawer Header */}
            <div className="shrink-0 px-4 py-3.5 border-b border-white/[0.08] flex items-center justify-between bg-white/[0.01]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#1f1f27] to-[#101014] border border-white/[0.12] flex items-center justify-center text-white shadow-[0_0_10px_rgba(50,199,152,0.12)]">
                  <Layers size={14} className="text-[#32c798]" />
                </div>
                <div>
                  <span className="font-bold text-[14px] text-white tracking-tight block leading-tight">
                    Registry Blocks
                  </span>
                  <span className="text-[11px] font-mono text-[#71717a] block leading-tight">
                    React Native & Expo
                  </span>
                </div>
              </div>
              <button
                onClick={closeDrawer}
                className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-[#9ca3af] hover:text-white transition-colors cursor-pointer"
                aria-label="Close drawer"
              >
                <X size={15} />
              </button>
            </div>

            {/* Search Input */}
            <div className="shrink-0 p-3 border-b border-white/[0.06]">
              <div className="relative flex items-center">
                <Search size={14} className="absolute left-3 text-[#71717a] pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search components..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.08] focus:border-[#32c798]/50 focus:bg-white/[0.06] rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-[#71717a] focus:outline-none transition-colors font-mono"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 p-0.5 text-[#71717a] hover:text-white cursor-pointer"
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
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#71717a] block mb-1.5 px-2">
                  Getting Started
                </span>
                <div className="space-y-0.5">
                  <Link
                    href="/docs"
                    onClick={closeDrawer}
                    className="flex items-center justify-between py-2 px-2.5 rounded-lg text-xs font-medium text-[#a1a1aa] hover:bg-white/[0.04] hover:text-white transition-colors"
                  >
                    <span>Documentation</span>
                    <ChevronRight size={13} className="text-[#52525b]" />
                  </Link>
                  <Link
                    href="/blocks"
                    onClick={closeDrawer}
                    className="flex items-center justify-between py-2 px-2.5 rounded-lg text-xs font-medium text-[#a1a1aa] hover:bg-white/[0.04] hover:text-white transition-colors"
                  >
                    <span>All Blocks Gallery</span>
                    <ChevronRight size={13} className="text-[#52525b]" />
                  </Link>
                  <Link
                    href="/docs/cli"
                    onClick={closeDrawer}
                    className="flex items-center justify-between py-2 px-2.5 rounded-lg text-xs font-medium text-[#a1a1aa] hover:bg-white/[0.04] hover:text-white transition-colors"
                  >
                    <span>CLI Reference</span>
                    <ChevronRight size={13} className="text-[#52525b]" />
                  </Link>
                </div>
              </div>

              {/* Components List */}
              <div>
                <div className="flex items-center justify-between mb-1.5 px-2">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#71717a]">
                    Components
                  </span>
                  <span className="text-[10px] font-mono text-[#52525b] bg-white/[0.04] px-1.5 py-0.5 rounded">
                    {filteredBlocks.length}
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
                          "flex items-center justify-between py-2 px-2.5 rounded-lg text-xs font-medium transition-colors",
                          isCurrent
                            ? "bg-white/[0.08] text-white font-semibold shadow-sm"
                            : "text-[#a1a1aa] hover:bg-white/[0.04] hover:text-white"
                        )}
                      >
                        <span className="truncate">{getShortTitle(item.slug, item.title)}</span>
                        {isCurrent ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#32c798] shadow-[0_0_8px_rgba(50,199,152,0.9)] shrink-0" />
                        ) : (
                          <span className="text-[10px] font-mono text-[#52525b] uppercase shrink-0">
                            {item.category}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                  {filteredBlocks.length === 0 && (
                    <div className="py-6 text-center text-xs text-[#71717a] font-mono">
                      No components match &ldquo;{searchQuery}&rdquo;
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="shrink-0 px-4 py-3 pb-[max(14px,env(safe-area-inset-bottom))] border-t border-white/[0.08] bg-[#060609] flex items-center justify-between text-[11px] font-mono text-[#71717a]">
              <span>RNBlocks Registry</span>
              <a
                href="https://github.com/Ashwin-Khowala/rnblocks"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#a1a1aa] hover:text-white transition-colors"
              >
                GitHub ↗
              </a>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
