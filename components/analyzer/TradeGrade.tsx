import React from "react";
import { Verdict } from "@/lib/trade/types";

interface TradeGradeProps {
  verdict: Verdict;
}

export function TradeGrade({ verdict }: TradeGradeProps) {
  // Map verdict to styling
  let textColorClass = "text-main-text";
  if (verdict.includes("Side A")) textColorClass = "text-primary-blue";
  if (verdict.includes("Side B")) textColorClass = "text-amber";
  if (verdict === "Fair Trade") textColorClass = "text-ballpark-green";

  return (
    <div className="space-y-2 text-center">
      <h3 className="text-sm font-bold tracking-widest uppercase text-muted-text">
        Trade Verdict
      </h3>
      <div className={`text-3xl md:text-5xl font-extrabold tracking-tight transition-colors duration-500 ${textColorClass}`}>
        {verdict}
      </div>
    </div>
  );
}
