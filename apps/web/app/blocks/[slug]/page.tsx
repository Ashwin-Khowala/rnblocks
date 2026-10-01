"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BLOCKS_DATA } from "@/data/blocks";
import { BLOCK_DOCS } from "@/data/block-docs";
import { LiveBlockPreview } from "@/components/LiveBlockPreview";
import { CodeViewer } from "@/components/CodeViewer";
import { CopyButton } from "@/components/CopyButton";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import {
  BlockNavSidebar,
  BlockMobileBar,
  BlockHeader,
  BlockInstallation,
  BlockPropsTable,
  BlockTocSidebar,
  BlockPagination,
  TOC_SECTIONS,
} from "@/components/docs";
import {
  CheckCircle2,
  Terminal,
  Package,
  Code2,
  Smartphone,
  AlertCircle,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function BlockDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const block = BLOCKS_DATA.find((b) => b.slug === slug);
  const blockDoc = BLOCK_DOCS[slug];

  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [activeSection, setActiveSection] = useState<string>("preview");

  // Current block index for Next/Previous pagination
  const currentIndex = BLOCKS_DATA.findIndex((b) => b.slug === slug);
  const prevBlock = currentIndex > 0 ? BLOCKS_DATA[currentIndex - 1] : null;
  const nextBlock = currentIndex < BLOCKS_DATA.length - 1 ? BLOCKS_DATA[currentIndex + 1] : null;

  // Track active scroll section for desktop TOC and mobile horizontal pill bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offset = 140;

      for (let i = TOC_SECTIONS.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(TOC_SECTIONS[i].id);
        if (sectionEl) {
          const top = sectionEl.offsetTop - offset;
          if (scrollY >= top) {
            setActiveSection(TOC_SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (!block) {
    return (
      <div className="min-h-screen bg-[#070709] text-[#ededed] pt-24 pb-20 flex items-center justify-center">
        <div className="container-main flex flex-col items-center justify-center text-center gap-4 py-20">
          <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#ef4444] mb-2">
            <AlertCircle size={28} />
          </div>
          <h2 className="text-2xl font-bold text-white">Block Not Found</h2>
          <p className="text-[#9ca3af] text-sm max-w-md">
            The requested block &ldquo;{slug}&rdquo; does not exist in the registry.
          </p>
          <Link href="/blocks" className="btn-primary inline-flex items-center gap-2 mt-2">
            <ChevronLeft size={16} />
            <span>Back to Blocks</span>
          </Link>
        </div>
      </div>
    );
  }

  const componentPascalName = block.slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");

  const defaultUsageSnippet = `import ${componentPascalName} from "@/components/${block.slug}";

export default function Screen() {
  return (
    <${componentPascalName}
      theme="dark"
    />
  );
}`;

  const usageSnippet = blockDoc?.usageCode || defaultUsageSnippet;

  return (
    <div className="min-h-screen bg-[#070709] text-[#ededed] pb-24 flex-1">
      {/* 3-Column Responsive Documentation Layout */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 lg:pt-6">
        <div className="flex gap-8 lg:gap-10 items-start">
          {/* Column 1: Left Navigation Sidebar (Desktop >= lg) */}
          <BlockNavSidebar blocks={BLOCKS_DATA} currentSlug={block.slug} />

          {/* Column 2: Center Main Documentation Stage */}
          <main className="flex-1 min-w-0 max-w-4xl py-2 space-y-10">
            {/* Mobile In-Flow Header: Breadcrumbs & Drawer Trigger (< lg, Static, Never Floats) */}
            <BlockMobileBar blocks={BLOCKS_DATA} currentBlock={block} />

            {/* Header: Title, Concise Description, and Copy Actions */}
            <BlockHeader block={block} />

            {/* Section 1: Preview */}
            <section id="preview" className="space-y-3 scroll-mt-24">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h2 className="text-lg font-bold text-white tracking-tight">Preview</h2>

                <div className="flex items-center gap-2">
                  {/* View Switcher: Preview / Code */}
                  <div className="flex bg-white/[0.04] border border-white/[0.08] p-0.5 rounded-lg">
                    <button
                      onClick={() => setActiveTab("preview")}
                      className={cn(
                        "inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-md transition-colors cursor-pointer",
                        activeTab === "preview"
                          ? "bg-white/[0.1] text-white font-semibold"
                          : "text-[#71717a] hover:text-white"
                      )}
                    >
                      <Smartphone size={13} />
                      <span>Preview</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("code")}
                      className={cn(
                        "inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-md transition-colors cursor-pointer",
                        activeTab === "code"
                          ? "bg-white/[0.1] text-white font-semibold"
                          : "text-[#71717a] hover:text-white"
                      )}
                    >
                      <Code2 size={13} />
                      <span>Code</span>
                    </button>
                  </div>

                  {/* GitHub Source Button */}
                  <a
                    href={`https://github.com/Ashwin-Khowala/rnblocks/tree/master/registry/blocks/${block.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-[#d1d5db] hover:text-white transition-colors"
                  >
                    <GitHubIcon size={12} />
                    <span>Source</span>
                  </a>
                </div>
              </div>

              {/* Canvas Preview Area */}
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
            </section>

            {/* Section 2: Installation (Command & Manual with 3 Steps) */}
            <BlockInstallation block={block} />

            {/* Section 3: Usage */}
            <section id="usage" className="space-y-4 scroll-mt-24">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Usage</h2>
                  <p className="text-xs sm:text-sm text-[#9ca3af] mt-1">
                    Drop this code into your screen or view:
                  </p>
                </div>
                <CopyButton text={usageSnippet} label="Copy Usage" className="hidden sm:inline-flex" />
              </div>

              <CodeViewer
                code={usageSnippet}
                filename={`screens/${block.slug}-example.tsx`}
                language="tsx"
              />
            </section>

            {/* Section 4: Props & API Reference */}
            {blockDoc?.props && (
              <BlockPropsTable
                props={blockDoc.props}
                componentPascalName={componentPascalName}
              />
            )}

            {/* Section 5: Accessibility & Performance */}
            {blockDoc?.a11yFeatures && blockDoc.a11yFeatures.length > 0 && (
              <section id="accessibility" className="space-y-4 scroll-mt-24">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    Accessibility & Performance
                  </h2>
                  <p className="text-xs sm:text-sm text-[#9ca3af] mt-1">
                    Native touch gestures, screen reader attributes, and 60fps frame budgets:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {blockDoc.a11yFeatures.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 bg-[#09090d] border border-white/[0.06] rounded-xl p-3.5 text-xs text-[#d1d5db]"
                    >
                      <CheckCircle2 size={15} className="text-[#32c798] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Previous / Next Block Navigation */}
            <BlockPagination prevBlock={prevBlock} nextBlock={nextBlock} />
          </main>

          {/* Column 3: Right Table of Contents Sidebar (Desktop >= xl) */}
          <BlockTocSidebar
            activeSection={activeSection}
            onSectionClick={scrollToSection}
          />
        </div>
      </div>
    </div>
  );
}
