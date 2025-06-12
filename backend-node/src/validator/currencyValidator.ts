import { z } from "zod";

export const convertCurrencyQuerySchema = z.object({
  amount: z.preprocess(
    (val) => Number(val),
    z.number({ required_error: "Amount is required" }).positive("Amount must be positive")
  ),
  from: z.string().min(1, "From currency is required"),
  to: z.string().min(1, "To currency is required"),
});