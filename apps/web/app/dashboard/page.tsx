"use client";

import React from "react";
import Link from "next/link";
import { GitPullRequest, Layers, CheckCircle2, ArrowUpRight, ShieldCheck } from "lucide-react";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { DashboardTabs } from "@/components/DashboardTabs";
import { BLOCKS_DATA } from "@/data/blocks";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#030305] text-[#ededed] pt-24 md:pt-28 pb-24 flex-1">
      <div className="container-main max-w-5xl mx-auto">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 pb-7 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full font-mono text-[10.5px] font-bold text-[#32c798] bg-[#32c798]/10 border border-[#32c798]/30 uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#32c798] animate-pulse" />
              <span>Git-First Registry Architecture</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
              Contributor Hub
            </h1>
            <p className="text-xs sm:text-sm text-[#9ca3af] max-w-xl">
              Explore live registry components, contribution status, and GitHub PR pipeline.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/submit" className="btn-primary inline-flex items-center gap-2 text-xs">
              <GitPullRequest size={14} />
              <span>Submit Component via PR</span>
            </Link>
            <a
              href="https://github.com/Ashwin-Khowala/rnblocks"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary inline-flex items-center gap-2 text-xs"
            >
              <GitHubIcon size={14} />
              <span>GitHub Repo</span>
            </a>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <DashboardTabs />

        {/* Overview Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-[#07070a] border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-mono text-[#9ca3af] mb-3">
              <span>Live in Registry</span>
              <Layers size={16} className="text-[#32c798]" />
            </div>
            <div className="text-3xl font-extrabold text-white mb-2">{BLOCKS_DATA.length}</div>
            <div className="flex items-center gap-1.5 text-xs text-[#32c798] font-medium">
              <CheckCircle2 size={13} />
              <span>100% verified & tested</span>
            </div>
          </div>

          <div className="bg-[#07070a] border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-mono text-[#9ca3af] mb-3">
              <span>Contribution Model</span>
              <GitPullRequest size={16} className="text-[#38bdf8]" />
            </div>
            <div className="text-lg font-bold text-white mb-2 font-mono">Git-as-Database</div>
            <p className="text-xs text-[#9ca3af] leading-relaxed">
              Every block is a folder in Git with automated CI Zod validation.
            </p>
          </div>

          <div className="bg-[#07070a] border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-mono text-[#9ca3af] mb-3">
              <span>Access Model</span>
              <ShieldCheck size={16} className="text-[#c084fc]" />
            </div>
            <div className="text-lg font-bold text-white mb-2 font-mono">100% Free & Open</div>
            <p className="text-xs text-[#9ca3af] leading-relaxed">
              Zero paywalls or auth walls until author tiers are introduced.
            </p>
          </div>
        </div>

        {/* Current Registry Components */}
        <div className="bg-[#07070a] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 className="text-base sm:text-lg font-bold text-white">Current Registry Components</h2>
            <Link
              href="/blocks"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#32c798] hover:text-[#4ade80] transition-colors"
            >
              <span>Browse Gallery</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>

          <div className="divide-y divide-white/[0.06]">
            {BLOCKS_DATA.map((item) => (
              <div
                key={item.slug}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 first:pt-0 last:pb-0"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-semibold text-white text-sm">{item.title}</span>
                    <span className="font-mono text-[11px] text-[#71717a] bg-white/[0.04] px-1.5 py-0.5 rounded">
                      {item.slug}
                    </span>
                    <span className="font-mono text-[10px] text-[#32c798] bg-[#32c798]/10 border border-[#32c798]/30 px-1.5 py-0.5 rounded-full uppercase">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-[#9ca3af] max-w-xl line-clamp-1">{item.description}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-[#71717a] font-mono">by {item.author}</span>
                  <Link
                    href={`/blocks/${item.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-mono text-[#32c798] hover:text-[#4ade80] bg-white/[0.04] hover:bg-white/[0.08] px-2.5 py-1 rounded-md border border-white/[0.08] transition-colors"
                  >
                    <span>View Detail</span>
                    <ArrowUpRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
