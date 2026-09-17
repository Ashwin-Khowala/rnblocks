"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BLOCKS_DATA } from "@/data/blocks";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function BlockDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const block = BLOCKS_DATA.find((b) => b.slug === slug);

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

  return (
    <div className="min-h-screen bg-[#030305] text-[#ededed] pt-24 md:pt-28 pb-24 flex-1">
      <div className="container-main">
        {/* Breadcrumb Back Link */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#71717a] mb-6">
          <Link
            href="/blocks"
            className="inline-flex items-center gap-1.5 text-[#9ca3af] hover:text-white transition-colors"
          >
            <BackIcon size={14} />
            <span>Back to Blocks</span>
          </Link>
          <span>/</span>
          <span className="text-[#32c798] truncate max-w-[200px] sm:max-w-none">{block.title}</span>
        </div>

        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="font-mono text-[10.5px] font-bold text-[#32c798] bg-[#32c798]/10 border border-[#32c798]/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                {block.category}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
              {block.title}
            </h1>
            <div className="flex items-center gap-2 text-xs text-[#9ca3af]">
              <span>by</span>
              <span className="font-medium text-white">{block.author}</span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2.5 bg-[#0a0a0e] border border-white/10 rounded-xl px-3.5 py-2 self-start md:self-auto shadow-inner">
            <span className="text-[#32c798] font-mono text-xs font-bold">$</span>
            <span className="font-mono text-xs text-[#e4e4e7] select-all">npx @rnblocks/cli add {block.slug}</span>
            <CopyButton text={`npx @rnblocks/cli add ${block.slug}`} label="Copy" />
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
          {/* Left Column: Preview & Code Tabs */}
          <div className="w-full min-w-0">
            {/* View Switcher Tabs */}
            <div className="flex items-center gap-2 mb-4 bg-white/[0.03] border border-white/[0.08] p-1 rounded-xl w-fit">
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

            {/* Tab Contents */}
            <div className="mb-8">
              {activeTab === "preview" ? (
                <LiveBlockPreview Component={block.Component} title={block.title} type={block.type} />
              ) : (
                <CodeViewer
                  code={block.code}
                  filename={`components/${block.slug}.tsx`}
                  language="tsx"
                />
              )}
            </div>

            {/* About / Implementation Guide */}
            <div className="bg-[#07070a] border border-white/10 rounded-2xl p-6 md:p-8">
              <h3 className="text-lg font-bold text-white mb-2">About this block</h3>
              <p className="text-sm text-[#9ca3af] leading-relaxed mb-6">
                {block.description}
              </p>

              <div className="border-t border-white/[0.08] pt-6">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#32c798] mb-3">
                  Integration Details
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-[#d1d5db]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-[#32c798] shrink-0 mt-0.5" />
                    <span>Drop-in ready for Expo Router, React Navigation, and Bare React Native.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-[#32c798] shrink-0 mt-0.5" />
                    <span>Formatted with strict TypeScript types and zero third-party lock-in.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-[#32c798] shrink-0 mt-0.5" />
                    <span>Styled with standard {stylingLabel} patterns for straightforward customization.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Metadata Sidebar */}
          <div className="flex flex-col gap-4 w-full">
            {/* Installation Box */}
            <div className="bg-[#07070a] border border-white/10 rounded-2xl p-5">
              <h4 className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-white mb-2">
                <Terminal size={14} className="text-[#32c798]" />
                <span>Installation</span>
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
              <div className="font-mono text-xs bg-[#040406] border border-white/[0.08] rounded-xl p-3 space-y-1">
                <div className="text-[#71717a]">components/</div>
                <div className="pl-4 text-[#32c798] font-semibold">{block.slug}.tsx</div>
              </div>
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
