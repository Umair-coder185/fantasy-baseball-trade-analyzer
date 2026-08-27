import { Player } from "./types";

export function isValidPlayer(data: any): data is Player {
  if (!data || typeof data !== "object") return false;

  // Required fields
  if (typeof data.id !== "string" || data.id.trim() === "") return false;
  if (typeof data.name !== "string" || data.name.trim() === "") return false;
  if (typeof data.team !== "string") return false;
  
  if (!Array.isArray(data.positions)) return false;
  if (data.positions.length === 0) return false;
  for (const pos of data.positions) {
    if (typeof pos !== "string") return false;
  }

  if (typeof data.rotoValue !== "number" || isNaN(data.rotoValue)) return false;
  if (typeof data.pointsValue !== "number" || isNaN(data.pointsValue)) return false;

  // Optional fields that, if present, must be of correct type
  if (data.slug !== undefined && typeof data.slug !== "string") return false;
  if (data.playerType !== undefined && !["Hitter", "Pitcher"].includes(data.playerType)) return false;
  if (data.updatedAt !== undefined && typeof data.updatedAt !== "string") return false;

  return true;
}
