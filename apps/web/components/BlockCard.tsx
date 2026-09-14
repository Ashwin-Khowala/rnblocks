"use client";

import React from "react";
import Link from "next/link";
import { BlockItem } from "@/data/blocks";
import { CopyButton } from "./CopyButton";
import { cn } from "@/lib/utils";

interface BlockCardProps {
  block: BlockItem;
  index?: number;
  total?: number;
  className?: string;
}

export function BlockCard({ block, className }: BlockCardProps) {
  const { slug, title, category, styling, framework, Component } = block;
  const stylingLabel = Array.isArray(styling) ? styling.join(", ") : styling;

  // Tailored scaling for each block in desktop layout
  const previewScale =
    slug === "floating-docker"
      ? 1.0
      : slug === "interactive-calendar"
      ? 0.78
      : slug === "social-auth-buttons"
      ? 0.88
      : 1.0;

  const mobilePreviewScale =
    slug === "floating-docker"
      ? 0.84
      : slug === "interactive-calendar"
      ? 0.68
      : slug === "social-auth-buttons"
      ? 0.78
      : 0.82;

  const canvasMaxWidth =
    slug === "floating-docker"
      ? "440px"
      : slug === "trend-chart"
      ? "400px"
      : "380px";

  return (
    <div
      className={cn(
        "group relative bg-[#050508] hover:bg-[#07070c] flex flex-col overflow-hidden transition-colors duration-200 h-full border border-white/10 rounded-2xl",
        className
      )}
    >
      {/* Top Left Sleek Floating Control: Docs & Redirect to Component */}
      <div className="hidden md:flex absolute top-3.5 left-3.5 z-20 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 focus-within:opacity-100 focus-within:translate-y-0 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
        <div className="inline-flex items-center bg-[#0c0c10]/90 backdrop-blur-md border border-white/[0.12] rounded-full p-[3px] shadow-[0_4px_18px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.04)]">
          <Link
            href="/docs"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[11px] font-medium leading-none text-[#94a3b8] hover:text-white hover:bg-white/[0.08] transition-all duration-150"
            title="Documentation"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
              <path d="M6 6h10" />
              <path d="M6 10h10" />
            </svg>
            <span>Docs</span>
          </Link>
          <span className="w-px h-3 bg-white/[0.15] mx-px" aria-hidden="true" />
          <Link
            href={`/blocks/${slug}`}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-mono text-[11px] font-semibold leading-none text-[#32c798] hover:text-[#4ade80] hover:bg-[#32c798]/[0.14] transition-all duration-150"
            title={`View ${title}`}
          >
            <span>Component</span>
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Top Right Quick Copy CLI */}
      <div className="hidden md:flex absolute top-3.5 right-3.5 z-20 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 focus-within:opacity-100 focus-within:translate-y-0 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
        <CopyButton
          text={`npx rnblocks add ${slug}`}
          className="!bg-[#0c0c10]/90 !backdrop-blur-md !border-white/[0.12] hover:!border-white/[0.22] hover:!bg-[#14141a]/95 !rounded-full !px-2.5 !py-1 !font-mono !text-[11px] !font-medium !text-[#94a3b8] hover:!text-white !shadow-[0_4px_18px_rgba(0,0,0,0.55)]"
          label="CLI"
        />
      </div>

      {/* Interactive Canvas Preview */}
      <div className="relative w-full h-[290px] md:h-[360px] flex items-center justify-center bg-[#050508] bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:18px_18px] overflow-hidden p-3.5 md:p-6">
        <div
          className="card-preview-scaler flex items-center justify-center origin-center select-none transition-transform duration-200 w-full"
          style={
            {
              maxWidth: canvasMaxWidth,
              "--scale-d": previewScale,
              "--scale-m": mobilePreviewScale,
            } as React.CSSProperties
          }
        >
          <div className="w-full flex justify-center">
            <Component />
          </div>
        </div>
      </div>

      {/* Bottom Architectural Info Bar */}
      <div className="flex items-center justify-between p-2.5 md:py-3 md:px-4.5 bg-[#07070b] border-t border-white/[0.06] gap-3 mt-auto">
        <div className="flex items-center gap-2 min-w-0">
          <Link href={`/blocks/${slug}`} className="min-w-0 inline-flex items-center">
            <span className="text-[12.5px] md:text-[13.5px] font-semibold text-[#f3f4f6] hover:text-[#32c798] whitespace-nowrap overflow-hidden text-ellipsis transition-colors duration-150">
              {title}
            </span>
          </Link>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.04em] text-[#71717a] bg-white/[0.04] border border-white/[0.08] px-1.5 py-0.5 rounded-full whitespace-nowrap">
            {category}
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <Link
            href="/docs"
            className="font-mono text-[10px] font-semibold text-[#94a3b8] hover:text-[#32c798] bg-white/[0.04] hover:bg-[#32c798]/[0.08] border border-white/[0.08] hover:border-[#32c798]/30 px-1.5 py-0.5 rounded transition-all duration-150 inline-flex items-center"
            title="Documentation"
          >
            Docs
          </Link>
          <span className="font-mono text-[10px] font-medium text-[#a1a1aa] bg-white/[0.03] border border-white/[0.08] px-1.5 py-0.5 rounded whitespace-nowrap">
            {stylingLabel}
          </span>
          <span className="hidden md:inline font-mono text-[10px] font-medium text-[#a1a1aa] bg-white/[0.03] border border-white/[0.08] px-1.5 py-0.5 rounded whitespace-nowrap">
            {framework === "expo" ? "Expo" : "React Native"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BlockCard;
