import { Player, TradeSettings, LeagueSize } from "./types";

export interface ParsedTradeURL {
  teamAPlayerIds: string[];
  teamBPlayerIds: string[];
  settings: TradeSettings;
}

export function buildTradeURL(teamA: Player[], teamB: Player[], settings: TradeSettings): string {
  if (typeof window === "undefined") return "";

  const params = new URLSearchParams();
  
  if (teamA.length > 0) {
    params.set("receive", teamA.map(p => p.id).join(","));
  }
  
  if (teamB.length > 0) {
    params.set("trade", teamB.map(p => p.id).join(","));
  }

  // Only append non-default settings
  if (settings.scoring !== "roto") {
    params.set("format", settings.scoring);
  }
  
  if (settings.leagueSize !== 12) {
    params.set("teams", settings.leagueSize.toString());
  }

  const queryString = params.toString();
  const url = window.location.origin + window.location.pathname;
  return queryString ? `${url}?${queryString}` : url;
}

export function parseTradeFromURL(search: string): ParsedTradeURL | null {
  if (!search) return null;
  
  const params = new URLSearchParams(search);
  
  const receiveParam = params.get("receive");
  const tradeParam = params.get("trade");
  const formatParam = params.get("format");
  const teamsParam = params.get("teams");

  if (!receiveParam && !tradeParam) return null;

  const teamAPlayerIds = receiveParam ? receiveParam.split(",").map(id => id.trim()).filter(Boolean) : [];
  const teamBPlayerIds = tradeParam ? tradeParam.split(",").map(id => id.trim()).filter(Boolean) : [];

  // Parse scoring format (default roto)
  const scoring = formatParam === "points" ? "points" : "roto";

  // Parse league size (default 12)
  let leagueSize: LeagueSize = 12;
  if (teamsParam) {
    const parsedSize = parseInt(teamsParam, 10);
    if ([8, 10, 12, 14, 16].includes(parsedSize)) {
      leagueSize = parsedSize as LeagueSize;
    }
  }

  return {
    teamAPlayerIds,
    teamBPlayerIds,
    settings: {
      scoring,
      leagueSize,
    }
  };
}
