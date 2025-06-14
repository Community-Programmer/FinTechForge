import { z } from "zod";
import { objectIdSchema } from "./common";

export const rewardIdParamSchema = z.object({
  id: objectIdSchema,
});