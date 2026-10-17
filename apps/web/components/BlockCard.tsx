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
  const { slug, title, category, Component, dependencies, description } = block;

  const canvasRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(1);
  const [revealKey, setRevealKey] = useState<number>(0);
  const [isReplaying, setIsReplaying] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true); // Eagerly visible to prevent blank box lag

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
        "group relative flex flex-col overflow-hidden transition-all duration-200 select-none bg-[#0a0a0f]",
        isBentoCell
          ? "border-0"
          : "border border-white/[0.08] hover:border-white/[0.18] rounded-[16px] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)]",
        isSelected && "border-white/30 bg-[#0d0d14] ring-1 ring-white/20",
        className
      )}
    >
      {/* ── Card Header: Title, Category Badge, Platform Indicators ── */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#08080c] border-b border-white/[0.06] z-10">
        <div className="flex items-center gap-2.5 min-w-0">
          <Link
            href={`/blocks/${slug}`}
            className="text-[13.5px] font-semibold text-white/95 hover:text-white truncate transition-colors"
          >
            {title}
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#9ca3af] bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded-[4px] shrink-0">
            {category}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden lg:inline-block font-mono text-[10px] text-[#71717a]">
            iOS • Android • Web
          </span>
          {/* Quick External Link */}
          <Link
            href={`/blocks/${slug}`}
            className="text-[#71717a] hover:text-white transition-colors p-1"
            title={`View ${title} code and docs`}
            aria-label={`View ${title}`}
          >
            <ArrowUpRightIcon size={13} />
          </Link>
        </div>
      </div>

      {/* ── Main Preview Canvas ── */}
      <div
        ref={canvasRef}
        className="relative w-full h-[320px] sm:h-[350px] md:h-[370px] flex items-center justify-center bg-[#060609] bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:18px_18px] overflow-hidden p-4"
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
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#08080c] border-t border-white/[0.06] z-10 gap-2">
        <div className="flex items-center gap-1.5">
          {/* Replay */}
          <button
            onClick={handleReplay}
            className={cn(
              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-zinc-400 hover:text-white bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.2] hover:bg-white/[0.08] transition-all cursor-pointer font-mono text-[11px]",
              isReplaying && "text-white bg-white/20 border-white/30"
            )}
            title="Replay animation"
            aria-label="Replay animation"
          >
            <RotateCwIcon
              size={11}
              className={cn("transition-transform duration-700", isReplaying && "rotate-180")}
            />
            <span className="hidden sm:inline">Replay</span>
          </button>

          {/* Inspect / Split View (if onInspect passed) */}
          {onInspect && (
            <button
              onClick={handleInspect}
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-zinc-400 hover:text-white bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.2] hover:bg-white/[0.08] transition-colors cursor-pointer font-mono text-[11px]",
                isSelected && "bg-white/20 border-white/30 text-white font-medium"
              )}
              title="Inspect block source"
              aria-label="Inspect block"
            >
              <SlidersIcon size={11} />
              <span className="hidden sm:inline">Inspect</span>
            </button>
          )}
        </div>

        {/* Copy CLI */}
        <div className="flex items-center gap-2">
          <CopyButton
            text={`npx @rnblocks/cli add ${slug}`}
            className="!bg-white/[0.04] !border-white/[0.08] hover:!border-white/[0.2] hover:!bg-white/[0.08] !rounded-[6px] !px-2.5 !py-1 !font-mono !text-[11px] !text-zinc-300 hover:!text-white shadow-sm"
            label="CLI"
          />
          <Link
            href={`/blocks/${slug}`}
            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-white px-2 py-1 rounded-[6px] hover:bg-white/[0.05] transition-colors"
          >
            <span>Code</span>
            <ArrowUpRightIcon size={11} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlockCard;
