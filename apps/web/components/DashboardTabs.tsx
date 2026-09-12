"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, GitPullRequest, User } from "lucide-react";

export function DashboardTabs() {
  const pathname = usePathname();

  const tabs = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Submissions", href: "/dashboard/submissions", icon: GitPullRequest },
    { label: "Author Profile", href: "/dashboard/profile", icon: User },
  ];

  return (
    <div className="dashboard-tabs-root">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`dash-tab ${isActive ? "dash-tab-active" : ""}`}
          >
            <Icon size={15} />
            <span>{tab.label}</span>
          </Link>
        );
      })}

      <style jsx>{`
        .dashboard-tabs-root {
          display: flex;
          align-items: center;
          gap: 6px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          margin-top: 24px;
          margin-bottom: 32px;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        :global(.dash-tab),
        .dash-tab {
          display: inline-flex !important;
          align-items: center !important;
          gap: 8px !important;
          padding: 8px 16px 12px !important;
          font-size: 13.5px !important;
          font-weight: 500 !important;
          color: #a1a1aa !important;
          text-decoration: none !important;
          border-bottom: 2px solid transparent !important;
          transition: color 0.15s ease, border-color 0.15s ease !important;
          white-space: nowrap !important;
          margin-bottom: -1px;
        }

        :global(.dash-tab:hover),
        .dash-tab:hover {
          color: #ffffff !important;
        }

        :global(.dash-tab-active),
        .dash-tab-active {
          color: #ffffff !important;
          font-weight: 600 !important;
          border-bottom-color: #ffffff !important;
        }
      `}</style>
    </div>
  );
}
