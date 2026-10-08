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
} from "@/components/icons";

export default function BlocksGalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedFeature, setSelectedFeature] = useState<FeatureFilter>("all");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Inspected block for the right pane inspector
  const [inspectedBlock, setInspectedBlock] = useState<BlockItem | null>(null);
  const [isSplitView, setIsSplitView] = useState(false);

  // Filter logic (pure derived values in render)
  const filteredBlocks = useMemo(() => {
    return BLOCKS_DATA.filter((block) => {
      // 1. Only blocks
      if (block.type !== "block") return false;

      // 2. Category match
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

      // 3. Feature / Capability match
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
  }, [selectedCategory, selectedFeature]);

  const resetFilters = useCallback(() => {
    setSelectedCategory("all");
    setSelectedFeature("all");
  }, []);

  const handleInspect = useCallback((block: BlockItem) => {
    setInspectedBlock(block);
    setIsSplitView((prev) => (inspectedBlock?.slug === block.slug ? !prev : true));
  }, [inspectedBlock]);

  return (
    <div className="min-h-screen bg-[#030305] text-[#ededed] pt-2 sm:pt-3 pb-16 relative">
      <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Mobile Filter Trigger Button (only visible on small screens where sidebar is hidden) */}
        <div className="lg:hidden flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
            {selectedCategory === "all" ? "All Blocks" : selectedCategory}
          </span>
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium bg-[#121318] border border-white/[0.08] text-zinc-300 hover:text-white"
            aria-label="Open filter sidebar"
          >
            <FilterIcon size={13} className="text-zinc-400" />
            <span>Filters</span>
          </button>
        </div>

        {/* ── Main Layout: Left Categories Pane + Center Blocks Cards (ALIGNED ON SAME LINE) ── */}
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

          {/* ── 2. CENTER CONTENT AREA (Blocks aligned with left pane categories) ── */}
          <main className="flex-1 min-w-0">
            {filteredBlocks.length > 0 ? (
              <div className="flex items-start gap-6 lg:gap-8">
                {/* 1. Blocks Cards Grid */}
                <div
                  className={`flex-1 grid grid-cols-1 ${
                    isSplitView ? "xl:grid-cols-2" : "md:grid-cols-2"
                  } gap-6 lg:gap-8 min-w-0`}
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

                {/* 2. Right Pane Inspector (appears when user clicks Inspect) */}
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
              <div className="flex flex-col items-center justify-center py-20 px-4 text-center border border-white/[0.08] bg-[#07070a] rounded-2xl max-w-lg mx-auto">
                <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-500 mb-4">
                  <LayersIcon size={24} />
                </div>
                <h3 className="text-base font-semibold text-white mb-1.5">
                  No matching blocks found
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mb-6 leading-relaxed">
                  We couldn&apos;t find any blocks matching your filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="btn-primary !bg-white !text-black !rounded-md !text-xs !py-2 !px-4 hover:!bg-zinc-200 font-semibold cursor-pointer"
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
