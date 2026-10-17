"use client";

import React, { useState, useMemo, useCallback } from "react";
import { BLOCKS_DATA, BlockItem } from "@/data/blocks";
import {
  BlocksSidebar,
  BlockInspector,
  FeatureFilter,
} from "@/components/blocks";
import { BlockCard } from "@/components/BlockCard";
import {
  FilterIcon,
  LayersIcon,
  SearchIcon,
  CloseIcon,
} from "@/components/icons";

export default function BlocksGalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedFeature, setSelectedFeature] = useState<FeatureFilter>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Inspected block for the right pane inspector
  const [inspectedBlock, setInspectedBlock] = useState<BlockItem | null>(null);
  const [isSplitView, setIsSplitView] = useState(false);

  // Filter logic (pure derived values in render)
  const filteredBlocks = useMemo(() => {
    return BLOCKS_DATA.filter((block) => {
      // 1. Only blocks
      if (block.type !== "block") return false;

      // 2. Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = block.title.toLowerCase().includes(q);
        const matchSlug = block.slug.toLowerCase().includes(q);
        const matchCategory = block.category.toLowerCase().includes(q);
        const matchDesc = block.description?.toLowerCase().includes(q) ?? false;
        const matchTags = block.tags?.some((t) => t.toLowerCase().includes(q)) ?? false;

        if (!matchTitle && !matchSlug && !matchCategory && !matchDesc && !matchTags) {
          return false;
        }
      }

      // 3. Category match
      if (selectedCategory !== "all") {
        if (selectedCategory === "charts" || selectedCategory === "analytics") {
          if (block.category !== "analytics" && block.category !== "charts" && !block.slug.includes("chart")) {
            return false;
          }
        } else if (selectedCategory === "calendar" || selectedCategory === "data-display") {
          if (block.category !== "data-display" && block.category !== "calendar" && !block.slug.includes("calendar")) {
            return false;
          }
        } else if (selectedCategory === "navigation") {
          if (block.category !== "navigation" && !block.slug.includes("docker")) {
            return false;
          }
        } else if (selectedCategory === "auth" || selectedCategory === "authentication") {
          if (block.category !== "authentication" && block.category !== "auth" && !block.slug.includes("auth")) {
            return false;
          }
        } else if (block.category !== selectedCategory) {
          return false;
        }
      }

      // 4. Feature / Capability match
      if (selectedFeature !== "all") {
        if (selectedFeature === "pure-svg") {
          if (!block.dependencies.every((d) => d === "react-native-svg")) return false;
        } else if (selectedFeature === "interactive") {
          if (!block.tags?.some((t) => ["gestures", "interactive", "panresponder"].includes(t.toLowerCase()))) {
            return false;
          }
        } else if (selectedFeature === "animated") {
          if (!block.tags?.some((t) => ["animated", "spring", "chart"].includes(t.toLowerCase()))) {
            return false;
          }
        } else if (selectedFeature === "themeable") {
          if (!block.themes || block.themes.length < 2) return false;
        }
      }

      return true;
    });
  }, [selectedCategory, selectedFeature, searchQuery]);

  const resetFilters = useCallback(() => {
    setSelectedCategory("all");
    setSelectedFeature("all");
    setSearchQuery("");
  }, []);

  const handleInspect = useCallback((block: BlockItem) => {
    setInspectedBlock(block);
    setIsSplitView((prev) => (inspectedBlock?.slug === block.slug ? !prev : true));
  }, [inspectedBlock]);

  return (
    <div className="min-h-screen bg-transparent text-[#ededed] pt-6 sm:pt-10 pb-20 relative">
      <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Page Header Banner ── */}
        <div className="mb-8 md:mb-10 pb-6 border-b border-white/[0.08]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] text-[#32c798] mb-2.5">
                <span className="w-1.5 h-1.5 rounded-[1px] bg-[#32c798] shadow-[0_0_6px_#32c798]" />
                <span>// COMPONENT CATALOG</span>
              </div>
              <h1 className="text-[26px] sm:text-[32px] md:text-[38px] font-extrabold tracking-[-0.6px] text-white">
                UI blocks for <span className="font-editorial italic font-normal text-white">React Native</span>
              </h1>
              <p className="mt-2 text-[14px] sm:text-[15px] text-[#9ca3af] leading-relaxed max-w-xl">
                Self-contained, production-grade components. Inspect interactive previews, copy pure TypeScript source, and customize styling directly in your codebase.
              </p>
            </div>

            {/* Quick Metrics & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              {/* Search Box */}
              <div className="relative flex-1 sm:w-64">
                <SearchIcon
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter components..."
                  className="w-full pl-9 pr-8 py-2 bg-[#0c0d12] border border-white/[0.1] rounded-[8px] text-[13px] text-white placeholder-[#71717a] focus:outline-none focus:border-[#32c798]/50 focus:ring-1 focus:ring-[#32c798]/50 transition-all font-mono"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717a] hover:text-white"
                    aria-label="Clear search"
                  >
                    <CloseIcon size={12} />
                  </button>
                )}
              </div>

              {/* Count Indicator */}
              <div className="hidden lg:flex items-center gap-1.5 px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-[8px] font-mono text-[11px] text-[#9ca3af] shrink-0">
                <span className="font-semibold text-white">{filteredBlocks.length}</span>
                <span>/ {BLOCKS_DATA.length} blocks</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filter Trigger Button */}
        <div className="lg:hidden flex items-center justify-between pb-3 mb-4 border-b border-white/[0.06]">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
            {selectedCategory === "all" ? "All Categories" : selectedCategory} ({filteredBlocks.length})
          </span>
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-xs font-medium bg-[#121318] border border-white/[0.1] text-zinc-200 hover:text-white"
            aria-label="Open filter sidebar"
          >
            <FilterIcon size={13} className="text-[#32c798]" />
            <span>Filters</span>
          </button>
        </div>

        {/* ── Main Layout: Left Categories Pane + Center Blocks Cards ── */}
        <div className="flex items-start gap-6 lg:gap-8">
          {/* ── 1. LEFT PANE (Sticky Desktop Sidebar / Mobile Drawer) ── */}
          <BlocksSidebar
            blocks={BLOCKS_DATA}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedFeature={selectedFeature}
            onSelectFeature={setSelectedFeature}
            isOpenMobile={isMobileSidebarOpen}
            onCloseMobile={() => setIsMobileSidebarOpen(false)}
          />

          {/* ── 2. CENTER CONTENT AREA ── */}
          <main className="flex-1 min-w-0">
            {filteredBlocks.length > 0 ? (
              <div className="flex items-start gap-6 lg:gap-8">
                {/* Blocks Cards Grid */}
                <div
                  className={`flex-1 grid grid-cols-1 ${
                    isSplitView ? "xl:grid-cols-2" : "md:grid-cols-2"
                  } gap-6 lg:gap-7 min-w-0`}
                >
                  {filteredBlocks.map((block) => (
                    <BlockCard
                      key={block.slug}
                      block={block}
                      isSelected={isSplitView && inspectedBlock?.slug === block.slug}
                      onInspect={handleInspect}
                    />
                  ))}
                </div>

                {/* Right Pane Inspector (appears when user clicks Inspect) */}
                {isSplitView && inspectedBlock && (
                  <BlockInspector
                    block={inspectedBlock}
                    onClose={() => setIsSplitView(false)}
                    className="hidden lg:block"
                  />
                )}
              </div>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-20 px-4 text-center border border-white/[0.08] bg-[#09090e] rounded-[16px] max-w-lg mx-auto">
                <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-500 mb-4">
                  <LayersIcon size={24} />
                </div>
                <h3 className="text-base font-semibold text-white mb-1.5">
                  No matching blocks found
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mb-6 leading-relaxed">
                  No components matched &ldquo;{searchQuery || selectedCategory}&rdquo;. Try resetting your filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="btn-primary !bg-white !text-black !rounded-[8px] !text-xs !py-2 !px-4 hover:!bg-zinc-200 font-semibold cursor-pointer"
                >
                  Reset filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
