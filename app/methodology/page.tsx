import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema } from "@/lib/seo/schemas";

export const metadata: Metadata = constructMetadata({
  title: "How Our Fantasy Baseball Trade Analyzer Works",
  description: "Learn about the methodology behind our fantasy baseball trade analysis, including roto scores, points values, and net replacement logic.",
  path: "/methodology",
});

export default function MethodologyPage() {
  return (
    <>
      <JsonLd data={getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Methodology", url: "/methodology" }
      ])} />
      <div className="max-w-4xl mx-auto py-12 px-6 space-y-12">
        
        <header className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-midnight-navy tracking-tight">
            Methodology & Transparency
          </h1>
          <p className="text-xl text-muted-text max-w-2xl">
            We don't believe in "black box" trade calculators. Here is exactly how our engine evaluates your fantasy baseball trades.
          </p>
        </header>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-midnight-navy border-b border-border-color pb-2">
            The Core Formula
          </h2>
          <p className="text-main-text text-lg">
            Every trade is evaluated using a comprehensive formula that accounts for context, not just raw stats:
          </p>
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 font-mono text-sm md:text-base text-primary-blue shadow-inner flex flex-col items-center text-center space-y-2">
            <span>Player Value</span>
            <span className="text-amber text-xl">+</span>
            <span>League Depth Adjustment</span>
            <span className="text-amber text-xl">+</span>
            <span>Replacement Value</span>
            <span className="text-amber text-xl">+</span>
            <span>Scoring Format</span>
            <span className="text-midnight-navy text-xl font-bold border-t border-gray-300 w-1/2 pt-2 mt-2">=</span>
            <span className="font-extrabold text-lg text-midnight-navy">Adjusted Trade Value</span>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-midnight-navy border-b border-border-color pb-2">
            Evaluating Unequal Trades (2-for-1s)
          </h2>
          <p className="text-main-text text-lg leading-relaxed">
            The most common mistake fantasy managers make is evaluating 2-for-1 or 3-for-2 trades by simply adding up player projections. This is fundamentally flawed because roster space is a finite resource.
          </p>
          <p className="text-main-text text-lg leading-relaxed">
            If you trade two good players for one elite player, the team receiving the elite player gains an empty roster spot. That spot isn't worth zero—it's worth whatever the best available player on the waiver wire (replacement level) is projected to score.
          </p>
          
          <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 mt-4">
            <h3 className="font-bold text-midnight-navy mb-4">How we calculate it:</h3>
            <div className="grid md:grid-cols-[1fr,auto,1fr] gap-6 items-center text-center font-semibold text-lg">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-border-color">
                <div className="text-primary-blue">Player A</div>
                <div className="text-muted-text text-sm my-2">+</div>
                <div className="text-main-text text-sm">Replacement-Level Roster Value</div>
              </div>
              <div className="text-muted-text italic text-xl">vs</div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-border-color">
                <div className="text-amber">Player B</div>
                <div className="text-muted-text text-sm my-2">+</div>
                <div className="text-amber">Player C</div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-midnight-navy border-b border-border-color pb-2">
            Scoring Formats & League Size
          </h2>
          <ul className="space-y-4 text-main-text text-lg list-disc pl-5">
            <li>
              <strong>Roto vs Points:</strong> Rotisserie formats value category scarcity (like stolen bases and saves). Points leagues assign rigid mathematical value to outcomes. Our engine actively switches the baseline metrics based on your selection.
            </li>
            <li>
              <strong>League Depth:</strong> An empty roster spot in an 8-team league is incredibly valuable because the waiver wire is loaded with talent. An empty spot in a 16-team league is nearly worthless. We dynamically scale the replacement-level penalty based on your league size selection.
            </li>
          </ul>
        </section>

      </div>
    </>
  );
}
