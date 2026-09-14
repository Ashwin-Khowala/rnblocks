"use client";

import React from "react";
import Link from "next/link";
import { GitPullRequest, GitMerge, ExternalLink, Plus } from "lucide-react";
import { DashboardTabs } from "@/components/DashboardTabs";

export default function SubmissionsPage() {
  return (
    <div className="min-h-screen bg-[#030305] text-[#ededed] pt-24 md:pt-28 pb-24 flex-1">
      <div className="container-main max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 pb-7 border-b border-white/[0.08]">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
              Submissions & Pull Requests
            </h1>
            <p className="text-xs sm:text-sm text-[#9ca3af] max-w-xl">
              Track open and merged block contributions submitted to RNBlocks.
            </p>
          </div>

          <div className="shrink-0">
            <Link href="/submit" className="btn-primary inline-flex items-center gap-2 text-xs">
              <Plus size={15} />
              <span>New Submission</span>
            </Link>
          </div>
        </div>

        {/* Dashboard Nav Tabs */}
        <DashboardTabs />

        {/* PR Flow Guide Card */}
        <div className="bg-[#07070a] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-5 mb-8">
          <div className="w-11 h-11 rounded-xl bg-[#32c798]/10 border border-[#32c798]/30 flex items-center justify-center text-[#32c798] shrink-0">
            <GitPullRequest size={22} />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white mb-2">How Contributions Work</h2>
            <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed mb-4">
              RNBlocks does not require an external account or database. Fork the repository on GitHub, create a folder under{" "}
              <code className="text-white font-mono bg-white/[0.06] px-1.5 py-0.5 rounded text-xs">registry/blocks/your-block/</code>, and submit a Pull Request. Our automated CI validates your Zod schema and tests your code before maintainer review.
            </p>
            <a
              href="https://github.com/Ashwin-Khowala/rnblocks/pulls"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#32c798] hover:text-[#4ade80] transition-colors"
            >
              <span>View GitHub Pull Requests</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* Recent Pipeline Activity */}
        <div className="bg-[#07070a] border border-white/10 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 bg-[#0a0a0e] border-b border-white/[0.08]">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Verified Registry Core
            </span>
            <span className="font-mono text-[10.5px] text-[#32c798] bg-[#32c798]/10 border border-[#32c798]/30 px-2 py-0.5 rounded-full font-semibold">
              CI Status: Passing
            </span>
          </div>

          <div className="p-6 divide-y divide-white/[0.06]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 first:pt-0 last:pb-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                  <GitMerge size={16} />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-white">
                    floating-docker: Core Navigation Dock
                  </div>
                  <div className="font-mono text-[11px] text-[#71717a]">
                    PR #1 · Merged into master · 1 file added
                  </div>
                </div>
              </div>

              <div className="shrink-0">
                <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] text-[#32c798] bg-[#32c798]/10 border border-[#32c798]/30 px-2.5 py-1 rounded-full font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#32c798] animate-pulse" />
                  Live in Registry
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
