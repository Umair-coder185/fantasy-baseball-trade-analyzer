import { Player } from "./types";

/**
 * Calculates total points value for a list of players.
 */
export function calculatePointsScore(players: Player[]): number {
  return players.reduce((sum, player) => sum + player.pointsValue, 0);
}
