import { z } from "zod";

export const learningPathIdParamSchema = z.object({
  id: z.string().min(1, "Learning Path ID is required"),
});

export const createLearningPathSchema = z.object({
  title: z.string().min(1, "Title is required"),
  color: z.string().min(1, "Color is required"),
  icon: z.string().min(1, "Icon is required"),
});

export const updateLearningPathSchema = z.object({
  title: z.string().min(1).optional(),
  color: z.string().min(1).optional(),
  icon: z.string().min(1).optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: "At least one field must be provided for update",
});