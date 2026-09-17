"use client";

import React from "react";
import { CopyButton } from "@/components/CopyButton";
import {
  GitPullRequest,
  CheckCircle2,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { GitHubIcon } from "@/components/icons/GitHubIcon";

export default function SubmitPage() {
  const metaJsonExample = `{
  "name": "subscription-card",
  "title": "Subscription Pricing Card",
  "description": "A responsive pricing card for in-app mobile subscriptions.",
  "type": "block",
  "author": {
    "name": "Your Name",
    "github": "your_github_username"
  },
  "version": "1.0.0",
  "category": "payments",
  "tags": ["pricing", "subscription", "cards"],
  "files": [
    {
      "path": "files/subscription-card.tsx",
      "type": "registry:component"
    }
  ],
  "dependencies": ["lucide-react-native"],
  "devDependencies": {},
  "registryDependencies": [],
  "platforms": ["ios", "android", "web"],
  "frameworks": ["expo", "react-native"],
  "styling": ["StyleSheet"],
  "themes": ["dark", "light"]
}`;

  return (
    <div className="min-h-screen bg-[#030305] text-[#ededed] pt-24 md:pt-28 pb-24 flex-1">
      <div className="container-main max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10.5px] font-bold text-[#32c798] bg-[#32c798]/10 border border-[#32c798]/30 uppercase tracking-wider">
              <GitPullRequest size={13} />
              <span>Community Contributions</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
            Submit a React Native Block
          </h1>
          <p className="text-xs sm:text-sm text-[#9ca3af] max-w-2xl leading-relaxed">
            RNBlocks is completely open-source and GitHub-driven. We keep quality exceptionally high through structured Pull Request reviews.
          </p>
        </div>

        {/* 6 Step Guide */}
        <div className="mb-14">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-6">
            The GitHub Contribution Workflow
          </h2>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4 sm:gap-6 items-start">
              <div className="flex flex-col items-center shrink-0">
                <span className="w-8 h-8 rounded-full bg-[#32c798]/15 border border-[#32c798]/40 text-[#32c798] font-mono text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <div className="w-px h-full bg-white/[0.08] my-2 min-h-[30px]" />
              </div>
              <div className="flex-1 pb-4">
                <h3 className="text-sm sm:text-base font-semibold text-white mb-1">Fork the repository</h3>
                <p className="text-xs sm:text-sm text-[#9ca3af] mb-3 leading-relaxed">
                  Fork the official RNBlocks repo to your GitHub account and clone it locally.
                </p>
                <div className="flex items-center justify-between bg-[#07070a] border border-white/10 rounded-xl px-3.5 py-2 font-mono text-xs text-[#d1d5db]">
                  <code className="truncate mr-2">git clone https://github.com/Ashwin-Khowala/rnblocks.git</code>
                  <CopyButton text="git clone https://github.com/Ashwin-Khowala/rnblocks.git" />
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4 sm:gap-6 items-start">
              <div className="flex flex-col items-center shrink-0">
                <span className="w-8 h-8 rounded-full bg-[#32c798]/15 border border-[#32c798]/40 text-[#32c798] font-mono text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <div className="w-px h-full bg-white/[0.08] my-2 min-h-[30px]" />
              </div>
              <div className="flex-1 pb-4">
                <h3 className="text-sm sm:text-base font-semibold text-white mb-1">Build your component</h3>
                <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                  Create a self-contained component in <code className="text-white font-mono bg-white/[0.06] px-1.5 py-0.5 rounded text-xs">registry/blocks/[your-block-name]/files/</code> using standard React Native primitives (<code className="text-white font-mono bg-white/[0.06] px-1.5 py-0.5 rounded text-xs">StyleSheet</code>). Keep it responsive to its container, extract semantic colors at the top of the file, and include accessibility attributes.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4 sm:gap-6 items-start">
              <div className="flex flex-col items-center shrink-0">
                <span className="w-8 h-8 rounded-full bg-[#32c798]/15 border border-[#32c798]/40 text-[#32c798] font-mono text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <div className="w-px h-full bg-white/[0.08] my-2 min-h-[30px]" />
              </div>
              <div className="flex-1 pb-4">
                <h3 className="text-sm sm:text-base font-semibold text-white mb-1">Add metadata (registry.json)</h3>
                <p className="text-xs sm:text-sm text-[#9ca3af] mb-3 leading-relaxed">
                  Every component requires a <code className="text-white font-mono bg-white/[0.06] px-1.5 py-0.5 rounded text-xs">registry.json</code> file declaring its name, title, category, dependencies, supported themes, and platforms:
                </p>
                <div className="bg-[#07070a] border border-white/10 rounded-xl p-4 overflow-x-auto relative group font-mono text-xs text-[#a1a1aa] leading-relaxed">
                  <pre>{metaJsonExample}</pre>
                  <div className="absolute top-3 right-3">
                    <CopyButton text={metaJsonExample} label="Copy Template" />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4 sm:gap-6 items-start">
              <div className="flex flex-col items-center shrink-0">
                <span className="w-8 h-8 rounded-full bg-[#32c798]/15 border border-[#32c798]/40 text-[#32c798] font-mono text-xs font-bold flex items-center justify-center">
                  4
                </span>
                <div className="w-px h-full bg-white/[0.08] my-2 min-h-[30px]" />
              </div>
              <div className="flex-1 pb-4">
                <h3 className="text-sm sm:text-base font-semibold text-white mb-1">Validate locally</h3>
                <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                  Run <code className="text-white font-mono bg-white/[0.06] px-1.5 py-0.5 rounded text-xs">pnpm run validate:registry</code> and <code className="text-white font-mono bg-white/[0.06] px-1.5 py-0.5 rounded text-xs">pnpm run typecheck</code> to verify that your block adheres to schema rules and passes TypeScript checks.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex gap-4 sm:gap-6 items-start">
              <div className="flex flex-col items-center shrink-0">
                <span className="w-8 h-8 rounded-full bg-[#32c798]/15 border border-[#32c798]/40 text-[#32c798] font-mono text-xs font-bold flex items-center justify-center">
                  5
                </span>
                <div className="w-px h-full bg-white/[0.08] my-2 min-h-[30px]" />
              </div>
              <div className="flex-1 pb-4">
                <h3 className="text-sm sm:text-base font-semibold text-white mb-1">Open a Pull Request</h3>
                <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                  Push your branch to your fork and open a Pull Request against <code className="text-white font-mono bg-white/[0.06] px-1.5 py-0.5 rounded text-xs">master</code>. Our GitHub Actions CI will automatically run type checking and registry validation.
                </p>
              </div>
            </div>

            {/* Step 6 */}
            <div className="flex gap-4 sm:gap-6 items-start">
              <div className="flex flex-col items-center shrink-0">
                <span className="w-8 h-8 rounded-full bg-[#32c798]/15 border border-[#32c798]/40 text-[#32c798] font-mono text-xs font-bold flex items-center justify-center">
                  6
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-sm sm:text-base font-semibold text-white mb-1">Review & Published</h3>
                <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                  Once approved and merged, the registry rebuilds automatically. Your block instantly appears in the web gallery and becomes installable via <code className="text-white font-mono bg-white/[0.06] px-1.5 py-0.5 rounded text-xs">npx @rnblocks/cli add [your-block]</code>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Guidelines Card */}
        <div className="bg-[#07070a] border border-white/10 rounded-2xl p-6 sm:p-8 mb-10">
          <div className="flex items-center gap-2.5 mb-6">
            <ShieldCheck size={22} className="text-[#32c798]" />
            <h3 className="text-base sm:text-lg font-bold text-white">Author & Quality Standards</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 flex items-start gap-3">
              <CheckCircle2 size={16} className="text-[#32c798] shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs sm:text-sm text-white block mb-1">Standalone & Source-Owned</strong>
                <p className="text-xs text-[#9ca3af] leading-relaxed">Follow copy → own → customize. No mandatory ThemeProvider wrappers, forced runtime packages, or token abstraction bloat.</p>
              </div>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 flex items-start gap-3">
              <CheckCircle2 size={16} className="text-[#32c798] shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs sm:text-sm text-white block mb-1">Container-Responsive</strong>
                <p className="text-xs text-[#9ca3af] leading-relaxed">Components adapt to container width (tested across 320pt to 428pt+). No hardcoded screen-width assumptions (e.g. width: 390).</p>
              </div>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 flex items-start gap-3">
              <CheckCircle2 size={16} className="text-[#32c798] shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs sm:text-sm text-white block mb-1">Semantic Colors & Theming</strong>
                <p className="text-xs text-[#9ca3af] leading-relaxed">Place semantic color constants at the top of the file. Provide theme?: &ldquo;dark&rdquo; | &ldquo;light&rdquo; where appropriate.</p>
              </div>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 flex items-start gap-3">
              <CheckCircle2 size={16} className="text-[#32c798] shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs sm:text-sm text-white block mb-1">Accessibility & Performance</strong>
                <p className="text-xs text-[#9ca3af] leading-relaxed">Declare accessibilityRole, accessibilityLabel, reasonable touch targets, sufficient color contrast, and avoid unnecessary re-renders.</p>
              </div>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 flex items-start gap-3">
              <CheckCircle2 size={16} className="text-[#32c798] shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs sm:text-sm text-white block mb-1">Strict TypeScript</strong>
                <p className="text-xs text-[#9ca3af] leading-relaxed">All component props and exported interfaces must be strictly typed without any or untyped callback handlers.</p>
              </div>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 flex items-start gap-3">
              <CheckCircle2 size={16} className="text-[#32c798] shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs sm:text-sm text-white block mb-1">Expo & Native Verified</strong>
                <p className="text-xs text-[#9ca3af] leading-relaxed">Verify that components render without layout errors across iOS, Android, and web previews.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="bg-gradient-to-r from-[#07070a] to-[#0d0d16] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-1">Ready to contribute?</h3>
            <p className="text-xs sm:text-sm text-[#9ca3af]">Check out open block requests or submit your original creation.</p>
          </div>
          <div>
            <a
              href="https://github.com/Ashwin-Khowala/rnblocks"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 text-xs sm:text-sm whitespace-nowrap group"
            >
              <GitHubIcon size={16} />
              <span>Open GitHub Repository</span>
              <ExternalLink size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
