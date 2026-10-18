"use client";

import React from "react";
import Link from "next/link";
import { BlockItem } from "@/data/blocks";
import { CopyButton } from "@/components/CopyButton";
import {
  LayersIcon,
  BarChartIcon,
  CompassIcon,
  CalendarIcon,
  ShieldIcon,
  SparklesIcon,
  TerminalIcon,
  CloseIcon,
  ChevronRightIcon,
  GitHubIcon,
} from "@/components/icons";
import { FeatureFilter } from "./types";
import { cn } from "@/lib/utils";

interface BlocksSidebarProps {
  blocks: BlockItem[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedFeature: FeatureFilter;
  onSelectFeature: (feature: FeatureFilter) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  className?: string;
}

export function BlocksSidebar({
  blocks,
  selectedCategory,
  onSelectCategory,
  selectedFeature,
  onSelectFeature,
  isOpenMobile = false,
  onCloseMobile,
  className,
}: BlocksSidebarProps) {
  // Dynamically compute category counts from actual blocks data
  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = {
      all: blocks.length,
      charts: 0,
      navigation: 0,
      calendar: 0,
      auth: 0,
    };

    blocks.forEach((b) => {
      if (b.category === "analytics" || b.category === "charts" || b.slug.includes("chart")) {
        counts.charts = (counts.charts || 0) + 1;
      } else if (b.category === "navigation" || b.slug.includes("docker")) {
        counts.navigation = (counts.navigation || 0) + 1;
      } else if (b.category === "data-display" || b.category === "calendar" || b.slug.includes("calendar")) {
        counts.calendar = (counts.calendar || 0) + 1;
      } else if (b.category === "authentication" || b.category === "auth" || b.slug.includes("auth")) {
        counts.auth = (counts.auth || 0) + 1;
      }
    });

    return counts;
  }, [blocks]);

  // Dynamically compute feature filter counts
  const featureCounts = React.useMemo(() => {
    return {
      all: blocks.length,
      "pure-svg": blocks.filter((b) =>
        b.dependencies.every((dep) => dep === "react-native-svg")
      ).length,
      interactive: blocks.filter((b) =>
        b.tags?.some((t) => ["gestures", "interactive", "panresponder"].includes(t.toLowerCase()))
      ).length,
      animated: blocks.filter((b) =>
        b.tags?.some((t) => ["animated", "spring", "chart"].includes(t.toLowerCase()))
      ).length,
      themeable: blocks.filter((b) => b.themes && b.themes.length > 1).length,
    };
  }, [blocks]);

  const categoryItems = [
    { id: "all", label: "All Blocks", icon: LayersIcon, count: categoryCounts.all },
    { id: "charts", label: "Charts & Analytics", icon: BarChartIcon, count: categoryCounts.charts },
    { id: "navigation", label: "Navigation & Docks", icon: CompassIcon, count: categoryCounts.navigation },
    { id: "calendar", label: "Calendars & Dates", icon: CalendarIcon, count: categoryCounts.calendar },
    { id: "auth", label: "Authentication", icon: ShieldIcon, count: categoryCounts.auth },
  ];

  const featureItems: { id: FeatureFilter; label: string; count: number }[] = [
    { id: "all", label: "All Features", count: featureCounts.all },
    { id: "pure-svg", label: "Pure SVG (Zero Config)", count: featureCounts["pure-svg"] },
    { id: "interactive", label: "Touch & Hover Scrub", count: featureCounts.interactive },
    { id: "animated", label: "Shared Motion Contract", count: featureCounts.animated },
    { id: "themeable", label: "Dark & Light Ready", count: featureCounts.themeable },
  ];

  const sidebarContent = (
    <div className="space-y-6 text-[#ededed]">
      {/* Mobile Drawer Header */}
      <div className="flex lg:hidden items-center justify-between pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <LayersIcon size={16} className="text-zinc-300" />
          <span className="text-sm font-semibold text-white">Catalog & Filters</span>
        </div>
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors"
            aria-label="Close filters drawer"
          >
            <CloseIcon size={16} />
          </button>
        )}
      </div>

      {/* Category Section */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#718087] font-semibold">
            // CATEGORIES
          </span>
        </div>

        <nav className="space-y-1" aria-label="Block Categories">
          {categoryItems.map((item) => {
            const Icon = item.icon;
            const isActive = selectedCategory === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectCategory(item.id);
                  onCloseMobile?.();
                }}
                className={cn(
                  "w-full flex items-center justify-between px-2.5 py-1.5 rounded-[4px] text-xs font-mono font-medium transition-colors cursor-pointer group text-left",
                  isActive
                    ? "bg-[#151d20] border border-[#00f5c8]/40 text-[#00f5c8] font-semibold shadow-[0_0_10px_rgba(0,245,200,0.12)]"
                    : "text-[#929da4] hover:text-[#f3f6f5] hover:bg-[#101719] border border-transparent"
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon
                    size={13}
                    className={cn(
                      "shrink-0 transition-colors",
                      isActive ? "text-[#00f5c8]" : "text-[#718087] group-hover:text-[#929da4]"
                    )}
                  />
                  <span className="truncate">{item.label}</span>
                </div>
                <span
                  className={cn(
                    "text-[10px] font-mono px-1.5 py-0.5 rounded-[2px] shrink-0 ml-2",
                    isActive
                      ? "bg-[#07090b] text-[#00f5c8] border border-[#00f5c8]/30 font-bold"
                      : "bg-[#07090b] text-[#718087] border border-[#263238] group-hover:text-[#929da4]"
                  )}
                >
                  {item.count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Features & Capabilities Filter Section */}
      <div className="pt-2 border-t border-[#263238]">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#718087] font-semibold">
            // CAPABILITIES
          </span>
          <SparklesIcon size={12} className="text-[#00f5c8]" />
        </div>

        <div className="space-y-1">
          {featureItems.map((item) => {
            const isActive = selectedFeature === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectFeature(item.id);
                  onCloseMobile?.();
                }}
                className={cn(
                  "w-full flex items-center justify-between px-2.5 py-1.5 rounded-[4px] text-xs font-mono font-medium transition-colors cursor-pointer group text-left",
                  isActive
                    ? "bg-[#151d20] border border-[#00d9ff]/40 text-[#00d9ff] font-semibold shadow-[0_0_10px_rgba(0,217,255,0.12)]"
                    : "text-[#929da4] hover:text-[#f3f6f5] hover:bg-[#101719] border border-transparent"
                )}
              >
                <span className="truncate">{item.label}</span>
                <span
                  className={cn(
                    "text-[10px] font-mono px-1.5 py-0.5 rounded-[2px] shrink-0 ml-2",
                    isActive
                      ? "bg-[#07090b] text-[#00d9ff] border border-[#00d9ff]/30 font-bold"
                      : "bg-[#07090b] text-[#718087] border border-[#263238] group-hover:text-[#929da4]"
                  )}
                >
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Resource Links */}
      <div className="pt-2 border-t border-[#263238] space-y-1 font-mono text-[11.5px]">
        <Link
          href="/docs"
          className="flex items-center justify-between px-2.5 py-1.5 rounded-[4px] text-[#929da4] hover:text-[#00f5c8] hover:bg-[#101719] transition-colors"
        >
          <span>SYSTEM_MANUAL</span>
          <ChevronRightIcon size={12} className="text-[#718087]" />
        </Link>
        <Link
          href="/blog"
          className="flex items-center justify-between px-2.5 py-1.5 rounded-[4px] text-[#929da4] hover:text-[#00f5c8] hover:bg-[#101719] transition-colors"
        >
          <span>MANIFESTO</span>
          <ChevronRightIcon size={12} className="text-[#718087]" />
        </Link>
        <a
          href="https://github.com/Ashwin-Khowala/rnblocks"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-2.5 py-1.5 rounded-[4px] text-[#929da4] hover:text-[#00d9ff] hover:bg-[#101719] transition-colors"
        >
          <div className="flex items-center gap-2">
            <GitHubIcon size={13} />
            <span>GITHUB_REPO</span>
          </div>
          <ChevronRightIcon size={12} className="text-[#718087]" />
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar Pane */}
      <aside
        className={cn(
          "w-60 xl:w-64 shrink-0 hidden lg:block sticky top-[76px] self-start h-[calc(100vh-5.5rem)] overflow-y-auto pr-3 pb-8 no-scrollbar",
          className
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay & Sheet */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-50 lg:hidden flex"
          role="dialog"
          aria-modal="true"
          aria-label="Filter navigation"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#07090b]/80 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
            aria-hidden="true"
          />

          {/* Drawer Sheet */}
          <div className="relative ml-auto w-full max-w-xs sm:max-w-sm bg-[#0b1012] border-l border-[#263238] p-5 h-full overflow-y-auto shadow-2xl z-10 flex flex-col justify-between">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
