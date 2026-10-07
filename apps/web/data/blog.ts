export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  date: string;
  formattedDate: string;
  readTime: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    github?: string;
    twitter?: string;
  };
  tags: string[];
  featured: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "why-rnblocks-is-different",
    title: "Why RNBlocks is Built Different: Stop Comparing Us to Traditional UI Libraries",
    subtitle: "The architectural flaw of monolithic mobile packages, the hidden cost of runtime providers, and why owning your UI code is the only sustainable path in React Native.",
    excerpt: "Why monolithic component packages break in React Native, the hidden costs of runtime providers, and how owning your mobile UI code gives you total freedom without vendor lock-in.",
    date: "2026-10-07",
    formattedDate: "October 7, 2026",
    readTime: "7 min read",
    category: "Architecture & Philosophy",
    author: {
      name: "Ashwin Khowala",
      role: "Creator of RNBlocks",
      avatar: "https://github.com/Ashwin-Khowala.png",
      github: "https://github.com/Ashwin-Khowala",
      twitter: "https://x.com/AshwinKhowala",
    },
    tags: [
      "React Native",
      "Expo SDK 52",
      "New Architecture",
      "Design Systems",
      "Open Source",
      "Zero Runtime",
    ],
    featured: true,
  },
];

export const UPCOMING_TOPICS = [
  {
    title: "Engineering 120 FPS Spring Physics for Touch Interfaces",
    category: "Performance",
    estimatedDate: "Coming Soon",
    description: "How we calibrate gesture curves, deceleration rates, and Reanimated native drivers so mobile components feel truly native on 120Hz displays.",
  },
  {
    title: "Migrating from NativeBase and Paper Without Rewriting Your App",
    category: "Migration",
    estimatedDate: "Coming Soon",
    description: "A step-by-step migration guide for eliminating heavy UI dependencies and adopting a clean, modular copy-paste architecture.",
  },
  {
    title: "Why We Standardized on StyleSheet.create Over Runtime CSS-in-JS",
    category: "Architecture",
    estimatedDate: "Coming Soon",
    description: "The memory and re-render benchmarking data that convinced us to keep zero runtime CSS engines out of our core component primitives.",
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
