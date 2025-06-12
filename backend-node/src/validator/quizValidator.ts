import { z } from "zod";

export const quizIdParamSchema = z.object({
  id: z.string().min(1, "Quiz ID is required"),
});

export const quizQuestionSchema = z.object({
  question: z.string().min(1, "Question is required"),
  options: z.array(z.string().min(1, "Option is required")).min(2, "At least two options are required"),
  correctAnswer: z.number().int().min(0, "Correct answer index is required"),
});

export const createQuizSchema = z.object({
  lessonId: z.string().min(1, "Lesson ID is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  xpReward: z.number().int().min(0, "XP Reward must be a non-negative integer"),
  questions: z.array(quizQuestionSchema).min(1, "At least one question is required"),
});

export const updateQuizSchema = z.object({
  lessonId: z.string().min(1).optional(),
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
      questionId: z.string().min(1, "Question ID is required"),
      answerIndex: z.number().int().min(0, "Answer index is required"),
    })
  ).min(1, "At least one answer is required"),
});