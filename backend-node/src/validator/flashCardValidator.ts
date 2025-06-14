import { z } from "zod";
import { objectIdSchema } from "./common";  

export const flashcardSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
});

export const flashcardDeckIdParamSchema = z.object({
  id: objectIdSchema,
});

export const createFlashcardDeckSchema = z.object({
  lessonId: objectIdSchema,
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  flashcards: z.array(flashcardSchema).min(1, "At least one flashcard is required"),
});

export const updateFlashcardDeckSchema = z.object({
  lessonId: objectIdSchema.optional(),
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  flashcards: z.array(flashcardSchema).optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: "At least one field must be provided for update",
});