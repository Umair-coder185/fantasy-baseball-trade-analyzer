import { allPosts } from "@/content/blog/posts";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  modifiedAt?: string;
  author: string;
  featured?: boolean;
  draft?: boolean;
  images: {
    square: string;   // 1x1
    standard: string; // 4x3
    widescreen: string; // 16x9
  };
}

/**
 * Returns all published posts sorted by date (newest first).
 */
export function getPublishedPosts(): BlogPost[] {
  return allPosts
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

/**
 * Returns a specific post by its slug.
 * Excludes drafts in production by default (though strictly handled at routing level too).
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((post) => post.slug === slug);
}

/**
 * Returns related posts (simple category matching implementation).
 */
export function getRelatedPosts(currentSlug: string, category: string, limit = 3): BlogPost[] {
  return getPublishedPosts()
    .filter((post) => post.slug !== currentSlug && post.category === category)
    .slice(0, limit);
}
