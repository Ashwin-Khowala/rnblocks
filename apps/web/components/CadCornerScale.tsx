import React from "react";

interface CadCornerScaleProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  label?: string;
  className?: string;
}

export function CadCornerScale({
  position = "top-left",
  label,
  className = "",
}: CadCornerScaleProps) {
  const isTop = position.startsWith("top");
  const isLeft = position.endsWith("left");

  return (
    <div
      className={`absolute ${isTop ? "top-2.5 sm:top-3" : "bottom-2.5 sm:bottom-3"} ${
        isLeft ? "left-2.5 sm:left-3" : "right-2.5 sm:right-3"
      } pointer-events-none select-none z-10 flex items-center gap-1 font-mono text-[9px] text-[#32c798]/70 ${className}`}
      aria-hidden="true"
    >
      {isLeft && (
        <span className="text-[#32c798] font-bold text-[11px] leading-none">
          {isTop ? "┌" : "└"}
        </span>
      )}
      <div className="flex items-center gap-0.5">
        <span className="w-1.5 h-px bg-[#32c798]/60" />
        <span className="w-2.5 h-px bg-[#32c798]" />
        <span className="w-1.5 h-px bg-[#32c798]/60" />
        {label && (
          <span className="text-[#71717a] text-[8px] ml-1 tracking-widest uppercase">
            {label}
          </span>
        )}
      </div>
      {!isLeft && (
        <span className="text-[#32c798] font-bold text-[11px] leading-none">
          {isTop ? "┐" : "┘"}
        </span>
      )}
    </div>
  );
}
