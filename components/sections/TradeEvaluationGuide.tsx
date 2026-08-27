import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function TradeEvaluationGuide() {
  return (
    <section className="w-full py-20 bg-white border-t border-border-color">
      <Container className="max-w-3xl space-y-16">
        
        {/* Section 1 */}
        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold text-midnight-navy tracking-tight">
            How the Trade Analyzer Works
          </h2>
          <p className="text-lg text-main-text leading-relaxed">
            Evaluating a deal requires more than just gut instinct. Our fantasy baseball trade analyzer mathematically breaks down any potential transaction. Simply search for the players involved, assign them to either side of the trade, select your scoring settings, and click analyze. The engine instantly compares the total projected value of both sides and provides a clear verdict.
          </p>
          <p className="text-lg text-main-text leading-relaxed">
            You can also review individual <Link href="/fantasy-baseball-trade-values" className="text-primary-blue hover:underline">fantasy baseball trade values</Link> to see how players rank before assembling a package.
          </p>
        </div>

        {/* Section 2 */}
        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold text-midnight-navy tracking-tight">
            Why League Format Matters
          </h2>
          <p className="text-lg text-main-text leading-relaxed">
            A player's true worth changes drastically depending on the specific rules of your league. An elite base-stealer might be a first-round pick in one format but completely average in another. Our tool accounts for this by recalculating baselines on the fly.
          </p>
          
          <div className="pl-6 border-l-4 border-primary-blue space-y-8 mt-8">
            <div>
              <h3 className="text-xl font-bold text-midnight-navy">Why League Size Changes Trade Value</h3>
              <p className="text-main-text mt-2 leading-relaxed">
                In a shallow 8-team league, the free-agent pool is loaded with talent. This means you need elite superstars to gain an advantage. In a deep 16-team league, the waiver wire is barren, making depth incredibly valuable. The analyzer adjusts player values based on the scarcity created by your specific league size.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-midnight-navy">How Multi-Player Trades Are Evaluated</h3>
              <p className="text-main-text mt-2 leading-relaxed">
                A common mistake in a multi-player fantasy baseball trade is assuming that two average players equal one great player simply because their total projected points match. In reality, the team receiving two players must drop someone from their roster to make room. The engine automatically penalizes the larger side of an uneven trade to account for this lost roster spot.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold text-midnight-navy tracking-tight">
            Roto vs Points Trade Values
          </h2>
          <p className="text-lg text-main-text leading-relaxed">
            We operate two distinct evaluation engines depending on your selection. The <strong>Roto trade analyzer</strong> mode looks at category scarcity (like steals and saves) and ratio protection (ERA and WHIP). The <strong>Points league trade analyzer</strong> mode converts all production into a single currency, which traditionally elevates high-volume starting pitchers and hitters with excellent plate discipline. 
          </p>
        </div>

        {/* Section 4 */}
        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold text-midnight-navy tracking-tight">
            Understanding Replacement-Level Value
          </h2>
          <p className="text-lg text-main-text leading-relaxed">
            The foundation of our math is "Replacement Level." A player's value isn't their total projected stats; it's the difference between their stats and the stats of the best player available for free on the waiver wire. By using this baseline, we can accurately compare a starting pitcher to a shortstop.
          </p>
          <p className="text-lg text-main-text leading-relaxed">
            Want to dive deeper into the math? Read more <Link href="/about" className="text-primary-blue hover:underline">about us</Link> and our complete <Link href="/methodology" className="text-primary-blue hover:underline">methodology</Link>.
          </p>
        </div>

      </Container>
    </section>
  );
}
