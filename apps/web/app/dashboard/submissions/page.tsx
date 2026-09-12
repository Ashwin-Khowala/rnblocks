import React from "react";
import Link from "next/link";
import { GitPullRequest, GitMerge, ExternalLink, Plus, CheckCircle2 } from "lucide-react";

export default function SubmissionsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between pb-8 border-b border-white/10">
          <div>
            <h1 className="text-3xl font-bold text-white">Submissions & Pull Requests</h1>
            <p className="text-sm text-[#A3A3A3] mt-1">
              Track open and merged block contributions submitted to RNBlocks.
            </p>
          </div>
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors"
          >
            <Plus size={16} />
            New Submission
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 mt-6 border-b border-white/10 text-sm">
          <Link href="/dashboard" className="pb-3 text-[#A3A3A3] hover:text-white transition-colors">
            Overview
          </Link>
          <Link href="/dashboard/submissions" className="pb-3 font-semibold text-white border-b-2 border-white">
            Submissions
          </Link>
          <Link href="/dashboard/profile" className="pb-3 text-[#A3A3A3] hover:text-white transition-colors">
            Author Profile
          </Link>
        </div>

        {/* PR Flow notice */}
        <div className="mt-8 p-6 rounded-lg bg-[#111111] border border-white/10">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-md bg-white/5 border border-white/10 text-white">
              <GitPullRequest size={24} />
            </div>
            <div className="space-y-2">
              <h2 className="text-base font-bold text-white">How Contributions Work</h2>
              <p className="text-sm text-[#A3A3A3] leading-relaxed max-w-2xl">
                RNBlocks does not require an external account or database. Fork the repository on GitHub, create a folder under{" "}
                <code className="text-white font-mono bg-white/5 px-1.5 py-0.5 rounded">registry/blocks/your-block/</code>, and submit a Pull Request. Our automated CI validates your Zod schema and tests your code before maintainer review.
              </p>
              <div className="pt-2">
                <a
                  href="https://github.com/Ashwin-Khowala/rnblocks/pulls"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-medium"
                >
                  View GitHub Pull Requests <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Pipeline Activity */}
        <div className="mt-8 rounded-lg bg-[#111111] border border-white/10 overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <span className="text-sm font-semibold text-white">Verified Registry Core</span>
            <span className="text-xs text-[#A3A3A3]">CI Status: Passing</span>
          </div>

          <div className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <GitMerge size={16} />
              </div>
              <div>
                <div className="text-sm font-medium text-white">floating-docker: Core Navigation Dock</div>
                <div className="text-xs text-[#737373]">PR #1 · Merged into master · 1 file added</div>
              </div>
            </div>
            <span className="text-xs px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Live in Registry
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
