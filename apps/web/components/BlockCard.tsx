"use client";

import React from "react";
import Link from "next/link";
import { BlockItem } from "@/data/blocks";
import { CopyButton } from "./CopyButton";
import { ArrowUpRight, Terminal, Smartphone } from "lucide-react";
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
      : slug === "comparison-chart"
      ? 0.96
      : slug === "social-auth-buttons"
      ? 0.88
      : 1.0;

  const mobilePreviewScale =
    slug === "floating-docker"
      ? 0.84
      : slug === "interactive-calendar"
      ? 0.68
      : slug === "comparison-chart"
      ? 0.84
      : slug === "social-auth-buttons"
      ? 0.78
      : 0.82;

  const canvasMaxWidth =
    slug === "floating-docker"
      ? "440px"
      : slug === "comparison-chart"
      ? "520px"
      : slug === "trend-chart"
      ? "400px"
      : "380px";

  return (
    <div
      className={cn(
        "group relative bg-[#07070a] hover:bg-[#09090f] flex flex-col overflow-hidden transition-all duration-300 h-full border border-white/10 hover:border-[#32c798]/40 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_24px_rgba(50,199,152,0.08)] rounded-2xl",
        className
      )}
    >
      {/* Card Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0a0a0e]/90 border-b border-white/[0.08] gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
            <span className="w-2 h-2 rounded-full bg-white/20" />
            <span className="w-2 h-2 rounded-full bg-white/10" />
            <span className="w-2 h-2 rounded-full bg-white/10" />
          </div>
          <Link
            href={`/blocks/${slug}`}
            className="text-xs sm:text-sm font-semibold text-white hover:text-[#32c798] truncate transition-colors"
          >
            {title}
          </Link>
          <span className="hidden sm:inline-block font-mono text-[10px] font-semibold uppercase tracking-wider text-[#32c798] bg-[#32c798]/10 border border-[#32c798]/25 px-2 py-0.5 rounded-full">
            {category}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <CopyButton
            text={`npx @rnblocks/cli add ${slug}`}
            className="!bg-white/[0.04] !border-white/[0.1] hover:!border-[#32c798]/40 hover:!bg-[#32c798]/10 !rounded-lg !px-2.5 !py-1 !font-mono !text-[11px] !text-[#9ca3af] hover:!text-[#32c798]"
            label="CLI"
          />
          <Link
            href={`/blocks/${slug}`}
            className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.1] text-[#9ca3af] hover:text-white hover:bg-white/[0.08] transition-colors"
            title={`View ${title}`}
          >
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      {/* Interactive Canvas Preview */}
      <div className="relative w-full h-[280px] sm:h-[320px] md:h-[350px] flex items-center justify-center bg-[#050508] bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px] overflow-hidden p-4">
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

      {/* Bottom Information & Action Bar */}
      <div className="flex items-center justify-between p-3.5 sm:px-4 bg-[#08080c] border-t border-white/[0.08] gap-3 mt-auto">
        <div className="flex items-center gap-2">
          <Link
            href={`/blocks/${slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#32c798] hover:text-[#4ade80] transition-colors"
          >
            <span>View & Usage</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 text-[10.5px] font-mono">
          <span className="text-[#71717a] bg-white/[0.03] border border-white/[0.08] px-2 py-0.5 rounded">
            {stylingLabel}
          </span>
          <span className="hidden sm:inline-block text-[#71717a] bg-white/[0.03] border border-white/[0.08] px-2 py-0.5 rounded">
            {framework === "expo" ? "Expo" : "Bare RN"}
          </span>
          <span className="text-[#32c798] bg-[#32c798]/10 border border-[#32c798]/20 px-2 py-0.5 rounded font-medium">
            iOS • Android • Web
          </span>
        </div>
      </div>
    </div>
  );
}

export default BlockCard;
