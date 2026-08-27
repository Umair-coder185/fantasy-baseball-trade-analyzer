import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { getWebApplicationSchema } from "@/lib/seo/schemas";
import { HeroSection } from "@/components/sections/HeroSection";
import { TradeAnalyzer } from "@/components/analyzer/TradeAnalyzer";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { TradeEvaluationGuide } from "@/components/sections/TradeEvaluationGuide";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { LatestInsightsSection } from "@/components/sections/LatestInsightsSection";

export const metadata: Metadata = constructMetadata({
  title: "Fantasy Baseball Trade Analyzer 2026 | Free Trade Calculator",
  description: "Analyze fantasy baseball trades with league-aware player values, multi-player adjustments and Roto or Points settings. Free, fast and no signup.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd data={getWebApplicationSchema()} />
      <div className="flex flex-col w-full">
        {/* 1. Hero intro */}
        <HeroSection />

        {/* 2 & 3. Trade Analyzer (Result Area is inside) */}
        <section className="w-full py-12 md:py-16 px-4 sm:px-6 bg-page-background relative z-20 -mt-8 md:-mt-12">
          <TradeAnalyzer />
        </section>

        {/* 4. Trust strip */}
        <TrustStrip />

        {/* 5. Consolidated SEO Guide (How it works, Why it matters, Formats, Methodology) */}
        <TradeEvaluationGuide />
        
        {/* Blog Insights */}
        <LatestInsightsSection />

        {/* 6. FAQ */}
        <FAQSection />

        {/* 7. Final CTA */}
        <FinalCTA />
      </div>
    </>
  );
}
