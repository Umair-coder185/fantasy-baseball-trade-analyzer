import { LeagueSize } from "./types";

/**
 * Gets the replacement level baseline value for a given league size.
 * In a smaller league (e.g. 8 teams), the waiver wire is rich, so
 * an empty roster spot is worth more. In a deep league (16 teams),
 * the waiver wire is thin, so a roster spot is worth less.
 */
export function getReplacementBaseline(leagueSize: LeagueSize): number {
  switch (leagueSize) {
    case 8: return 10;
    case 10: return 8;
    case 12: return 5;
    case 14: return 3;
    case 16: return 1;
    default: return 5;
  }
}
