import React from "react";

interface ArticleLayoutProps {
  children: React.ReactNode;
}

export function ArticleLayout({ children }: ArticleLayoutProps) {
  return (
    <article className="w-full max-w-3xl mx-auto py-8 px-4 sm:px-6">
      {children}
    </article>
  );
}
