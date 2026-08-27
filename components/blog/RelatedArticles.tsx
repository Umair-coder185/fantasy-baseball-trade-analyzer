import React from "react";
import { BlogPost, getRelatedPosts } from "@/lib/blog/posts";
import { ArticleCard } from "./ArticleCard";

interface RelatedArticlesProps {
  currentSlug: string;
  category: string;
}

export function RelatedArticles({ currentSlug, category }: RelatedArticlesProps) {
  const relatedPosts = getRelatedPosts(currentSlug, category, 2);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-12 border-t border-border-color">
      <h2 className="text-2xl md:text-3xl font-extrabold text-midnight-navy mb-8">
        Related Articles
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {relatedPosts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
