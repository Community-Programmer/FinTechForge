import { z } from "zod";

export const newsSentimentQuerySchema = z.object({
  url: z.string().url("A valid URL is required"),
});