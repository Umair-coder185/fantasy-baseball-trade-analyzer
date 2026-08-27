import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/blog/posts";

interface ArticleCardProps {
  post: BlogPost;
}

export function ArticleCard({ post }: ArticleCardProps) {
  const dateStr = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col bg-white border border-border-color rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
      <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={post.images.standard} 
          alt={post.title} 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute top-4 left-4 bg-primary-blue text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {post.category}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-midnight-navy mb-3 group-hover:text-primary-blue transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-main-text text-sm mb-6 line-clamp-3 flex-grow">
          {post.description}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-text font-medium mt-auto pt-4 border-t border-gray-100">
          <span>{post.author}</span>
          <time dateTime={post.publishedAt}>{dateStr}</time>
        </div>
      </div>
    </Link>
  );
}
