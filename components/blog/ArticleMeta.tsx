import React from "react";
import { BlogPost } from "@/lib/blog/posts";

interface ArticleMetaProps {
  post: BlogPost;
}

export function ArticleMeta({ post }: ArticleMetaProps) {
  const publishedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const modifiedDate = post.modifiedAt ? new Date(post.modifiedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }) : null;

  return (
    <div className="flex items-center gap-4 text-main-text font-medium border-y border-border-color py-4">
      <div className="flex items-center gap-2">
        <span className="font-bold text-midnight-navy">{post.author}</span>
      </div>
      <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
      <div className="flex flex-col sm:flex-row sm:gap-2">
        <time dateTime={post.publishedAt}>Published {publishedDate}</time>
        {modifiedDate && (
          <time dateTime={post.modifiedAt} className="text-muted-text italic text-sm sm:text-base">
            (Updated {modifiedDate})
          </time>
        )}
      </div>
    </div>
  );
}
