import { Player, TradeSettings, TradeResult, Verdict } from "./types";
import { calculateRotoScore } from "./rotoScore";
import { calculatePointsScore } from "./pointsScore";
import { getReplacementBaseline } from "./replacementValue";
import { calculateFairnessScore, calculateDifferencePercentage } from "./normalizeValue";
import { TRADE_THRESHOLDS } from "./constants";

export function calculateTrade(
  teamAPlayers: Player[],
  teamBPlayers: Player[],
  settings: TradeSettings
): TradeResult {
  const getScore = (players: Player[]) =>
    settings.scoring === "roto"
      ? calculateRotoScore(players)
      : calculatePointsScore(players);

  let teamABaseValue = getScore(teamAPlayers);
  let teamBBaseValue = getScore(teamBPlayers);

  // Unequal trade size adjustment logic
  const countDiff = teamAPlayers.length - teamBPlayers.length;
  if (countDiff > 0) {
    // Team A gives more players than Team B. Team B must drop `countDiff` players to make room.
    // Team A's received value (teamBBaseValue) isn't directly changed, but Team B is effectively losing value by dropping.
    // To balance the equation from the engine's perspective, we subtract the replacement value from Team A's side.
    const replacementAdjustment = countDiff * getReplacementBaseline(settings.leagueSize);
    teamABaseValue = Math.max(0, teamABaseValue - replacementAdjustment);
  } else if (countDiff < 0) {
    // Team B gives more players. Team A must drop `Math.abs(countDiff)` players.
    const replacementAdjustment = Math.abs(countDiff) * getReplacementBaseline(settings.leagueSize);
    teamBBaseValue = Math.max(0, teamBBaseValue - replacementAdjustment);
  }

  const teamANet = teamBBaseValue - teamABaseValue;
  const teamBNet = teamABaseValue - teamBBaseValue;

  const fairnessScore = calculateFairnessScore(teamABaseValue, teamBBaseValue);
  const diffPercentage = calculateDifferencePercentage(teamABaseValue, teamBBaseValue);
  
  const isFair = diffPercentage <= TRADE_THRESHOLDS.ADVANTAGE; 

  // Determine Verdict
  let verdict: Verdict = "Fair Trade";
  if (diffPercentage >= TRADE_THRESHOLDS.STRONG_ADVANTAGE) {
    verdict = teamABaseValue > teamBBaseValue ? "Strong Advantage — Side B" : "Strong Advantage — Side A";
  } else if (diffPercentage >= TRADE_THRESHOLDS.ADVANTAGE) {
    verdict = teamABaseValue > teamBBaseValue ? "Advantage — Side B" : "Advantage — Side A";
  } else if (diffPercentage >= TRADE_THRESHOLDS.SLIGHT_ADVANTAGE) {
    verdict = teamABaseValue > teamBBaseValue ? "Slight Advantage — Side B" : "Slight Advantage — Side A";
  }

  // Explanation logic
  let explanation = "This trade is exceptionally balanced and benefits both teams.";
  if (diffPercentage >= TRADE_THRESHOLDS.ADVANTAGE) {
    const favoredTeam = teamABaseValue > teamBBaseValue ? "Team B" : "Team A";
    const diffDisplay = Math.round(diffPercentage * 100);
    explanation = `${favoredTeam} receives approximately ${diffDisplay}% more value in this exchange.`;
    
    if (countDiff !== 0) {
      explanation += " The unequal number of players traded forces a roster drop, which heavily influenced this result due to replacement-level penalties.";
    }
  }

  return {
    teamA: {
      players: teamAPlayers,
      totalValue: teamABaseValue,
      netValue: teamANet,
    },
    teamB: {
      players: teamBPlayers,
      totalValue: teamBBaseValue,
      netValue: teamBNet,
    },
    isFair,
    fairnessScore,
    verdict,
    explanation
  };
}
