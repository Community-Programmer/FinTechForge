import { z } from "zod";

export const getChatbotResponseQuerySchema = z.object({
  query: z.string().min(1, "Query is required"),
});