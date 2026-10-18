"use client";

import React from "react";
import { TOC_SECTIONS } from "./constants";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { cn } from "@/lib/utils";

interface BlockTocSidebarProps {
  activeSection: string;
  onSectionClick: (id: string) => void;
}

export function BlockTocSidebar({ activeSection, onSectionClick }: BlockTocSidebarProps) {
  return (
    <aside className="w-60 xl:w-64 shrink-0 hidden xl:block sticky top-[72px] h-[calc(100vh-5rem)] overflow-y-auto pl-5 pb-12 font-mono">
      <div className="space-y-6">
        {/* On this page TOC list */}
        <div>
          <span className="text-[10px] font-bold text-[#00f5c8] uppercase tracking-wider block mb-3 pl-3">
            // ON THIS PAGE
          </span>
          <nav className="space-y-1">
            {TOC_SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => onSectionClick(sec.id)}
                  className={cn(
                    "block w-full text-left text-xs py-1.5 pl-3 transition-all cursor-pointer rounded-r-[3px]",
                    isActive
                      ? "text-[#00f5c8] font-bold border-l-2 border-[#00f5c8] -ml-[2px] bg-[#00f5c8]/[0.06] shadow-[0_0_8px_rgba(0,245,200,0.1)]"
                      : "text-[#929da4] hover:text-[#00f5c8] pl-3 border-l-2 border-transparent -ml-[2px]"
                  )}
                >
                  <span className="text-[10px] text-[#718087] mr-1.5 opacity-60">#</span>
                  <span>{sec.title}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Robotic Contributor Pod */}
        <div className="bg-[#101719] border border-[#263238] rounded-[6px] p-4 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9.5px] font-bold text-[#00d9ff] uppercase tracking-wider">
              // REPO.TELEMETRY
            </span>
            <span className="w-1.5 h-1.5 rounded-[1px] bg-[#00f5c8] shadow-[0_0_6px_#00f5c8]" />
          </div>
          <span className="text-xs font-bold text-[#f3f6f5] block mb-1">
            Open Source Registry
          </span>
          <p className="text-[11px] text-[#929da4] leading-relaxed mb-3.5 font-sans">
            Own the code. 100% free, zero dependency lock-in. Built for React Native &amp; Expo.
          </p>
          <a
            href="https://github.com/Ashwin-Khowala/rnblocks"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-[4px] font-bold text-xs bg-[#00f5c8] hover:bg-[#2ff9d3] text-[#07090b] shadow-[0_0_16px_rgba(0,245,200,0.3)] transition-all cursor-pointer font-mono"
          >
            <GitHubIcon size={14} className="text-[#07090b] shrink-0" />
            <span>STAR REPOSITORY</span>
          </a>
        </div>
      </div>
    </aside>
  );
}

