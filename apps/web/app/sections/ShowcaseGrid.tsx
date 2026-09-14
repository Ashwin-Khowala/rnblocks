"use client";

import React from "react";
import Link from "next/link";
import { BLOCKS_DATA } from "@/data/blocks";
import { BlockCard } from "@/components/BlockCard";
import { NextIcon } from "@/components/icons";

export function ShowcaseGrid() {
  const featuredBlocks = BLOCKS_DATA.filter((b) => b.type === "block").slice(0, 4);

  return (
    <section className="bg-[#070709] border-t border-white/[0.06] pt-16 md:pt-20 pb-20 md:pb-24">
      <div className="container-main">
        {/* Section Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between max-w-[440px] md:max-w-[960px] mx-auto mb-9 gap-5">
          <div>
            {/* Eyebrow and Counter Pill */}
            <div className="inline-flex items-center gap-2 md:gap-2.5 mb-2 md:mb-3">
              <span className="inline-flex items-center justify-center h-[22px] px-2 rounded-full font-mono text-[11px] font-bold text-[#32c798] bg-[#32c798]/10 border border-[#32c798]/30 uppercase tracking-[0.04em] leading-none whitespace-nowrap">
                {BLOCKS_DATA.length} blocks
              </span>
              <span className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.08em] text-[#32c798] inline-flex items-center leading-none">
                Available in Registry
              </span>
            </div>

            {/* Title */}
            <h2 className="text-[21px] sm:text-[28px] md:text-[36px] font-extrabold text-white tracking-[-0.3px] md:tracking-[-0.8px] mb-1.5 md:mb-2">
              Components you <span className="font-editorial italic font-normal">copy</span> and own
            </h2>

            {/* Subtitle */}
            <p className="text-[13px] md:text-base leading-[1.4] md:leading-normal text-[#9ca3af] max-w-[310px] md:max-w-none">
              No third-party runtime wrappers or mandatory theme providers. Every block is standalone TypeScript.
            </p>
          </div>

          {/* View All Pill Button */}
          <Link
            href="/blocks"
            className="group inline-flex items-center justify-center gap-2 text-[12.5px] md:text-[13px] font-semibold text-[#f3f4f6] bg-white/[0.04] border border-white/[0.12] hover:border-[#32c798]/35 hover:bg-[#32c798]/[0.08] hover:text-[#32c798] px-3.5 md:px-4 py-1.5 md:py-2 rounded-full transition-all duration-200 whitespace-nowrap w-fit self-start md:self-auto hover:-translate-y-0.5"
          >
            <span>View all components</span>
            <NextIcon size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Bento Grid Architecture */}
        <div className="w-full max-w-[1180px] mx-auto mb-7 md:mb-10 px-0 md:px-0">
          <div className="relative w-full bg-[#050508] border border-white/10">
            {/* Corner Hatch Accent */}
            <div
              className="absolute -top-px -right-px w-[18px] h-[18px] bg-[#050508] border-l border-b border-white/[0.18] pointer-events-none z-10"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, rgba(255,255,255,0.22) 0, rgba(255,255,255,0.22) 1px, transparent 0, transparent 4px)",
              }}
              aria-hidden="true"
            />

            {/* Architectural Grid Intersection Node Dots (Desktop only) */}
            <div className="hidden md:block absolute w-[7px] h-[7px] rounded-full border border-white/40 bg-[#050508] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 left-[58.333%] top-0" aria-hidden="true" />
            <div className="hidden md:block absolute w-[7px] h-[7px] rounded-full border border-white/40 bg-[#050508] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 left-0 top-1/2" aria-hidden="true" />
            <div className="hidden md:block absolute w-[7px] h-[7px] rounded-full border border-white/40 bg-[#050508] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 left-[58.333%] top-1/2" aria-hidden="true" />
            <div className="hidden md:block absolute w-[7px] h-[7px] rounded-full border border-white/40 bg-[#050508] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 left-[41.667%] top-1/2" aria-hidden="true" />
            <div className="hidden md:block absolute w-[7px] h-[7px] rounded-full border border-white/40 bg-[#050508] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 left-full top-1/2" aria-hidden="true" />
            <div className="hidden md:block absolute w-[7px] h-[7px] rounded-full border border-white/40 bg-[#050508] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 left-[41.667%] top-full" aria-hidden="true" />

            {/* Grid Cells: 12-column layout on desktop, stacked on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-12 w-full">
              {featuredBlocks.map((block, index) => {
                // Determine desktop col-span and borders based on position
                const cellClasses =
                  index === 0
                    ? "md:col-span-7 md:border-r md:border-b border-white/10 max-md:border-b max-md:border-white/10"
                    : index === 1
                    ? "md:col-span-5 md:border-b border-white/10 max-md:border-b max-md:border-white/10"
                    : index === 2
                    ? "md:col-span-5 md:border-r border-white/10 max-md:border-b max-md:border-white/10"
                    : "md:col-span-7";

                return (
                  <div key={block.slug} className={`grid-block-cell ${cellClasses}`}>
                    <BlockCard
                      block={block}
                      index={index}
                      total={featuredBlocks.length}
                      className="border-0 rounded-none"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Grid Footer CTA */}
        <div className="flex justify-center">
          <Link href="/blocks" className="btn-secondary group">
            <span>Explore all {BLOCKS_DATA.length} components in registry</span>
            <NextIcon size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
