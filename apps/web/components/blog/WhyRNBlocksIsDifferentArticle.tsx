"use client";

import React from "react";
import Link from "next/link";
import { BackIcon, GitHubIcon, CopyButton } from "@/components";

export function WhyRNBlocksIsDifferentArticle() {
  return (
    <article className="max-w-[720px] w-full min-w-0 mx-auto text-zinc-300 font-sans leading-relaxed">
      {/* Back Link */}
      <div className="mb-6 sm:mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <BackIcon size={14} className="sm:w-[15px] sm:h-[15px]" />
          <span>Back to blog</span>
        </Link>
      </div>

      {/* Header */}
      <header className="mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-zinc-800">
        <div className="text-xs sm:text-sm font-mono text-zinc-500 mb-2 sm:mb-3">
          October 7, 2026 · 6 min read
        </div>

        <h1 className="text-[25px] sm:text-3xl md:text-4xl font-extrabold sm:font-bold text-white tracking-tight leading-[1.25] mb-2.5 sm:mb-4">
          RNBlocks Isn&apos;t a UI Library. It&apos;s a UI Source Registry.
        </h1>

        <p className="text-[13.5px] sm:text-[16px] md:text-lg text-zinc-400 leading-relaxed mb-5 sm:mb-6">
          Why traditional component libraries struggle in React Native, the hidden friction of global runtime providers, and how direct source ownership changes mobile development.
        </p>

        <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-400">
          <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-semibold text-xs text-white shrink-0">
            AK
          </div>
          <div>
            <span className="font-medium text-white">Ashwin Khowala</span>
            <span className="text-zinc-500"> · Creator of RNBlocks</span>
          </div>
        </div>
      </header>

      {/* Body Content */}
      <div className="space-y-6 sm:space-y-8 text-[15px] sm:text-[17px] leading-[1.75] sm:leading-[1.8] text-zinc-300">
        {/* Intro */}
        <p>
          Whenever developers first discover RNBlocks, their default instinct is to compare it to tools they already know:
        </p>

        <blockquote className="border-l-2 border-zinc-700 pl-3.5 sm:pl-4 py-1 italic text-zinc-400 text-sm sm:text-base my-5 sm:my-6">
          &ldquo;Is this like NativeBase? Tamagui? React Native Paper? Or is it just another paid template pack?&rdquo;
        </blockquote>

        <p>
          The answer is none of the above. Comparing RNBlocks to a traditional UI library misunderstands where the code lives and how it is consumed.
        </p>

        <p>
          A traditional UI library sells you an <em>abstraction layer</em> packaged inside <code className="text-xs font-mono bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded text-zinc-200 break-words">node_modules</code>. RNBlocks is an open-source <strong>Component Registry</strong> that distributes production-oriented source code directly into your repository.
        </p>

        <p className="text-white font-medium">
          A dependency gives you an API. A source registry gives you an implementation.
        </p>

        {/* Visual Architecture Diagram */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3.5 sm:p-5 font-mono text-[11px] sm:text-xs md:text-[13px] text-zinc-300 overflow-x-auto leading-relaxed my-5 sm:my-6 w-full">
          <div className="text-zinc-500 uppercase tracking-wider text-[10px] sm:text-[11px] mb-2 sm:mb-3 font-semibold">
            Architecture: Where Abstractions Live
          </div>
          <pre className="text-zinc-300 whitespace-pre">
{`TRADITIONAL UI LIBRARY
Your App
  └── node_modules
        └── UI Framework
              ├── Theme System
              ├── Global Providers
              ├── Hidden Dependencies
              └── Internal Abstractions

RNBLOCKS SOURCE REGISTRY
Registry Manifest (GitHub)
  └── CLI (npx @rnblocks/cli add <block>)
        ▼
Your Repository
  └── components/rnblocks/
        ├── block.tsx
        ├── block.types.ts
        └── block.utils.ts
        ▼
Your App (You own the source code)`}
          </pre>
        </div>

        {/* Section 1 */}
        <h2 className="text-xl sm:text-2xl font-bold text-white pt-6 border-t border-zinc-800 tracking-tight">
          1. What Happens When You Add a Block?
        </h2>

        <p>
          When you install a component with the RNBlocks CLI, the flow is transparent and concrete:
        </p>

        <ol className="list-decimal pl-5 space-y-2 text-zinc-400">
          <li>
            <strong className="text-zinc-200">Metadata resolution</strong>: The CLI resolves the block&apos;s manifest and validated Zod schema from the open registry.
          </li>
          <li>
            <strong className="text-zinc-200">Source download</strong>: It fetches the unbundled, readable TypeScript files.
          </li>
          <li>
            <strong className="text-zinc-200">File placement</strong>: It writes the files directly into your project&apos;s <code className="text-xs font-mono bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded text-zinc-200 break-words">components/rnblocks/</code> folder.
          </li>
          <li>
            <strong className="text-zinc-200">Explicit dependencies</strong>: If a block requires a peer package (such as <code className="text-xs font-mono bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded text-zinc-200 break-words">react-native-svg</code> for charting), the CLI explicitly prompts you to install it.
          </li>
          <li>
            <strong className="text-zinc-200">Source ownership</strong>: The code is now yours. There is no upstream lock-in.
          </li>
        </ol>

        <p>
          For example, running <code className="text-xs font-mono bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded text-zinc-200 break-words">npx @rnblocks/cli add pie-chart</code> produces a clean, self-contained file structure in your repo:
        </p>

        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 sm:p-4 font-mono text-[11px] sm:text-xs md:text-[13px] text-zinc-300 overflow-x-auto my-4 w-full">
          <pre className="whitespace-pre">
{`components/
└── rnblocks/
    └── pie-chart/
        ├── pie-chart.tsx                // Main interactive component
        ├── pie-chart.types.ts           // Strict TypeScript definitions
        ├── pie-chart.utils.ts           // Math & geometry calculation
        └── pie-chart.rolling-number.tsx // Odometer number transition`}
          </pre>
        </div>

        {/* Section 2 */}
        <h2 className="text-xl sm:text-2xl font-bold text-white pt-6 border-t border-zinc-800 tracking-tight">
          2. Why Source Ownership Matters
        </h2>

        <p>
          When you consume a UI library as a black-box dependency, you are bound to its constraints:
        </p>

        <ul className="list-disc pl-5 space-y-2 text-zinc-400">
          <li>
            <strong className="text-zinc-200">Need a different animation curve?</strong> You edit the spring physics directly in your file, rather than fighting an opinionated theme prop.
          </li>
          <li>
            <strong className="text-zinc-200">Need custom styling or tokens?</strong> Swap out colors or convert standard <code className="text-xs font-mono bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded text-zinc-200 break-words">StyleSheet</code> properties to NativeWind classes in 30 seconds.
          </li>
          <li>
            <strong className="text-zinc-200">Need custom analytics or accessibility tags?</strong> Add your tracking hooks directly into the component.
          </li>
          <li>
            <strong className="text-zinc-200">Encounter a bug or edge-case?</strong> Fix it immediately in your codebase. You never have to submit an upstream issue and wait weeks for a maintainer to publish a patch.
          </li>
        </ul>

        {/* Section 3 */}
        <h2 className="text-xl sm:text-2xl font-bold text-white pt-6 border-t border-zinc-800 tracking-tight">
          3. No Global RNBlocks Runtime
        </h2>

        <p>
          Some UI frameworks require application-level providers, theme context, portal infrastructure, or global configuration that your project otherwise wouldn&apos;t need.
        </p>

        <p>
          For example, NativeBase requires a root <code className="text-xs font-mono bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded text-zinc-200 break-words">&lt;NativeBaseProvider&gt;</code> to make theme context available across the application:
        </p>

        {/* Traditional Provider code with syntax colors */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden my-4 w-full">
          <div className="px-3.5 sm:px-4 py-2 border-b border-zinc-800 text-[11px] sm:text-xs font-mono text-zinc-500 bg-zinc-900/50">
            App.tsx (Framework with Global Provider)
          </div>
          <pre className="p-3.5 sm:p-4 font-mono text-[11px] sm:text-xs md:text-[13px] overflow-x-auto leading-relaxed whitespace-pre">
            <span className="text-purple-400">import</span> React <span className="text-purple-400">from</span> <span className="text-emerald-300">&quot;react&quot;</span>;<br />
            <span className="text-purple-400">import</span> &#123; <span className="text-cyan-400">NativeBaseProvider</span> &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">&quot;native-base&quot;</span>;<br />
            <span className="text-purple-400">import</span> &#123; <span className="text-cyan-400">RootNavigator</span> &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">&quot;./navigation&quot;</span>;<br /><br />
            <span className="text-purple-400">export default function</span> <span className="text-yellow-200">App</span>() &#123;<br />
            &nbsp;&nbsp;<span className="text-purple-400">return</span> (<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-cyan-400">NativeBaseProvider</span>&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-cyan-400">RootNavigator</span> /&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-cyan-400">NativeBaseProvider</span>&gt;<br />
            &nbsp;&nbsp;);<br />
            &#125;
          </pre>
        </div>

        <p>
          With RNBlocks, there is <strong>no mandatory global runtime or root provider</strong>:
        </p>

        {/* RNBlocks code with syntax colors */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden my-4 w-full">
          <div className="px-3.5 sm:px-4 py-2 border-b border-zinc-800 text-[11px] sm:text-xs font-mono text-zinc-400 bg-zinc-900/50">
            App.tsx (With RNBlocks)
          </div>
          <pre className="p-3.5 sm:p-4 font-mono text-[11px] sm:text-xs md:text-[13px] overflow-x-auto leading-relaxed whitespace-pre">
            <span className="text-purple-400">import</span> React <span className="text-purple-400">from</span> <span className="text-emerald-300">&quot;react&quot;</span>;<br />
            <span className="text-purple-400">import</span> &#123; <span className="text-cyan-400">RootNavigator</span> &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">&quot;./navigation&quot;</span>;<br /><br />
            <span className="text-purple-400">export default function</span> <span className="text-yellow-200">App</span>() &#123;<br />
            &nbsp;&nbsp;<span className="text-purple-400">return</span> &lt;<span className="text-cyan-400">RootNavigator</span> /&gt;; <span className="text-zinc-500">// Zero global wrappers</span><br />
            &#125;
          </pre>
        </div>

        <p>
          You simply import the block from your project folder:
        </p>

        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 sm:p-3.5 font-mono text-xs sm:text-[13px] text-zinc-200 overflow-x-auto w-full">
          <span className="text-purple-400">import</span> &#123; <span className="text-cyan-400">FloatingDocker</span> &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">&quot;@/components/rnblocks/floating-docker&quot;</span>;
        </div>

        <p>
          Blocks are self-contained. They utilize core React Native primitives (<code className="text-xs font-mono bg-zinc-900 border border-zinc-800 px-1 py-0.5 rounded text-zinc-300 break-words">View</code>, <code className="text-xs font-mono bg-zinc-900 border border-zinc-800 px-1 py-0.5 rounded text-zinc-300 break-words">Text</code>, <code className="text-xs font-mono bg-zinc-900 border border-zinc-800 px-1 py-0.5 rounded text-zinc-300 break-words">Pressable</code>) and standard <code className="text-xs font-mono bg-zinc-900 border border-zinc-800 px-1 py-0.5 rounded text-zinc-300 break-words">StyleSheet.create</code>, with explicit per-block dependencies when required.
        </p>

        {/* Section 4 */}
        <h2 className="text-xl sm:text-2xl font-bold text-white pt-6 border-t border-zinc-800 tracking-tight">
          4. Built for React Native, Not Adapted from the Web
        </h2>

        <p>
          Some projects attempt to make web UI libraries cross-platform by compiling them through <code className="text-xs font-mono bg-zinc-900 border border-zinc-800 px-1 py-0.5 rounded text-zinc-300 break-words">react-native-web</code>.
        </p>

        <p>
          While web compilation is valuable for previews, mobile interfaces require fundamentally different ergonomics:
        </p>

        <div className="space-y-3 sm:space-y-4 my-4">
          <div className="border border-zinc-800 rounded-lg p-3.5 sm:p-4 bg-zinc-950">
            <h3 className="font-semibold text-white text-sm sm:text-base mb-1">Touch Targets &amp; Thumb Ergonomics</h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-normal">
              Mobile components require hit targets of at least 44x44 points and active hit-slops to prevent missed taps during one-handed use.
            </p>
          </div>

          <div className="border border-zinc-800 rounded-lg p-3.5 sm:p-4 bg-zinc-950">
            <h3 className="font-semibold text-white text-sm sm:text-base mb-1">Native Animation Capabilities</h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-normal">
              RNBlocks favors React Native-native interaction and animation primitives rather than assuming browser CSS behavior. Animations that can run independently of the JavaScript thread are implemented using React Native&apos;s native animation driver.
            </p>
          </div>

          <div className="border border-zinc-800 rounded-lg p-3.5 sm:p-4 bg-zinc-950">
            <h3 className="font-semibold text-white text-sm sm:text-base mb-1">Container-Relative Layouts</h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-normal">
              Blocks size themselves relative to their parent container rather than assuming a particular hardcoded device width, flexing naturally across different screen sizes.
            </p>
          </div>
        </div>

        {/* Section 5 */}
        <h2 className="text-xl sm:text-2xl font-bold text-white pt-6 border-t border-zinc-800 tracking-tight">
          5. Production Blocks, Not Just Primitives
        </h2>

        <p>
          Most UI libraries focus on primitive elements: a button, a badge, an input field.
        </p>

        <p>
          Where engineering teams actually spend days of sprint capacity is on complex, animated, interactive patterns:
        </p>

        <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
          <li><strong>Interactive Charts</strong>: Donut and Pie charts with rolling-number odometer physics and scrub gestures.</li>
          <li><strong>Interactive Calendars</strong>: Multi-day range selectors and smooth month transitions.</li>
          <li><strong>Floating Dock Menus</strong>: Liquid spring magnification physics running on the native driver.</li>
          <li><strong>Social Auth Sheets</strong>: Complete sign-in bottom sheets with OAuth provider layouts.</li>
        </ul>

        <p>
          RNBlocks focuses specifically on high-value, production-oriented blocks that you can drop straight into your app.
        </p>

        {/* Section 6: Comparison Table */}
        <h2 className="text-xl sm:text-2xl font-bold text-white pt-6 border-t border-zinc-800 tracking-tight">
          6. Architecture Comparison
        </h2>

        <div className="my-6 w-full">
          <div className="text-[11px] text-zinc-500 font-mono sm:hidden mb-2 flex items-center justify-between">
            <span>Architecture Matrix</span>
            <span>Scroll horizontally →</span>
          </div>
          <div className="overflow-x-auto border border-zinc-800 rounded-lg w-full">
            <table className="w-full min-w-[560px] text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/60 text-zinc-400 font-mono text-[11px] sm:text-xs">
                  <th className="p-2.5 sm:p-3 font-medium">Dimension</th>
                  <th className="p-2.5 sm:p-3 font-semibold text-white">RNBlocks</th>
                  <th className="p-2.5 sm:p-3 font-normal text-zinc-400">Installed UI Framework</th>
                  <th className="p-2.5 sm:p-3 font-normal text-zinc-400">Web-Oriented Port</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80 text-zinc-300 text-xs sm:text-sm">
                <tr>
                  <td className="p-2.5 sm:p-3 font-medium text-white">Distribution</td>
                  <td className="p-2.5 sm:p-3 text-white">Source copied into your repo</td>
                  <td className="p-2.5 sm:p-3 text-zinc-400">Package dependency in node_modules</td>
                  <td className="p-2.5 sm:p-3 text-zinc-400">Source or package varies</td>
                </tr>
                <tr>
                  <td className="p-2.5 sm:p-3 font-medium text-white">Source Ownership</td>
                  <td className="p-2.5 sm:p-3 text-white">You own the source code</td>
                  <td className="p-2.5 sm:p-3 text-zinc-400">Framework-owned implementation</td>
                  <td className="p-2.5 sm:p-3 text-zinc-400">Depends on library</td>
                </tr>
                <tr>
                  <td className="p-2.5 sm:p-3 font-medium text-white">Global Provider</td>
                  <td className="p-2.5 sm:p-3 text-white">Not required</td>
                  <td className="p-2.5 sm:p-3 text-zinc-400">Depends on library (e.g. NativeBaseProvider)</td>
                  <td className="p-2.5 sm:p-3 text-zinc-400">Depends on setup</td>
                </tr>
                <tr>
                  <td className="p-2.5 sm:p-3 font-medium text-white">Styling Model</td>
                  <td className="p-2.5 sm:p-3 text-white">Direct source (StyleSheet / NativeWind)</td>
                  <td className="p-2.5 sm:p-3 text-zinc-400">Framework API / theme tokens</td>
                  <td className="p-2.5 sm:p-3 text-zinc-400">Framework-dependent</td>
                </tr>
                <tr>
                  <td className="p-2.5 sm:p-3 font-medium text-white">Dependencies</td>
                  <td className="p-2.5 sm:p-3 text-white">Explicit per block</td>
                  <td className="p-2.5 sm:p-3 text-zinc-400">Framework dependency graph</td>
                  <td className="p-2.5 sm:p-3 text-zinc-400">Varies</td>
                </tr>
                <tr>
                  <td className="p-2.5 sm:p-3 font-medium text-white">Upgrade Model</td>
                  <td className="p-2.5 sm:p-3 text-white">You control copied code</td>
                  <td className="p-2.5 sm:p-3 text-zinc-400">Follow package releases</td>
                  <td className="p-2.5 sm:p-3 text-zinc-400">Varies</td>
                </tr>
                <tr>
                  <td className="p-2.5 sm:p-3 font-medium text-white">React Native Primitives</td>
                  <td className="p-2.5 sm:p-3 text-white">Yes (View, Text, Animated)</td>
                  <td className="p-2.5 sm:p-3 text-zinc-400">Depends on architecture</td>
                  <td className="p-2.5 sm:p-3 text-zinc-400">Often web abstraction layer</td>
                </tr>
                <tr>
                  <td className="p-2.5 sm:p-3 font-medium text-white">Complex Blocks</td>
                  <td className="p-2.5 sm:p-3 text-white">Yes (Charts, Docks, Calendars)</td>
                  <td className="p-2.5 sm:p-3 text-zinc-400">Varies (often primitives only)</td>
                  <td className="p-2.5 sm:p-3 text-zinc-400">Often web-first</td>
                </tr>
                <tr>
                  <td className="p-2.5 sm:p-3 font-medium text-white">CLI Installation</td>
                  <td className="p-2.5 sm:p-3 text-white">Yes (@rnblocks/cli)</td>
                  <td className="p-2.5 sm:p-3 text-zinc-400">Package manager (npm / yarn)</td>
                  <td className="p-2.5 sm:p-3 text-zinc-400">Varies</td>
                </tr>
                <tr>
                  <td className="p-2.5 sm:p-3 font-medium text-white">Registry Architecture</td>
                  <td className="p-2.5 sm:p-3 text-white">Open schema-validated registry</td>
                  <td className="p-2.5 sm:p-3 text-zinc-400">Single library package</td>
                  <td className="p-2.5 sm:p-3 text-zinc-400">Varies</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 7 */}
        <h2 className="text-xl sm:text-2xl font-bold text-white pt-6 border-t border-zinc-800 tracking-tight">
          7. Is RNBlocks Just &ldquo;shadcn for React Native&rdquo;?
        </h2>

        <p>
          It is natural to draw that comparison, and we embrace it directly.
        </p>

        <p>
          The copy-paste source ownership philosophy was popularized on the web by shadcn/ui. We share that exact foundational philosophy:
        </p>

        <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
          <li>Source ownership over black-box npm packages.</li>
          <li>Copying code into your project so you can modify it freely.</li>
          <li>No hidden runtime framework.</li>
        </ul>

        <p>
          Where RNBlocks specializes is in the reality of the <strong>mobile ecosystem</strong>:
        </p>

        <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
          <li><strong>Mobile-first patterns</strong>: Native gesture arbitration, spring physics, and thumb ergonomics.</li>
          <li><strong>Higher-level blocks</strong>: Focusing on complex UI blocks (charts, calendars, docks) rather than only low-level micro-primitives.</li>
          <li><strong>An open, multi-author registry</strong>: Enabling community developers to submit and validate blocks via GitHub.</li>
        </ul>

        {/* Section 8 */}
        <h2 className="text-xl sm:text-2xl font-bold text-white pt-6 border-t border-zinc-800 tracking-tight">
          8. An Open Registry, Not a Vendor Silo
        </h2>

        <p>
          Traditional UI kits are maintained by a single company or author. When priorities change, the library stagnates.
        </p>

        <p>
          RNBlocks is designed as community-owned infrastructure:
        </p>

        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3.5 sm:p-4 font-mono text-[11px] sm:text-xs text-zinc-300 my-4 overflow-x-auto w-full">
          <pre className="whitespace-pre">
{`Developer creates block
  └── Submits GitHub PR (registry/blocks/<name>)
        ▼
Automated Schema & Dependency Validation
  └── Platform compatibility check
        ▼
Merged into registry manifest
  └── Immediately installable by any developer via CLI`}
          </pre>
        </div>

        <p>
          Anyone can author, validate, and publish a block to the registry. The registry belongs to the React Native ecosystem.
        </p>

        {/* Section 9 */}
        <h2 className="text-xl sm:text-2xl font-bold text-white pt-6 border-t border-zinc-800 tracking-tight">
          9. When to Use (and When Not to Use) RNBlocks
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 my-4">
          <div className="border border-zinc-800 rounded-lg p-4 sm:p-5 bg-zinc-950">
            <h3 className="font-semibold text-white text-base mb-2">Use RNBlocks If:</h3>
            <ul className="text-xs sm:text-sm text-zinc-400 space-y-1.5">
              <li>• You want complete source ownership in your repository.</li>
              <li>• You want zero runtime bloat and zero global providers.</li>
              <li>• You need complex, interactive mobile blocks today.</li>
              <li>• You want the freedom to edit any animation, layout, or style directly.</li>
            </ul>
          </div>

          <div className="border border-zinc-800 rounded-lg p-4 sm:p-5 bg-zinc-950">
            <h3 className="font-semibold text-white text-base mb-2">Do Not Use RNBlocks If:</h3>
            <ul className="text-xs sm:text-sm text-zinc-400 space-y-1.5">
              <li>• You want an opinionated, off-the-shelf Material Design or Cupertino clone.</li>
              <li>• You prefer an installed npm package where you never see or touch component code.</li>
              <li>• You only need a basic button and do not need complex blocks.</li>
            </ul>
          </div>
        </div>

        {/* Getting Started */}
        <div className="pt-6 sm:pt-8 border-t border-zinc-800 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Try It in Your App
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base">
            Add a component to your React Native or Expo project with one command:
          </p>

          <div className="flex items-center justify-between bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 sm:p-3 font-mono text-xs sm:text-sm gap-2">
            <span className="text-zinc-200 truncate min-w-0 pl-1">
              <span className="text-zinc-500">$ </span>
              <span className="text-emerald-400">npx</span> @rnblocks/cli add floating-docker
            </span>
            <CopyButton text="npx @rnblocks/cli add floating-docker" label="Copy" />
          </div>

          <p className="text-xs sm:text-sm text-zinc-500">
            The CLI writes clean TypeScript files directly to <code className="text-xs font-mono bg-zinc-900 border border-zinc-800 px-1 py-0.5 rounded text-zinc-300 break-words">components/rnblocks/</code> in your repo.
          </p>

          <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4">
            <Link
              href="/blocks"
              className="px-4 py-2.5 bg-white !text-black font-semibold text-sm rounded-md hover:bg-zinc-200 transition-colors text-center inline-flex items-center justify-center"
              style={{ color: "#000000" }}
            >
              Browse All Blocks
            </Link>
            <a
              href="https://github.com/Ashwin-Khowala/rnblocks"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-zinc-900 !text-white border border-zinc-800 font-medium text-sm rounded-md hover:bg-zinc-800 transition-colors text-center inline-flex items-center justify-center gap-2"
              style={{ color: "#ffffff" }}
            >
              <GitHubIcon size={15} />
              <span>GitHub Repository</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
