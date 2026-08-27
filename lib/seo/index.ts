import { Metadata } from "next";

/**
 * Helper function to generate default metadata for pages
 */
export function constructMetadata({
  title = "Fantasy Baseball Trade Analyzer",
  description = "Evaluate your fantasy baseball trades with precision and confidence.",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
