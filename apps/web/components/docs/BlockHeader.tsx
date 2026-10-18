"use client";

import React, { useState } from "react";
import { BlockItem } from "@/data/blocks";
import { getShortTitle, getConciseDescription } from "./constants";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { Terminal, Copy, Check, ChevronDown, Cpu, Layers } from "lucide-react";

interface BlockHeaderProps {
  block: BlockItem;
}

export function BlockHeader({ block }: BlockHeaderProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const conciseDescription = getConciseDescription(block.slug, block.description);
  const displayTitle = getShortTitle(block.slug, block.title);

  const handleCopyUrl = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied("url");
      setTimeout(() => setCopied(null), 2000);
      setDropdownOpen(false);
    }
  };

  const handleCopyCli = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(`npx @rnblocks/cli add ${block.slug}`);
      setCopied("cli");
      setTimeout(() => setCopied(null), 2000);
      setDropdownOpen(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Telemetry Header Chip */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-[#101719] border border-[#263238] font-mono text-[10.5px] text-[#00f5c8]">
          <span className="w-1.5 h-1.5 rounded-[1px] bg-[#00f5c8] shadow-[0_0_6px_#00f5c8]" />
          <span>SYS.UNIT // {block.slug.toUpperCase()}</span>
        </div>
        <div className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[3px] bg-[#0b1012] border border-[#263238] font-mono text-[10px] text-[#718087]">
          <span>EXPO 52 NATIVE</span>
        </div>
        <div className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[3px] bg-[#0b1012] border border-[#263238] font-mono text-[10px] text-[#00d9ff]">
          <span>STRICT_TYPES</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="min-w-0">
          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#f3f6f5] tracking-tight">
            {displayTitle}
          </h1>
        </div>

        {/* Top Right Action: Compact Copy Link / CLI Dropdown */}
        <div className="relative shrink-0 pt-1 sm:pt-0">
          <div className="inline-flex rounded-[4px] border border-[#263238] bg-[#101719] shadow-sm">
            <button
              onClick={handleCopyCli}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[#f3f6f5] hover:text-[#00f5c8] hover:bg-[#151d20] rounded-l-[4px] transition-colors cursor-pointer"
              title="Copy CLI command"
            >
              {copied === "cli" ? (
                <>
                  <Check size={12} className="text-[#00f5c8]" />
                  <span className="text-[#00f5c8] text-[11px] sm:text-xs font-bold">COPIED CLI</span>
                </>
              ) : (
                <>
                  <Terminal size={12} className="text-[#00f5c8]" />
                  <span className="font-bold">npx add {block.slug}</span>
                </>
              )}
            </button>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="px-2 py-1.5 border-l border-[#263238] hover:bg-[#151d20] rounded-r-[4px] text-[#929da4] hover:text-[#00f5c8] transition-colors cursor-pointer"
              title="More actions"
              aria-label="More copy actions"
            >
              <ChevronDown size={12} />
            </button>
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-52 bg-[#101719] border border-[#263238] rounded-[6px] p-1.5 shadow-[0_16px_36px_rgba(0,0,0,0.95)] z-30 space-y-0.5 font-mono">
              <button
                onClick={handleCopyCli}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-[#929da4] hover:text-[#00f5c8] hover:bg-[#151d20] rounded-[4px] transition-colors text-left cursor-pointer"
              >
                <Terminal size={13} className="text-[#00f5c8]" />
                <span>Copy CLI Command</span>
              </button>
              <button
                onClick={handleCopyUrl}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-[#929da4] hover:text-[#00d9ff] hover:bg-[#151d20] rounded-[4px] transition-colors text-left cursor-pointer"
              >
                <Copy size={13} className="text-[#00d9ff]" />
                <span>Copy Page URL</span>
              </button>
              <a
                href={`https://github.com/Ashwin-Khowala/rnblocks/tree/master/registry/blocks/${block.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-[#929da4] hover:text-white hover:bg-[#151d20] rounded-[4px] transition-colors text-left cursor-pointer"
              >
                <GitHubIcon size={13} />
                <span>View Source on GitHub</span>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm sm:text-base text-[#929da4] leading-relaxed max-w-2xl font-sans">
        {conciseDescription}
      </p>

      {/* Spec Badges Strip */}
      <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11px]">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[3px] bg-[#0b1012] border border-[#263238] text-[#929da4]">
          <span className="w-1.5 h-1.5 rounded-[1px] bg-[#00f5c8]" />
          <span>RUNTIME: <strong className="text-[#f3f6f5]">0.00 KB</strong></span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[3px] bg-[#0b1012] border border-[#263238] text-[#929da4]">
          <span className="w-1.5 h-1.5 rounded-[1px] bg-[#00d9ff]" />
          <span>STYLES: <strong className="text-[#f3f6f5]">StyleSheet</strong></span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[3px] bg-[#0b1012] border border-[#263238] text-[#929da4]">
          <span className="w-1.5 h-1.5 rounded-[1px] bg-[#00f5c8]" />
          <span>PLATFORMS: <strong className="text-[#f3f6f5]">iOS • Android • Web</strong></span>
        </div>
      </div>
    </div>
  );
}

