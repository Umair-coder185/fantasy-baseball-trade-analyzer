import React from "react";
import Link from "next/link";
import { getPublishedPosts } from "@/lib/blog/posts";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function LatestInsightsSection() {
  const posts = getPublishedPosts().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white border-y border-border-color">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-midnight-navy mb-4">
              Latest Insights
            </h2>
            <p className="text-lg text-muted-text max-w-2xl">
              Winning strategies, deep dives on player valuation, and trade mechanics to help you build a championship roster.
            </p>
          </div>
          <Link href="/blog">
            <Button variant="secondary" className="hidden md:flex">
              View All Articles
            </Button>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map(post => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
        
        <div className="mt-8 md:hidden text-center">
          <Link href="/blog">
            <Button variant="secondary" className="w-full">
              View All Articles
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
