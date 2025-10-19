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

/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     description: Create a new user account with email and password
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 'User registered successfully. Please check your email for verification.'
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       409:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               message: 'User already exists'
 *               errors: ['A user with this email already exists']
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
authRouter.post("/signup", validateRequest(signupSchema), signup);
/**
 * @swagger
 * /api/v1/auth/signin:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: User login
 *     description: Authenticate user with email and password
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponse'
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: 'accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; HttpOnly; Secure'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               message: 'Invalid credentials'
 *               errors: ['Email or password is incorrect']
 *       403:
 *         description: Email not verified
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               message: 'Email not verified'
 *               errors: ['Please verify your email before logging in']
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
authRouter.post("/signin", validateRequest(signinSchema), signin);

/**
 * @swagger
 * /api/v1/auth/verify-email/{token}:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Verify user email
 *     description: Verify user's email address using the verification token
 *     security: []
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Email verification token
 *         example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 *     responses:
 *       200:
 *         description: Email verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 'Email verified successfully'
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               message: 'Invalid verification token'
 *               errors: ['Token is invalid or has expired']
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
authRouter.get(
  "/verify-email/:token",
  validateRequest(verifyEmailParamsSchema, "params"),
  verifyEmail
);

/**
 * @swagger
 * /api/v1/auth/reset-password:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Request password reset
 *     description: Send password reset email to user
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: 'user@example.com'
 *     responses:
 *       200:
 *         description: Password reset email sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 'Password reset email sent successfully'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               message: 'User not found'
 *               errors: ['No user found with this email address']
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
authRouter.post(
  "/reset-password",
  validateRequest(generateResetTokenSchema),
  generateResetToken
);

/**
 * @swagger
 * /api/v1/auth/reset-password/{token}:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Reset password
 *     description: Reset user password using reset token
 *     security: []
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Password reset token
 *         example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: 'newPassword123'
 *                 description: 'New password for the user account'
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 'Password reset successfully'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         description: Invalid or expired reset token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               message: 'Invalid reset token'
 *               errors: ['Reset token is invalid or has expired']
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
authRouter.post(
  "/reset-password/:token",
  validateRequest(resetPasswordParamsSchema, "params"),
  validateRequest(resetPasswordBodySchema),
  resetPassword
);

/**
 * @swagger
 * /api/v1/auth/verify-token/{token}:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Verify reset token
 *     description: Verify if password reset token is valid
 *     security: []
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Password reset token to verify
 *         example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 *     responses:
 *       200:
 *         description: Token is valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 'Token is valid'
 *                 data:
 *                   type: object
 *                   properties:
 *                     valid:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               message: 'Invalid token'
 *               errors: ['Token is invalid or has expired']
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
authRouter.get(
  "/verify-token/:token",
  validateRequest(verifyResetTokenParamsSchema, "params"),
  verifyResetToken
);

/**
 * @swagger
 * /api/v1/auth/refresh:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Refresh access token
 *     description: Get new access token using refresh token
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 *                 description: 'Valid refresh token'
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 'Token refreshed successfully'
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 *                     refreshToken:
 *                       type: string
 *                       example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         description: Invalid refresh token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               message: 'Invalid refresh token'
 *               errors: ['Refresh token is invalid or has expired']
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
authRouter.post("/refresh", refreshToken);

/**
 * @swagger
 * /api/v1/auth/google:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Google OAuth login
 *     description: Initiate Google OAuth authentication flow
 *     security: []
 *     responses:
 *       302:
 *         description: Redirect to Google OAuth consent screen
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
authRouter.get("/google", passport.authenticate("google"));
/**
 * @swagger
 * /api/v1/auth/google/callback:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Google OAuth callback
 *     description: Handle Google OAuth callback and complete authentication
 *     security: []
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         description: Authorization code from Google
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *         description: State parameter for CSRF protection
 *     responses:
 *       302:
 *         description: Redirect to frontend with authentication result
 *       400:
 *         description: OAuth authentication failed
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  googleCallback
);

/**
 * @swagger
 * /api/v1/auth/protected:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Protected route test
 *     description: Test endpoint to verify JWT authentication
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Access granted to protected route
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'This is a protected route'
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
authRouter.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
  }
);

/**
 * @swagger
 * /api/v1/auth/github:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: GitHub OAuth login
 *     description: Initiate GitHub OAuth authentication flow
 *     security: []
 *     responses:
 *       302:
 *         description: Redirect to GitHub OAuth consent screen
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
authRouter.get("/github", passport.authenticate("github"));
/**
 * @swagger
 * /api/v1/auth/github/callback:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: GitHub OAuth callback
 *     description: Handle GitHub OAuth callback and complete authentication
 *     security: []
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         description: Authorization code from GitHub
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *         description: State parameter for CSRF protection
 *     responses:
 *       302:
 *         description: Redirect to frontend with authentication result
 *       400:
 *         description: OAuth authentication failed
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
authRouter.get(
  "/github/callback",
  passport.authenticate("github", { session: false, failureRedirect: "/login" }),
  githubCallback
);

export default authRouter;