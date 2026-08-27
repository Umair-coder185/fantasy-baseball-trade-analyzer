import React from "react";
import Head from "next/head";

interface SEOMetaProps {
  title: string;
  description: string;
}

export function SEOMeta({ title, description }: SEOMetaProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* We will rely mostly on Next.js 13+ App Router metadata API, 
          but this component exists if client-side or specific page-level 
          SEO injections are needed in the future. */}
    </Head>
  );
}
