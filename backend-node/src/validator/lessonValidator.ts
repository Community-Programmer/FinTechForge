import { z } from "zod";

export const lessonIdParamSchema = z.object({
  id: z.string().min(1, "Lesson ID is required"),
});

export const createLessonSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  duration: z.number().int().min(1, "Duration must be a positive integer"),
  xpReward: z.number().int().min(0, "XP Reward must be a non-negative integer"),
  category: z.string().min(1, "Category is required"),
  icon: z.string().min(1, "Icon is required"),
  learningPathId: z.string().min(1, "Learning Path ID is required"),
});

export const updateLessonSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  duration: z.number().int().min(1).optional(),
  xpReward: z.number().int().min(0).optional(),
  category: z.string().min(1).optional(),
  icon: z.string().min(1).optional(),
  learningPathId: z.string().min(1).optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: "At least one field must be provided for update",
});