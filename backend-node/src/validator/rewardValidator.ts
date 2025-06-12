import { z } from "zod";

export const rewardIdParamSchema = z.object({
  id: z.string().min(1, "Reward ID is required"),
});