import React from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/blog/posts";

interface FeaturedArticleProps {
  post: BlogPost;
}

export function FeaturedArticle({ post }: FeaturedArticleProps) {
  const dateStr = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col md:flex-row bg-white border border-border-color rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden mb-12">
      <div className="w-full md:w-1/2 lg:w-3/5 relative aspect-video md:aspect-auto bg-gray-100 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={post.images.widescreen} 
          alt={post.title} 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute top-4 left-4 bg-primary-blue text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {post.category}
        </div>
      </div>
      <div className="w-full md:w-1/2 lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-midnight-navy mb-4 group-hover:text-primary-blue transition-colors">
          {post.title}
        </h2>
        <p className="text-main-text text-lg mb-8 line-clamp-4">
          {post.description}
        </p>
        <div className="flex items-center gap-4 text-sm font-medium text-muted-text mt-auto border-t border-gray-100 pt-6">
          <span className="font-bold text-midnight-navy">{post.author}</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <time dateTime={post.publishedAt}>{dateStr}</time>
        </div>
      </div>
    </Link>
  );
}
