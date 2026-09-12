import * as React from "react";
import { cn } from "./button";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "accent";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variants = {
    default: "bg-white/10 text-white border-white/10",
    secondary: "bg-[#181818] text-[#A3A3A3] border-white/10",
    outline: "border-white/15 text-[#A3A3A3]",
    accent: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
