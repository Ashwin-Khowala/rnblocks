"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { BlockItem } from "@/data/blocks";
import { CopyButton } from "./CopyButton";
import {
  ArrowUpRightIcon,
  RotateCwIcon,
  SlidersIcon,
} from "./icons";
import { cn } from "@/lib/utils";

interface BlockCardProps {
  block: BlockItem;
  index?: number;
  total?: number;
  isSelected?: boolean;
  onInspect?: (block: BlockItem) => void;
  className?: string;
}

export function BlockCard({
  block,
  isSelected = false,
  onInspect,
  className,
}: BlockCardProps) {
  const { slug, title, category, Component, description } = block;

  const canvasRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(1);
  const [revealKey, setRevealKey] = useState<number>(0);
  const [isReplaying, setIsReplaying] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  // Dynamic responsive auto-fit scaling for natural preview dimensions
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    const updateScale = () => {
      const containerWidth = el.clientWidth;
      const containerHeight = el.clientHeight;
      if (containerWidth <= 0 || containerHeight <= 0) return;

      const availW = Math.max(120, containerWidth - 32);
      const availH = Math.max(120, containerHeight - 32);

      const targetW = 380;
      const targetH = 340;

      const scaleW = availW < targetW ? availW / targetW : 1;
      const scaleH = availH < targetH ? availH / targetH : 1;

      const dynamicScale = Math.min(1, scaleW, scaleH);
      const rounded = Math.round(dynamicScale * 1000) / 1000;
      setScale((prev) => (Math.abs(prev - rounded) > 0.02 ? rounded : prev));
    };

    updateScale();

    const resizeObserver = new ResizeObserver(updateScale);
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, []);

  const handleReplay = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsReplaying(true);
    setRevealKey((k) => k + 1);
    try {
      track("replay_animation", { block: slug });
    } catch {}
    setTimeout(() => setIsReplaying(false), 800);
  }, [slug]);

  const handleInspect = useCallback(() => {
    if (!onInspect) return;
    try {
      track("inspect_block", { block: slug, source: "card" });
    } catch {}
    onInspect(block);
  }, [block, onInspect, slug]);

  const isBentoCell = className?.includes("rounded-none");

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden transition-all duration-200 select-none bg-[#0b1012]",
        isBentoCell
          ? "border-0"
          : "border border-[#263238] hover:border-[#00f5c8]/40 rounded-[8px] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.8)] hover:shadow-[0_0_24px_-4px_rgba(0,245,200,0.15)]",
        isSelected && "border-[#00f5c8] bg-[#101719] ring-1 ring-[#00f5c8]/30",
        className
      )}
    >
      {/* ── Card Header: Title, Category Badge, Platform Indicators ── */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#07090b] border-b border-[#263238] z-10">
        <div className="flex items-center gap-2 min-w-0">
          <Link
            href={`/blocks/${slug}`}
            className="text-[13px] font-bold text-[#f3f6f5] hover:text-[#00f5c8] truncate transition-colors font-mono tracking-tight"
          >
            {title}
          </Link>
          <span className="font-mono text-[9px] uppercase tracking-wider text-[#00f5c8] bg-[#00f5c8]/10 border border-[#00f5c8]/30 px-1.5 py-0.5 rounded-[3px] shrink-0 font-semibold">
            {category}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden sm:inline-block font-mono text-[9.5px] text-[#718087]">
            iOS • ANDROID • WEB
          </span>
          {/* Quick External Link */}
          <Link
            href={`/blocks/${slug}`}
            className="text-[#718087] hover:text-[#00f5c8] transition-colors p-1"
            title={`View ${title} code and docs`}
            aria-label={`View ${title}`}
          >
            <ArrowUpRightIcon size={12} />
          </Link>
        </div>
      </div>

      {/* ── Main Preview Canvas ── */}
      <div
        ref={canvasRef}
        className="relative w-full h-[320px] sm:h-[350px] md:h-[370px] flex items-center justify-center bg-[#07090b] bg-[radial-gradient(rgba(0,245,200,0.04)_1px,transparent_1px)] bg-[size:16px_16px] overflow-hidden p-4"
      >
        <div
          className="flex items-center justify-center origin-center transition-transform duration-150 w-full"
          style={{
            maxWidth: "440px",
            transform: scale < 1 ? `scale(${scale})` : undefined,
          }}
        >
          <div className="w-full flex justify-center">
            {isVisible ? (
              /* Component rendered with revealKey key so replay resets enter animation */
              /* @ts-expect-error Component may optionally take revealKey */
              <Component key={revealKey} revealKey={revealKey} />
            ) : (
              <div className="w-full h-[240px]" aria-hidden="true" />
            )}
          </div>
        </div>
      </div>

      {/* ── Dedicated Action Footer ── */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#07090b] border-t border-[#263238] z-10 gap-2">
        <div className="flex items-center gap-1.5">
          {/* Replay */}
          <button
            onClick={handleReplay}
            className={cn(
              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] text-[#929da4] hover:text-[#f3f6f5] bg-[#101719] border border-[#263238] hover:border-[#00f5c8]/40 transition-all cursor-pointer font-mono text-[10.5px]",
              isReplaying && "text-[#00f5c8] bg-[#00f5c8]/15 border-[#00f5c8]/40"
            )}
            title="Replay animation"
            aria-label="Replay animation"
          >
            <RotateCwIcon
              size={11}
              className={cn("transition-transform duration-700", isReplaying && "rotate-180")}
            />
            <span className="hidden sm:inline">REPLAY</span>
          </button>

          {/* Inspect / Split View (if onInspect passed) */}
          {onInspect && (
            <button
              onClick={handleInspect}
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] text-[#929da4] hover:text-[#f3f6f5] bg-[#101719] border border-[#263238] hover:border-[#00f5c8]/40 transition-colors cursor-pointer font-mono text-[10.5px]",
                isSelected && "bg-[#00f5c8]/20 border-[#00f5c8]/40 text-[#00f5c8] font-bold"
              )}
              title="Inspect block source"
              aria-label="Inspect block"
            >
              <SlidersIcon size={11} />
              <span className="hidden sm:inline">INSPECT</span>
            </button>
          )}
        </div>

        {/* Copy CLI */}
        <div className="flex items-center gap-2">
          <CopyButton
            text={`npx @rnblocks/cli add ${slug}`}
            className="!bg-[#101719] !border-[#263238] hover:!border-[#00f5c8]/50 hover:!bg-[#151d20] !rounded-[4px] !px-2.5 !py-1 !font-mono !text-[10.5px] !text-[#f3f6f5] shadow-sm"
            label="CLI"
          />
          <Link
            href={`/blocks/${slug}`}
            className="hidden sm:inline-flex items-center gap-1 text-[10.5px] font-mono text-[#718087] hover:text-[#00d9ff] px-2 py-1 rounded-[4px] hover:bg-[#101719] transition-colors"
          >
            <span>CODE</span>
            <ArrowUpRightIcon size={11} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlockCard;
