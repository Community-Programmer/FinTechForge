import { z } from "zod";

export const completeModuleSchema = z.object({
  lessonId: z.string().min(1, "Lesson ID is required"),
  xpEarned: z.number().int().min(0, "XP must be a non-negative integer"),
});

export const addAchievementSchema = z.object({
  type: z.string().min(1, "Type is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  color: z.string().optional(),
  requirement: z.string().optional(),
});

export const updateSkillTreeSchema = z.object({
  skillTreeId: z.string().min(1, "Skill Tree ID is required"),
  progress: z.number().min(0, "Progress must be a non-negative number"),
});