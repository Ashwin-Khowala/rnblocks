import React from "react";
import Link from "next/link";
import { Terminal, BookOpen, Layers, CheckCircle2, GitPullRequest, ShieldCheck, Palette, FileCode2 } from "lucide-react";

export default function DocsHomePage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
      {/* Sidebar Nav */}
      <aside className="lg:col-span-1 space-y-6">
        <div className="p-4 rounded-lg bg-[#111111] border border-white/10 space-y-3 sticky top-24">
          <div className="text-xs font-mono uppercase tracking-wider text-[#737373]">Navigation</div>
          <nav className="space-y-1 text-sm font-medium">
            <a href="#quickstart" className="block px-2.5 py-1.5 rounded text-white bg-white/5 border border-white/10">Quick Start</a>
            <a href="#cli" className="block px-2.5 py-1.5 rounded text-[#A3A3A3] hover:text-white transition-colors">CLI Reference</a>
            <a href="#philosophy" className="block px-2.5 py-1.5 rounded text-[#A3A3A3] hover:text-white transition-colors">Design Philosophy</a>
            <a href="#standards" className="block px-2.5 py-1.5 rounded text-[#A3A3A3] hover:text-white transition-colors">Quality Standards</a>
            <a href="#architecture" className="block px-2.5 py-1.5 rounded text-[#A3A3A3] hover:text-white transition-colors">Monorepo Architecture</a>
            <a href="#schema" className="block px-2.5 py-1.5 rounded text-[#A3A3A3] hover:text-white transition-colors">Registry Schema</a>
            <a href="#contributing" className="block px-2.5 py-1.5 rounded text-[#A3A3A3] hover:text-white transition-colors">Contributing via PR</a>
          </nav>
        </div>

        <div className="p-4 rounded-lg bg-[#111111] border border-white/10 space-y-2">
          <div className="text-xs font-semibold text-white">Current Version</div>
          <div className="text-xs font-mono text-[#A3A3A3]">v0.1.0 · Open Source</div>
          <p className="text-xs text-[#737373] mt-2">All blocks and screens are 100% free under the MIT license.</p>
        </div>
      </aside>

      {/* Main Documentation Body */}
      <main className="lg:col-span-3 space-y-12 max-w-3xl">
        {/* Intro */}
        <section id="introduction" className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#A3A3A3]">
            <span>RNBlocks Documentation</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            The React Native UI Registry
          </h1>
          <p className="text-base text-[#A3A3A3] leading-relaxed">
            Production-ready React Native &amp; Expo UI, delivered as source code you own. Every block is designed to be responsive, customizable, and easy to integrate without forcing a styling framework or runtime dependency.
          </p>
        </section>

        {/* Quickstart */}
        <section id="quickstart" className="space-y-4 pt-6 border-t border-white/10">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <Terminal size={22} className="text-emerald-400" />
            Quick Start
          </h2>
          <p className="text-sm text-[#A3A3A3]">
            Add any block directly into your project with no prerequisites:
          </p>
          <div className="p-4 rounded-lg bg-[#111111] border border-white/10 font-mono text-sm text-white flex items-center justify-between">
            <code>npx rnblocks add floating-docker</code>
          </div>
          <p className="text-xs text-[#737373]">
            This downloads the component source into <code className="text-[#A3A3A3]">./components/rnblocks/floating-docker.tsx</code> and prints any required npm packages.
          </p>
        </section>

        {/* CLI Reference */}
        <section id="cli" className="space-y-4 pt-6 border-t border-white/10">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <BookOpen size={22} className="text-white" />
            CLI Reference
          </h2>
          <p className="text-sm text-[#A3A3A3]">
            The <code className="text-white font-mono">rnblocks</code> CLI is powered by Node.js, Commander, and Zod:
          </p>

          <div className="space-y-4">
            <div className="p-5 rounded-lg bg-[#111111] border border-white/10 space-y-2">
              <div className="font-mono text-sm font-semibold text-white">rnblocks add &lt;block-name&gt;</div>
              <p className="text-xs text-[#A3A3A3]">Resolves, validates, and installs a block or screen from the registry.</p>
              <div className="text-xs font-mono text-[#737373] space-y-1 pt-1">
                <div>Options:</div>
                <div className="pl-4">-p, --path &lt;dir&gt; &nbsp;&nbsp; Custom target directory (default: components/rnblocks)</div>
                <div className="pl-4">-o, --overwrite &nbsp;&nbsp;&nbsp;&nbsp; Overwrite existing file if present</div>
                <div className="pl-4">-y, --yes &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Skip interactive prompts</div>
              </div>
            </div>

            <div className="p-5 rounded-lg bg-[#111111] border border-white/10 space-y-2">
              <div className="font-mono text-sm font-semibold text-white">rnblocks list</div>
              <p className="text-xs text-[#A3A3A3]">Lists all active blocks and screens available in the registry with their categories and authors.</p>
            </div>
          </div>
        </section>

        {/* Design Philosophy */}
        <section id="philosophy" className="space-y-4 pt-6 border-t border-white/10">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <Palette size={22} className="text-emerald-400" />
            Design Philosophy
          </h2>
          <p className="text-sm text-[#A3A3A3] leading-relaxed">
            RNBlocks follows a simple, defensible standard: <strong>copy → own → customize</strong>. We deliver standalone, source-owned components that are responsive to their container, easy to customize, and free from unnecessary dependencies or styling abstractions.
          </p>

          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-[#111111] border border-white/10 space-y-1.5">
              <div className="text-sm font-semibold text-white">1. Standard StyleSheet Baseline</div>
              <p className="text-xs text-[#A3A3A3] leading-relaxed">
                Standard React Native <code className="text-white font-mono">StyleSheet.create</code> is the universal baseline. No mandatory ThemeProvider contexts, no runtime CSS-in-JS wrappers, and 100% compatibility across Expo SDK and Bare React Native.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#111111] border border-white/10 space-y-1.5">
              <div className="text-sm font-semibold text-white">2. Semantic Color Constants</div>
              <p className="text-xs text-[#A3A3A3] leading-relaxed">
                Colors are grouped into top-level semantic constants (<code className="text-white font-mono">COLORS_DARK</code>, <code className="text-white font-mono">COLORS_LIGHT</code>) at the top of the component file, making brand customization immediate after installation.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#111111] border border-white/10 space-y-1.5">
              <div className="text-sm font-semibold text-white">3. Pragmatic Values vs Layout Assumptions</div>
              <p className="text-xs text-[#A3A3A3] leading-relaxed">
                Fixed design values such as font sizes, spacing, radii, and component dimensions (e.g. <code className="text-white font-mono">padding: 16</code>, <code className="text-white font-mono">borderRadius: 12</code>, <code className="text-white font-mono">height: 48</code>) are acceptable in standalone blocks. Contributors should avoid unnecessary abstraction and keep styling easy to customize. Unexplained layout assumptions (such as hardcoded viewport widths like <code className="text-white font-mono">width: 390</code>) are prohibited.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#111111] border border-white/10 space-y-1.5">
              <div className="text-sm font-semibold text-white">4. Optional Theme Prop</div>
              <p className="text-xs text-[#A3A3A3] leading-relaxed">
                Blocks supporting both dark and light modes expose an optional <code className="text-white font-mono">theme?: "dark" | "light"</code> prop (defaulting to <code className="text-white font-mono">"dark"</code>) and dynamically select the active color palette without requiring external contexts.
              </p>
            </div>
          </div>
        </section>

        {/* Quality Standards */}
        <section id="standards" className="space-y-4 pt-6 border-t border-white/10">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <ShieldCheck size={22} className="text-white" />
            Quality Standards Checklist
          </h2>
          <p className="text-sm text-[#A3A3A3]">
            Every block contributed to RNBlocks must satisfy our 6-part quality checklist:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg bg-[#111111] border border-white/10 space-y-1">
              <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-400" />
                Functionality
              </div>
              <p className="text-xs text-[#737373]">
                Works across iOS, Android, and Web in Expo and Bare RN. Strict TypeScript props with loading and disabled states handled.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#111111] border border-white/10 space-y-1">
              <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-400" />
                Layout &amp; Responsiveness
              </div>
              <p className="text-xs text-[#737373]">
                Fills parent container with <code className="text-[#A3A3A3]">width: "100%"</code> or flexbox. Tested across 320pt to 428pt viewports with zero fixed screen-width assumptions.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#111111] border border-white/10 space-y-1">
              <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-400" />
                Styling &amp; Theming
              </div>
              <p className="text-xs text-[#737373]">
                Standard StyleSheet.create baseline. Semantic COLORS constants at file top. Optional theme prop where applicable.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#111111] border border-white/10 space-y-1">
              <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-400" />
                Accessibility
              </div>
              <p className="text-xs text-[#737373]">
                Declared accessibilityRole and accessibilityLabel on touchables. Minimum 44x44pt touch targets and readable text contrast.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#111111] border border-white/10 space-y-1">
              <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-400" />
                Performance
              </div>
              <p className="text-xs text-[#737373]">
                No unnecessary re-renders or expensive operations per render pass. Native-driven animations via React Native Animated or Reanimated.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#111111] border border-white/10 space-y-1">
              <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-400" />
                Registry Manifest
              </div>
              <p className="text-xs text-[#737373]">
                Valid registry.json passing Zod validation, declaring supported themes, tested platforms, and verified dependencies.
              </p>
            </div>
          </div>
        </section>

        {/* Monorepo Architecture */}
        <section id="architecture" className="space-y-4 pt-6 border-t border-white/10">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <Layers size={22} className="text-white" />
            Monorepo Architecture
          </h2>
          <p className="text-sm text-[#A3A3A3]">
            Built with <strong>TypeScript + pnpm + Turborepo</strong> following one core principle:
          </p>
          <blockquote className="p-4 rounded-lg bg-[#181818] border-l-2 border-white text-sm text-white italic">
            "The registry is the source of truth. The website, CLI, and documentation all consume the same registry."
          </blockquote>

          <div className="p-4 rounded-lg bg-[#111111] border border-white/10 text-xs font-mono text-[#A3A3A3] space-y-1">
            <div>apps/web/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ Next.js gallery, live previews &amp; registry browser</div>
            <div>apps/docs/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ Next.js Documentation site</div>
            <div>packages/cli/ &nbsp;&nbsp;→ "rnblocks" CLI package</div>
            <div>packages/registry/ → Zod schemas, loader &amp; validation</div>
            <div>packages/ui/ &nbsp;&nbsp;&nbsp;→ Shared web UI primitives</div>
            <div>registry/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ Git database containing blocks &amp; screens</div>
          </div>
        </section>

        {/* Registry Schema */}
        <section id="schema" className="space-y-4 pt-6 border-t border-white/10">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <FileCode2 size={22} className="text-emerald-400" />
            Registry Schema
          </h2>
          <p className="text-sm text-[#A3A3A3]">
            Each block contains a <code className="text-white font-mono">registry.json</code> manifest validated by Zod before being published:
          </p>

          <div className="p-4 rounded-lg bg-[#111111] border border-white/10 text-xs font-mono text-[#A3A3A3] overflow-x-auto">
            <pre className="text-white">{`{
  "$schema": "https://rnblocks.dev/schema.json",
  "name": "example-block",
  "type": "block",
  "title": "Example Block",
  "description": "A responsive, customizable block.",
  "category": "navigation",
  "version": "1.0.0",
  "author": {
    "name": "Ashwin Khowala",
    "github": "Ashwin-Khowala"
  },
  "dependencies": {
    "lucide-react-native": "^0.475.0"
  },
  "devDependencies": {},
  "files": [
    {
      "path": "example-block.tsx",
      "type": "component",
      "target": "components/rnblocks/example-block.tsx"
    }
  ],
  "platforms": ["ios", "android", "web"],
  "themes": ["dark", "light"],
  "tags": ["navigation", "responsive"]
}`}</pre>
          </div>
        </section>

        {/* Contributing */}
        <section id="contributing" className="space-y-4 pt-6 border-t border-white/10">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <GitPullRequest size={22} className="text-emerald-400" />
            Contributing via GitHub PR
          </h2>
          <p className="text-sm text-[#A3A3A3]">
            To add a new component to RNBlocks, fork the repository and create:
          </p>
          <div className="p-4 rounded-lg bg-[#111111] border border-white/10 text-xs font-mono text-white space-y-1">
            <div>registry/blocks/&lt;your-block&gt;/</div>
            <div className="pl-4">├── registry.json</div>
            <div className="pl-4">└── files/&lt;your-block&gt;.tsx</div>
          </div>
          <p className="text-xs text-[#A3A3A3]">
            Run <code className="text-white font-mono bg-white/5 px-1.5 py-0.5 rounded">pnpm run validate:registry</code> locally to test against our Zod schema before opening a PR!
          </p>
        </section>
      </main>
    </div>
  );
}
