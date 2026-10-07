"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Check,
  X,
  Layers,
  ArrowRight,
  Sparkles,
  Zap,
  ShieldCheck,
  Code2,
  Copy,
  Terminal,
  ExternalLink,
  Share2,
  Bookmark,
  ChevronRight,
} from "lucide-react";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { cn } from "@/lib/utils";

export function WhyRNBlocksIsDifferentArticle() {
  const [copiedCli, setCopiedCli] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const copyCliCommand = () => {
    navigator.clipboard.writeText("npx @rnblocks/cli add floating-docker");
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const copyArticleLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const toc = [
    { id: "the-misconception", title: "1. The Fundamental Misconception" },
    { id: "monolithic-trap", title: "2. The 'Installed Library' Trap" },
    { id: "zero-runtime", title: "3. Zero Runtime Providers & Zero Context Tax" },
    { id: "new-architecture", title: "4. Built for the New Architecture & Bridgeless" },
    { id: "mobile-vs-web", title: "5. Mobile Ergonomics vs. Lazy Web Ports" },
    { id: "blocks-not-atoms", title: "6. Production Blocks, Not Just Micro-Atoms" },
    { id: "comparison-matrix", title: "7. The Side-by-Side Comparison Matrix" },
    { id: "when-to-use", title: "8. When You Should (and Shouldn't) Use RNBlocks" },
  ];

  return (
    <article className="w-full text-[#e4e4e7]">
      {/* Article Header */}
      <header className="mb-10 sm:mb-14 border-b border-white/[0.08] pb-10 sm:pb-12">
        <div className="flex flex-wrap items-center gap-2.5 mb-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider text-[#32c798] bg-[#32c798]/10 border border-[#32c798]/30">
            <Sparkles size={12} />
            Architecture & Philosophy
          </span>
          <span className="text-xs font-mono text-[#71717a]">•</span>
          <span className="text-xs font-mono text-[#a1a1aa]">October 7, 2026</span>
          <span className="text-xs font-mono text-[#71717a]">•</span>
          <span className="text-xs font-mono text-[#a1a1aa]">7 min read</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-5">
          Why RNBlocks is Built Different: Stop Comparing Us to Traditional UI Libraries
        </h1>

        <p className="text-lg sm:text-xl text-[#a1a1aa] leading-relaxed max-w-3xl mb-8 font-normal">
          The architectural flaw of monolithic mobile packages, the hidden tax of global runtime providers, and why owning your component source code is the only sustainable strategy in modern React Native.
        </p>

        {/* Author Card + Social Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#32c798]/30 to-white/10 border border-white/15 overflow-hidden flex items-center justify-center text-white font-bold text-sm">
              AK
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">Ashwin Khowala</span>
                <span className="text-[11px] font-mono text-[#71717a] bg-white/[0.04] px-1.5 py-0.5 rounded border border-white/[0.06]">Author</span>
              </div>
              <p className="text-xs text-[#71717a]">Creator of RNBlocks</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyArticleLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-[#a1a1aa] hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] transition-all cursor-pointer"
              title="Copy article link"
            >
              {copiedLink ? <Check size={13} className="text-[#32c798]" /> : <Share2 size={13} />}
              <span>{copiedLink ? "Link Copied" : "Share"}</span>
            </button>
            <a
              href="https://github.com/Ashwin-Khowala/rnblocks"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-[#a1a1aa] hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] transition-all"
            >
              <GitHubIcon size={13} />
              <span>Star on GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Grid: Sticky Table of Contents & Article Body */}
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 items-start">
        {/* Table of Contents (Desktop Sidebar) */}
        <aside className="hidden lg:block sticky top-24 bg-[#0a0a0e]/80 backdrop-blur-md border border-white/[0.08] rounded-xl p-4.5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#f5f5f5] uppercase tracking-wider pb-2 border-b border-white/[0.06]">
            <Bookmark size={13} className="text-[#32c798]" />
            <span>Table of Contents</span>
          </div>
          <nav className="flex flex-col gap-1">
            {toc.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-[12.5px] text-[#9ca3af] hover:text-white hover:translate-x-0.5 transition-all py-1 leading-snug"
              >
                {item.title}
              </a>
            ))}
          </nav>
        </aside>

        {/* Article Body Content */}
        <div className="space-y-12 sm:space-y-16 max-w-3xl leading-relaxed text-[15.5px] sm:text-[16.5px] text-[#d4d4d8]">
          {/* Executive Summary Callout */}
          <div className="bg-gradient-to-r from-[#32c798]/10 via-[#32c798]/5 to-transparent border-l-2 border-[#32c798] p-5 sm:p-6 rounded-r-xl">
            <h4 className="text-sm font-mono font-bold text-[#32c798] uppercase tracking-wider mb-2">
              The TL;DR Thesis
            </h4>
            <p className="text-sm sm:text-base text-[#e4e4e7] leading-relaxed">
              RNBlocks is <strong>not</strong> another monolithic component library you install via <code className="text-[#32c798] font-mono text-xs bg-black/40 px-1 py-0.5 rounded">npm i</code>. It is an open-source <strong>Component Registry</strong>. You copy production-ready React Native blocks directly into your codebase with zero runtime dependencies, zero root providers, and 100% code ownership.
            </p>
          </div>

          {/* Section 1 */}
          <section id="the-misconception" className="scroll-mt-24 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              1. The Fundamental Misconception
            </h2>
            <p>
              Whenever developers first encounter RNBlocks, their default reflex is to place it in the same bucket as tools they have used before:
            </p>
            <blockquote className="border-l border-white/20 pl-4 py-1 italic text-[#a1a1aa] text-base">
              &ldquo;Is this like NativeBase? Is it like Tamagui? React Native Paper? Or is it just another paid template pack?&rdquo;
            </blockquote>
            <p>
              The short answer is: <strong>none of the above</strong>. Comparing RNBlocks to a traditional UI library misunderstands the architecture at the most basic level.
            </p>
            <p>
              Traditional UI libraries sell you an <em>abstraction layer</em> packaged inside <code className="bg-white/[0.08] px-1.5 py-0.5 rounded font-mono text-xs text-white">node_modules</code>. RNBlocks distributes <em>production-tested source code</em> that lives directly in your repository.
            </p>
            <p>
              That single difference reshapes how your team builds, debugs, upgrades, and ships mobile apps.
            </p>
          </section>

          {/* Section 2 */}
          <section id="monolithic-trap" className="scroll-mt-24 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              2. The &ldquo;Installed Library&rdquo; Trap in Mobile
            </h2>
            <p>
              In the web world, installing a giant UI package was already painful. But in the <strong>React Native &amp; Expo ecosystem</strong>, it is frequently catastrophic.
            </p>
            <p>
              Here is what happens on every major React Native project that commits to a monolithic UI framework:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-6">
              <div className="bg-[#0e0e13] border border-red-500/20 rounded-xl p-4.5 space-y-2">
                <div className="flex items-center gap-2 text-red-400 font-semibold text-sm">
                  <X size={16} />
                  <span>The Dependency Death Cycle</span>
                </div>
                <p className="text-xs sm:text-[13px] text-[#a1a1aa] leading-relaxed">
                  When Expo releases SDK 52 or React Native updates to 0.76+, your library breaks because of internal NativeModule or Yoga bindings. You cannot upgrade your app until a third-party team patches their library.
                </p>
              </div>

              <div className="bg-[#0e0e13] border border-red-500/20 rounded-xl p-4.5 space-y-2">
                <div className="flex items-center gap-2 text-red-400 font-semibold text-sm">
                  <X size={16} />
                  <span>The Prop &amp; Style Cage</span>
                </div>
                <p className="text-xs sm:text-[13px] text-[#a1a1aa] leading-relaxed">
                  Your designer asks for a custom spring curve, a 3px border tweak, or a custom haptic pattern. Because the component is compiled in <code className="text-white font-mono text-[11px]">node_modules</code>, you spend 4 hours monkey-patching or wrapping props.
                </p>
              </div>

              <div className="bg-[#0e0e13] border border-red-500/20 rounded-xl p-4.5 space-y-2">
                <div className="flex items-center gap-2 text-red-400 font-semibold text-sm">
                  <X size={16} />
                  <span>Bundle &amp; Engine Bloat</span>
                </div>
                <p className="text-xs sm:text-[13px] text-[#a1a1aa] leading-relaxed">
                  You only needed an interactive calendar and a comparison chart, but you imported a 650KB package with 40 transitive dependencies, a custom CSS parser, and font loaders.
                </p>
              </div>

              <div className="bg-[#0e0e13] border border-red-500/20 rounded-xl p-4.5 space-y-2">
                <div className="flex items-center gap-2 text-red-400 font-semibold text-sm">
                  <X size={16} />
                  <span>Abandoned Upstream Projects</span>
                </div>
                <p className="text-xs sm:text-[13px] text-[#a1a1aa] leading-relaxed">
                  Open source mobile libraries have notoriously high abandonment rates. When the authors burn out, your entire production UI layer becomes legacy technical debt.
                </p>
              </div>
            </div>

            <p className="font-medium text-white">
              The shadcn revolution proved on the web that developers don&apos;t want closed dependencies for UI—they want code they can see, own, and adjust. RNBlocks brings that exact paradigm to React Native.
            </p>
          </section>

          {/* Section 3 */}
          <section id="zero-runtime" className="scroll-mt-24 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              3. Zero Runtime Providers &amp; Zero Context Tax
            </h2>
            <p>
              Look at the root layout of a typical React Native app using popular mobile UI kits:
            </p>

            <div className="bg-[#050508] border border-white/[0.08] rounded-xl overflow-hidden font-mono text-xs sm:text-[13px]">
              <div className="px-4 py-2 bg-white/[0.03] border-b border-white/[0.06] text-[#71717a] flex items-center justify-between">
                <span>App.tsx (Traditional Mobile UI Library)</span>
                <span className="text-red-400/80">⚠️ Provider Waterfall</span>
              </div>
              <pre className="p-4 text-[#a1a1aa] overflow-x-auto leading-relaxed">
{`export default function App() {
  return (
    <GluestackUIProvider config={customConfig}>
      <ThemeProvider theme={mobileTheme}>
        <PortalProvider>
          <OverlayProvider>
            <IconConfigProvider icons={icons}>
              <RootNavigator />
            </IconConfigProvider>
          </OverlayProvider>
        </PortalProvider>
      </ThemeProvider>
    </GluestackUIProvider>
  );
}`}
              </pre>
            </div>

            <p>
              Every single provider adds a layer to your React context tree. In React Native—where every frame counts and JS thread performance directly dictates whether an animation stutters—context updates and deep provider re-renders trigger subtle frame drops on budget Android devices.
            </p>

            <p className="font-semibold text-white">
              With RNBlocks, there is ZERO root provider:
            </p>

            <div className="bg-[#050508] border border-[#32c798]/30 rounded-xl overflow-hidden font-mono text-xs sm:text-[13px]">
              <div className="px-4 py-2 bg-[#32c798]/10 border-b border-[#32c798]/20 text-[#32c798] flex items-center justify-between">
                <span>App.tsx (With RNBlocks)</span>
                <span className="text-[#32c798] font-bold">✓ 0 Runtime Overhead</span>
              </div>
              <pre className="p-4 text-[#e4e4e7] overflow-x-auto leading-relaxed">
{`export default function App() {
  return <RootNavigator />;
}`}
              </pre>
            </div>

            <p>
              You simply import the component from your own directory and render it:
            </p>

            <div className="bg-[#050508] border border-white/[0.08] rounded-xl p-4 font-mono text-xs text-[#32c798]">
              <code>import &#123; FloatingDocker &#125; from &quot;@/components/rnblocks/floating-docker&quot;;</code>
            </div>

            <p>
              Every block is 100% self-sufficient. It uses React Native&apos;s standard <code className="bg-white/[0.08] px-1.5 py-0.5 rounded font-mono text-xs text-white">StyleSheet.create</code>, standard primitives, and optional typed props. No global runtime to configure, no theme provider to wrap.
            </p>
          </section>

          {/* Section 4 */}
          <section id="new-architecture" className="scroll-mt-24 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              4. Built for the New Architecture (React Native 0.76+ &amp; Expo SDK 52)
            </h2>
            <p>
              React Native just completed the largest architectural overhaul in its history:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[#a1a1aa]">
              <li>
                <strong className="text-white">Bridgeless Mode</strong> is now the default, eliminating the JSON bridge serialization bottlenecks.
              </li>
              <li>
                <strong className="text-white">TurboModules &amp; Fabric Renderer</strong> deliver synchronous native communication and multi-threaded layout calculation.
              </li>
              <li>
                <strong className="text-white">React 19 Baseline</strong> provides modern concurrent features across mobile runtimes.
              </li>
            </ul>
            <p>
              Many legacy libraries written 2 to 5 years ago are actively struggling with this migration because they relied on old native bridge patterns, custom C++ macros, or outdated Yoga layout hacks.
            </p>
            <p>
              RNBlocks was engineered <em>after</em> the New Architecture was stabilized. Every component is validated against <strong className="text-white">React Native 0.76+</strong> and <strong className="text-white">Expo SDK 52+</strong>. There are zero deprecated bridge calls. You get clean, modern TypeScript code ready for production in 2026 and beyond.
            </p>
          </section>

          {/* Section 5 */}
          <section id="mobile-vs-web" className="scroll-mt-24 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              5. Mobile Ergonomics vs. Lazy Web Ports
            </h2>
            <p>
              Some projects try to solve this by taking web shadcn/ui components and compiling them through <code className="bg-white/[0.08] px-1.5 py-0.5 rounded font-mono text-xs text-white">react-native-web</code>.
            </p>
            <p>
              While this sounds enticing on paper, <strong>mobile is fundamentally not the web</strong>:
            </p>

            <div className="space-y-3 my-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-start gap-3">
                <div className="w-6 h-6 rounded-md bg-[#32c798]/15 text-[#32c798] flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={14} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Touch Targets &amp; Thumb Ergonomics</h4>
                  <p className="text-xs text-[#a1a1aa] mt-0.5">
                    Web interfaces rely on mouse precision (16px buttons). Mobile requires calibrated touch targets of at least 44x44 points with active hit-slops to prevent missed taps.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-start gap-3">
                <div className="w-6 h-6 rounded-md bg-[#32c798]/15 text-[#32c798] flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={14} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Hardware-Accelerated Native Driver</h4>
                  <p className="text-xs text-[#a1a1aa] mt-0.5">
                    CSS transitions running through web shims drop frames on budget Android devices. RNBlocks uses React Native&apos;s native animation driver and spring physics for fluid 60 to 120 FPS execution.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-start gap-3">
                <div className="w-6 h-6 rounded-md bg-[#32c798]/15 text-[#32c798] flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={14} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Container-Relative Flex Layouts</h4>
                  <p className="text-xs text-[#a1a1aa] mt-0.5">
                    Web components often hardcode breakpoints or fixed pixel widths. RNBlocks components are strictly container-relative, flexing naturally across an iPhone SE (320px), an iPad, or a foldable screen.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section id="blocks-not-atoms" className="scroll-mt-24 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              6. High-Value &ldquo;Blocks&rdquo;, Not Just Micro &ldquo;Atoms&rdquo;
            </h2>
            <p>
              Almost every UI library gives you the easy things: a <code className="bg-white/[0.08] px-1 py-0.5 rounded font-mono text-xs text-white">&lt;Button&gt;</code>, a <code className="bg-white/[0.08] px-1 py-0.5 rounded font-mono text-xs text-white">&lt;Badge&gt;</code>, or an <code className="bg-white/[0.08] px-1 py-0.5 rounded font-mono text-xs text-white">&lt;Input&gt;</code>.
            </p>
            <p>
              Any senior engineer can write a clean button in 15 minutes.
            </p>
            <p>
              Where mobile engineers actually lose <strong>days and weeks</strong> of sprint capacity is on complex, animated, interactive UI patterns:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[#a1a1aa]">
              <li>
                <strong className="text-white">Interactive Charts</strong>: Donut and Pie charts with rolling-number odometer physics, scrubbable touch gestures, and exploded slice animations.
              </li>
              <li>
                <strong className="text-white">Interactive Calendars</strong>: Multi-day range selectors, smooth month transitions, and week schedulers.
              </li>
              <li>
                <strong className="text-white">Floating Dock Menus</strong>: iOS-style liquid spring magnification physics that run on the native driver.
              </li>
              <li>
                <strong className="text-white">Social Auth Bottom Sheets</strong>: Edge-to-edge modals with Google, Apple, and GitHub OAuth styling.
              </li>
            </ul>
            <p>
              RNBlocks focuses exclusively on <strong>production blocks</strong>. These are complete, high-fidelity UI blocks ready to paste into your app today.
            </p>
          </section>

          {/* Section 7: Comparison Table */}
          <section id="comparison-matrix" className="scroll-mt-24 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              7. The Side-by-Side Comparison Matrix
            </h2>
            <p>
              Here is how RNBlocks compares against the other options in the mobile ecosystem:
            </p>

            <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#07070a]">
              <table className="w-full text-left text-xs sm:text-[13px] border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-white/[0.03] text-[#a1a1aa] font-mono">
                    <th className="p-3.5 sm:p-4 font-semibold">Architectural Feature</th>
                    <th className="p-3.5 sm:p-4 font-bold text-[#32c798] bg-[#32c798]/10">RNBlocks</th>
                    <th className="p-3.5 sm:p-4 font-semibold">Monolithic Libraries (NativeBase / Paper)</th>
                    <th className="p-3.5 sm:p-4 font-semibold">Web Copy-Paste Ports</th>
                    <th className="p-3.5 sm:p-4 font-semibold">Paid UI Kits</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05] text-[#d4d4d8]">
                  <tr>
                    <td className="p-3.5 sm:p-4 font-medium text-white">Code Location</td>
                    <td className="p-3.5 sm:p-4 text-[#32c798] font-semibold bg-[#32c798]/5">Your repo (components/)</td>
                    <td className="p-3.5 sm:p-4 text-[#71717a]">node_modules (Locked)</td>
                    <td className="p-3.5 sm:p-4 text-[#a1a1aa]">Your repo</td>
                    <td className="p-3.5 sm:p-4 text-[#71717a]">Monolithic Zip / Clone</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 sm:p-4 font-medium text-white">Root ThemeProvider Required</td>
                    <td className="p-3.5 sm:p-4 text-[#32c798] font-bold bg-[#32c798]/5">None (0 Context)</td>
                    <td className="p-3.5 sm:p-4 text-red-400">Yes (Mandatory)</td>
                    <td className="p-3.5 sm:p-4 text-[#a1a1aa]">Often required</td>
                    <td className="p-3.5 sm:p-4 text-red-400">Yes (Custom config)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 sm:p-4 font-medium text-white">Runtime Dependencies</td>
                    <td className="p-3.5 sm:p-4 text-[#32c798] font-bold bg-[#32c798]/5">0 runtime baggage</td>
                    <td className="p-3.5 sm:p-4 text-red-400">10 to 40 packages</td>
                    <td className="p-3.5 sm:p-4 text-[#a1a1aa]">Variable</td>
                    <td className="p-3.5 sm:p-4 text-red-400">Heavy locked packages</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 sm:p-4 font-medium text-white">React Native 0.76+ &amp; Expo 52 Ready</td>
                    <td className="p-3.5 sm:p-4 text-[#32c798] font-bold bg-[#32c798]/5">100% Tested</td>
                    <td className="p-3.5 sm:p-4 text-yellow-400/80">Fragile / Migration delays</td>
                    <td className="p-3.5 sm:p-4 text-yellow-400/80">Partial web shims</td>
                    <td className="p-3.5 sm:p-4 text-red-400">Usually outdated</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 sm:p-4 font-medium text-white">Animation Performance</td>
                    <td className="p-3.5 sm:p-4 text-[#32c798] font-semibold bg-[#32c798]/5">Native driver / 60-120 FPS</td>
                    <td className="p-3.5 sm:p-4 text-[#a1a1aa]">JS thread or heavy engine</td>
                    <td className="p-3.5 sm:p-4 text-yellow-400/80">Web CSS shims</td>
                    <td className="p-3.5 sm:p-4 text-[#a1a1aa]">Basic transitions</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 sm:p-4 font-medium text-white">Customization Freedom</td>
                    <td className="p-3.5 sm:p-4 text-[#32c798] font-semibold bg-[#32c798]/5">Unlimited (Direct TS)</td>
                    <td className="p-3.5 sm:p-4 text-red-400">Theme token constrained</td>
                    <td className="p-3.5 sm:p-4 text-[#a1a1aa]">High</td>
                    <td className="p-3.5 sm:p-4 text-[#71717a]">Proprietary architecture</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 sm:p-4 font-medium text-white">Licensing &amp; Cost</td>
                    <td className="p-3.5 sm:p-4 text-[#32c798] font-bold bg-[#32c798]/5">100% MIT Open Source</td>
                    <td className="p-3.5 sm:p-4 text-[#a1a1aa]">Open source / Tiered upsells</td>
                    <td className="p-3.5 sm:p-4 text-[#a1a1aa]">Open source</td>
                    <td className="p-3.5 sm:p-4 text-red-400">$50 to $200+</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 sm:p-4 font-medium text-white">Installation Mechanism</td>
                    <td className="p-3.5 sm:p-4 text-[#32c798] font-semibold bg-[#32c798]/5">CLI or 1-Click Copy</td>
                    <td className="p-3.5 sm:p-4 text-[#a1a1aa]">npm / yarn install</td>
                    <td className="p-3.5 sm:p-4 text-[#a1a1aa]">Manual copy</td>
                    <td className="p-3.5 sm:p-4 text-[#71717a]">Forking entire starter repo</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 8: When to Use */}
          <section id="when-to-use" className="scroll-mt-24 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              8. When You Should (and Shouldn&apos;t) Use RNBlocks
            </h2>
            <p>
              We believe in engineering transparency. No tool is the right fit for every single scenario.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
              <div className="bg-[#0b100d] border border-[#32c798]/30 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-[#32c798] font-bold text-sm">
                  <Check size={16} />
                  <span>Use RNBlocks If:</span>
                </div>
                <ul className="text-xs sm:text-[13px] text-[#d4d4d8] space-y-2 leading-relaxed">
                  <li>• You want 100% code ownership in your repository.</li>
                  <li>• You want zero runtime baggage and zero global provider waterfalls.</li>
                  <li>• You need complex, interactive mobile components (charts, calendars, docks) right now.</li>
                  <li>• You are building on Expo SDK 52+ or React Native 0.76+ with the New Architecture.</li>
                  <li>• You want the freedom to tweak any animation, style, or physics property in 10 seconds.</li>
                </ul>
              </div>

              <div className="bg-[#120d0e] border border-white/10 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-[#a1a1aa] font-bold text-sm">
                  <X size={16} />
                  <span>Do NOT Use RNBlocks If:</span>
                </div>
                <ul className="text-xs sm:text-[13px] text-[#a1a1aa] space-y-2 leading-relaxed">
                  <li>• You want an opinionated, off-the-shelf Material Design or Cupertino clone.</li>
                  <li>• You prefer an installed npm package where you never see or touch the component files.</li>
                  <li>• You are maintaining an older React Native project stuck on legacy architecture (0.70 or below).</li>
                  <li>• You only need 20 variations of a basic button and no interactive blocks.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Conclusion & CTA */}
          <section className="pt-8 border-t border-white/[0.08] space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Get Started in 30 Seconds
            </h2>
            <p>
              You don&apos;t have to take our word for it. Try adding a single block to your Expo or React Native project right now:
            </p>

            {/* Terminal Command Box */}
            <div className="bg-[#07070a] border border-white/[0.12] rounded-xl p-4 flex items-center justify-between gap-4 font-mono text-xs sm:text-sm">
              <div className="flex items-center gap-2.5 text-[#e4e4e7] overflow-x-auto">
                <Terminal size={16} className="text-[#32c798] shrink-0" />
                <span>npx @rnblocks/cli add floating-docker</span>
              </div>
              <button
                onClick={copyCliCommand}
                className="shrink-0 p-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-[#a1a1aa] hover:text-white transition-all cursor-pointer"
                title="Copy command"
              >
                {copiedCli ? <Check size={14} className="text-[#32c798]" /> : <Copy size={14} />}
              </button>
            </div>

            <p className="text-sm text-[#a1a1aa]">
              The CLI will copy the standalone TypeScript block into your <code className="text-white font-mono text-xs">components/rnblocks/</code> folder and print the exact import path. No config files, no wrapper providers.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Link
                href="/blocks"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-white text-zinc-950 hover:bg-[#f4f4f5] transition-all shadow-[0_4px_16px_rgba(255,255,255,0.15)]"
              >
                <span>Browse All Registry Blocks</span>
                <ArrowRight size={15} />
              </Link>
              <a
                href="https://github.com/Ashwin-Khowala/rnblocks"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all"
              >
                <GitHubIcon size={15} />
                <span>View on GitHub</span>
              </a>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
