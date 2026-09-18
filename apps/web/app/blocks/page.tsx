"use client";

import React, { useState, useMemo } from "react";
import { BLOCKS_DATA } from "@/data/blocks";
import { BlockCard } from "@/components/BlockCard";
import { Search, Layers, X, ChevronDown, Sparkles, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BlocksGalleryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [stylingFilter, setStylingFilter] = useState<string>("all");
  const [frameworkFilter, setFrameworkFilter] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Blocks" },
    { id: "charts", label: "Charts & Analytics" },
    { id: "navigation", label: "Navigation & Docks" },
    { id: "calendar", label: "Date & Calendars" },
    { id: "auth", label: "Authentication" },
  ];

  // Filtering logic
  const filteredBlocks = useMemo(() => {
    return BLOCKS_DATA.filter((block) => {
      // Only include blocks in the blocks gallery
      if (block.type !== "block") {
        return false;
      }

      // Category match
      if (selectedCategory !== "all") {
        if (selectedCategory === "charts") {
          if (!block.slug.includes("chart") && block.category !== "charts") return false;
        } else if (selectedCategory === "calendar") {
          if (!block.slug.includes("calendar") && block.category !== "calendar") return false;
        } else if (block.category !== selectedCategory) {
          return false;
        }
      }

      // Styling filter
      if (stylingFilter !== "all" && !block.styling.includes(stylingFilter)) {
        return false;
      }

      // Framework filter
      if (frameworkFilter !== "all" && block.framework !== frameworkFilter) {
        return false;
      }

      // Search query
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchesTitle = block.title.toLowerCase().includes(q);
        const matchesDesc = block.description.toLowerCase().includes(q);
        const matchesSlug = block.slug.toLowerCase().includes(q);
        const matchesAuthor = block.author.toLowerCase().includes(q);
        const matchesCategory = block.category.toLowerCase().includes(q);
        return matchesTitle || matchesDesc || matchesSlug || matchesAuthor || matchesCategory;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, stylingFilter, frameworkFilter]);

  const hasActiveFilters =
    selectedCategory !== "all" ||
    stylingFilter !== "all" ||
    frameworkFilter !== "all" ||
    searchQuery !== "";

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setStylingFilter("all");
    setFrameworkFilter("all");
  };

  return (
    <div className="min-h-screen bg-[#030305] text-[#ededed] pt-24 md:pt-28 pb-24 flex-1 relative overflow-hidden">
      {/* Ambient Glow in Background */}
      <div
        className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-[#32c798]/[0.05] blur-[120px] rounded-full"
        aria-hidden="true"
      />

      <div className="container-main relative z-10">
        {/* Gallery Hero Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 h-[24px] px-3 rounded-full font-mono text-[11px] font-bold text-[#32c798] bg-[#32c798]/10 border border-[#32c798]/30 uppercase tracking-wider">
                  <Sparkles size={12} />
                  <span>Component Registry</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[11px] text-[#71717a] bg-white/[0.03] border border-white/[0.08] px-2.5 py-0.5 rounded-full">
                  <span>Zero Runtime Providers</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
                Explore Blocks
              </h1>

              <p className="text-sm sm:text-base text-[#9ca3af] leading-relaxed">
                Production-ready, accessible React Native components. Copy directly into your codebase with one-click CLI commands and live interactive previews.
              </p>
            </div>

            {/* Quick Metrics Badge */}
            <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl font-mono text-xs bg-[#0a0a0f] border border-white/[0.1] text-[#9ca3af] shadow-sm">
                <span className="text-[#32c798] font-bold text-sm">{filteredBlocks.length}</span>
                <span>{filteredBlocks.length === 1 ? "block displayed" : "blocks displayed"}</span>
              </div>
            </div>
          </div>

          {/* Search & Filter Controls Bar */}
          <div className="bg-[#07070a]/90 backdrop-blur-md border border-white/[0.08] rounded-2xl p-3 sm:p-4 mb-5 shadow-xl">
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none"
                />
                <input
                  type="text"
                  className="w-full bg-[#040406] border border-white/[0.08] rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-white placeholder-[#71717a] focus:border-[#32c798]/50 focus:outline-none focus:ring-1 focus:ring-[#32c798]/30 transition-all duration-150"
                  placeholder="Search blocks by name, category, or functionality (chart, calendar, dock, auth)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#71717a] hover:text-white rounded-md hover:bg-white/[0.08] transition-colors"
                    title="Clear search"
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Dropdown Filters */}
              <div className="flex items-center gap-2.5 shrink-0">
                {/* Styling Filter */}
                <div className="relative flex-1 sm:flex-initial">
                  <select
                    value={stylingFilter}
                    onChange={(e) => setStylingFilter(e.target.value)}
                    aria-label="Filter by styling"
                    className="w-full sm:w-auto appearance-none bg-[#040406] border border-white/[0.08] rounded-xl pl-3.5 pr-8 py-2.5 text-xs font-mono font-medium text-[#d1d5db] focus:border-[#32c798]/50 focus:outline-none cursor-pointer hover:border-white/20 transition-colors"
                  >
                    <option value="all">Styling: All</option>
                    <option value="StyleSheet">StyleSheet</option>
                    <option value="NativeWind">NativeWind</option>
                  </select>
                  <ChevronDown
                    size={13}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none"
                  />
                </div>

                {/* Framework Filter */}
                <div className="relative flex-1 sm:flex-initial">
                  <select
                    value={frameworkFilter}
                    onChange={(e) => setFrameworkFilter(e.target.value)}
                    aria-label="Filter by framework"
                    className="w-full sm:w-auto appearance-none bg-[#040406] border border-white/[0.08] rounded-xl pl-3.5 pr-8 py-2.5 text-xs font-mono font-medium text-[#d1d5db] focus:border-[#32c798]/50 focus:outline-none cursor-pointer hover:border-white/20 transition-colors"
                  >
                    <option value="all">Framework: All</option>
                    <option value="expo">Expo</option>
                    <option value="react-native">Bare React Native</option>
                  </select>
                  <ChevronDown
                    size={13}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none"
                  />
                </div>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pt-3 mt-3 border-t border-white/[0.06] scrollbar-none">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-full text-xs font-medium font-mono whitespace-nowrap transition-all duration-150 cursor-pointer",
                      isActive
                        ? "bg-[#32c798]/15 border border-[#32c798]/50 text-[#32c798] shadow-[0_0_12px_rgba(50,199,152,0.18)] font-semibold"
                        : "bg-white/[0.03] border border-white/[0.08] text-[#9ca3af] hover:text-white hover:bg-white/[0.06] hover:border-white/[0.15]"
                    )}
                  >
                    {cat.label}
                  </button>
                );
              })}

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-[#ef4444] bg-[#ef4444]/10 border border-[#ef4444]/25 hover:bg-[#ef4444]/20 transition-all cursor-pointer whitespace-nowrap ml-auto"
                >
                  <span>Reset filters</span>
                  <X size={12} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Maximum 2 blocks per row on desktop for spacious, high-fidelity rendering */}
        {filteredBlocks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filteredBlocks.map((block) => (
              <BlockCard key={block.slug} block={block} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center border border-white/[0.08] bg-[#07070a]/60 rounded-2xl max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#71717a] mb-4">
              <Layers size={24} />
            </div>
            <h3 className="text-base font-semibold text-white mb-1.5">No blocks match your filter</h3>
            <p className="text-xs sm:text-sm text-[#9ca3af] max-w-sm mb-6 leading-relaxed">
              We couldn&apos;t find any blocks matching &ldquo;{searchQuery || selectedCategory}&rdquo;. Try clearing filters or searching for another term.
            </p>
            <button
              onClick={resetFilters}
              className="btn-secondary !text-xs !py-2 !px-4"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
