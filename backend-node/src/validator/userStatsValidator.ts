import { z } from "zod";

export const updateUserStatsSchema = z.object({
  xp: z.number().int().min(0).optional(),
  level: z.number().int().min(1).optional(),
  dailyStreak: z.number().int().min(0).optional(),
  currentRank: z.string().min(1).optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: "At least one field must be provided for update",
});

export const addXpSchema = z.object({
  xpAmount: z.number().int().min(1, "XP amount must be a positive integer"),
});