"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { BlockItem } from "@/data/blocks";
import { CopyButton } from "./CopyButton";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlockCardProps {
  block: BlockItem;
  index?: number;
  total?: number;
  className?: string;
}

export function BlockCard({ block, className }: BlockCardProps) {
  const { slug, title, category, Component } = block;

  const canvasRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(1);

  // Dynamic device & container responsive auto-fit (no manual per-slug scaling)
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    const updateScale = () => {
      const containerWidth = el.clientWidth;
      const containerHeight = el.clientHeight;
      if (containerWidth <= 0 || containerHeight <= 0) return;

      // Available space inside the card canvas with comfortable padding
      const availW = Math.max(120, containerWidth - 28);
      const availH = Math.max(120, containerHeight - 56);

      // Target reference dimensions: base design accommodates ~390px width and ~365px height
      const targetW = 390;
      const targetH = 365;

      // Only scale down if the container is physically smaller than the target dimensions (e.g. mobile viewports)
      const scaleW = availW < targetW ? availW / targetW : 1;
      const scaleH = availH < targetH ? availH / targetH : 1;

      // Cap at 1.0 (never scale up beyond natural 100% native fidelity on desktop)
      const dynamicScale = Math.min(1, scaleW, scaleH);
      setScale(Math.round(dynamicScale * 1000) / 1000);
    };

    updateScale();

    const resizeObserver = new ResizeObserver(updateScale);
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "group relative bg-[#07070a] hover:bg-[#09090f] flex flex-col overflow-hidden transition-all duration-300 h-full border border-white/10 hover:border-white/20 rounded-2xl select-none",
        className
      )}
    >
      {/* ── Main Preview Canvas (Seamless Dynamic Height - Full Natural Fidelity) ── */}
      <div
        ref={canvasRef}
        className="relative w-full h-[370px] sm:h-[400px] md:h-[430px] flex items-center justify-center bg-[#050508] bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:16px_16px] overflow-hidden px-3 sm:px-4 py-6"
      >
        <div
          className="flex items-center justify-center origin-center transition-transform duration-150 w-full"
          style={{
            maxWidth: "460px",
            transform: scale < 1 ? `scale(${scale})` : undefined,
          }}
        >
          <div className="w-full flex justify-center">
            <Component />
          </div>
        </div>
      </div>

      {/* ── Corner 1 (Bottom-Left): Name & Category (Hover on Desktop, Clean on Mobile) ── */}
      <div className="absolute bottom-3 sm:bottom-4 left-3.5 sm:left-4.5 z-20 flex items-center gap-2 max-w-[65%] sm:max-w-[70%] opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
        <Link
          href={`/blocks/${slug}`}
          className="text-xs sm:text-sm font-semibold text-white/90 hover:text-[#32c798] truncate transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
        >
          {title}
        </Link>
        <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-wider text-[#71717a] bg-black/60 border border-white/[0.08] px-2 py-0.5 rounded backdrop-blur-sm shrink-0">
          {category}
        </span>
      </div>

      {/* ── Corner 2 (Bottom-Right): Actions (Hover on Desktop, Clean on Mobile) ── */}
      <div className="absolute bottom-3 sm:bottom-4 right-3.5 sm:right-4.5 z-20 flex items-center gap-1.5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
        <CopyButton
          text={`npx @rnblocks/cli add ${slug}`}
          className="!bg-[#0c0d14]/85 !backdrop-blur-md !border-white/[0.1] hover:!border-white/[0.25] hover:!bg-white/[0.1] !rounded-lg !px-2.5 !py-1 !font-mono !text-[11px] !text-[#d1d5db] hover:!text-white shadow-lg"
          label="CLI"
        />
        <Link
          href={`/blocks/${slug}`}
          className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#0c0d14]/85 backdrop-blur-md border border-white/[0.1] text-[#d1d5db] hover:text-white hover:bg-white/[0.1] hover:border-white/[0.25] transition-colors shadow-lg"
          title={`View ${title}`}
        >
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </div>
  );
}

export default BlockCard;
