"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GitPullRequest,
  Heart,
  Terminal,
  Shield,
  Layers,
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  Code2,
  BookOpen,
  Boxes,
} from "lucide-react";
import { GitHubIcon } from "@/components/icons/GitHubIcon";

export default function ContributePage() {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const wishlist = [
    {
      title: "Interactive Bottom Sheet",
      type: "Component",
      category: "Surfaces & Overlays",
      description: "Smooth gesture-driven bottom sheet with spring physics and backdrop blur.",
      tags: ["Gesture Handler", "Reanimated"],
    },
    {
      title: "Biometric Auth Screen",
      type: "Screen",
      category: "Authentication",
      description: "FaceID/Fingerprint authentication prompt with fallback passcode keypad.",
      tags: ["Local Authentication", "NativeWind"],
    },
    {
      title: "Swipeable Card Deck",
      type: "Component",
      category: "Commerce & Discovery",
      description: "Tinder-style swipe gestures with smooth rotation and card dismissal.",
      tags: ["Gestures", "Animations"],
    },
    {
      title: "OTP Verification Flow",
      type: "Component",
      category: "Authentication",
      description: "6-digit auto-focusing OTP pin boxes with SMS auto-fill and countdown timer.",
      tags: ["Forms", "Inputs"],
    },
    {
      title: "Audio / Podcast Player Bar",
      type: "Component",
      category: "Media",
      description: "Mini expandable floating player with scrub bar, play/pause, and queue controls.",
      tags: ["Audio", "Dock"],
    },
    {
      title: "Dark Minimalist Settings Screen",
      type: "Screen",
      category: "Settings & Profile",
      description: "Segmented sections, toggle switches, destructive action dialogs, and avatar upload.",
      tags: ["Screens", "Navigation"],
    },
  ];

  return (
    <div className="min-h-screen bg-[#030305] text-[#ededed] pt-24 md:pt-28 pb-24 flex-1">
      <div className="container-main max-w-5xl mx-auto">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-[11px] font-medium bg-white/[0.04] border border-white/[0.08] text-[#9ca3af] mb-4">
            <Heart size={13} className="text-red-400 fill-red-400/20" />
            <span>Open Source Community</span>
            <span className="text-white/20">•</span>
            <span className="text-[#32c798] font-semibold">MIT Licensed</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Build the future of{" "}
            <span className="bg-gradient-to-r from-[#32c798] to-[#4ade80] bg-clip-text text-transparent">
              React Native
            </span>{" "}
            UI
          </h1>
          <p className="text-sm sm:text-base text-[#9ca3af] leading-relaxed mb-8 max-w-2xl mx-auto">
            RNBlocks is 100% free and open source. We empower mobile developers to own their code instead of wrestling with bloated npm dependencies. Join us in curating the finest blocks, screens, and CLI utilities for Expo and React Native.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://github.com/Ashwin-Khowala/rnblocks"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 text-xs sm:text-sm group"
            >
              <GitHubIcon size={16} />
              <span>Fork on GitHub</span>
              <ExternalLink size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <Link href="/submit" className="btn-secondary inline-flex items-center gap-2 text-xs sm:text-sm">
              <GitPullRequest size={15} />
              <span>Submit Block Guide</span>
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#9ca3af] hover:text-white px-4 py-2 rounded-full border border-white/[0.08] hover:border-white/[0.18] bg-white/[0.03] transition-all"
            >
              <BookOpen size={15} />
              <span>CLI & Architecture Docs</span>
            </Link>
          </div>
        </div>

        {/* 4 Pillars of Contribution */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Ways to Contribute</h2>
            <p className="text-xs sm:text-sm text-[#9ca3af]">
              No matter your skillset, there are impactful ways to contribute to RNBlocks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#07070a] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-white/20 transition-colors">
              <div>
                <div className="w-11 h-11 rounded-xl bg-[#32c798]/10 border border-[#32c798]/30 flex items-center justify-center text-[#32c798] mb-4">
                  <Boxes size={22} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Craft UI Blocks</h3>
                <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed mb-4">
                  Design self-contained, responsive React Native components like dockers, pricing cards, bottom sheets, or navigation headers using clean TypeScript.
                </p>
              </div>
              <Link href="/submit" className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#32c798] hover:text-[#4ade80] transition-colors mt-auto">
                <span>Block submission format</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="bg-[#07070a] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-white/20 transition-colors">
              <div>
                <div className="w-11 h-11 rounded-xl bg-[#38bdf8]/10 border border-[#38bdf8]/30 flex items-center justify-center text-[#38bdf8] mb-4">
                  <Layers size={22} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Design Full Screen Flows</h3>
                <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed mb-4">
                  Build end-to-end mobile screens like authentication carousels, paywalls, onboarding flows, and dashboards that developers can drop into Expo Router.
                </p>
              </div>
              <Link href="/screens" className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#38bdf8] hover:text-[#7dd3fc] transition-colors mt-auto">
                <span>View screens gallery</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="bg-[#07070a] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-white/20 transition-colors">
              <div>
                <div className="w-11 h-11 rounded-xl bg-[#c084fc]/10 border border-[#c084fc]/30 flex items-center justify-center text-[#c084fc] mb-4">
                  <Terminal size={22} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Enhance the CLI</h3>
                <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed mb-4">
                  Help improve <code className="text-white font-mono bg-white/[0.06] px-1.5 py-0.5 rounded text-xs">npx rnblocks</code> in <code className="text-white font-mono bg-white/[0.06] px-1.5 py-0.5 rounded text-xs">packages/cli</code> with automated dependency installation, project scaffolding, and conflict resolution.
                </p>
              </div>
              <a
                href="https://github.com/Ashwin-Khowala/rnblocks/tree/master/packages/cli"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#c084fc] hover:text-[#d8b4fe] transition-colors mt-auto"
              >
                <span>Explore CLI package</span>
                <ArrowRight size={13} />
              </a>
            </div>

            <div className="bg-[#07070a] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-white/20 transition-colors">
              <div>
                <div className="w-11 h-11 rounded-xl bg-[#fcd34d]/10 border border-[#fcd34d]/30 flex items-center justify-center text-[#fcd34d] mb-4">
                  <Code2 size={22} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Docs & Code Reviews</h3>
                <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed mb-4">
                  Review community pull requests, optimize animations for low-end devices, improve TypeScript types, or expand documentation.
                </p>
              </div>
              <a
                href="https://github.com/Ashwin-Khowala/rnblocks/pulls"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#fcd34d] hover:text-[#fde68a] transition-colors mt-auto"
              >
                <span>View open Pull Requests</span>
                <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </section>

        {/* Quickstart Local Setup */}
        <section className="bg-[#07070a] border border-white/10 rounded-2xl p-6 sm:p-8 mb-16">
          <div className="flex items-center gap-2.5 mb-2">
            <Terminal size={20} className="text-[#32c798]" />
            <h2 className="text-lg sm:text-xl font-bold text-white">Local Development Quickstart</h2>
          </div>
          <p className="text-xs sm:text-sm text-[#9ca3af] mb-5">
            Get the Turborepo monorepo running on your machine in under 2 minutes:
          </p>

          <div className="bg-[#09090c] border border-white/10 rounded-xl overflow-hidden font-mono text-xs">
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#0f0f13] border-b border-white/[0.08]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <span className="text-[#71717a] text-[11px]">bash: setup monorepo</span>
              <button
                onClick={() =>
                  copyToClipboard(
                    "git clone https://github.com/Ashwin-Khowala/rnblocks.git\ncd rnblocks\npnpm install\npnpm dev",
                    "quickstart"
                  )
                }
                className="p-1 rounded text-[#9ca3af] hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                title="Copy commands"
              >
                {copiedCmd === "quickstart" ? <Check size={14} className="text-[#32c798]" /> : <Copy size={14} />}
              </button>
            </div>
            <pre className="p-4 text-[#e4e4e7] overflow-x-auto leading-relaxed">
              <code>
                <span className="text-[#6b7280] italic"># 1. Clone repository</span>
                {"\n"}
                <span className="text-[#32c798]">$</span> git clone https://github.com/Ashwin-Khowala/rnblocks.git
                {"\n"}
                <span className="text-[#32c798]">$</span> cd rnblocks
                {"\n\n"}
                <span className="text-[#6b7280] italic"># 2. Install monorepo dependencies (pnpm v9+)</span>
                {"\n"}
                <span className="text-[#32c798]">$</span> pnpm install
                {"\n\n"}
                <span className="text-[#6b7280] italic"># 3. Start local development server (web + docs)</span>
                {"\n"}
                <span className="text-[#32c798]">$</span> pnpm dev
                {"\n\n"}
                <span className="text-[#6b7280] italic"># 4. Run tests and typecheck</span>
                {"\n"}
                <span className="text-[#32c798]">$</span> pnpm run typecheck
              </code>
            </pre>
          </div>
        </section>

        {/* Wishlist / In-Demand Blocks */}
        <section className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-1.5">Community Wishlist</h2>
              <p className="text-xs sm:text-sm text-[#9ca3af] max-w-xl">
                Looking for inspiration? These are the top requested mobile components and screens requested by the community:
              </p>
            </div>
            <a
              href="https://github.com/Ashwin-Khowala/rnblocks/issues/new?title=Block+Request:+"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center gap-2 text-xs self-start sm:self-auto shrink-0 group"
            >
              <span>Suggest an Idea</span>
              <ExternalLink size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wishlist.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#07070a] border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-white/20 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2 font-mono text-[10.5px]">
                    <span className="text-[#32c798] bg-[#32c798]/10 border border-[#32c798]/30 px-2 py-0.5 rounded-full uppercase font-bold">
                      {item.type}
                    </span>
                    <span className="text-[#71717a]">{item.category}</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white mb-1.5">{item.title}</h4>
                  <p className="text-xs text-[#9ca3af] leading-relaxed mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded text-[#a1a1aa]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-3 border-t border-white/[0.06]">
                  <a
                    href={`https://github.com/Ashwin-Khowala/rnblocks/issues/new?title=I'd+like+to+build:+${encodeURIComponent(item.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-[#32c798] hover:text-[#4ade80] transition-colors"
                  >
                    <span>Claim this block</span>
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Code of Conduct & Standards */}
        <section className="bg-gradient-to-r from-[#07070a] to-[#0c0c14] border border-white/10 rounded-2xl p-6 sm:p-8 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#32c798] shrink-0">
            <Shield size={24} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white mb-1.5">Our Quality & Community Standards</h3>
            <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
              We believe in an inclusive, welcoming environment. All contributions must adhere to our{" "}
              <a
                href="https://github.com/Ashwin-Khowala/rnblocks/blob/master/CODE_OF_CONDUCT.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#32c798] hover:underline font-medium"
              >
                Code of Conduct
              </a>
              . Furthermore, every block must be written in strict TypeScript, maintain zero security vulnerabilities, and work without proprietary licensing fees.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
