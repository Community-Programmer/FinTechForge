import { Router } from "express";
import passport from "passport";
import {
  signup,
  signin,
  verifyEmail,
  googleCallback,
  githubCallback,
  resetPassword,
  refreshToken,
  generateResetToken,
  verifyResetToken,
} from "./authController";
import {
  signupSchema,
  signinSchema,
  generateResetTokenSchema,
  resetPasswordBodySchema,
  resetPasswordParamsSchema,
  verifyEmailParamsSchema,
  verifyResetTokenParamsSchema,
} from "../validator/authValidator";
import { validateRequest } from "../middleware/validateRequest";

const authRouter = Router();

authRouter.post("/signup", validateRequest(signupSchema), signup);
authRouter.post("/signin", validateRequest(signinSchema), signin);

authRouter.get(
  "/verify-email/:token",
  validateRequest(verifyEmailParamsSchema, "params"),
  verifyEmail
);

authRouter.post(
  "/reset-password",
  validateRequest(generateResetTokenSchema),
  generateResetToken
);

authRouter.post(
  "/reset-password/:token",
  validateRequest(resetPasswordParamsSchema, "params"),
  validateRequest(resetPasswordBodySchema),
  resetPassword
);

authRouter.get(
  "/verify-token/:token",
  validateRequest(verifyResetTokenParamsSchema, "params"),
  verifyResetToken
);

authRouter.post("/refresh", refreshToken);

authRouter.get("/google", passport.authenticate("google"));
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  googleCallback
);

authRouter.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
  }
);

authRouter.get("/github", passport.authenticate("github"));
authRouter.get(
  "/github/callback",
  passport.authenticate("github", { session: false, failureRedirect: "/login" }),
  githubCallback
);

export default authRouter;