import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/site";
import { getPublishedPosts } from "@/lib/blog/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/fantasy-baseball-trade-values",
    "/methodology",
    "/about",
    "/blog",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const blogPosts = getPublishedPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: post.modifiedAt || post.publishedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...routes, ...blogPosts];
}
