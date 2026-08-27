import { BlogPost } from "@/lib/blog/posts";

// Strongly typed central post registry.
// Drafts are excluded from routing and sitemap generation.
export const allPosts: BlogPost[] = [
  {
    slug: "sample-post",
    title: "How to Evaluate 2-for-1 Trades in Fantasy Baseball",
    description: "A comprehensive guide on evaluating unequal trades, understanding replacement-level value, and avoiding common pitfalls.",
    category: "Trade Strategy",
    publishedAt: "2026-04-01T09:00:00Z",
    author: "Analysis Team",
    featured: true,
    draft: false,
    images: {
      square: "https://tradeanalyzer.placeholder.com/blog/sample-1x1.jpg",
      standard: "https://tradeanalyzer.placeholder.com/blog/sample-4x3.jpg",
      widescreen: "https://tradeanalyzer.placeholder.com/blog/sample-16x9.jpg",
    },
  },
];
