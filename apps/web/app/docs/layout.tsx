"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { DOC_CATEGORIES } from "@/lib/docs-data";
import { cn } from "@/lib/utils";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="pt-24 pb-20 bg-[#070709] flex-1">
      <div className="container-main grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 md:gap-16">
        {/* Sidebar Nav */}
        <aside className="relative md:sticky md:top-20 h-fit flex flex-col gap-6">
          {DOC_CATEGORIES.map((category) => (
            <div key={category.title} className="flex flex-col">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#71717a] block mb-2">
                {category.title}
              </span>
              <div className="flex flex-col gap-0.5">
                {category.items.map((item) => {
                  const href = `/docs/${item.slug}`;
                  const isActive =
                    pathname === href ||
                    (pathname === "/docs" && item.slug === "getting-started");

                  return (
                    <Link
                      key={item.slug}
                      href={href}
                      className={cn(
                        "flex items-center justify-between py-1.5 px-2.5 rounded-md text-[13.5px] font-medium transition-colors",
                        isActive
                          ? "bg-white/[0.08] text-[#f5f5f5] font-semibold"
                          : "text-[#a1a1aa] hover:bg-white/[0.05] hover:text-[#f5f5f5]"
                      )}
                    >
                      <span>{item.title}</span>
                      {isActive && <ChevronRight size={14} className="text-[#32c798]" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="bg-[#0d0d12] border border-white/[0.08] rounded-xl p-4 mt-2">
            <span className="text-[13px] font-semibold text-[#f5f5f5] block mb-1">
              Source Documentation
            </span>
            <p className="text-xs text-[#71717a] leading-relaxed mb-3">
              These docs are rendered directly from Markdown in the root <code className="bg-white/10 px-1 py-0.5 rounded font-mono text-white">docs/</code> directory.
            </p>
            <a
              href="https://github.com/Ashwin-Khowala/rnblocks/tree/master/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary !text-xs !py-1.5 !px-2.5 inline-flex items-center gap-1.5"
            >
              <GitHubIcon size={13} />
              <span>View on GitHub</span>
            </a>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="max-w-[800px] min-w-0 w-full">{children}</main>
      </div>
    </div>
  );
}
