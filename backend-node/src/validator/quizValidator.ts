import { z } from "zod";
import { objectIdSchema } from "./common";
export const quizIdParamSchema = z.object({
  id: objectIdSchema,
});

export const quizQuestionSchema = z.object({
  question: z.string().min(1, "Question is required"),
  options: z.array(z.string().min(1, "Option is required")).min(2, "At least two options are required"),
  correctAnswer: z.number().int().min(0, "Correct answer index is required"),
});

export const createQuizSchema = z.object({
  lessonId: objectIdSchema,
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  xpReward: z.number().int().min(0, "XP Reward must be a non-negative integer"),
  questions: z.array(quizQuestionSchema).min(1, "At least one question is required"),
});

export const updateQuizSchema = z.object({
  lessonId: objectIdSchema.optional(),
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  xpReward: z.number().int().min(0).optional(),
  questions: z.array(quizQuestionSchema).optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: "At least one field must be provided for update",
});

export const submitQuizSchema = z.object({
  answers: z.array(
    z.object({
      questionId: objectIdSchema,
      answerIndex: z.number().int().min(0, "Answer index is required"),
    })
  ).min(1, "At least one answer is required"),
});