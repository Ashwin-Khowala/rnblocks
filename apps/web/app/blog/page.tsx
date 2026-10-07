import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog | RNBlocks",
  description:
    "Engineering notes, architecture decisions, and design principles behind RNBlocks.",
  alternates: {
    canonical: "https://rnblocks.vercel.app/blog",
  },
};

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-[#070709] text-white py-10 sm:py-16 px-4 sm:px-6">
      <main className="max-w-[720px] w-full min-w-0 mx-auto">
        {/* Simple Header */}
        <div className="mb-8 sm:mb-12 pb-6 sm:pb-8 border-b border-zinc-800">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
            Blog
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base">
            Notes on React Native architecture, mobile design systems, and code ownership.
          </p>
        </div>

        {/* Post List */}
        <div className="space-y-8 sm:space-y-10">
          {BLOG_POSTS.map((post) => (
            <article key={post.slug} className="group">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="text-xs font-mono text-zinc-500 mb-2">
                  {post.formattedDate} · {post.readTime}
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-white group-hover:text-zinc-300 transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {post.excerpt}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
