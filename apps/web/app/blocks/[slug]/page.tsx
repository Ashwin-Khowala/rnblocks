"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BLOCKS_DATA } from "@/data/blocks";
import { BLOCK_DOCS } from "@/data/block-docs";
import { LiveBlockPreview } from "@/components/LiveBlockPreview";
import { CodeViewer } from "@/components/CodeViewer";
import { CopyButton } from "@/components/CopyButton";
import { BackIcon } from "@/components/icons/BackIcon";
import {
  CheckCircle2,
  Terminal,
  FileCode,
  Package,
  ExternalLink,
  Code2,
  Smartphone,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function BlockDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const block = BLOCKS_DATA.find((b) => b.slug === slug);
  const blockDoc = BLOCK_DOCS[slug];

  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  if (!block) {
    return (
      <div className="min-h-screen bg-[#030305] text-[#ededed] pt-24 pb-20 flex items-center justify-center">
        <div className="container-main flex flex-col items-center justify-center text-center gap-4 py-20">
          <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#ef4444] mb-2">
            <AlertCircle size={28} />
          </div>
          <h2 className="text-2xl font-bold text-white">Block Not Found</h2>
          <p className="text-[#9ca3af] text-sm max-w-md">
            The requested block &ldquo;{slug}&rdquo; does not exist in the registry.
          </p>
          <Link href="/blocks" className="btn-primary inline-flex items-center gap-2 mt-2">
            <BackIcon size={16} />
            <span>Back to Blocks</span>
          </Link>
        </div>
      </div>
    );
  }

  const stylingLabel = Array.isArray(block.styling) ? block.styling.join(", ") : block.styling;

  const defaultUsageSnippet = `import ${block.title.replace(/\s+/g, "")} from "@/components/${block.slug}";

export default function Screen() {
  return (
    <${block.title.replace(/\s+/g, "")}
      theme="dark"
    />
  );
}`;

  const usageSnippet = blockDoc?.usageCode || defaultUsageSnippet;

  return (
    <div className="min-h-screen bg-[#030305] text-[#ededed] pt-24 md:pt-28 pb-24 flex-1">
      <div className="container-main">
        {/* Breadcrumbs Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#71717a] mb-6">
          <Link
            href="/blocks"
            className="inline-flex items-center gap-1.5 text-[#9ca3af] hover:text-white transition-colors"
          >
            <BackIcon size={14} />
            <span>Blocks</span>
          </Link>
          <span>/</span>
          <span className="text-[#71717a] capitalize">{block.category}</span>
          <span>/</span>
          <span className="text-[#32c798] truncate max-w-[200px] sm:max-w-none font-medium">
            {block.title}
          </span>
        </div>

        {/* Hero Header Section */}
        <div className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-8 border-b border-white/[0.08]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="font-mono text-[11px] font-bold text-[#32c798] bg-[#32c798]/10 border border-[#32c798]/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {block.category}
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#9ca3af] bg-white/[0.03] border border-white/[0.08] px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#32c798]" />
                <span>v{block.version || "1.0.0"}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
              {block.title}
            </h1>

            <p className="text-sm sm:text-base text-[#9ca3af] leading-relaxed mb-4">
              {block.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#71717a]">
              <div className="flex items-center gap-1.5">
                <span>By</span>
                <span className="text-white font-medium">{block.author}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[#32c798]">Platforms:</span>
                <span className="text-[#d1d5db]">iOS, Android, Web</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[#32c798]">Styling:</span>
                <span className="text-[#d1d5db]">{stylingLabel}</span>
              </div>
            </div>
          </div>

          {/* Quick Install Bar */}
          <div className="flex flex-col gap-2.5 shrink-0 self-start lg:self-end w-full sm:w-auto">
            <div className="flex items-center justify-between gap-3 bg-[#08080c] border border-white/[0.12] rounded-xl px-4 py-2.5 shadow-lg">
              <div className="flex items-center gap-2 font-mono text-xs text-[#e4e4e7] select-all">
                <span className="text-[#32c798] font-bold">$</span>
                <span>npx @rnblocks/cli add {block.slug}</span>
              </div>
              <CopyButton text={`npx @rnblocks/cli add ${block.slug}`} label="Copy" />
            </div>
            <div className="flex items-center justify-end gap-2 text-[11px] font-mono text-[#71717a]">
              <span>Universal Expo & Bare RN</span>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
          {/* Left Column: Preview / Code & Inline Usage & Props */}
          <div className="w-full min-w-0 space-y-8">
            {/* View Switcher Controls */}
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-1.5 bg-white/[0.03] border border-white/[0.08] p-1 rounded-xl">
                  <button
                    onClick={() => setActiveTab("preview")}
                    className={cn(
                      "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer",
                      activeTab === "preview"
                        ? "bg-white/[0.1] text-white font-semibold shadow-sm"
                        : "text-[#71717a] hover:text-white"
                    )}
                  >
                    <Smartphone size={14} />
                    <span>Live Preview</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("code")}
                    className={cn(
                      "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer",
                      activeTab === "code"
                        ? "bg-white/[0.1] text-white font-semibold shadow-sm"
                        : "text-[#71717a] hover:text-white"
                    )}
                  >
                    <Code2 size={14} />
                    <span>Source Code</span>
                  </button>
                </div>

                <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#71717a]">
                  <FileCode size={13} className="text-[#32c798]" />
                  <span>
                    {block.codeFiles && block.codeFiles.length > 1
                      ? `components/${block.slug}/ (${block.codeFiles.length} files)`
                      : `components/${block.slug}.tsx`}
                  </span>
                </div>
              </div>

              {/* Main Canvas View */}
              <div>
                {activeTab === "preview" ? (
                  <LiveBlockPreview
                    Component={block.Component}
                    title={block.title}
                    type={block.type}
                  />
                ) : (
                  <CodeViewer
                    code={block.code}
                    files={block.codeFiles}
                    filename={`components/${block.slug}.tsx`}
                    language="tsx"
                  />
                )}
              </div>
            </div>

            {/* Inline Quick Usage Card (Displayed right beneath the preview for instant copy-pasting) */}
            <div className="bg-[#07070a] border border-white/10 rounded-2xl p-6 md:p-8">
              <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#32c798]/10 border border-[#32c798]/30 flex items-center justify-center text-[#32c798]">
                    <Terminal size={16} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white leading-none">Quick Usage</h3>
                    <p className="text-xs text-[#9ca3af] mt-1">
                      Copy and paste this drop-in example into your screen or view:
                    </p>
                  </div>
                </div>
                <CopyButton text={usageSnippet} label="Copy Example" />
              </div>

              <CodeViewer
                code={usageSnippet}
                filename={`screens/${block.slug}-example.tsx`}
                language="tsx"
              />
            </div>

            {/* Component Props & API Table */}
            {blockDoc?.props && blockDoc.props.length > 0 && (
              <div className="bg-[#07070a] border border-white/10 rounded-2xl p-6 md:p-8">
                <div className="flex items-center justify-between gap-4 mb-3 pb-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                      <Layers size={16} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white leading-none">
                        Component Props & API
                      </h3>
                      <p className="text-xs text-[#9ca3af] mt-1">
                        Configurable props accepted by <code>{block.title.replace(/\s+/g, "")}</code>
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#71717a] bg-white/[0.04] px-2.5 py-1 rounded-md border border-white/[0.06]">
                    {blockDoc.props.length} props
                  </span>
                </div>

                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-white/[0.08] text-[#71717a] font-mono uppercase text-[10px] tracking-wider">
                        <th className="pb-3 pr-4">Prop</th>
                        <th className="pb-3 pr-4">Type</th>
                        <th className="pb-3 pr-4">Default</th>
                        <th className="pb-3">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                      {blockDoc.props.map((p, idx) => (
                        <tr key={idx} className="group hover:bg-white/[0.02] transition-colors">
                          <td className="py-3 pr-4 font-mono text-[#32c798] font-semibold whitespace-nowrap align-top">
                            {p.name}
                            {p.required && (
                              <span className="ml-1 text-[10px] text-[#ef4444] font-bold" title="Required prop">
                                *
                              </span>
                            )}
                          </td>
                          <td className="py-3 pr-4 font-mono text-[#93c5fd] text-[11px] align-top">
                            <span className="bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.5 rounded text-[#93c5fd]">
                              {p.type}
                            </span>
                          </td>
                          <td className="py-3 pr-4 font-mono text-[#a1a1aa] text-[11px] align-top whitespace-nowrap">
                            {p.default ? <code>{p.default}</code> : "—"}
                          </td>
                          <td className="py-3 text-[#d1d5db] text-xs leading-relaxed align-top">
                            {p.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Accessibility & Assistive Tech Section */}
            {blockDoc?.a11yFeatures && blockDoc.a11yFeatures.length > 0 && (
              <div className="bg-[#07070a] border border-white/10 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-white/[0.08]">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-[#32c798]">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white leading-none">
                      Accessibility & Assistive Tech
                    </h3>
                    <p className="text-xs text-[#9ca3af] mt-1">
                      Built to meet RNBlocks accessibility, touch target, and screen reader standards
                    </p>
                  </div>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  {blockDoc.a11yFeatures.map((feat, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 bg-white/[0.02] border border-white/[0.06] rounded-xl p-3 text-xs text-[#d1d5db]"
                    >
                      <CheckCircle2 size={15} className="text-[#32c798] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* About / Architecture Guide */}
            <div className="bg-[#07070a] border border-white/10 rounded-2xl p-6 md:p-8">
              <h3 className="text-base font-bold text-white mb-2">Integration & Architecture</h3>
              <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed mb-6">
                This component is authored using pure React Native primitives and standard{" "}
                <span className="text-white font-medium">{stylingLabel}</span> styling. It has zero
                lock-in to proprietary design systems and operates without wrapping context providers.
              </p>

              <div className="border-t border-white/[0.08] pt-4">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#32c798] mb-3">
                  Key Specifications
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-[#d1d5db]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-[#32c798] shrink-0 mt-0.5" />
                    <span>Drop-in ready for Expo Router, React Navigation, and Bare React Native.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-[#32c798] shrink-0 mt-0.5" />
                    <span>Strict TypeScript types with zero `any` declarations.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-[#32c798] shrink-0 mt-0.5" />
                    <span>Built-in light and dark theme mode support via centralized color tokens.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Metadata & Actions Sidebar */}
          <div className="flex flex-col gap-5 w-full">
            {/* Installation Box */}
            <div className="bg-[#07070a] border border-white/10 rounded-2xl p-5">
              <h4 className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-white mb-2">
                <Terminal size={14} className="text-[#32c798]" />
                <span>CLI Installation</span>
              </h4>
              <p className="text-xs text-[#9ca3af] mb-3">Add this block directly into your project:</p>
              <div className="flex items-center justify-between bg-[#040406] border border-white/[0.08] rounded-xl px-3 py-2">
                <code className="font-mono text-xs text-[#e4e4e7] select-all truncate mr-2">
                  npx @rnblocks/cli add {block.slug}
                </code>
                <CopyButton text={`npx @rnblocks/cli add ${block.slug}`} />
              </div>
            </div>

            {/* Compatibility Checklist */}
            <div className="bg-[#07070a] border border-white/10 rounded-2xl p-5">
              <h4 className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-white mb-3">
                <CheckCircle2 size={14} className="text-[#32c798]" />
                <span>Compatibility</span>
              </h4>
              <div className="space-y-2.5 text-xs font-mono">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <span className="text-[#9ca3af]">Expo SDK</span>
                  <span className="text-[#32c798] font-semibold">Supported</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <span className="text-[#9ca3af]">React Native</span>
                  <span className="text-white font-medium">Bare & Managed</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <span className="text-[#9ca3af]">Platforms</span>
                  <span className="text-white font-medium">iOS & Android</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <span className="text-[#9ca3af]">React Native Web</span>
                  <span className="text-[#32c798] font-semibold">Live In-Browser</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#9ca3af]">Styling</span>
                  <span className="text-white font-medium">{stylingLabel}</span>
                </div>
              </div>
            </div>

            {/* Files Included */}
            <div className="bg-[#07070a] border border-white/10 rounded-2xl p-5">
              <h4 className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-white mb-3">
                <FileCode size={14} className="text-[#32c798]" />
                <span>Files Included</span>
              </h4>
              {block.codeFiles && block.codeFiles.length > 1 ? (
                <div className="font-mono text-xs bg-[#040406] border border-white/[0.08] rounded-xl p-3 space-y-1.5">
                  <div className="text-[#71717a] flex items-center justify-between text-[11px] pb-1.5 border-b border-white/[0.06]">
                    <span>components/{block.slug}/</span>
                    <span className="text-[10px] text-[#32c798] bg-[#32c798]/10 px-1.5 py-0.5 rounded">
                      {block.codeFiles.length} files
                    </span>
                  </div>
                  {block.codeFiles.map((file, i) => {
                    const fname = file.path.split("/").pop() || file.path;
                    const isEntry = i === 0;
                    return (
                      <div
                        key={file.path}
                        className="flex items-center justify-between text-[11.5px] pl-2"
                      >
                        <span className={isEntry ? "text-[#32c798] font-semibold" : "text-[#d1d5db]"}>
                          {fname}
                        </span>
                        {isEntry && (
                          <span className="text-[9.5px] font-mono text-[#32c798] bg-[#32c798]/10 px-1.5 py-0.5 rounded">
                            entry
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="font-mono text-xs bg-[#040406] border border-white/[0.08] rounded-xl p-3 space-y-1">
                  <div className="text-[#71717a]">components/</div>
                  <div className="pl-4 text-[#32c798] font-semibold">{block.slug}.tsx</div>
                </div>
              )}
            </div>

            {/* Dependencies */}
            <div className="bg-[#07070a] border border-white/10 rounded-2xl p-5">
              <h4 className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-white mb-3">
                <Package size={14} className="text-[#32c798]" />
                <span>Dependencies</span>
              </h4>
              {block.dependencies && block.dependencies.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {block.dependencies.map((dep, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-[11px] bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded text-[#d1d5db]"
                    >
                      {dep}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#71717a]">Zero external dependencies required.</p>
              )}
            </div>

            {/* GitHub Source CTA */}
            <div className="bg-[#07070a] border border-white/10 rounded-2xl p-4">
              <a
                href={`https://github.com/Ashwin-Khowala/rnblocks/tree/master/registry/blocks/${block.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-secondary !py-2.5 !text-xs !justify-center group"
              >
                <span>View on GitHub</span>
                <ExternalLink
                  size={13}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
