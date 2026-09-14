"use client";

import React, { useMemo } from "react";
import { CopyButton } from "./CopyButton";
import { FileCode } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeViewerProps {
  code: string;
  filename?: string;
  language?: string;
  className?: string;
}

// Tokenizing patterns for JSX/TSX syntax highlighting
const KEYWORDS = new Set([
  "import", "export", "from", "as", "default", "const", "let", "var",
  "function", "return", "interface", "type", "if", "else", "switch",
  "case", "break", "true", "false", "null", "undefined", "async",
  "await", "typeof", "keyof", "new", "void", "any", "string", "number",
  "boolean"
]);

const HOOKS_AND_PRIMITIVES = new Set([
  "useState", "useEffect", "useCallback", "useMemo", "useRef", "useContext",
  "StyleSheet", "React", "View", "Text", "TouchableOpacity", "Animated",
  "ScrollView", "Image", "Platform", "Dimensions"
]);

function highlightLine(line: string): React.ReactNode {
  if (!line || line.length === 0) {
    return " ";
  }

  // Check for whole-line comment (ignoring leading whitespace)
  const trimmed = line.trimStart();
  if (trimmed.startsWith("//")) {
    const indent = line.slice(0, line.indexOf("//"));
    return (
      <>
        <span>{indent}</span>
        <span className="text-[#6b7280] italic">{trimmed}</span>
      </>
    );
  }

  // Token regex for strings, comments, tags, attributes, words, numbers, punctuation
  const tokenRegex = /(?:\/\/.*$)|(?:"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(<\/?[A-Za-z0-9_.]+|\/?>)|([A-Za-z0-9_]+(?=\=))|(\b[A-Za-z0-9_]+\b)|([{}()[\];,.:=><!&|?+\-*]+)|(\s+)/g;

  const elements: React.ReactNode[] = [];
  let match: RegExpExecArray | null;
  let lastIndex = 0;
  let keyIndex = 0;

  while ((match = tokenRegex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      elements.push(
        <span key={`gap-${keyIndex++}`}>
          {line.slice(lastIndex, match.index)}
        </span>
      );
    }

    const token = match[0];
    lastIndex = tokenRegex.lastIndex;

    if (token.startsWith("//")) {
      elements.push(
        <span key={`tok-${keyIndex++}`} className="text-[#6b7280] italic">
          {token}
        </span>
      );
    } else if (token.startsWith('"') || token.startsWith("'") || token.startsWith("`")) {
      elements.push(
        <span key={`tok-${keyIndex++}`} className="text-[#4ade80]">
          {token}
        </span>
      );
    } else if (token.startsWith("<") || token.endsWith(">")) {
      elements.push(
        <span key={`tok-${keyIndex++}`} className="text-[#67e8f9]">
          {token}
        </span>
      );
    } else if (match[2]) {
      elements.push(
        <span key={`tok-${keyIndex++}`} className="text-[#fcd34d]">
          {token}
        </span>
      );
    } else if (KEYWORDS.has(token)) {
      elements.push(
        <span key={`tok-${keyIndex++}`} className="text-[#c084fc] font-semibold">
          {token}
        </span>
      );
    } else if (HOOKS_AND_PRIMITIVES.has(token)) {
      elements.push(
        <span key={`tok-${keyIndex++}`} className="text-[#38bdf8] font-medium">
          {token}
        </span>
      );
    } else if (/^\d+(\.\d+)?$/.test(token)) {
      elements.push(
        <span key={`tok-${keyIndex++}`} className="text-[#fb7185]">
          {token}
        </span>
      );
    } else if (/^[{}()[\];,.:=><!&|?+\-*]+$/.test(token)) {
      elements.push(
        <span key={`tok-${keyIndex++}`} className="text-[#94a3b8]">
          {token}
        </span>
      );
    } else {
      elements.push(
        <span key={`tok-${keyIndex++}`} className="text-[#f1f5f9]">
          {token}
        </span>
      );
    }
  }

  if (lastIndex < line.length) {
    elements.push(
      <span key={`tail-${keyIndex++}`}>
        {line.slice(lastIndex)}
      </span>
    );
  }

  return elements.length > 0 ? elements : line;
}

export function CodeViewer({
  code,
  filename = "component.tsx",
  language = "tsx",
  className,
}: CodeViewerProps) {
  const lines = useMemo(() => {
    return (code || "").trim().split("\n");
  }, [code]);

  return (
    <div
      className={cn(
        "bg-[#09090c] border border-white/10 rounded-2xl overflow-hidden flex flex-col font-mono text-left shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)]",
        className
      )}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0f0f13] border-b border-white/[0.08] text-left">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#e4e4e7] font-medium bg-white/[0.05] px-2.5 py-1 rounded-md border border-white/[0.06]">
            <FileCode size={13} className="text-[#9ca3af]" />
            <span>{filename}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-[11px] text-[#71717a] font-medium">{lines.length} lines</span>
          <span className="text-[10.5px] text-[#a1a1aa] font-semibold tracking-wider bg-white/[0.06] border border-white/[0.08] px-2 py-0.5 rounded">
            {language.toUpperCase()}
          </span>
          <CopyButton text={code} label="Copy" />
        </div>
      </div>

      {/* Code body with line numbers */}
      <div className="py-4 overflow-x-auto overflow-y-auto max-h-[580px] bg-[#09090c] text-left">
        <pre className="m-0 text-[12.5px] leading-[22px] text-[#f3f4f6] font-mono text-left block">
          <code className="block text-left min-w-full">
            {lines.map((line, idx) => (
              <div
                key={idx}
                className="flex items-start justify-start px-4 min-w-full text-left hover:bg-white/[0.035] transition-colors duration-100"
              >
                <span className="w-10 shrink-0 text-[#4b5563] select-none text-right pr-3.5 text-[11.5px] border-r border-white/[0.07] mr-4 leading-[22px]">
                  {idx + 1}
                </span>
                <span className="whitespace-pre flex-1 min-w-0 text-left font-mono leading-[22px] [tab-size:2]">
                  {highlightLine(line)}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
