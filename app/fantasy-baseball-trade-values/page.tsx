import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema } from "@/lib/seo/schemas";

export const metadata: Metadata = constructMetadata({
  title: "Fantasy Baseball Trade Values 2026 | Player Value Chart",
  description: "View comprehensive fantasy baseball trade value charts based on projected rest-of-season statistics. Compare Roto and Points league player valuations.",
  path: "/fantasy-baseball-trade-values",
});

export default function TradeValuesPage() {
  return (
    <>
      <JsonLd data={getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Trade Values", url: "/fantasy-baseball-trade-values" }
      ])} />
      <div className="max-w-4xl mx-auto py-12 px-6 space-y-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-midnight-navy tracking-tight">
          Fantasy Baseball Trade Values
        </h1>
        <p className="text-lg text-muted-text">
          Our player trade values are generated using comprehensive rest-of-season projections. We factor in league size, scoring format, and positional scarcity.
        </p>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-midnight-navy">How We Calculate Values</h2>
          <p className="text-main-text">
            Trade values are derived by converting projected player statistics into standardized scores (z-scores) relative to replacement level in a 12-team mixed league.
          </p>
          <p className="text-main-text">
            A player's trade value is NOT a strict ranking, but a measure of surplus value they provide over a waiver-wire replacement based on our underlying projection models.
          </p>
        </section>

        <section className="p-6 bg-blue-50 border border-blue-100 rounded-lg">
          <h2 className="text-xl font-bold text-primary-blue mb-2">Full Trade Value Charts</h2>
          <p className="text-main-text">
            Comprehensive positional and overall trade value charts are currently being finalized for the 2026 season based on our simulated projections. Use the Trade Analyzer on the homepage to compare specific players right now.
          </p>
        </section>
      </div>
    </>
  );
}
