import { MAX_FAIRNESS_SCORE } from "./constants";

/**
 * Normalizes a ratio between two values into a 0-100 fairness score.
 * A perfectly equal trade returns 100.
 * A trade with 0 value on one side returns 0.
 */
export function calculateFairnessScore(teamAValue: number, teamBValue: number): number {
  if (teamAValue === 0 && teamBValue === 0) return MAX_FAIRNESS_SCORE; // 0 for 0 is "fair"
  if (teamAValue <= 0 || teamBValue <= 0) return 0; // One side has zero or negative value
  
  const minVal = Math.min(teamAValue, teamBValue);
  const maxVal = Math.max(teamAValue, teamBValue);
  
  const ratio = minVal / maxVal;
  return Math.round(ratio * MAX_FAIRNESS_SCORE);
}

/**
 * Calculates the percentage difference between two values for grading.
 * E.g., a 10 and a 12 would be a 20% difference relative to the smaller (wait, actually relative to the total value for symmetry, or relative to the larger?)
 * The previous logic used Math.abs(A - B) / (A + B). Let's standardize that here.
 */
export function calculateDifferencePercentage(teamAValue: number, teamBValue: number): number {
  const totalValue = teamAValue + teamBValue;
  if (totalValue <= 0) return 0;
  
  return Math.abs(teamAValue - teamBValue) / totalValue;
}
