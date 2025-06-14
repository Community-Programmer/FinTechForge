import { z } from "zod";
import { objectIdSchema } from "./common";
export const skillChallengeIdParamSchema = z.object({
  id: objectIdSchema,
});

export const createSkillChallengeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  difficulty: z.enum(["easy", "medium", "hard"]),
  xpReward: z.number().int().min(0, "XP Reward must be a non-negative integer"),
});

export const updateSkillChallengeSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  difficulty: z.enum(["easy", "medium", "hard"]).optional(),
  xpReward: z.number().int().min(0).optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: "At least one field must be provided for update",
});