"use client";

import React from "react";
import Link from "next/link";
import { Check, GitPullRequest, ExternalLink, Code2 } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { CadCornerScale, CommunityBackground } from "@/components";

export function Community() {
  const perks = [
    { title: "Strict Schema Validation", desc: "Automated CI ensures zero runtime crashes, native type checks, and zero DOM leaks." },
    { title: "Interactive Web Previews", desc: "React Native Web preview canvas generated automatically for your PR." },
    { title: "Full Author Credit", desc: "Your avatar, GitHub profile, and bio featured permanently in the registry." },
  ];

  return (
    <section id="community" className="bg-transparent border-t border-white/[0.08] py-20 md:py-28 relative overflow-hidden">
      <CommunityBackground />
      <div className="container-main max-w-[1180px] mx-auto relative z-10">
        <div className="relative bg-[#0a0a0f] border border-white/[0.1] rounded-[24px] p-8 sm:p-12 md:p-14 overflow-hidden shadow-[0_24px_64px_-16px_rgba(0,0,0,0.8)] [background:radial-gradient(ellipse_70%_60%_at_0%_0%,rgba(50,199,152,0.08)_0%,#0a0a0f_75%)]">
          <CadCornerScale position="top-right" label="OPEN.SOURCE" />
          <CadCornerScale position="bottom-left" label="COMMUNITY.06" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left 7 Columns: Pitch & Action */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] text-[#32c798] mb-2.5">
                <span className="w-1.5 h-1.5 rounded-[1px] bg-[#32c798] shadow-[0_0_6px_#32c798]" />
                <span>// OPEN SOURCE ECOSYSTEM</span>
              </div>
              <h2 className="text-[26px] sm:text-[32px] md:text-[38px] font-extrabold text-white tracking-[-0.8px] md:tracking-[-1.2px] mb-3">
                Contribute your <span className="font-editorial italic font-normal text-white">production</span> UI blocks
              </h2>
              <p className="text-[14px] text-[#9ca3af] leading-relaxed mb-6 max-w-xl">
                100% open-source and community driven. Engineered a gesture-driven block? Submit it to the registry.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/submit"
                  className="btn-primary min-h-[44px] px-5 py-2 text-[13.5px] font-semibold rounded-[8px] flex items-center gap-2"
                >
                  <GitPullRequest size={15} />
                  <span>Submit a Component</span>
                </Link>

                <a
                  href="https://github.com/Ashwin-Khowala/rnblocks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary min-h-[44px] px-5 py-2 text-[13.5px] font-semibold rounded-[8px] flex items-center gap-2"
                >
                  <GitHubIcon size={14} />
                  <span>GitHub Repository</span>
                  <ExternalLink size={12} className="text-[#71717a]" />
                </a>
              </div>
            </div>

            {/* Right 5 Columns: Perks Rail */}
            <div className="lg:col-span-5 space-y-3">
              {perks.map((perk, i) => (
                <div key={i} className="bg-[#060608] border border-white/[0.06] rounded-[10px] p-3.5 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-[4px] bg-[#32c798]/10 text-[#32c798] flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="text-[13.5px] font-bold text-white mb-0.5">{perk.title}</h4>
                    <p className="text-[12px] text-[#9ca3af] leading-relaxed">{perk.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
