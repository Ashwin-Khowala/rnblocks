"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, GitPullRequest, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function DashboardTabs() {
  const pathname = usePathname();

  const tabs = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Submissions", href: "/dashboard/submissions", icon: GitPullRequest },
    { label: "Author Profile", href: "/dashboard/profile", icon: User },
  ];

  return (
    <div className="flex items-center gap-1 border-b border-white/[0.08] mt-6 mb-8 overflow-x-auto">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-all whitespace-nowrap -mb-px",
              isActive
                ? "border-[#32c798] text-[#32c798] font-semibold"
                : "border-transparent text-[#a1a1aa] hover:text-white hover:border-white/20"
            )}
          >
            <Icon size={15} />
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
