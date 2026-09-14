"use client";

import React from "react";
import Link from "next/link";
import { BLOCKS_DATA } from "@/data/blocks";
import {
  Smartphone,
  Layers,
  ArrowRight,
  Sparkles,
  Terminal,
  Code2,
  Compass,
  FolderPlus,
} from "lucide-react";

export default function ScreensPage() {
  const screens = BLOCKS_DATA.filter((b) => b.type === "screen");

  return (
    <div className="min-h-screen bg-[#030305] text-[#ededed] pt-24 md:pt-28 pb-24 flex-1">
      <div className="container-main">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10.5px] font-bold text-[#32c798] bg-[#32c798]/10 border border-[#32c798]/30 uppercase tracking-wider">
              <Sparkles size={12} />
              <span>Full-Flow Mobile Screens</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
            Screens Directory
          </h1>
          <p className="text-xs sm:text-sm text-[#9ca3af] max-w-xl">
            Complete, interconnected mobile screen experiences ready to drop into your
            Expo Router app. Fully functional with state, interactions, and native styling.
          </p>
        </div>

        {screens.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {screens.map((screen) => {
              const ScreenComp = screen.Component;
              return (
                <div
                  key={screen.slug}
                  className="bg-[#050508] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-white/20 transition-all duration-200"
                >
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold text-[#32c798] bg-[#32c798]/10 border border-[#32c798]/30 px-2 py-0.5 rounded-full uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#32c798] animate-pulse" />
                        Live Screen
                      </span>
                      <span className="font-mono text-[10px] font-medium text-[#a1a1aa] bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded">
                        {screen.framework}
                      </span>
                      {screen.styling.map((s) => (
                        <span
                          key={s}
                          className="font-mono text-[10px] font-medium text-[#a1a1aa] bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <h2 className="text-xl font-bold text-white mb-2">{screen.title}</h2>
                    <p className="text-xs sm:text-sm text-[#9ca3af] mb-4 leading-relaxed">
                      {screen.description}
                    </p>

                    <div className="mb-4">
                      <div className="inline-flex items-center gap-2 bg-[#040406] border border-white/[0.08] rounded-xl px-3 py-1.5 text-xs font-mono text-[#d1d5db]">
                        <Terminal size={13} className="text-[#32c798]" />
                        <code>npx rnblocks add {screen.name}</code>
                      </div>
                    </div>

                    <Link href={`/blocks/${screen.slug}`} className="btn-primary inline-flex items-center gap-2 text-xs">
                      <span>View Source Code</span>
                      <Code2 size={14} />
                    </Link>
                  </div>

                  <div className="p-6 bg-[#030305] border-t border-white/[0.06] flex items-center justify-center">
                    {ScreenComp && <ScreenComp />}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Curation & Roadmap State */
          <div className="bg-[#07070a] border border-white/10 rounded-2xl p-6 sm:p-10 max-w-4xl mx-auto mb-12 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)]">
            <div>
              <div className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#32c798] bg-[#32c798]/10 border border-[#32c798]/30 px-2.5 py-1 rounded-full uppercase tracking-wider mb-3">
                <Compass size={13} />
                <span>Active Curation</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Screen Flows Under Curation
              </h2>
              <p className="text-xs sm:text-sm text-[#9ca3af] max-w-2xl leading-relaxed">
                We are curating complete, production-grade mobile screen experiences
                designed specifically for React Native and Expo Router. In the meantime,
                explore modular UI blocks like the Floating Docker, or contribute a screen.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 mb-8">
                <div className="bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] rounded-xl p-4 flex items-start gap-3.5 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-[#32c798] shrink-0">
                    <Smartphone size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-white mb-1">
                      Onboarding & Walkthrough
                    </h4>
                    <p className="text-xs text-[#9ca3af] leading-relaxed">
                      Multi-step swipeable carousel with pagination dots, haptic feedback, and permission triggers.
                    </p>
                  </div>
                </div>

                <div className="bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] rounded-xl p-4 flex items-start gap-3.5 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-[#32c798] shrink-0">
                    <Layers size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-white mb-1">
                      Auth & Social Login
                    </h4>
                    <p className="text-xs text-[#9ca3af] leading-relaxed">
                      Clean input forms, phone OTP verification states, and OAuth action buttons.
                    </p>
                  </div>
                </div>

                <div className="bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] rounded-xl p-4 flex items-start gap-3.5 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-[#32c798] shrink-0">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-white mb-1">
                      Subscription Paywall
                    </h4>
                    <p className="text-xs text-[#9ca3af] leading-relaxed">
                      Annual/monthly billing toggle, feature comparison list, and terms disclaimer.
                    </p>
                  </div>
                </div>

                <div className="bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] rounded-xl p-4 flex items-start gap-3.5 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-[#32c798] shrink-0">
                    <FolderPlus size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-white mb-1">
                      Profile & Preferences
                    </h4>
                    <p className="text-xs text-[#9ca3af] leading-relaxed">
                      Avatar photo selector, account management settings, and switch toggles.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link href="/blocks" className="btn-primary inline-flex items-center gap-2 text-xs">
                  <span>Explore UI Blocks</span>
                  <ArrowRight size={14} />
                </Link>
                <Link href="/submit" className="btn-secondary inline-flex items-center gap-2 text-xs">
                  <span>Propose a Screen</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Contribution Banner */}
        <div className="bg-gradient-to-r from-[#07070a] to-[#0c0c14] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 max-w-4xl mx-auto">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-1">Contribute Screen Flows</h3>
            <p className="text-xs sm:text-sm text-[#9ca3af] max-w-lg">
              Have a production React Native screen or flow to share with the community? Submit your component via Pull Request.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/submit" className="btn-primary inline-flex items-center gap-2 text-xs whitespace-nowrap">
              <span>Contribution Guide</span>
              <ArrowRight size={14} />
            </Link>
            <Link href="/blocks" className="btn-secondary inline-flex items-center gap-2 text-xs whitespace-nowrap">
              <span>Browse Blocks</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
