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
        "bg-[#07090b] border border-[#263238] rounded-[6px] overflow-hidden flex flex-col font-mono text-left shadow-[0_16px_40px_-12px_rgba(0,0,0,0.85)]",
        className
      )}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 bg-[#0b1012] border-b border-[#263238] text-left gap-2 min-w-0">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="hidden xs:flex items-center gap-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-[1px] bg-[#00f5c8] shadow-[0_0_6px_#00f5c8]" />
            <span className="w-1.5 h-1.5 rounded-[1px] bg-[#00d9ff]" />
            <span className="w-1.5 h-1.5 rounded-[1px] bg-[#718087]" />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#f3f6f5] font-medium bg-[#101719] px-2 sm:px-2.5 py-1 rounded-[3px] border border-[#263238] min-w-0">
            <FileCode size={13} className="text-[#00f5c8] shrink-0" />
            <span className="truncate max-w-[120px] xs:max-w-[170px] sm:max-w-none">{currentFileName}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <span className="hidden sm:inline text-[11px] text-[#718087] font-medium">{lines.length} lines</span>
          <span className="hidden xs:inline-block text-[10px] text-[#00d9ff] font-bold tracking-wider bg-[#101719] border border-[#263238] px-2 py-0.5 rounded-[3px] uppercase">
            {currentLang}
          </span>
          <CopyButton text={currentFile.content} label="Copy" />
        </div>
      </div>

      {/* Mobile Horizontal File Tab Bar (only when multi-file) */}
      {hasMultipleFiles && (
        <div className="flex md:hidden items-center gap-1.5 px-3 py-2 bg-[#0b1012] border-b border-[#263238] overflow-x-auto scrollbar-none touch-pan-x">
          {fileList.map((f) => {
            const fName = f.path.split("/").pop() || f.path;
            const isActive = f.path === currentFile.path;
            return (
              <button
                key={f.path}
                onClick={() => setActivePath(f.path)}
                className={cn(
                  "shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-[3px] text-xs font-mono transition-colors cursor-pointer",
                  isActive
                    ? "bg-[#00f5c8]/15 text-[#00f5c8] border border-[#00f5c8]/30 font-medium"
                    : "text-[#718087] hover:text-[#f3f6f5] bg-[#101719] border border-transparent"
                )}
              >
                <FileCode size={12} className={isActive ? "text-[#00f5c8]" : "text-[#718087]"} />
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
          <aside className="hidden md:flex flex-col w-56 shrink-0 border-r border-[#263238] bg-[#0b1012] p-2 select-none">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 mb-1 text-[10px] font-mono text-[#00f5c8] uppercase tracking-wider font-bold">
              <Files size={12} />
              <span>FILES [{fileList.length}]</span>
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
                      "w-full flex items-center justify-between px-2.5 py-1.5 rounded-[3px] text-xs font-mono transition-all text-left cursor-pointer",
                      isActive
                        ? "bg-[#101719] text-[#00f5c8] font-bold border-l-2 border-[#00f5c8] pl-2 shadow-sm"
                        : "text-[#929da4] hover:text-[#f3f6f5] hover:bg-[#151d20]"
                    )}
                  >
                    <div className="flex items-center gap-2 truncate mr-2">
                      <FileCode
                        size={13}
                        className={isActive ? "text-[#00f5c8]" : "text-[#718087]"}
                      />
                      <span className="truncate">{fName}</span>
                    </div>
                    <span className="text-[10px] text-[#718087] shrink-0 font-mono">
                      {fLines}L
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>
        )}

        {/* Code body with line numbers */}
        <div className="flex-1 py-3 sm:py-4 overflow-x-auto overflow-y-auto max-h-[600px] bg-[#07090b] text-left min-w-0">
          <pre className="m-0 text-[12px] sm:text-[12.5px] leading-[22px] text-[#f3f6f5] font-mono text-left block">
            <code className="block text-left min-w-full">
              {lines.map((line, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-start px-2.5 sm:px-4 min-w-full text-left hover:bg-white/[0.035] transition-colors duration-100"
                >
                  <span className="w-8 sm:w-10 shrink-0 text-[#718087] select-none text-right pr-2 sm:pr-3.5 text-[11px] sm:text-[11.5px] border-r border-[#263238] mr-2.5 sm:mr-4 leading-[22px]">
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
