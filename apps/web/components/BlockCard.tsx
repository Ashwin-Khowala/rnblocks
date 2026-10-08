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
  const { slug, title, category, Component, dependencies } = block;

  const canvasRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(1);
  const [revealKey, setRevealKey] = useState<number>(0);
  const [isReplaying, setIsReplaying] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Lazy viewport intersection: only mount component when approaching viewport
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "350px" } // Pre-mount 350px before entering viewport for seamless scrolling
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Dynamic responsive auto-fit scaling for natural preview dimensions
  useEffect(() => {
    if (!isVisible) return;
    const el = canvasRef.current;
    if (!el) return;

    const updateScale = () => {
      const containerWidth = el.clientWidth;
      const containerHeight = el.clientHeight;
      if (containerWidth <= 0 || containerHeight <= 0) return;

      const availW = Math.max(120, containerWidth - 28);
      const availH = Math.max(120, containerHeight - 56);

      const targetW = 390;
      const targetH = 365;

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
  }, [isVisible]);

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

  return (
    <div
      className={cn(
        "group relative bg-[#07070a] hover:bg-[#09090e] flex flex-col overflow-hidden transition-all duration-300 h-full border rounded-2xl select-none [content-visibility:auto] [contain-intrinsic-size:0_450px]",
        isSelected
          ? "border-white/30 shadow-lg shadow-black/60 bg-[#0a0a0f]"
          : "border-white/10 hover:border-white/20",
        className
      )}
    >
      {/* ── Main Preview Canvas (Seamless Natural Canvas like Home Page) ── */}
      <div
        ref={canvasRef}
        className="relative w-full h-[370px] sm:h-[400px] md:h-[430px] flex items-center justify-center bg-[#050508] bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] overflow-hidden px-3 sm:px-4 py-6"
      >
        <div
          className="flex items-center justify-center origin-center transition-transform duration-150 w-full"
          style={{
            maxWidth: "460px",
            transform: scale < 1 ? `scale(${scale})` : undefined,
          }}
        >
          <div className="w-full flex justify-center">
            {isVisible ? (
              /* Component rendered with revealKey key so replay resets enter animation */
              /* @ts-expect-error Component may optionally take revealKey */
              <Component key={revealKey} revealKey={revealKey} />
            ) : (
              <div className="w-full h-[280px]" aria-hidden="true" />
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom-Left: Title & Category (Clean overlay like Home Page) ── */}
      <div className="absolute bottom-3 sm:bottom-4 left-3.5 sm:left-4.5 z-20 flex items-center gap-2 max-w-[55%] sm:max-w-[60%] opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
        <Link
          href={`/blocks/${slug}`}
          className="text-xs sm:text-sm font-semibold text-white/90 hover:text-white truncate transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
        >
          {title}
        </Link>
        <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-wider text-zinc-400 bg-[#0c0d12]/90 border border-white/[0.08] px-2 py-0.5 rounded-md backdrop-blur-md shrink-0">
          {category}
        </span>
      </div>

      {/* ── Bottom-Right: Actions (Replay, Inspect, CLI, Docs Link) ── */}
      <div className="absolute bottom-3 sm:bottom-4 right-3.5 sm:right-4.5 z-20 flex items-center gap-1.5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
        {/* Replay */}
        <button
          onClick={handleReplay}
          className={cn(
            "inline-flex items-center justify-center w-7 h-7 rounded-lg text-zinc-400 hover:text-white bg-[#0c0d12]/90 backdrop-blur-md border border-white/[0.1] hover:border-white/[0.25] hover:bg-white/[0.1] transition-all cursor-pointer shadow-sm",
            isReplaying && "text-white bg-white/20 border-white/30"
          )}
          title="Replay animation"
          aria-label="Replay animation"
        >
          <RotateCwIcon
            size={12}
            className={cn("transition-transform duration-700", isReplaying && "rotate-180")}
          />
        </button>

        {/* Inspect (if onInspect passed) */}
        {onInspect && (
          <button
            onClick={handleInspect}
            className={cn(
              "inline-flex items-center justify-center w-7 h-7 rounded-lg text-zinc-400 hover:text-white bg-[#0c0d12]/90 backdrop-blur-md border border-white/[0.1] hover:border-white/[0.25] hover:bg-white/[0.1] transition-colors cursor-pointer shadow-sm",
              isSelected && "bg-white/20 border-white/30 text-white"
            )}
            title="Inspect block"
            aria-label="Inspect block"
          >
            <SlidersIcon size={12} />
          </button>
        )}

        {/* Copy CLI */}
        <CopyButton
          text={`npx @rnblocks/cli add ${slug}`}
          className="!bg-[#0c0d12]/90 !backdrop-blur-md !border-white/[0.1] hover:!border-white/[0.25] hover:!bg-white/[0.1] !rounded-lg !px-2.5 !py-1 !font-mono !text-[11px] !text-zinc-300 hover:!text-white shadow-sm"
          label="CLI"
        />

        {/* View docs Link */}
        <Link
          href={`/blocks/${slug}`}
          className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#0c0d12]/90 backdrop-blur-md border border-white/[0.1] text-zinc-400 hover:text-white hover:bg-white/[0.1] hover:border-white/[0.25] transition-colors shadow-sm"
          title={`View ${title}`}
          aria-label={`View ${title} documentation`}
        >
          <ArrowUpRightIcon size={13} />
        </Link>
      </div>
    </div>
  );
}

export default BlockCard;
