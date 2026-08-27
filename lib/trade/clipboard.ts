import { TradeResult, Player } from "./types";

function getPlayerNames(players: Player[]): string {
  if (players.length === 0) return "None";
  return players.map((p) => p.name).join(", ");
}

export function formatTradeResultForClipboard(result: TradeResult, leagueSize: number, scoring: string): string {
  const scoringFormat = scoring === "roto" ? "Roto" : "Points";
  
  return `Fantasy Baseball Trade Analysis
Side A Receives: ${getPlayerNames(result.teamA.players)}
Side B Receives: ${getPlayerNames(result.teamB.players)}

Verdict: ${result.verdict}
Fairness Score: ${result.fairnessScore}/100
Format: ${leagueSize}-Team ${scoringFormat}

Analyzed at: ${window.location.href}`;
}
