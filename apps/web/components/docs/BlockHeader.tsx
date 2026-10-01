"use client";

import React, { useState } from "react";
import { BlockItem } from "@/data/blocks";
import { getShortTitle, getConciseDescription } from "./constants";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { Terminal, Copy, Check, ChevronDown } from "lucide-react";

interface BlockHeaderProps {
  block: BlockItem;
}

export function BlockHeader({ block }: BlockHeaderProps) {
  const [copied, setCopied] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const conciseDescription = getConciseDescription(block.slug, block.description);
  const displayTitle = getShortTitle(block.slug, block.title);

  const handleCopyUrl = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      setDropdownOpen(false);
    }
  };

  const handleCopyCli = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(`npx @rnblocks/cli add ${block.slug}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      setDropdownOpen(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1.5 min-w-0">
          {/* Category & Version Badges */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#32c798] uppercase tracking-wider font-semibold">
              {block.category}
            </span>
            <span className="text-[#71717a] font-mono text-xs">•</span>
            <span className="text-xs font-mono text-[#9ca3af]">
              v{block.version || "1.0.0"}
            </span>
          </div>

          {/* Clean Main Title */}
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {displayTitle}
          </h1>
        </div>

        {/* Top Right Action: Compact Copy Link / CLI Dropdown */}
        <div className="relative shrink-0 pt-1 sm:pt-0">
          <div className="inline-flex rounded-lg border border-white/[0.1] bg-[#060609] shadow-sm">
            <button
              onClick={handleCopyUrl}
              className="inline-flex items-center gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 text-xs font-mono text-[#e4e4e7] hover:text-white hover:bg-white/[0.05] rounded-l-lg transition-colors cursor-pointer"
              title="Copy page URL"
            >
              {copied ? (
                <>
                  <Check size={12} className="text-[#32c798]" />
                  <span className="text-[#32c798] text-[11px] sm:text-xs">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={12} className="text-[#9ca3af]" />
                  <span className="hidden sm:inline">Copy Link</span>
                  <span className="sm:hidden text-[11px]">Copy</span>
                </>
              )}
            </button>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="px-1.5 sm:px-2 py-1 sm:py-1.5 border-l border-white/[0.08] hover:bg-white/[0.05] rounded-r-lg text-[#9ca3af] hover:text-white transition-colors cursor-pointer"
              title="More actions"
              aria-label="More copy actions"
            >
              <ChevronDown size={12} />
            </button>
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-48 bg-[#060609] border border-white/[0.1] rounded-xl p-1.5 shadow-[0_16px_36px_rgba(0,0,0,0.9)] z-30 space-y-0.5">
              <button
                onClick={handleCopyCli}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-[#d1d5db] hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors text-left cursor-pointer font-mono"
              >
                <Terminal size={13} className="text-[#32c798]" />
                <span>Copy CLI command</span>
              </button>
              <button
                onClick={handleCopyUrl}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-[#d1d5db] hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors text-left cursor-pointer font-mono"
              >
                <Copy size={13} className="text-[#93c5fd]" />
                <span>Copy Page URL</span>
              </button>
              <a
                href={`https://github.com/Ashwin-Khowala/rnblocks/tree/master/registry/blocks/${block.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-[#d1d5db] hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors text-left cursor-pointer font-mono"
              >
                <GitHubIcon size={13} />
                <span>View on GitHub</span>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Concise 1-sentence Description */}
      <p className="text-sm sm:text-base text-[#9ca3af] leading-relaxed max-w-2xl">
        {conciseDescription}
      </p>
    </div>
  );
}
