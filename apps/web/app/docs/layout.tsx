"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { DOC_CATEGORIES } from "@/lib/docs-data";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="docs-page">
      <div className="container-main docs-container">
        {/* Sidebar Nav */}
        <aside className="docs-sidebar">
          {DOC_CATEGORIES.map((category) => (
            <div key={category.title} className="sidebar-group">
              <span className="sidebar-group-title">{category.title}</span>
              <div className="sidebar-links">
                {category.items.map((item) => {
                  const href = `/docs/${item.slug}`;
                  const isActive =
                    pathname === href ||
                    (pathname === "/docs" && item.slug === "getting-started");

                  return (
                    <Link
                      key={item.slug}
                      href={href}
                      className={`sidebar-link ${isActive ? "active" : ""}`}
                    >
                      <span>{item.title}</span>
                      {isActive && <ChevronRight size={14} className="active-arrow" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="sidebar-cta-box">
            <span className="cta-box-title">Source Documentation</span>
            <p className="cta-box-desc">
              These docs are rendered directly from Markdown in the root <code>docs/</code> directory.
            </p>
            <a
              href="https://github.com/Ashwin-Khowala/rnblocks/tree/master/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ fontSize: 12, padding: "6px 10px", display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              <GitHubIcon size={13} />
              <span>View on GitHub</span>
            </a>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="docs-content">{children}</main>
      </div>
    </div>
  );
}
