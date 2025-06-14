import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateRequest = (
  schema: AnyZodObject,
  property: "body" | "query" | "params" = "body"
) => (req: Request, res: Response, next: NextFunction) => {
  const result = schema.safeParse(req[property]);
  if (!result.success) {
    res.status(400).json({ errors: result.error.errors });
    return; 
  }
  req[property] = result.data;
  next();
};