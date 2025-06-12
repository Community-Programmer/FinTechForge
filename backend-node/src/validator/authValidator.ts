import {z} from "zod";

export const signupSchema = z.object({
  username: z.string().min(2, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signinSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const generateResetTokenSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const resetPasswordBodySchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters"),
});

export const resetPasswordParamsSchema = z.object({
  token: z.string().min(1, "Token is required"),
});
export const verifyEmailParamsSchema = z.object({
  token: z.string().min(1, "Token is required"),
});
export const verifyResetTokenParamsSchema = z.object({
  token: z.string().min(1, "Token is required"),
});