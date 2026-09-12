import React from "react";
import Link from "next/link";
import { GitPullRequest, Layers, Sparkles, CheckCircle2, ArrowUpRight, Clock, ShieldCheck } from "lucide-react";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { BLOCKS_DATA } from "@/data/blocks";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-8 border-b border-white/10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#A3A3A3] mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Git-First Registry Architecture
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Contributor Hub</h1>
            <p className="text-sm text-[#A3A3A3] mt-1">
              Explore live registry components, contribution status, and GitHub PR pipeline.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors"
            >
              <GitPullRequest size={16} />
              Submit Component via PR
            </Link>
            <a
              href="https://github.com/Ashwin-Khowala/rnblocks"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#181818] text-[#F5F5F5] font-medium text-sm border border-white/10 hover:bg-[#1F1F1F] transition-colors"
            >
              <GitHubIcon size={16} />
              GitHub Repo
            </a>
          </div>
        </div>

        {/* Dashboard Nav Tabs */}
        <div className="flex items-center gap-6 mt-6 border-b border-white/10 text-sm">
          <Link
            href="/dashboard"
            className="pb-3 font-semibold text-white border-b-2 border-white"
          >
            Overview
          </Link>
          <Link
            href="/dashboard/submissions"
            className="pb-3 text-[#A3A3A3] hover:text-white transition-colors"
          >
            Submissions
          </Link>
          <Link
            href="/dashboard/profile"
            className="pb-3 text-[#A3A3A3] hover:text-white transition-colors"
          >
            Author Profile
          </Link>
        </div>

        {/* Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          <div className="p-5 rounded-lg bg-[#111111] border border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wider">Live in Registry</span>
              <Layers size={18} className="text-[#A3A3A3]" />
            </div>
            <div className="text-3xl font-mono font-bold text-white mt-3">{BLOCKS_DATA.length}</div>
            <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1.5">
              <CheckCircle2 size={13} />
              100% verified & tested
            </div>
          </div>

          <div className="p-5 rounded-lg bg-[#111111] border border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wider">Contribution Model</span>
              <GitPullRequest size={18} className="text-[#A3A3A3]" />
            </div>
            <div className="text-xl font-semibold text-white mt-3">Git-as-Database</div>
            <p className="text-xs text-[#A3A3A3] mt-2">
              Every block is a folder in Git with automated CI Zod validation.
            </p>
          </div>

          <div className="p-5 rounded-lg bg-[#111111] border border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wider">Access Model</span>
              <ShieldCheck size={18} className="text-[#A3A3A3]" />
            </div>
            <div className="text-xl font-semibold text-white mt-3">100% Free & Open</div>
            <p className="text-xs text-[#A3A3A3] mt-2">
              Zero paywalls or auth walls until author tiers are introduced.
            </p>
          </div>
        </div>

        {/* Active Registry Items */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Current Registry Components</h2>
            <Link href="/blocks" className="text-xs text-[#A3A3A3] hover:text-white flex items-center gap-1">
              Browse Gallery <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="rounded-lg bg-[#111111] border border-white/10 divide-y divide-white/10 overflow-hidden">
            {BLOCKS_DATA.map((item) => (
              <div key={item.slug} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{item.title}</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#A3A3A3]">
                      {item.slug}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-[#A3A3A3] max-w-xl">{item.description}</p>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className="text-xs text-[#737373]">by {item.author}</span>
                  <Link
                    href={`/blocks/${item.slug}`}
                    className="px-3 py-1.5 text-xs font-medium rounded bg-[#181818] text-[#F5F5F5] border border-white/10 hover:bg-[#262626] transition-colors flex items-center gap-1.5"
                  >
                    View Detail
                    <ArrowUpRight size={13} />
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
