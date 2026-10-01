"use client";

import React from "react";
import { BlockPropDoc } from "@/data/block-docs";

interface BlockPropsTableProps {
  props: BlockPropDoc[];
  componentPascalName: string;
}

export function BlockPropsTable({ props, componentPascalName }: BlockPropsTableProps) {
  if (!props || props.length === 0) return null;

  return (
    <section id="props" className="space-y-4 scroll-mt-24">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Props & API Reference
        </h2>
        <p className="text-xs sm:text-sm text-[#9ca3af] mt-1">
          Configurable props for{" "}
          <code className="text-[#32c798] font-mono">{`<${componentPascalName} />`}</code>
        </p>
      </div>

      {/* Desktop Matrix Table (>= md) Matching Screenshot 2 */}
      <div className="hidden md:block overflow-x-auto border border-white/[0.08] rounded-xl bg-[#09090d]">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/[0.08] text-[#71717a] font-mono text-[11px] bg-white/[0.02]">
              <th className="py-3 px-4 font-semibold w-1/5">Prop</th>
              <th className="py-3 px-4 font-semibold w-1/4">Type</th>
              <th className="py-3 px-4 font-semibold w-1/5">Default</th>
              <th className="py-3 px-4 font-semibold">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {props.map((p, idx) => (
              <tr key={idx} className="group hover:bg-white/[0.02] transition-colors">
                <td className="py-3.5 px-4 font-mono text-white font-medium align-top whitespace-nowrap">
                  <span className="text-[#e4e4e7]">{p.name}</span>
                  {p.required && (
                    <span
                      className="ml-1 text-[11px] text-[#ef4444] font-bold"
                      title="Required prop"
                    >
                      *
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-4 font-mono text-xs align-top">
                  <span className="inline-block bg-white/[0.04] border border-white/[0.08] text-[#93c5fd] px-2 py-0.5 rounded font-mono text-[11px] break-all max-w-[220px]">
                    {p.type}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-mono text-xs align-top">
                  {p.default ? (
                    <code className="text-[#a1a1aa] bg-white/[0.03] border border-white/[0.06] px-1.5 py-0.5 rounded text-[11px] break-all inline-block max-w-[180px]">
                      {p.default}
                    </code>
                  ) : (
                    <span className="text-[#71717a]">—</span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-[#d1d5db] text-xs leading-relaxed align-top">
                  {p.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Optimized Cards (< md) — High contrast and readable */}
      <div className="space-y-3 md:hidden">
        {props.map((p, idx) => (
          <div
            key={idx}
            className="bg-[#09090d] border border-white/[0.08] rounded-xl p-3.5 space-y-2.5 text-xs"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 font-mono text-sm font-semibold text-white">
                <span>{p.name}</span>
                {p.required && (
                  <span
                    className="text-[10px] text-[#ef4444] font-bold bg-red-500/10 border border-red-500/20 px-1 py-0.2 rounded"
                    title="Required prop"
                  >
                    required
                  </span>
                )}
              </div>
              <span className="font-mono text-[11px] text-[#93c5fd] bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded break-all max-w-full">
                {p.type}
              </span>
            </div>

            <p className="text-[#d1d5db] text-xs leading-relaxed">{p.description}</p>

            {p.default && (
              <div className="pt-2 border-t border-white/[0.04] flex items-center gap-1.5 font-mono text-[11px] text-[#71717a]">
                <span>default:</span>
                <code className="text-[#a1a1aa] bg-white/[0.04] px-1.5 py-0.5 rounded border border-white/[0.06] break-all">
                  {p.default}
                </code>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
