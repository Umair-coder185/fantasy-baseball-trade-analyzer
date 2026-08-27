import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedPosts, getPostBySlug } from "@/lib/blog/posts";
import { siteConfig } from "@/lib/seo/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema } from "@/lib/seo/schemas";
import { ArticleHeader } from "@/components/blog/ArticleHeader";
import { ArticleLayout } from "@/components/blog/ArticleLayout";
import { ArticleCTA } from "@/components/blog/ArticleCTA";
import { RelatedArticles } from "@/components/blog/RelatedArticles";

export const dynamicParams = false;

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = getPublishedPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  
  if (!post || post.draft) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `${siteConfig.url}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.modifiedAt || post.publishedAt,
      authors: [post.author],
      url: `${siteConfig.url}/blog/${post.slug}`,
      images: [
        {
          url: post.images.widescreen,
          width: 1200,
          height: 675,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.images.widescreen],
    },
  };
}

export default async function BlogPostPage({ params }: Params) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post || post.draft) {
    notFound();
  }

  let MDXContent;
  try {
    // Dynamically import the MDX file corresponding to the slug.
    // The @next/mdx compiler handles this via the next.config.ts configuration.
    const MDXModule = await import(`@/content/blog/${post.slug}.mdx`);
    MDXContent = MDXModule.default;
  } catch (error) {
    console.error(`Failed to load MDX for slug: ${post.slug}`, error);
    notFound();
  }

  // Generate BlogPosting JSON-LD
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: [post.images.square, post.images.standard, post.images.widescreen],
    datePublished: post.publishedAt,
    dateModified: post.modifiedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/favicon.ico`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
  };

  return (
    <>
      <JsonLd data={getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: post.title, url: `/blog/${post.slug}` }
      ])} />
      <JsonLd data={blogPostingSchema} />
      
      <ArticleLayout>
        <ArticleHeader post={post} />
        
        <div className="prose prose-lg max-w-none prose-blue">
          <MDXContent />
        </div>

        <ArticleCTA />
        
        <RelatedArticles currentSlug={post.slug} category={post.category} />
      </ArticleLayout>
    </>
  );
}
