import test from "node:test";
import assert from "node:assert/strict";
import { calculateTrade } from "../calculateTrade";
import { Player, TradeSettings } from "../types";

const mockPlayer = (id: string, roto: number, points: number): Player => ({
  id,
  name: `Player ${id}`,
  team: "NYY",
  positions: ["OF"],
  rotoValue: roto,
  pointsValue: points,
});

const defaultSettings: TradeSettings = {
  scoring: "roto",
  leagueSize: 12, // Baseline replacement value is 5
};

test("1-for-1 Equal Trade", () => {
  const pA = mockPlayer("A1", 20, 20);
  const pB = mockPlayer("B1", 20, 20);
  
  const result = calculateTrade([pA], [pB], defaultSettings);
  
  assert.equal(result.isFair, true);
  assert.equal(result.fairnessScore, 100);
  assert.equal(result.verdict, "Fair Trade");
});

test("1-for-1 Advantage Trade", () => {
  const pA = mockPlayer("A1", 20, 20);
  const pB = mockPlayer("B1", 10, 10);
  
  // Total value = 30. Diff = 10. Percentage = 10/30 = 33% > 15% (Strong Advantage)
  const result = calculateTrade([pA], [pB], defaultSettings);
  
  assert.equal(result.isFair, false);
  assert.equal(result.fairnessScore, 50); // 10/20 = 50
  assert.equal(result.verdict, "Strong Advantage — Side A");
});

test("2-for-1 Trade handles replacement value logic", () => {
  const pA1 = mockPlayer("A1", 20, 20); // Side A gives 20
  const pB1 = mockPlayer("B1", 10, 10);
  const pB2 = mockPlayer("B2", 10, 10); // Side B gives 20
  
  // CountDiff = -1 (Team B gives 1 more player than Team A).
  // Therefore Team A must drop 1 player to make room.
  // Team B's base value (received by A) is penalized by the baseline (5 for 12-team).
  // Team B given value = 20 - 5 = 15.
  // Team A given value = 20.
  // Total value = 35. Diff = 5.
  // Percentage diff = 5 / 35 = ~14.2% -> Advantage Side A
  
  const result = calculateTrade([pA1], [pB1, pB2], defaultSettings);
  
  assert.equal(result.teamB.totalValue, 15);
  assert.equal(result.verdict, "Advantage — Side A");
});

test("3-for-2 Trade handles replacement value correctly", () => {
  // A gives 3 (30), B gives 2 (30)
  const teamA = [mockPlayer("A1", 10, 10), mockPlayer("A2", 10, 10), mockPlayer("A3", 10, 10)];
  const teamB = [mockPlayer("B1", 15, 15), mockPlayer("B2", 15, 15)];
  
  // CountDiff = +1. B drops 1.
  // A's base value penalized by 5. A = 25. B = 30.
  const result = calculateTrade(teamA, teamB, defaultSettings);
  assert.equal(result.teamA.totalValue, 25);
  assert.equal(result.teamB.totalValue, 30);
});

test("Empty sides handle gracefully", () => {
  const pA = mockPlayer("A1", 20, 20);
  
  const result = calculateTrade([pA], [], defaultSettings);
  
  assert.equal(result.fairnessScore, 0);
  assert.equal(result.teamB.totalValue, 0); // They gave nothing
  assert.equal(result.isFair, false);
});

test("Different league sizes yield different penalties", () => {
  const pA = mockPlayer("A1", 20, 20);
  const teamB = [mockPlayer("B1", 10, 10), mockPlayer("B2", 10, 10)];
  
  // 8 team -> penalty 10. B = 20 - 10 = 10.
  const res8 = calculateTrade([pA], teamB, { ...defaultSettings, leagueSize: 8 });
  assert.equal(res8.teamB.totalValue, 10);

  // 16 team -> penalty 1. B = 20 - 1 = 19.
  const res16 = calculateTrade([pA], teamB, { ...defaultSettings, leagueSize: 16 });
  assert.equal(res16.teamB.totalValue, 19);
});

test("Points vs Roto logic works correctly", () => {
  const pA = mockPlayer("A1", 10, 50); // Roto 10, Points 50
  const pB = mockPlayer("B1", 20, 25); // Roto 20, Points 25
  
  // Roto: A=10, B=20. Advantage Side B.
  const resRoto = calculateTrade([pA], [pB], { scoring: "roto", leagueSize: 12 });
  assert.equal(resRoto.teamA.totalValue, 10);
  assert.equal(resRoto.teamB.totalValue, 20);
  
  // Points: A=50, B=25. Advantage Side A.
  const resPoints = calculateTrade([pA], [pB], { scoring: "points", leagueSize: 12 });
  assert.equal(resPoints.teamA.totalValue, 50);
  assert.equal(resPoints.teamB.totalValue, 25);
});
