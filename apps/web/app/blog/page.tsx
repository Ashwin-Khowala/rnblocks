import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS, UPCOMING_TOPICS } from "@/data/blog";
import { WhyRNBlocksIsDifferentArticle } from "@/components/blog/WhyRNBlocksIsDifferentArticle";
import { Sparkles, Clock, Calendar, ArrowRight, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog & Engineering Notes | Why RNBlocks is Built Different",
  description:
    "Insights on React Native architecture, code ownership, zero-runtime UI design, and why RNBlocks should not be compared to monolithic component libraries.",
  alternates: {
    canonical: "https://rnblocks.vercel.app/blog",
  },
  openGraph: {
    title: "Why RNBlocks is Built Different | Blog",
    description:
      "The architectural flaw of monolithic mobile packages, the hidden cost of runtime providers, and why owning your UI code gives you total freedom.",
    url: "https://rnblocks.vercel.app/blog",
    siteName: "RNBlocks",
    type: "website",
  },
};

export default function BlogIndexPage() {
  const featuredPost = BLOG_POSTS[0];

  return (
    <div className="min-h-screen bg-[#070709] text-white">
      {/* Background ambient gradient glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-[#32c798]/10 via-[#32c798]/[0.03] to-transparent blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <main className="container-main py-10 sm:py-14 max-w-5xl">
        {/* Blog Banner & Header */}
        <div className="mb-12 border-b border-white/[0.08] pb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold text-[#32c798] bg-[#32c798]/10 border border-[#32c798]/30 mb-4 uppercase tracking-wider">
            <BookOpen size={13} />
            <span>RNBlocks Publication</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Engineering &amp; Architecture
          </h1>

          <p className="text-base sm:text-lg text-[#9ca3af] max-w-2xl leading-relaxed">
            Deep dives into modern React Native performance, New Architecture internals, zero-runtime component design, and mobile ergonomics.
          </p>
        </div>

        {/* Featured Flagship Deep-Dive Article */}
        <div className="mb-20">
          <WhyRNBlocksIsDifferentArticle />
        </div>

        {/* Upcoming Engineering Topics Section */}
        <section className="pt-12 border-t border-white/[0.08]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="font-mono text-xs text-[#32c798] uppercase tracking-wider block mb-1">
                Roadmap &amp; Research
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Upcoming Engineering Notes
              </h3>
            </div>
            <span className="text-xs font-mono text-[#71717a] bg-white/[0.03] border border-white/[0.08] px-2.5 py-1 rounded-full hidden sm:inline-block">
              In Editorial Review
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {UPCOMING_TOPICS.map((topic, index) => (
              <div
                key={index}
                className="bg-[#0b0b0f] border border-white/[0.08] hover:border-white/[0.16] rounded-2xl p-5 sm:p-6 flex flex-col justify-between gap-4 transition-all"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#32c798] bg-[#32c798]/10 px-2 py-0.5 rounded">
                      {topic.category}
                    </span>
                    <span className="text-[11px] font-mono text-[#71717a]">
                      {topic.estimatedDate}
                    </span>
                  </div>
                  <h4 className="text-[15px] font-bold text-white leading-snug">
                    {topic.title}
                  </h4>
                  <p className="text-xs text-[#9ca3af] leading-relaxed">
                    {topic.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.05] flex items-center text-xs font-mono text-[#71717a]">
                  <span>Stay tuned via GitHub</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
