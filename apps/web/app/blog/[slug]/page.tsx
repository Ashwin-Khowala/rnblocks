import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getPostBySlug } from "@/data/blog";
import { WhyRNBlocksIsDifferentArticle } from "@/components/blog/WhyRNBlocksIsDifferentArticle";

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
    <div className="min-h-screen bg-[#070709] text-white py-8 sm:py-14 md:py-16 px-4 sm:px-6 w-full overflow-x-hidden">
      {slug === "why-rnblocks-is-different" && <WhyRNBlocksIsDifferentArticle />}
    </div>
  );
}
