import React from "react";
import Link from "next/link";
import { User, Shield, Terminal, BookOpen, Layers } from "lucide-react";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { BLOCKS_DATA } from "@/data/blocks";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between pb-8 border-b border-white/10">
          <div>
            <h1 className="text-3xl font-bold text-white">Author Profile</h1>
            <p className="text-sm text-[#A3A3A3] mt-1">
              Maintainer and contributor identity in the RNBlocks open-source ecosystem.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 mt-6 border-b border-white/10 text-sm">
          <Link href="/dashboard" className="pb-3 text-[#A3A3A3] hover:text-white transition-colors">
            Overview
          </Link>
          <Link href="/dashboard/submissions" className="pb-3 text-[#A3A3A3] hover:text-white transition-colors">
            Submissions
          </Link>
          <Link href="/dashboard/profile" className="pb-3 font-semibold text-white border-b-2 border-white">
            Author Profile
          </Link>
        </div>

        {/* Author Card */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg bg-[#111111] border border-white/10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-neutral-800 border border-white/15 flex items-center justify-center text-xl font-bold text-white">
              AK
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Ashwin Khowala</h2>
              <div className="text-xs text-[#A3A3A3] flex items-center gap-1.5 mt-0.5">
                <GitHubIcon size={13} />
                @Ashwin-Khowala
              </div>
            </div>
            <div className="pt-2 border-t border-white/10">
              <span className="text-xs px-2.5 py-1 rounded bg-white/10 text-white border border-white/15 font-mono">
                Project Founder & Maintainer
              </span>
            </div>
          </div>

          <div className="md:col-span-2 p-6 rounded-lg bg-[#111111] border border-white/10 space-y-6">
            <div>
              <h3 className="text-base font-semibold text-white">Registry Ownership & Philosophy</h3>
              <p className="text-sm text-[#A3A3A3] mt-2 leading-relaxed">
                RNBlocks components are authored directly in Git. All blocks are free and public. Every block includes full source code, platform compatibility tags, and zero proprietary lock-in.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-md bg-[#181818] border border-white/10">
                <div className="text-xs text-[#A3A3A3]">Published Blocks</div>
                <div className="text-2xl font-mono font-bold text-white mt-1">{BLOCKS_DATA.length}</div>
              </div>
              <div className="p-4 rounded-md bg-[#181818] border border-white/10">
                <div className="text-xs text-[#A3A3A3]">Registry License</div>
                <div className="text-2xl font-mono font-bold text-white mt-1">MIT</div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <a
                href="https://github.com/Ashwin-Khowala/rnblocks"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors"
              >
                <GitHubIcon size={14} />
                Visit GitHub Repository
              </a>
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#181818] text-[#F5F5F5] font-medium text-xs border border-white/10 hover:bg-[#1F1F1F] transition-colors"
              >
                <BookOpen size={14} />
                CLI Documentation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
