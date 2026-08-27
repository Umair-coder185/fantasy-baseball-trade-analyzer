import { Metadata } from "next";
import { siteConfig } from "./site";

interface MetadataProps {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
  path?: string;
}

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = "/favicon.ico",
  noIndex = false,
  path = "",
}: MetadataProps = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
      url: `${siteConfig.url}${path}`,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@placeholder",
    },
    icons,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: path === "/" ? siteConfig.url : `${siteConfig.url}${path}`,
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: true,
      },
    }),
  };
}
