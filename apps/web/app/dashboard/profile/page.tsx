"use client";

import React from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { DashboardTabs } from "@/components/DashboardTabs";
import { BLOCKS_DATA } from "@/data/blocks";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#030305] text-[#ededed] pt-24 md:pt-28 pb-24 flex-1">
      <div className="container-main max-w-5xl mx-auto">
        {/* Header */}
        <div className="pb-7 border-b border-white/[0.08]">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
            Author Profile
          </h1>
          <p className="text-xs sm:text-sm text-[#9ca3af] max-w-xl">
            Maintainer and contributor identity in the RNBlocks open-source ecosystem.
          </p>
        </div>

        {/* Dashboard Nav Tabs */}
        <DashboardTabs />

        {/* Profile Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
          {/* Left Column: Author Card */}
          <div className="bg-[#07070a] border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#32c798]/30 to-[#38bdf8]/30 border-2 border-[#32c798]/50 flex items-center justify-center font-mono text-2xl font-bold text-white mb-4 shadow-[0_0_24px_rgba(50,199,152,0.2)]">
              AK
            </div>
            <h2 className="text-lg font-bold text-white mb-1">Ashwin Khowala</h2>
            <a
              href="https://github.com/Ashwin-Khowala"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-[#9ca3af] hover:text-white transition-colors mb-4"
            >
              <GitHubIcon size={14} />
              <span>@Ashwin-Khowala</span>
            </a>
            <span className="font-mono text-[10.5px] font-semibold text-[#32c798] bg-[#32c798]/10 border border-[#32c798]/30 px-3 py-1 rounded-full uppercase tracking-wider">
              Project Founder & Maintainer
            </span>
          </div>

          {/* Right Column: Philosophy & Details */}
          <div className="bg-[#07070a] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div className="mb-6">
              <h3 className="text-base font-bold text-white mb-2">Registry Ownership & Philosophy</h3>
              <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                RNBlocks components are authored directly in Git. All blocks are free and public. Every block includes full source code, platform compatibility tags, and zero proprietary lock-in.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#040406] border border-white/[0.08] rounded-xl p-4">
                <span className="text-xs font-mono text-[#71717a] block mb-1">Published Blocks</span>
                <span className="text-2xl font-extrabold text-white font-mono">{BLOCKS_DATA.length}</span>
              </div>
              <div className="bg-[#040406] border border-white/[0.08] rounded-xl p-4">
                <span className="text-xs font-mono text-[#71717a] block mb-1">Registry License</span>
                <span className="text-2xl font-extrabold text-[#32c798] font-mono">MIT</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/Ashwin-Khowala/rnblocks"
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex items-center gap-2 text-xs"
              >
                <GitHubIcon size={14} />
                <span>Visit GitHub Repository</span>
              </a>
              <Link href="/docs" className="btn-secondary inline-flex items-center gap-2 text-xs">
                <BookOpen size={14} />
                <span>CLI Documentation</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
