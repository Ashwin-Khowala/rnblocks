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
    <aside className="w-60 xl:w-64 shrink-0 hidden xl:block sticky top-[72px] h-[calc(100vh-5rem)] overflow-y-auto pl-5 pb-12">
      <div className="space-y-7">
        {/* On this page TOC list */}
        <div>
          <span className="text-[12.5px] font-semibold text-white uppercase tracking-wider block mb-3.5 pl-3">
            On this page
          </span>
          <nav className="space-y-1.5">
            {TOC_SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => onSectionClick(sec.id)}
                  className={cn(
                    "block w-full text-left text-[14px] py-1 pl-3 transition-colors cursor-pointer",
                    isActive
                      ? "text-white font-semibold pl-3 border-l-2 border-white -ml-[2px]"
                      : "text-[#8b8d98] hover:text-white pl-3 border-l-2 border-transparent -ml-[2px] font-medium"
                  )}
                >
                  {sec.title}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Join the Community Card (Matching Screenshot 1) */}
        <div className="bg-[#0e0e14] border border-white/[0.08] rounded-xl p-4 shadow-sm">
          <span className="text-sm font-semibold text-white block mb-1">
            Join the community
          </span>
          <p className="text-xs text-[#9ca3af] leading-relaxed mb-3.5">
            Get help, share feedback, and connect with other React Native developers.
          </p>
          <a
            href="https://github.com/Ashwin-Khowala/rnblocks"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#09090b", backgroundColor: "#ffffff" }}
            className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-bold text-xs transition-opacity hover:opacity-90 shadow-md cursor-pointer !text-zinc-950 !bg-white"
          >
            <GitHubIcon size={14} className="text-black shrink-0" />
            <span className="text-black font-bold tracking-tight">Star on GitHub</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
