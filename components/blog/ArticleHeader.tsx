import React from "react";
import { BlogPost } from "@/lib/blog/posts";
import { ArticleMeta } from "./ArticleMeta";

interface ArticleHeaderProps {
  post: BlogPost;
}

export function ArticleHeader({ post }: ArticleHeaderProps) {
  return (
    <header className="mb-12">
      <div className="flex items-center gap-3 text-primary-blue font-bold uppercase tracking-wider text-sm mb-4">
        <span>{post.category}</span>
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-midnight-navy tracking-tight leading-[1.1] mb-6">
        {post.title}
      </h1>
      <p className="text-xl md:text-2xl text-muted-text leading-relaxed mb-8 max-w-3xl">
        {post.description}
      </p>
      <ArticleMeta post={post} />
      
      <div className="mt-12 w-full aspect-[16/9] relative rounded-2xl overflow-hidden shadow-xl border border-border-color">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={post.images.widescreen} 
          alt={post.title} 
          className="object-cover w-full h-full" 
        />
      </div>
    </header>
  );
}
