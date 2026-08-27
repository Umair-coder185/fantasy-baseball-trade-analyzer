import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";

// This file is required to use @next/mdx in the `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold text-midnight-navy mt-12 mb-6 tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-bold text-midnight-navy mt-8 mb-4">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-lg leading-relaxed text-main-text font-light mb-6">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-main-text font-light marker:text-primary-blue">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2 text-lg text-main-text font-light marker:text-primary-blue">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-main-text font-light">
        {children}
      </li>
    ),
    a: ({ href, children }) => {
      if (href?.startsWith("/")) {
        return (
          <Link href={href} className="text-primary-blue font-semibold hover:underline underline-offset-2 transition-colors">
            {children}
          </Link>
        );
      }
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary-blue font-semibold hover:underline underline-offset-2 transition-colors">
          {children}
        </a>
      );
    },
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary-blue pl-6 py-2 my-8 text-xl font-medium italic text-midnight-navy bg-gray-50 rounded-r-lg">
        {children}
      </blockquote>
    ),
    img: ({ src, alt }) => {
      if (!src) return null;
      return (
        <div className="my-10 w-full overflow-hidden rounded-2xl shadow-lg border border-border-color">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt || "Article image"} className="w-full h-auto object-cover" />
        </div>
      );
    },
    strong: ({ children }) => (
      <strong className="font-bold text-midnight-navy">{children}</strong>
    ),
    table: ({ children }) => (
      <div className="w-full overflow-x-auto my-8 border border-border-color rounded-xl shadow-sm">
        <table className="w-full text-left border-collapse min-w-[600px]">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="bg-gray-50 border-b border-border-color p-4 font-bold text-midnight-navy text-sm uppercase tracking-wider">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border-b border-border-color p-4 text-main-text">
        {children}
      </td>
    ),
    ...components,
  };
}
