import { Player } from "./types";

/**
 * Calculates total roto value for a list of players.
 */
export function calculateRotoScore(players: Player[]): number {
  return players.reduce((sum, player) => sum + player.rotoValue, 0);
}
