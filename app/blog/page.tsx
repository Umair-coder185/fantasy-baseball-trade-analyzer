import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema } from "@/lib/seo/schemas";
import { getPublishedPosts } from "@/lib/blog/posts";
import { FeaturedArticle } from "@/components/blog/FeaturedArticle";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = constructMetadata({
  title: "Fantasy Baseball Strategy & Trade Advice",
  description: "Read our latest fantasy baseball trade strategies, player valuations, and Roto/Points format guides.",
  path: "/blog",
});

export default function BlogIndex() {
  const posts = getPublishedPosts();
  
  if (posts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto py-24 px-6 text-center">
        <h1 className="text-3xl font-bold text-midnight-navy">Coming Soon</h1>
        <p className="text-muted-text mt-4">We are preparing our first insights. Check back later.</p>
      </div>
    );
  }

  const featuredPost = posts.find(p => p.featured) || posts[0];
  const remainingPosts = posts.filter(p => p.slug !== featuredPost.slug);

  return (
    <>
      <JsonLd data={getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" }
      ])} />
      
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 w-full">
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-midnight-navy tracking-tight mb-4">
            Fantasy Baseball Insights
          </h1>
          <p className="text-xl text-muted-text max-w-2xl">
            Winning strategies, deep dives on player valuation, and trade mechanics to help you build a championship roster.
          </p>
        </header>

        <FeaturedArticle post={featuredPost} />

        {remainingPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl md:text-3xl font-extrabold text-midnight-navy mb-8">
              Latest Articles
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {remainingPosts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}
      </main>

      <div className="mt-12 w-full max-w-7xl mx-auto">
        <FinalCTA />
      </div>
    </>
  );
}
