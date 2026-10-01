"use client";

import React, { useState } from "react";
import { BlockItem } from "@/data/blocks";
import { CodeViewer } from "@/components/CodeViewer";
import { CopyButton } from "@/components/CopyButton";
import { Terminal, Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

type InstallTab = "command" | "manual";
type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

interface BlockInstallationProps {
  block: BlockItem;
}

export function BlockInstallation({ block }: BlockInstallationProps) {
  const [activeTab, setActiveTab] = useState<InstallTab>("command");
  const [pkgManager, setPkgManager] = useState<PackageManager>("pnpm");

  const dependencies = block.dependencies || [];
  const depsString = dependencies.join(" ");

  // Formatted dependency install commands
  const getDepsCommand = (pm: PackageManager) => {
    if (!depsString) return "";
    switch (pm) {
      case "pnpm":
        return `pnpm add ${depsString}`;
      case "npm":
        return `npx expo install ${depsString}`;
      case "yarn":
        return `yarn add ${depsString}`;
      case "bun":
        return `bun add ${depsString}`;
    }
  };

  // Formatted CLI add commands
  const getCliCommand = (pm: PackageManager) => {
    switch (pm) {
      case "pnpm":
        return `pnpm dlx @rnblocks/cli add ${block.slug}`;
      case "npm":
        return `npx @rnblocks/cli add ${block.slug}`;
      case "yarn":
        return `yarn dlx @rnblocks/cli add ${block.slug}`;
      case "bun":
        return `bunx @rnblocks/cli add ${block.slug}`;
    }
  };

  const cliCommand = getCliCommand(pkgManager);
  const depsCommand = getDepsCommand(pkgManager);

  return (
    <section id="installation" className="space-y-6 scroll-mt-24">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Installation</h2>
      </div>

      {/* ── Mode Switcher Tabs: Command | Manual (Matches screenshot) ── */}
      <div className="flex items-center gap-6 border-b border-white/[0.08] text-sm">
        <button
          onClick={() => setActiveTab("command")}
          className={cn(
            "pb-2 font-medium transition-colors cursor-pointer relative",
            activeTab === "command"
              ? "text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-white"
              : "text-[#71717a] hover:text-[#d1d5db]"
          )}
        >
          Command
        </button>
        <button
          onClick={() => setActiveTab("manual")}
          className={cn(
            "pb-2 font-medium transition-colors cursor-pointer relative",
            activeTab === "manual"
              ? "text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-white"
              : "text-[#71717a] hover:text-[#d1d5db]"
          )}
        >
          Manual
        </button>
      </div>

      {/* ── COMMAND TAB ─────────────────────────────────────────────── */}
      {activeTab === "command" && (
        <div className="space-y-3">
          <p className="text-xs sm:text-sm text-[#9ca3af]">
            Install the component and its peer dependencies automatically via the CLI:
          </p>

          <div className="bg-[#09090d] border border-white/[0.08] rounded-xl overflow-hidden shadow-sm">
            {/* Package Manager Selector Header */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="text-[#52525b] pl-1">
                  <Terminal size={13} />
                </span>
                {(["pnpm", "npm", "yarn", "bun"] as PackageManager[]).map((pm) => (
                  <button
                    key={pm}
                    onClick={() => setPkgManager(pm)}
                    className={cn(
                      "transition-colors cursor-pointer pb-0.5",
                      pkgManager === pm
                        ? "text-white font-bold border-b-2 border-white"
                        : "text-[#71717a] hover:text-white"
                    )}
                  >
                    {pm}
                  </button>
                ))}
              </div>
              <CopyButton text={cliCommand} label="Copy" className="shrink-0" />
            </div>

            {/* Command Text */}
            <div className="px-4 py-3 font-mono text-xs text-[#e4e4e7] select-all overflow-x-auto whitespace-nowrap">
              <span>{cliCommand}</span>
            </div>
          </div>
        </div>
      )}

      {/* ── MANUAL TAB (Exact match to User Screenshot) ──────────────── */}
      {activeTab === "manual" && (
        <div className="space-y-6">
          {/* Step 1: Install dependencies */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white/[0.08] border border-white/[0.12] flex items-center justify-center font-mono text-xs font-bold text-white shrink-0">
                1
              </div>
              <h3 className="text-sm font-semibold text-white">
                Install the following dependencies:
              </h3>
            </div>

            {dependencies.length > 0 ? (
              <div className="ml-9 bg-[#09090d] border border-white/[0.08] rounded-xl overflow-hidden shadow-sm">
                {/* Package manager tabs */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.06] bg-white/[0.02]">
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <span className="text-[#52525b] pl-1">
                      <Terminal size={13} />
                    </span>
                    {(["pnpm", "npm", "yarn", "bun"] as PackageManager[]).map((pm) => (
                      <button
                        key={pm}
                        onClick={() => setPkgManager(pm)}
                        className={cn(
                          "transition-colors cursor-pointer pb-0.5",
                          pkgManager === pm
                            ? "text-white font-bold border-b-2 border-white"
                            : "text-[#71717a] hover:text-white"
                        )}
                      >
                        {pm}
                      </button>
                    ))}
                  </div>
                  <CopyButton text={depsCommand} label="Copy" className="shrink-0" />
                </div>

                {/* Deps Command Line */}
                <div className="px-4 py-3 font-mono text-xs text-[#e4e4e7] select-all overflow-x-auto whitespace-nowrap">
                  <span>{depsCommand}</span>
                </div>
              </div>
            ) : (
              <div className="ml-9 text-xs text-[#71717a] bg-white/[0.02] border border-white/[0.06] rounded-xl p-3 font-mono">
                Zero external dependencies required.
              </div>
            )}
          </div>

          {/* Step 2: Copy and paste code into project */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white/[0.08] border border-white/[0.12] flex items-center justify-center font-mono text-xs font-bold text-white shrink-0">
                2
              </div>
              <h3 className="text-sm font-semibold text-white">
                Copy and paste the following code into your project.
              </h3>
            </div>

            <div className="ml-9">
              <CodeViewer
                code={block.code}
                files={block.codeFiles}
                filename={`components/${block.slug}.tsx`}
                language="tsx"
              />
            </div>
          </div>

          {/* Step 3: Update import paths */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white/[0.08] border border-white/[0.12] flex items-center justify-center font-mono text-xs font-bold text-white shrink-0">
                3
              </div>
              <h3 className="text-sm font-semibold text-white">
                Update the import paths to match your project setup.
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
