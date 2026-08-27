import React from "react";

interface FairnessMeterProps {
  teamAValue: number;
  teamBValue: number;
}

export function FairnessMeter({ teamAValue, teamBValue }: FairnessMeterProps) {
  const totalValue = teamAValue + teamBValue;
  const teamAPercentage = totalValue > 0 ? (teamAValue / totalValue) * 100 : 50;

  return (
    <div className="w-full max-w-2xl space-y-3">
      <div className="flex justify-between text-lg font-bold">
        <span className="text-primary-blue">Team A Value: {teamAValue}</span>
        <span className="text-amber">Team B Value: {teamBValue}</span>
      </div>
      <div className="h-6 w-full bg-gray-200 rounded-full overflow-hidden flex shadow-inner">
        <div
          className="h-full bg-primary-blue transition-all duration-700 ease-in-out relative flex items-center justify-start px-2"
          style={{ width: `${teamAPercentage}%` }}
        >
        </div>
        <div
          className="h-full bg-amber transition-all duration-700 ease-in-out relative flex items-center justify-end px-2"
          style={{ width: `${100 - teamAPercentage}%` }}
        >
        </div>
      </div>
      <div className="flex justify-between text-xs font-semibold text-muted-text px-1">
        <span>{(teamAPercentage).toFixed(1)}% Share</span>
        <span>{(100 - teamAPercentage).toFixed(1)}% Share</span>
      </div>
    </div>
  );
}
