"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { BLOCKS_DATA, BlockItem } from "@/data/blocks";
import { BlockCard } from "@/components/BlockCard";
import { CadCornerScale, ShowcaseBackground } from "@/components";
import { NextIcon, LayersIcon } from "@/components/icons";

export function ShowcaseGrid() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const categories = [
    { id: "all", label: "Featured" },
    { id: "charts", label: "Charts & Analytics" },
    { id: "navigation", label: "Navigation & Docks" },
    { id: "calendar", label: "Calendars & Dates" },
    { id: "auth", label: "Authentication" },
  ];

  const filteredBlocks = useMemo(() => {
    if (selectedFilter === "all") {
      // Pick 4 diverse, stunning blocks for the featured bento
      const featuredSlugs = ["bar-chart", "grouped-bar-chart", "donut-chart", "pie-chart"];
      return featuredSlugs
        .map((slug) => BLOCKS_DATA.find((b) => b.slug === slug))
        .filter((b): b is BlockItem => Boolean(b));
    }
    return BLOCKS_DATA.filter((b) => {
      if (selectedFilter === "charts") return b.category === "analytics" || b.slug.includes("chart");
      if (selectedFilter === "navigation") return b.category === "navigation" || b.slug.includes("docker");
      if (selectedFilter === "calendar") return b.category === "data-display" || b.slug.includes("calendar");
      if (selectedFilter === "auth") return b.category === "authentication" || b.slug.includes("auth");
      return true;
    }).slice(0, 4);
  }, [selectedFilter]);

  return (
    <section id="components" className="bg-transparent border-t border-white/[0.08] pt-20 md:pt-28 pb-20 md:pb-28 relative overflow-hidden">
      <ShowcaseBackground />
      <div className="container-main relative z-10">
        {/* Section Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between max-w-[1180px] mx-auto mb-10 md:mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] text-[#32c798] mb-2.5">
              <span className="w-1.5 h-1.5 rounded-[1px] bg-[#32c798] shadow-[0_0_6px_#32c798]" />
              <span>// FEATURED REGISTRY BLOCKS</span>
            </div>
            <h2 className="text-[26px] sm:text-[34px] md:text-[42px] font-extrabold text-white tracking-[-0.8px] md:tracking-[-1.2px]">
              Components you <span className="font-editorial italic font-normal text-white">copy</span> and own
            </h2>
            <p className="mt-2 text-[14px] text-[#9ca3af] max-w-lg leading-relaxed">
              Drop production-grade blocks straight into your project. Customize colors, SVG paths, and animations with zero lock-in.
            </p>
          </div>

          {/* Filter Chips (No Pills) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#0c0d12] border border-white/[0.08] rounded-[8px] w-fit">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.id)}
                className={`px-3 py-1.5 rounded-[6px] text-[12px] font-medium transition-all cursor-pointer whitespace-nowrap ${
                  selectedFilter === cat.id
                    ? "bg-white/[0.12] text-white font-semibold shadow-sm"
                    : "text-[#71717a] hover:text-[#d1d5db]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid Architecture */}
        <div className="w-full max-w-[1180px] mx-auto mb-10 md:mb-12">
          <div className="relative w-full bg-[#050508] border border-white/[0.1] rounded-[16px] overflow-hidden shadow-[0_24px_56px_-12px_rgba(0,0,0,0.8)]">
            {/* CAD Corner Calipers */}
            <CadCornerScale position="top-left" label="REGISTRY.02" />
            <CadCornerScale position="bottom-right" label="60FPS.NATIVE" />

            {/* Corner Hatch Accent */}
            <div
              className="absolute -top-px -right-px w-[20px] h-[20px] bg-[#050508] border-l border-b border-white/[0.2] pointer-events-none z-10"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, rgba(255,255,255,0.25) 0, rgba(255,255,255,0.25) 1px, transparent 0, transparent 4px)",
              }}
              aria-hidden="true"
            />

            {/* Architectural Grid Intersection Node Squares (Desktop only) */}
            <div className="hidden md:block absolute w-[6px] h-[6px] rounded-[1px] border border-white/40 bg-[#050508] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 left-[58.333%] top-0" aria-hidden="true" />
            <div className="hidden md:block absolute w-[6px] h-[6px] rounded-[1px] border border-white/40 bg-[#050508] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 left-0 top-1/2" aria-hidden="true" />
            <div className="hidden md:block absolute w-[6px] h-[6px] rounded-[1px] border border-white/40 bg-[#050508] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 left-[58.333%] top-1/2" aria-hidden="true" />
            <div className="hidden md:block absolute w-[6px] h-[6px] rounded-[1px] border border-white/40 bg-[#050508] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 left-[41.667%] top-1/2" aria-hidden="true" />
            <div className="hidden md:block absolute w-[6px] h-[6px] rounded-[1px] border border-white/40 bg-[#050508] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 left-full top-1/2" aria-hidden="true" />
            <div className="hidden md:block absolute w-[6px] h-[6px] rounded-[1px] border border-white/40 bg-[#050508] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 left-[41.667%] top-full" aria-hidden="true" />

            {/* Grid Cells: 12-column layout on desktop, stacked on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-12 w-full">
              {filteredBlocks.map((block, index) => {
                const cellClasses =
                  index === 0
                    ? "md:col-span-7 md:border-r md:border-b border-white/[0.08] max-md:border-b max-md:border-white/[0.08]"
                    : index === 1
                    ? "md:col-span-5 md:border-b border-white/[0.08] max-md:border-b max-md:border-white/[0.08]"
                    : index === 2
                    ? "md:col-span-5 md:border-r border-white/[0.08] max-md:border-b max-md:border-white/[0.08]"
                    : "md:col-span-7";

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

        {/* Grid Footer CTA */}
        <div className="flex justify-center">
          <Link
            href="/blocks"
            className="btn-secondary group px-5 py-2.5 rounded-[10px] text-[13.5px] font-semibold border-white/[0.12] hover:border-white/[0.25]"
          >
            <span>Explore all {BLOCKS_DATA.length} verified components</span>
            <NextIcon size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
