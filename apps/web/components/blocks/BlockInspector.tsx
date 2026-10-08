"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BlockItem } from "@/data/blocks";
import { BLOCK_DOCS } from "@/data/block-docs";
import { CopyButton } from "@/components/CopyButton";
import {
  CloseIcon,
  TerminalIcon,
  CodeIcon,
  SlidersIcon,
  SparklesIcon,
  ArrowUpRightIcon,
  CheckCircleIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";

interface BlockInspectorProps {
  block: BlockItem | null;
  onClose: () => void;
  className?: string;
  isFloatingDrawer?: boolean;
}

type InspectorTab = "cli" | "code" | "props" | "motion";

export function BlockInspector({
  block,
  onClose,
  className,
  isFloatingDrawer = false,
}: BlockInspectorProps) {
  const [activeTab, setActiveTab] = useState<InspectorTab>("cli");

  if (!block) return null;

  const doc = BLOCK_DOCS[block.slug];
  const pascalName = block.slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");

  const content = (
    <div className="flex flex-col h-full bg-[#08080b] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl text-[#ededed]">
      {/* Top Header */}
      <div className="p-4 border-b border-white/[0.08] bg-[#0a0a0f]">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/[0.05] text-zinc-300 border border-white/[0.08]">
                {block.category}
              </span>
              <span className="text-[10px] font-mono text-zinc-500">
                v{block.version || "1.0.0"}
              </span>
            </div>
            <h3 className="text-base font-bold text-white tracking-tight truncate">
              {block.title}
            </h3>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <Link
              href={`/blocks/${block.slug}`}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-zinc-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] transition-colors"
              title="Open dedicated block docs"
            >
              <span>Full Docs</span>
              <ArrowUpRightIcon size={12} />
            </Link>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
              aria-label="Close inspector"
            >
              <CloseIcon size={16} />
            </button>
          </div>
        </div>

        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
          {block.description}
        </p>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 mt-4 p-1 rounded-xl bg-[#040406] border border-white/[0.06]">
          <button
            onClick={() => setActiveTab("cli")}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer",
              activeTab === "cli"
                ? "bg-white/[0.1] text-white shadow-sm font-semibold"
                : "text-zinc-400 hover:text-white"
            )}
          >
            <TerminalIcon size={13} />
            <span>Install</span>
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer",
              activeTab === "code"
                ? "bg-white/[0.1] text-white shadow-sm font-semibold"
                : "text-zinc-400 hover:text-white"
            )}
          >
            <CodeIcon size={13} />
            <span>Usage</span>
          </button>
          <button
            onClick={() => setActiveTab("props")}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer",
              activeTab === "props"
                ? "bg-white/[0.1] text-white shadow-sm font-semibold"
                : "text-zinc-400 hover:text-white"
            )}
          >
            <SlidersIcon size={13} />
            <span>Props</span>
          </button>
          <button
            onClick={() => setActiveTab("motion")}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer",
              activeTab === "motion"
                ? "bg-white/[0.1] text-white shadow-sm font-semibold"
                : "text-zinc-400 hover:text-white"
            )}
          >
            <SparklesIcon size={13} />
            <span>Motion</span>
          </button>
        </div>
      </div>

      {/* Tab Panels Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar text-xs">
        {/* TAB 1: CLI & Install */}
        {activeTab === "cli" && (
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold block mb-1.5">
                CLI Command
              </span>
              <div className="bg-[#030305] border border-white/[0.08] rounded-xl p-3 flex items-center justify-between gap-2">
                <code className="font-mono text-zinc-200 text-[11px] truncate">
                  npx @rnblocks/cli add {block.slug}
                </code>
                <CopyButton
                  text={`npx @rnblocks/cli add ${block.slug}`}
                  className="shrink-0"
                />
              </div>
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold block mb-1.5">
                Dependencies
              </span>
              <div className="rounded-xl bg-[#040407] border border-white/[0.06] p-3 space-y-2">
                <div className="flex items-center justify-between text-zinc-200">
                  <span className="font-mono text-[11px]">react-native-svg</span>
                  <span className="text-[10px] text-zinc-400 font-mono bg-white/[0.05] border border-white/[0.08] px-1.5 py-0.5 rounded-md">
                    peer dependency
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Pure SVG rendering. Zero native linking or heavy animation runtime required.
                </p>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold block mb-1.5">
                File Destination
              </span>
              <div className="bg-[#040407] border border-white/[0.06] rounded-xl p-3 font-mono text-[11px] text-zinc-400 flex items-center justify-between">
                <span>components/rnblocks/{block.slug}.tsx</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold block mb-1.5">
                Quick Import
              </span>
              <div className="bg-[#030305] border border-white/[0.08] rounded-xl p-3 font-mono text-[11px] text-zinc-200 flex items-center justify-between gap-2">
                <span className="truncate">
                  import {pascalName} from &quot;@/components/rnblocks/{block.slug}&quot;;
                </span>
                <CopyButton
                  text={`import ${pascalName} from "@/components/rnblocks/${block.slug}";`}
                  className="shrink-0"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Usage Snippet */}
        {activeTab === "code" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                Example Usage
              </span>
              {doc?.usageCode && (
                <CopyButton text={doc.usageCode} label="Copy Code" />
              )}
            </div>
            <div className="rounded-xl bg-[#030305] border border-white/[0.08] p-3 overflow-x-auto no-scrollbar font-mono text-[11px] leading-relaxed text-zinc-300 max-h-[360px]">
              <pre className="whitespace-pre">
                {doc?.usageCode || `// Sample usage for ${block.title}\nimport ${pascalName} from "@/components/${block.slug}";\n\nexport default function Screen() {\n  return <${pascalName} />;\n}`}
              </pre>
            </div>
          </div>
        )}

        {/* TAB 3: Props API */}
        {activeTab === "props" && (
          <div className="space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold block">
              Configurable Props ({doc?.props?.length || 0})
            </span>
            {doc?.props && doc.props.length > 0 ? (
              <div className="space-y-2">
                {doc.props.map((p) => (
                  <div
                    key={p.name}
                    className="p-2.5 rounded-xl bg-[#040407] border border-white/[0.06] space-y-1"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] text-zinc-200 font-bold">
                        {p.name}
                        {p.required && <span className="text-zinc-400 ml-0.5">*</span>}
                      </span>
                      <span className="font-mono text-[10px] text-zinc-400 bg-white/[0.04] px-1.5 py-0.5 rounded-md truncate max-w-[120px]">
                        {p.type}
                      </span>
                    </div>
                    {p.default && (
                      <div className="text-[10px] font-mono text-zinc-500">
                        default: <span className="text-zinc-400">{p.default}</span>
                      </div>
                    )}
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-500">
                Standard React Native view props supported.
              </p>
            )}
          </div>
        )}

        {/* TAB 4: Motion & A11y */}
        {activeTab === "motion" && (
          <div className="space-y-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold block mb-2">
                Motion Contract
              </span>
              <div className="rounded-xl bg-[#040407] border border-white/[0.06] p-3 space-y-2.5">
                <div className="flex items-center justify-between text-zinc-300">
                  <span className="font-medium">Enter Transition</span>
                  <span className="font-mono text-zinc-100 font-semibold">~900ms Spring</span>
                </div>
                <div className="flex items-center justify-between text-zinc-300">
                  <span className="font-medium">Replay Trigger</span>
                  <span className="font-mono text-zinc-100">revealKey prop</span>
                </div>
                <div className="flex items-center justify-between text-zinc-300">
                  <span className="font-medium">Reduced Motion</span>
                  <span className="font-mono text-zinc-100">useReducedMotion()</span>
                </div>
                <div className="flex items-center justify-between text-zinc-300">
                  <span className="font-medium">Gesture Physics</span>
                  <span className="font-mono text-zinc-100">60 FPS Native</span>
                </div>
              </div>
            </div>

            {doc?.a11yFeatures && doc.a11yFeatures.length > 0 && (
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold block mb-2">
                  Accessibility Checklist
                </span>
                <div className="rounded-xl bg-[#040407] border border-white/[0.06] p-3 space-y-1.5">
                  {doc.a11yFeatures.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-zinc-400">
                      <CheckCircleIcon size={13} className="text-zinc-400 shrink-0 mt-0.5" />
                      <span className="text-[11px] leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Footer Action */}
      <div className="p-3 border-t border-white/[0.08] bg-[#0a0a0f] flex items-center justify-between gap-2">
        <Link
          href={`/blocks/${block.slug}`}
          className="flex-1 btn-primary !py-2 !text-xs !justify-center !bg-white !text-black !font-semibold hover:!bg-zinc-200"
        >
          <span>Open Full Documentation</span>
          <ArrowUpRightIcon size={13} />
        </Link>
      </div>
    </div>
  );

  if (isFloatingDrawer) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-end p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-label={`${block.title} Details`}
      >
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />
        <div className="relative w-full max-w-md h-[90vh] z-10 animate-in fade-in slide-in-from-right duration-200">
          {content}
        </div>
      </div>
    );
  }

  return (
    <aside
      className={cn(
        "w-80 xl:w-96 shrink-0 sticky top-[76px] self-start h-[calc(100vh-5.5rem)] overflow-hidden",
        className
      )}
    >
      {content}
    </aside>
  );
}
