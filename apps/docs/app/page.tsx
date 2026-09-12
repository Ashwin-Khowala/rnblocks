import React from "react";
import Link from "next/link";
import { Terminal, BookOpen, Layers, CheckCircle2, Copy, GitPullRequest, ShieldCheck, ArrowRight } from "lucide-react";

export default function DocsHomePage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
      {/* Sidebar Nav */}
      <aside className="lg:col-span-1 space-y-6">
        <div className="p-4 rounded-lg bg-[#111111] border border-white/10 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-[#737373]">Navigation</div>
          <nav className="space-y-1 text-sm font-medium">
            <a href="#quickstart" className="block px-2.5 py-1.5 rounded text-white bg-white/5 border border-white/10">Quick Start</a>
            <a href="#cli" className="block px-2.5 py-1.5 rounded text-[#A3A3A3] hover:text-white transition-colors">CLI Reference</a>
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
            RNBlocks provides production-grade React Native components and full application screens. You can preview components live in the browser, copy clean source code, or download directly into your Expo or Bare React Native project with the official CLI.
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
            "The registry is the source of truth. The website, CLI, and eventually MCP all consume the same registry."
          </blockquote>

          <div className="p-4 rounded-lg bg-[#111111] border border-white/10 text-xs font-mono text-[#A3A3A3] space-y-1">
            <div>apps/web/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ Next.js App Router (gallery & live previews)</div>
            <div>apps/docs/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ Next.js Documentation site</div>
            <div>packages/cli/ &nbsp;&nbsp;→ "rnblocks" CLI package</div>
            <div>packages/registry/ → Zod schemas, loader & validation</div>
            <div>packages/ui/ &nbsp;&nbsp;&nbsp;→ Shared web UI primitives</div>
            <div>registry/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ The Git database containing blocks & screens</div>
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
