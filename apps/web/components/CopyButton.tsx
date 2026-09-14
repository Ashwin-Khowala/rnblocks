"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  className?: string;
  label?: string;
}

export function CopyButton({ text, className, label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#111115] border border-white/10 text-[#9ca3af] hover:text-white hover:bg-white/[0.06] hover:border-white/20 transition-all cursor-pointer select-none",
        copied && "border-[#32c798]/40 text-[#32c798]",
        className
      )}
      title="Copy to clipboard"
    >
      {copied ? (
        <>
          <Check size={14} className="shrink-0 text-[#32c798]" />
          {label && <span className="text-[#32c798]">Copied!</span>}
        </>
      ) : (
        <>
          <Copy size={14} className="shrink-0" />
          {label && <span>{label}</span>}
        </>
      )}
    </button>
  );
}
