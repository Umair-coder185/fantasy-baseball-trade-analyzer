import React from "react";
import { Player } from "@/lib/trade/types";

interface SelectedPlayerProps {
  player: Player;
  scoring: "roto" | "points";
  onRemove: () => void;
}

export function SelectedPlayer({ player, scoring, onRemove }: SelectedPlayerProps) {
  const displayValue = scoring === "roto" ? player.rotoValue : player.pointsValue;

  return (
    <div className="group flex items-center justify-between p-3 bg-white border border-border-color rounded-lg shadow-sm hover:border-primary-blue hover:shadow-md transition-all duration-200">
      <div className="flex-1 min-w-0">
        <div className="font-bold text-main-text truncate">{player.name}</div>
        <div className="text-xs text-muted-text mt-0.5 truncate">
          {player.team} &bull; {player.positions.join(", ")}
        </div>
      </div>
      <div className="flex items-center gap-4 pl-3 border-l border-border-color ml-3">
        <div className="flex flex-col items-end">
          <span className="text-xs font-bold text-muted-text uppercase tracking-wider">Value</span>
          <span className="font-extrabold text-lg text-midnight-navy leading-none">
            {displayValue}
          </span>
        </div>
        <button
          onClick={onRemove}
          className="text-gray-400 hover:text-negative-red hover:bg-red-50 rounded-full p-1.5 transition-colors"
          aria-label={`Remove ${player.name}`}
          title="Remove player"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
