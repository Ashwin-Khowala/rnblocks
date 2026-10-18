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
    <section id="props" className="space-y-4 scroll-mt-24 font-mono">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-1.5 h-1.5 rounded-[1px] bg-[#00f5c8]" />
          <h2 className="text-xl font-bold text-[#f3f6f5] tracking-tight">
            // SPEC.PROPS_API
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#929da4] font-sans">
          Configurable interfaces for{" "}
          <code className="text-[#00f5c8] font-mono font-bold bg-[#101719] px-1.5 py-0.5 rounded-[3px] border border-[#263238]">{`<${componentPascalName} />`}</code>
        </p>
      </div>

      {/* Desktop Matrix Table (>= md) */}
      <div className="hidden md:block overflow-x-auto border border-[#263238] rounded-[6px] bg-[#101719]">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#263238] text-[#00f5c8] font-mono text-[10.5px] uppercase tracking-wider bg-[#0b1012]">
              <th className="py-3 px-4 font-bold w-1/5">PROP_IDENTIFIER</th>
              <th className="py-3 px-4 font-bold w-1/4">TYPE_SIGNATURE</th>
              <th className="py-3 px-4 font-bold w-1/5">DEFAULT_VAL</th>
              <th className="py-3 px-4 font-bold">TELEMETRY_NOTES</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#263238]">
            {props.map((p, idx) => (
              <tr key={idx} className="group hover:bg-[#151d20]/50 transition-colors">
                <td className="py-3.5 px-4 font-mono text-[#f3f6f5] font-bold align-top whitespace-nowrap">
                  <span>{p.name}</span>
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
                  <span className="inline-block bg-[#07090b] border border-[#263238] text-[#00d9ff] px-2 py-0.5 rounded-[3px] font-mono text-[11px] break-all max-w-[220px]">
                    {p.type}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-mono text-xs align-top">
                  {p.default ? (
                    <code className="text-[#929da4] bg-[#07090b] border border-[#263238] px-1.5 py-0.5 rounded-[3px] text-[11px] break-all inline-block max-w-[180px]">
                      {p.default}
                    </code>
                  ) : (
                    <span className="text-[#718087]">—</span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-[#929da4] text-xs leading-relaxed align-top font-sans">
                  {p.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Optimized Cards (< md) */}
      <div className="space-y-3 md:hidden">
        {props.map((p, idx) => (
          <div
            key={idx}
            className="bg-[#101719] border border-[#263238] rounded-[6px] p-3.5 space-y-2.5 text-xs"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 font-mono text-sm font-bold text-[#f3f6f5]">
                <span>{p.name}</span>
                {p.required && (
                  <span
                    className="text-[10px] text-[#ef4444] font-bold bg-red-500/10 border border-red-500/30 px-1 py-0.2 rounded-[2px]"
                    title="Required prop"
                  >
                    REQUIRED
                  </span>
                )}
              </div>
              <span className="font-mono text-[11px] text-[#00d9ff] bg-[#07090b] border border-[#263238] px-2 py-0.5 rounded-[3px] break-all max-w-full">
                {p.type}
              </span>
            </div>

            <p className="text-[#929da4] text-xs leading-relaxed font-sans">{p.description}</p>

            {p.default && (
              <div className="pt-2 border-t border-[#263238] flex items-center gap-1.5 font-mono text-[11px] text-[#718087]">
                <span>DEFAULT:</span>
                <code className="text-[#929da4] bg-[#07090b] px-1.5 py-0.5 rounded-[3px] border border-[#263238] break-all">
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

