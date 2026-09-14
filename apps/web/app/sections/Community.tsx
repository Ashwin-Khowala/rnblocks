"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, GitPullRequest, ExternalLink } from "lucide-react";

export function Community() {
  const perks = [
    "Strict schema validation ensures high code quality",
    "Interactive web previews automatically rendered",
    "Full author credit and direct links to your GitHub profile",
  ];

  return (
    <section className="bg-[#070709] border-t border-white/[0.06] py-16 md:py-24">
      <div className="container-main">
        <div className="bg-[#0c0c11] [background:radial-gradient(ellipse_80%_60%_at_20%_0%,rgba(50,199,152,0.08)_0%,#0c0c11_75%)] border border-[#32c798]/25 rounded-[24px] p-6 sm:p-10 md:p-14 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.7)]">
          <div className="max-w-[720px]">
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-[#32c798] block mb-2">
              Open Source Community
            </span>
            <h2 className="text-[22px] sm:text-[28px] md:text-[34px] font-extrabold text-white tracking-[-0.4px] md:tracking-[-0.6px] mb-3">
              Contribute your <span className="font-editorial italic font-normal">production</span> UI blocks
            </h2>
            <p className="text-[13px] md:text-base leading-[1.5] md:leading-relaxed text-[#9ca3af] mb-6 md:mb-7">
              RNBlocks is fully open-source and community driven. If you've built a refined card, sheet,
              navigation pattern, or flow, submit it to the registry. Submitting takes less than 30 minutes.
            </p>

            {/* Perks List */}
            <div className="flex flex-col gap-3 mb-8 md:mb-9">
              {perks.map((perk, i) => (
                <div key={i} className="flex items-center gap-2.5 text-[13.5px] md:text-[14.5px] text-[#d1d5db]">
                  <CheckCircle2 size={16} className="text-[#32c798] shrink-0" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-3.5 w-full sm:w-auto">
              <Link href="/contribute" className="btn-primary w-full sm:w-auto justify-center">
                <GitPullRequest size={15} />
                <span>Contribution Guide</span>
              </Link>
              <Link href="/submit" className="btn-secondary w-full sm:w-auto justify-center">
                <span>Submit a Component</span>
              </Link>
              <a
                href="https://github.com/Ashwin-Khowala/rnblocks"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost w-full sm:w-auto justify-center"
              >
                <span>View on GitHub</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
