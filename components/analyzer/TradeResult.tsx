import React, { useState } from "react";
import { TradeResult as TradeResultData } from "@/lib/trade/types";
import { Card, CardContent } from "@/components/ui/Card";
import { TradeGrade } from "./TradeGrade";
import { FairnessMeter } from "./FairnessMeter";
import { formatTradeResultForClipboard } from "@/lib/trade/clipboard";

interface TradeResultProps {
  result: TradeResultData;
  visible: boolean;
  leagueSize: number;
  scoring: string;
}

export function TradeResult({ result, visible, leagueSize, scoring }: TradeResultProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle");
  const [shareStatus, setShareStatus] = useState<"idle" | "copied">("idle");

  const handleCopyResult = async () => {
    try {
      const text = formatTradeResultForClipboard(result, leagueSize, scoring);
      await navigator.clipboard.writeText(text);
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleShareTrade = async () => {
    const shareData = {
      title: 'Fantasy Baseball Trade Analyzer',
      text: `Check out this trade analysis: ${result.verdict}`,
      url: window.location.href
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // Fallback if user cancels or it fails
        fallbackShare();
      }
    } else {
      fallbackShare();
    }
  };

  const fallbackShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareStatus("copied");
      setTimeout(() => setShareStatus("idle"), 2000);
    } catch (err) {
      console.error("Failed to copy link: ", err);
    }
  };

  return (
    <div
      className={`transition-all duration-500 ease-in-out origin-top ${
        visible ? "opacity-100 scale-y-100 h-auto" : "opacity-0 scale-y-0 h-0 overflow-hidden"
      }`}
      aria-live="polite"
    >
      <Card className="bg-white border-0 shadow-xl overflow-hidden relative mt-8">
        <div
          className={`absolute inset-0 opacity-[0.03] transition-colors duration-700 pointer-events-none ${
            result.isFair ? "bg-ballpark-green" : "bg-negative-red"
          }`}
        ></div>
        
        <CardContent className="p-6 sm:p-8 md:p-12 relative z-10 flex flex-col items-center text-center space-y-8 md:space-y-10">
          
          {/* Screen reader only explicit verdict */}
          <span className="sr-only">
            Analysis complete. The verdict is: {result.verdict}. Fairness score is {result.fairnessScore} out of 100.
          </span>

          <TradeGrade verdict={result.verdict} />
          
          <FairnessMeter 
            teamAValue={result.teamA.totalValue} 
            teamBValue={result.teamB.totalValue} 
          />

          <p className="text-main-text max-w-lg mx-auto text-base md:text-lg leading-relaxed border-t border-border-color pt-8 w-full">
            {result.explanation}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md pt-4">
            <button 
              onClick={handleCopyResult}
              className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-main-text font-bold rounded-lg transition-colors focus:ring-2 focus:ring-primary-blue focus:outline-none flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5 text-muted-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              {copyStatus === "copied" ? "Copied!" : "Copy Result"}
            </button>
            <button 
              onClick={handleShareTrade}
              className="flex-1 py-3 px-4 bg-primary-blue hover:bg-blue-700 text-white font-bold rounded-lg transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue focus:outline-none flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              {shareStatus === "copied" ? "Link Copied!" : "Copy Trade Link"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
