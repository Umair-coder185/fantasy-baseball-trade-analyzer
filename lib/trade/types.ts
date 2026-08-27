export interface Player {
  id: string;
  slug?: string;
  name: string;
  team: string;
  positions: string[];
  playerType?: "Hitter" | "Pitcher";
  rotoValue: number;
  pointsValue: number;
  updatedAt?: string;
}

export type TradeSide = "teamA" | "teamB";

export type LeagueSize = 8 | 10 | 12 | 14 | 16;

export interface TradeSettings {
  scoring: "roto" | "points";
  leagueSize: LeagueSize;
}

export type Verdict =
  | "Strong Advantage — Side A"
  | "Advantage — Side A"
  | "Slight Advantage — Side A"
  | "Fair Trade"
  | "Slight Advantage — Side B"
  | "Advantage — Side B"
  | "Strong Advantage — Side B";

export interface TradeResult {
  teamA: {
    players: Player[];
    totalValue: number;
    netValue: number;
  };
  teamB: {
    players: Player[];
    totalValue: number;
    netValue: number;
  };
  isFair: boolean;
  fairnessScore: number; // Normalized 0 to 100
  verdict: Verdict;
  explanation: string;
}
