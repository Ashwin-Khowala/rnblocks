"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { BLOCKS_DATA, BlockItem } from "@/data/blocks";
import { BlockCard } from "@/components/BlockCard";
import { CadCornerScale, ShowcaseBackground, ScrollReveal } from "@/components";
import { NextIcon } from "@/components/icons";

const FEATURED_SLUGS = [
  "trend-chart",
  "floating-docker",
  "bar-chart",
  "interactive-calendar",
];

function getBentoCellClasses(index: number, total: number): string {
  // Mobile border rule: every card except the last has bottom border on mobile
  const isLast = index === total - 1;
  const mobileBorder = isLast ? "" : "max-md:border-b border-[#263238]";

  // Case 1: Exactly 1 card (e.g. Navigation, Calendar, Auth)
  if (total === 1) {
    return `md:col-span-12 ${mobileBorder}`;
  }

  // Case 2: Exactly 2 cards
  if (total === 2) {
    if (index === 0) return `md:col-span-6 md:border-r border-[#263238] ${mobileBorder}`;
    return `md:col-span-6 ${mobileBorder}`;
  }

  // Case 3: Exactly 3 cards
  if (total === 3) {
    if (index === 0) return `md:col-span-6 md:border-r md:border-b border-[#263238] ${mobileBorder}`;
    if (index === 1) return `md:col-span-6 md:border-b border-[#263238] ${mobileBorder}`;
    return `md:col-span-12 ${mobileBorder}`;
  }

  // Case 4+: Alternating 7/5 and 5/7 pairs
  const pairIndex = Math.floor(index / 2);
  const isFirstInPair = index % 2 === 0;
  const hasPartner = index + 1 < total;
  const isOrphan = isFirstInPair && !hasPartner;
  const isLastRow = index >= total - (total % 2 === 0 ? 2 : 1);

  if (isOrphan) {
    // Single remaining block at bottom of odd total (e.g. 5 or 9 items) spans full width
    return `md:col-span-12 ${mobileBorder}`;
  }

  const isEvenPair = pairIndex % 2 === 0;
  const bottomBorder = !isLastRow ? "md:border-b border-[#263238]" : "";

  if (isEvenPair) {
    // 7 on left, 5 on right
    if (isFirstInPair) {
      return `md:col-span-7 md:border-r border-[#263238] ${bottomBorder} ${mobileBorder}`;
    }
    return `md:col-span-5 ${bottomBorder} ${mobileBorder}`;
  } else {
    // 5 on left, 7 on right
    if (isFirstInPair) {
      return `md:col-span-5 md:border-r border-[#263238] ${bottomBorder} ${mobileBorder}`;
    }
    return `md:col-span-7 ${bottomBorder} ${mobileBorder}`;
  }
}

export function ShowcaseGrid() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const categoryCounts = useMemo(() => {
    return {
      all: BLOCKS_DATA.length,
      charts: BLOCKS_DATA.filter((b) => b.category === "analytics" || b.slug.includes("chart")).length,
      navigation: BLOCKS_DATA.filter((b) => b.category === "navigation" || b.slug.includes("docker")).length,
      calendar: BLOCKS_DATA.filter((b) => b.category === "data-display" || b.slug.includes("calendar")).length,
      auth: BLOCKS_DATA.filter((b) => b.category === "authentication" || b.slug.includes("auth")).length,
    };
  }, []);

  const categories = [
    { id: "all", label: isExpanded ? "ALL UNITS" : "FEATURED", count: isExpanded ? categoryCounts.all : 4 },
    { id: "charts", label: "CHARTS", count: categoryCounts.charts },
    { id: "navigation", label: "NAVIGATION", count: categoryCounts.navigation },
    { id: "calendar", label: "CALENDAR", count: categoryCounts.calendar },
    { id: "auth", label: "AUTH", count: categoryCounts.auth },
  ];

  const filteredBlocks = useMemo(() => {
    if (selectedFilter === "all") {
      if (!isExpanded) {
        return BLOCKS_DATA.filter((b) => FEATURED_SLUGS.includes(b.slug));
      }
      return BLOCKS_DATA;
    }
    return BLOCKS_DATA.filter((b) => {
      if (selectedFilter === "charts") return b.category === "analytics" || b.slug.includes("chart");
      if (selectedFilter === "navigation") return b.category === "navigation" || b.slug.includes("docker");
      if (selectedFilter === "calendar") return b.category === "data-display" || b.slug.includes("calendar");
      if (selectedFilter === "auth") return b.category === "authentication" || b.slug.includes("auth");
      return true;
    });
  }, [selectedFilter, isExpanded]);

  return (
    <section id="components" className="bg-transparent border-t border-[#263238] pt-16 sm:pt-20 md:pt-28 pb-16 sm:pb-20 md:pb-28 relative overflow-hidden">
      <ShowcaseBackground />
      <div className="container-main relative z-10">
        {/* Section Header Row with Scroll Reveal */}
        <ScrollReveal showScanline threshold={0.1}>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between max-w-[1200px] mx-auto mb-8 md:mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-[11px] text-[#00f5c8] mb-2.5">
                <span className="w-1.5 h-1.5 rounded-[1px] bg-[#00f5c8] shadow-[0_0_6px_#00f5c8]" />
                <span>// REGISTRY INVENTORY [{isExpanded ? BLOCKS_DATA.length : "4 FEATURED"} UNITS]</span>
              </div>
              <h2 className="text-[26px] sm:text-[34px] md:text-[42px] font-extrabold text-[#f3f6f5] tracking-tight">
                Components you <span className="text-[#00f5c8] font-mono font-black">copy</span> and own
              </h2>
              <p className="mt-2 text-[14px] text-[#929da4] max-w-lg leading-relaxed">
                Drop production-grade blocks straight into your project. Customize colors, SVG paths, and animations with zero lock-in.
              </p>
            </div>

            {/* Filter Chips (Robotic Segmented Switches with Mobile Horizontal Track) */}
            <div className="w-full lg:w-auto overflow-x-auto no-scrollbar scroll-smooth touch-pan-x p-1 bg-[#0b1012] border border-[#263238] rounded-[6px]">
              <div className="flex items-center gap-1.5 w-max">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedFilter(cat.id)}
                    className={`px-3 py-1.5 rounded-[4px] text-[11px] font-mono font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      selectedFilter === cat.id
                        ? "bg-[#151d20] text-[#00f5c8] border border-[#00f5c8]/40 shadow-[0_0_10px_rgba(0,245,200,0.15)]"
                        : "text-[#718087] hover:text-[#f3f6f5] border border-transparent hover:bg-[#151d20]/50"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[9.5px] px-1 py-0.2 rounded font-mono ${
                        selectedFilter === cat.id
                          ? "bg-[#00f5c8]/20 text-[#00f5c8] font-bold"
                          : "bg-[#151d20] text-[#718087]"
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Bento Grid Architecture with Scroll Reveal */}
        <ScrollReveal delay={150} threshold={0.08}>
          <div className="w-full max-w-[1200px] mx-auto mb-10 md:mb-12">
            <div className="relative w-full bg-[#07090b] border border-[#263238] rounded-[10px] overflow-hidden shadow-[0_24px_56px_-12px_rgba(0,0,0,0.9)]">
              {/* CAD Corner Calipers */}
              <CadCornerScale position="top-left" label="REGISTRY.02" />
              <CadCornerScale position="bottom-right" label="60FPS.NATIVE" />

              {/* Corner Hatch Accent */}
              <div
                className="absolute -top-px -right-px w-[20px] h-[20px] bg-[#07090b] border-l border-b border-[#263238] pointer-events-none z-10"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, rgba(0,245,200,0.2) 0, rgba(0,245,200,0.2) 1px, transparent 0, transparent 4px)",
                }}
                aria-hidden="true"
              />

              {/* Grid Cells: 12-column adaptive layout on desktop, stacked on mobile */}
              <div className="grid grid-cols-1 md:grid-cols-12 w-full">
                {filteredBlocks.map((block, index) => {
                  const cellClasses = getBentoCellClasses(index, filteredBlocks.length);

                  return (
                    <div key={block.slug} className={`grid-block-cell ${cellClasses}`}>
                      <BlockCard
                        block={block}
                        index={index}
                        total={filteredBlocks.length}
                        className="border-0 rounded-none bg-transparent"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Action Controls & Footer CTA */}
        <ScrollReveal delay={250} threshold={0.1}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            {selectedFilter === "all" && (
              <button
                onClick={() => setIsExpanded((prev) => !prev)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[6px] text-[12px] font-mono font-bold text-[#f3f6f5] bg-[#0b1012] border border-[#263238] hover:border-[#00f5c8]/40 hover:text-[#00f5c8] transition-all cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
              >
                <span className="w-1.5 h-1.5 rounded-[1px] bg-[#00f5c8]" />
                <span>{isExpanded ? "[ COLLAPSE TO 4 UNITS ]" : `[ REVEAL ALL ${BLOCKS_DATA.length} UNITS ]`}</span>
              </button>
            )}

            <Link
              href="/blocks"
              className="btn-secondary group px-5 py-2.5 rounded-[6px] text-[12px] font-mono font-bold border-[#263238] hover:border-[#00f5c8]/40"
            >
              <span>FULL REGISTRY CATALOG ({BLOCKS_DATA.length} UNITS)</span>
              <NextIcon size={13} className="transition-transform duration-200 group-hover:translate-x-0.5 text-[#00f5c8]" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

