import React from "react";
import { TradeSettings, LeagueSize } from "@/lib/trade/types";

interface LeagueSettingsProps {
  settings: TradeSettings;
  onChange: (newSettings: TradeSettings) => void;
}

export function LeagueSettings({ settings, onChange }: LeagueSettingsProps) {
  const handleScoringChange = (scoring: "roto" | "points") => {
    onChange({ ...settings, scoring });
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...settings, leagueSize: parseInt(e.target.value, 10) as LeagueSize });
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 p-4 bg-white border border-border-color rounded-xl shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-midnight-navy">League Type:</span>
        <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-md text-sm font-semibold cursor-not-allowed">
          Redraft Only (V1)
        </span>
      </div>

      <div className="h-px w-full md:h-8 md:w-px bg-border-color"></div>

      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
        <span className="text-sm font-bold text-midnight-navy">Scoring:</span>
        <div className="flex bg-page-background p-1 rounded-md border border-border-color/50">
          <button
            className={`px-4 py-1.5 text-sm font-bold rounded-md transition-colors ${
              settings.scoring === "roto" ? "bg-white text-primary-blue shadow-sm border border-border-color" : "text-muted-text hover:text-main-text"
            }`}
            onClick={() => handleScoringChange("roto")}
          >
            5x5 Roto
          </button>
          <button
            className={`px-4 py-1.5 text-sm font-bold rounded-md transition-colors ${
              settings.scoring === "points" ? "bg-white text-primary-blue shadow-sm border border-border-color" : "text-muted-text hover:text-main-text"
            }`}
            onClick={() => handleScoringChange("points")}
          >
            Points
          </button>
        </div>
      </div>

      <div className="h-px w-full md:h-8 md:w-px bg-border-color"></div>

      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
        <label htmlFor="leagueSize" className="text-sm font-bold text-midnight-navy">League Size:</label>
        <select
          id="leagueSize"
          value={settings.leagueSize}
          onChange={handleSizeChange}
          className="bg-page-background border border-border-color text-main-text text-sm rounded-md focus:ring-primary-blue focus:border-primary-blue block p-2 font-semibold"
        >
          {[8, 10, 12, 14, 16].map((size) => (
            <option key={size} value={size}>{size} Teams</option>
          ))}
        </select>
      </div>
    </div>
  );
}
