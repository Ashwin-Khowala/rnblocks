"use client";

import React, { useMemo, useState } from "react";
import { CopyButton } from "./CopyButton";
import { FileCode, Files } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CodeViewerFile {
  path: string;
  content: string;
}

interface CodeViewerProps {
  code?: string;
  filename?: string;
  files?: CodeViewerFile[];
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
  files,
  language = "tsx",
  className,
}: CodeViewerProps) {
  // Normalize file list: support both single-file (legacy) and multi-file structures
  const fileList: CodeViewerFile[] = useMemo(() => {
    if (files && files.length > 0) {
      return files;
    }
    return [
      {
        path: filename,
        content: code || "",
      },
    ];
  }, [files, filename, code]);

  const [activePath, setActivePath] = useState<string>(fileList[0].path);

  // Fallback to first file if activePath is no longer present
  const currentFile = useMemo(() => {
    return fileList.find((f) => f.path === activePath) || fileList[0];
  }, [fileList, activePath]);

  const currentFileName = currentFile.path.split("/").pop() || "file.tsx";
  const currentLang = currentFileName.endsWith(".ts") && !currentFileName.endsWith(".tsx")
    ? "ts"
    : language;

  const lines = useMemo(() => {
    return (currentFile.content || "").trim().split("\n");
  }, [currentFile.content]);

  const hasMultipleFiles = fileList.length > 1;

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
            <FileCode size={13} className="text-[#32c798]" />
            <span>{currentFileName}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-[11px] text-[#71717a] font-medium">{lines.length} lines</span>
          <span className="text-[10.5px] text-[#a1a1aa] font-semibold tracking-wider bg-white/[0.06] border border-white/[0.08] px-2 py-0.5 rounded uppercase">
            {currentLang}
          </span>
          <CopyButton text={currentFile.content} label={`Copy ${currentFileName}`} />
        </div>
      </div>

      {/* Mobile Horizontal File Tab Bar (only when multi-file) */}
      {hasMultipleFiles && (
        <div className="flex md:hidden items-center gap-1 px-3 py-2 bg-[#0c0c10] border-b border-white/[0.08] overflow-x-auto scrollbar-none">
          {fileList.map((f) => {
            const fName = f.path.split("/").pop() || f.path;
            const isActive = f.path === currentFile.path;
            return (
              <button
                key={f.path}
                onClick={() => setActivePath(f.path)}
                className={cn(
                  "shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer",
                  isActive
                    ? "bg-[#32c798]/15 text-[#32c798] border border-[#32c798]/30 font-medium"
                    : "text-[#71717a] hover:text-white bg-white/[0.03] border border-transparent"
                )}
              >
                <FileCode size={12} className={isActive ? "text-[#32c798]" : "text-[#71717a]"} />
                <span>{fName}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Main Workspace: Desktop File Tree Sidebar + Code Body */}
      <div className="flex flex-1 min-h-0">
        {/* Desktop Sidebar File Tree */}
        {hasMultipleFiles && (
          <aside className="hidden md:flex flex-col w-56 shrink-0 border-r border-white/[0.08] bg-[#0c0c10] p-2 select-none">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 mb-1 text-[11px] font-mono text-[#71717a] uppercase tracking-wider">
              <Files size={12} />
              <span>Files ({fileList.length})</span>
            </div>
            <div className="space-y-0.5">
              {fileList.map((f) => {
                const fName = f.path.split("/").pop() || f.path;
                const isActive = f.path === currentFile.path;
                const fLines = f.content.split("\n").length;
                return (
                  <button
                    key={f.path}
                    onClick={() => setActivePath(f.path)}
                    className={cn(
                      "w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all text-left cursor-pointer",
                      isActive
                        ? "bg-white/[0.08] text-white font-medium border-l-2 border-[#32c798] pl-2"
                        : "text-[#9ca3af] hover:text-white hover:bg-white/[0.03]"
                    )}
                  >
                    <div className="flex items-center gap-2 truncate mr-2">
                      <FileCode
                        size={13}
                        className={isActive ? "text-[#32c798]" : "text-[#71717a]"}
                      />
                      <span className="truncate">{fName}</span>
                    </div>
                    <span className="text-[10px] text-[#52525b] shrink-0 font-mono">
                      {fLines}L
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>
        )}

        {/* Code body with line numbers */}
        <div className="flex-1 py-4 overflow-x-auto overflow-y-auto max-h-[600px] bg-[#09090c] text-left min-w-0">
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
    </div>
  );
}

export default CodeViewer;
