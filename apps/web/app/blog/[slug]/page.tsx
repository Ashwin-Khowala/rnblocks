import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getPostBySlug } from "@/data/blog";
import { WhyRNBlocksIsDifferentArticle } from "@/components/blog/WhyRNBlocksIsDifferentArticle";
import { ArrowLeft, BookOpen } from "lucide-react";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${post.title} | RNBlocks Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `https://rnblocks.vercel.app/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://rnblocks.vercel.app/blog/${post.slug}`,
      siteName: "RNBlocks",
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      creator: "@AshwinKhowala",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#070709] text-white">
      {/* Background ambient gradient glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-[#32c798]/10 via-[#32c798]/[0.03] to-transparent blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <main className="container-main py-10 sm:py-14 max-w-5xl">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#9ca3af] hover:text-white transition-colors bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] px-3 py-1.5 rounded-lg"
          >
            <ArrowLeft size={13} />
            <span>Back to All Articles</span>
          </Link>
        </div>

        {/* Article Content */}
        {slug === "why-rnblocks-is-different" && <WhyRNBlocksIsDifferentArticle />}
      </main>
    </div>
  );
}
