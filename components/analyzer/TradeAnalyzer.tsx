"use client";

import React, { useState, useEffect } from "react";
import { Player, TradeSettings, TradeResult as TradeResultType } from "@/lib/trade/types";
import { calculateTrade } from "@/lib/trade/calculateTrade";
import { isValidPlayer } from "@/lib/trade/validation";
import { demoPlayers } from "@/data/demoPlayers";
import { Button } from "@/components/ui/Button";
import { parseTradeFromURL, buildTradeURL } from "@/lib/trade/urlSync";

import { LeagueSettings } from "./LeagueSettings";
import { TradeSide } from "./TradeSide";
import { TradeResult } from "./TradeResult";

export function TradeAnalyzer() {
  const [teamAPlayers, setTeamAPlayers] = useState<Player[]>([]);
  const [teamBPlayers, setTeamBPlayers] = useState<Player[]>([]);
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);
  
  const [isDemo, setIsDemo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [settings, setSettings] = useState<TradeSettings>({
    scoring: "roto",
    leagueSize: 12,
  });

  const [tradeResult, setTradeResult] = useState<TradeResultType | null>(null);
  const [isResultVisible, setIsResultVisible] = useState(false);
  const [hasInitializedUrl, setHasInitializedUrl] = useState(false);

  // Load players and hydrate from URL on mount
  useEffect(() => {
    async function fetchPlayers() {
      try {
        const res = await fetch("/data/players.json");
        if (!res.ok) throw new Error("Failed to fetch production data");
        const rawData = await res.json();
        
        if (!Array.isArray(rawData)) throw new Error("Production data is not an array");
        
        const validPlayers = rawData.filter((p) => {
          if (isValidPlayer(p)) return true;
          console.warn("Invalid player record dropped:", p);
          return false;
        });

        if (validPlayers.length === 0) throw new Error("No valid players found");

        setAllPlayers(validPlayers);
        setIsDemo(false);
        hydrateFromUrl(validPlayers);
      } catch (err) {
        console.warn("Using demo data fallback:", err);
        const validDemo = demoPlayers.filter(isValidPlayer);
        if (validDemo.length > 0) {
          setAllPlayers(validDemo);
          setIsDemo(true);
          hydrateFromUrl(validDemo);
        } else {
          setError("Failed to load player dataset.");
        }
      } finally {
        setIsLoading(false);
      }
    }

    function hydrateFromUrl(players: Player[]) {
      if (typeof window === "undefined") return;
      const parsed = parseTradeFromURL(window.location.search);
      
      if (parsed) {
        const teamA = parsed.teamAPlayerIds.map(id => players.find(p => p.id === id)).filter(Boolean) as Player[];
        const teamB = parsed.teamBPlayerIds.map(id => players.find(p => p.id === id)).filter(Boolean) as Player[];
        
        // Ensure no duplicates between sides
        const cleanTeamB = teamB.filter(p => !teamA.some(a => a.id === p.id));

        if (teamA.length > 0) setTeamAPlayers(teamA);
        if (cleanTeamB.length > 0) setTeamBPlayers(cleanTeamB);
        
        setSettings(parsed.settings);
        
        // Auto-analyze if both sides have players from the URL
        if (teamA.length > 0 && cleanTeamB.length > 0) {
          const result = calculateTrade(teamA, cleanTeamB, parsed.settings);
          setTradeResult(result);
          setTimeout(() => setIsResultVisible(true), 50);
        }
      }
      setHasInitializedUrl(true);
    }

    fetchPlayers();
  }, []);

  // Sync state to URL
  useEffect(() => {
    if (!hasInitializedUrl) return;
    const url = buildTradeURL(teamAPlayers, teamBPlayers, settings);
    window.history.replaceState({}, "", url);
  }, [teamAPlayers, teamBPlayers, settings, hasInitializedUrl]);

  const availablePlayers = allPlayers.filter(
    (p) => !teamAPlayers.some((ta) => ta.id === p.id) && !teamBPlayers.some((tb) => tb.id === p.id)
  );

  const handleAddPlayer = (player: Player, side: "teamA" | "teamB") => {
    setIsResultVisible(false);
    if (side === "teamA") {
      setTeamAPlayers([...teamAPlayers, player]);
    } else {
      setTeamBPlayers([...teamBPlayers, player]);
    }
  };

  const handleRemovePlayer = (playerId: string, side: "teamA" | "teamB") => {
    setIsResultVisible(false);
    if (side === "teamA") {
      setTeamAPlayers(teamAPlayers.filter((p) => p.id !== playerId));
    } else {
      setTeamBPlayers(teamBPlayers.filter((p) => p.id !== playerId));
    }
  };

  const handleSwap = () => {
    setIsResultVisible(false);
    const tempA = [...teamAPlayers];
    setTeamAPlayers(teamBPlayers);
    setTeamBPlayers(tempA);
  };

  const handleReset = () => {
    setTeamAPlayers([]);
    setTeamBPlayers([]);
    setSettings({ scoring: "roto", leagueSize: 12 });
    setIsResultVisible(false);
    setTradeResult(null);
  };

  const handleAnalyze = () => {
    const result = calculateTrade(teamAPlayers, teamBPlayers, settings);
    setTradeResult(result);
    setTimeout(() => setIsResultVisible(true), 10);
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-5xl mx-auto py-24 flex flex-col items-center justify-center text-muted-text space-y-4">
        <div className="w-8 h-8 border-4 border-border-color border-t-primary-blue rounded-full animate-spin"></div>
        <p className="font-semibold text-lg animate-pulse">Loading player dataset...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-5xl mx-auto py-12 bg-negative-red/10 border border-negative-red/20 rounded-xl text-center space-y-4">
        <h3 className="text-xl font-bold text-negative-red">Unable to Load Analyzer</h3>
        <p className="text-main-text">{error}</p>
        <Button onClick={() => window.location.reload()} variant="secondary">Try Again</Button>
      </div>
    );
  }

  const isAnalyzeDisabled = teamAPlayers.length === 0 || teamBPlayers.length === 0;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {isDemo && (
        <div className="bg-amber/10 border border-amber/20 text-amber font-bold text-center py-2 px-4 rounded-md text-sm">
          Development Demo Data Active — Using sample projections
        </div>
      )}

      {/* Global Settings */}
      <LeagueSettings settings={settings} onChange={(s) => {
        setSettings(s);
        setIsResultVisible(false);
      }} />

      {/* Trade Construction Area */}
      <div className="grid lg:grid-cols-[1fr,auto,1fr] gap-6 items-stretch">
        
        {/* Team A */}
        <div className="flex flex-col h-full min-w-0">
          <TradeSide 
            title="YOU RECEIVE"
            themeColor="blue"
            selectedPlayers={teamAPlayers}
            availablePlayers={availablePlayers}
            scoring={settings.scoring}
            onAddPlayer={(p) => handleAddPlayer(p, "teamA")}
            onRemovePlayer={(id) => handleRemovePlayer(id, "teamA")}
          />
        </div>

        {/* Center Controls */}
        <div className="flex flex-row lg:flex-col items-center justify-center gap-4 py-2 lg:py-0">
          <button 
            onClick={handleSwap}
            className="p-3 bg-white border border-border-color rounded-full shadow-sm hover:bg-gray-50 hover:border-primary-blue focus:ring-2 focus:ring-primary-blue focus:outline-none transition-all text-muted-text hover:text-primary-blue group"
            title="Swap Sides"
            aria-label="Swap trade sides"
          >
            <svg className="w-6 h-6 transform lg:rotate-0 rotate-90 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </button>
          <button 
            onClick={handleReset}
            className="text-xs font-bold text-muted-text hover:text-negative-red focus:outline-none focus:underline transition-colors px-2 py-1"
            aria-label="Reset trade analyzer"
          >
            Reset
          </button>
        </div>

        {/* Team B */}
        <div className="flex flex-col h-full min-w-0">
          <TradeSide 
            title="YOU TRADE AWAY"
            themeColor="amber"
            selectedPlayers={teamBPlayers}
            availablePlayers={availablePlayers}
            scoring={settings.scoring}
            onAddPlayer={(p) => handleAddPlayer(p, "teamB")}
            onRemovePlayer={(id) => handleRemovePlayer(id, "teamB")}
          />
        </div>

      </div>

      {/* Analyze Action */}
      <div className="flex flex-col items-center justify-center pt-4">
        <Button 
          size="lg" 
          onClick={handleAnalyze} 
          disabled={isAnalyzeDisabled}
          className={`text-lg px-12 py-6 w-full max-w-xs font-extrabold shadow-lg ${isAnalyzeDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 transition-transform'}`}
        >
          Analyze Trade
        </Button>
        {isAnalyzeDisabled && (
          <p className="text-sm text-negative-red mt-3 font-semibold text-center" aria-live="polite">
            {teamAPlayers.length === 0 && teamBPlayers.length === 0 
              ? "Add players to both sides to begin." 
              : "Add players to the other side to analyze."}
          </p>
        )}
      </div>

      {/* Trade Result Area */}
      {tradeResult && (
        <TradeResult 
          result={tradeResult} 
          visible={isResultVisible} 
          leagueSize={settings.leagueSize}
          scoring={settings.scoring}
        />
      )}
    </div>
  );
}
