import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../prisma/client';
import {
  getEmailVerificationToken,
  getEmailVerificationTokenById,
  getPasswordVerificationTokenById,
  getUserByEmail,
  getUserById,
} from '../helpers/data';
import bcrypt from 'bcryptjs';
import { generateTokens } from '../utils/generateTokens';
import { generateVerificationToken } from '../helpers/generateVerificationToken';
import { AuthRequest } from '../types/authType';
import {
  sendPassowrdResetEmail,
  sendVerificationEmail,
} from '../utils/sendEmail';
import pkg from 'jsonwebtoken';
import { logger } from '../utils/logger';
import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
} from '../errors/errorTypes';

const { verify } = pkg;

//TODO : Add Data Validation (Zod etc.)

const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return next(new ConflictError('User already exists with this email'));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    if (newUser) {
      const verificationToken = generateVerificationToken();

      const tokenExpiration = new Date();
      tokenExpiration.setHours(tokenExpiration.getMinutes() + 24);

      await prisma.emailVerificationToken.create({
        data: {
          userId: newUser.id,
          token: verificationToken,
          expireAt: tokenExpiration,
        },
      });

      await sendVerificationEmail(newUser.email, verificationToken);
      res.status(200).json({
        message: 'Sent verification email',
        isVerified: false,
        success: true,
      });
      return;
    }

    return next(
      new InternalServerError('Unexpected error occurred while creating user')
    );
  } catch (err) {
    logger.error('Failed to sign up user', { error: err });
    return next(new InternalServerError('Error while processing your request'));
  }
};

const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (!user) {
      return next(new NotFoundError('User with email not found'));
    }

    if (!user.emailVerified) {
      const existingToken = await getEmailVerificationTokenById(user.id);

      if (existingToken) {
        await prisma.emailVerificationToken.delete({
          where: { userId: user.id },
        });
      }

      const verificationToken = generateVerificationToken();

      const tokenExpiration = new Date();
      tokenExpiration.setHours(tokenExpiration.getMinutes() + 24);

      await prisma.emailVerificationToken.create({
        data: {
          userId: user.id,
          token: verificationToken,
          expireAt: tokenExpiration,
        },
      });

      await sendVerificationEmail(user.email, verificationToken);
      res.status(200).json({
        message: 'Sent verification email',
        isVerified: false,
        success: true,
      });
      return;
    }

    if (!user.password) {
      return next(new BadRequestError('Invalid credentials'));
    }

    const isMatch = await bcrypt.compare(password, user.password as string);

    if (!isMatch) {
      return next(new BadRequestError('Invalid credentials'));
    }

    const { accessToken, refreshToken } = generateTokens(user.id);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.json({ accessToken, isVerified: true, success: true });
  } catch (error) {
    logger.error('Failed to sign in user', { error });
    return next(new InternalServerError('Error while processing your request'));
  }
};

const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.params;

  try {
    const verificationToken = await getEmailVerificationToken(token);

    if (verificationToken) {
      const user = await getUserById(verificationToken?.userId);

      if (user?.emailVerified) {
        res.status(200).json({
          Code: 'ALREADY_VERIFIED',
          message: 'Email Already Verified',
          success: true,
        });
        return;
      }

      const now = new Date();
      if (now > verificationToken.expireAt) {
        return next(
          new BadRequestError(
            "We couldn't verify your email. The link may have expired or is invalid."
          )
        );
      }

      await prisma.user.update({
        where: {
          id: verificationToken.userId,
        },
        data: {
          emailVerified: new Date(),
        },
      });
      res.status(200).json({
        Code: 'VERIFIED',
        message: 'Email Verified Successfully',
        success: true,
      });
    } else {
      return next(
        new BadRequestError(
          "We couldn't verify your email. The link may have expired or is invalid."
        )
      );
    }
  } catch (err) {
    logger.error('Failed to verify email token', { error: err });

    return next(
      new BadRequestError('Unknown error occurred during token verification.')
    );
  }
};

const generateResetToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  try {
    const user = await getUserByEmail(email);
    logger.debug('Password required requested', { email });
    if (!user) {
      res.status(200).json({ message: 'Email not registered' });
      return;
    }

    const existingToken = await getPasswordVerificationTokenById(user.id);

    if (existingToken) {
      await prisma.passwordResetToken.delete({
        where: {
          userId: user.id,
        },
      });
    }

    const resetToken = generateVerificationToken();
    const tokenExpiration = new Date();
    tokenExpiration.setHours(tokenExpiration.getMinutes() + 24);

    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token: resetToken,
        expireAt: tokenExpiration,
      },
    });

    await sendPassowrdResetEmail(email, resetToken);
    res
      .status(200)
      .json({ message: 'Sent Password reset link to registered email.' });
  } catch (error) {
    logger.error('Failed to generate password reset token', { error });
    return next(
      new InternalServerError('An Unknown error occurred during password reset')
    );
  }
};

const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  try {
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: {
        token,
      },
    });

    if (!resetToken) {
      return next(new BadRequestError('Invalid reset token'));
    }

    if (password !== confirmPassword) {
      return next(new BadRequestError('Password does not match'));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: {
        id: resetToken.userId,
      },
      data: {
        password: hashedPassword,
      },
    });

    await prisma.passwordResetToken.update({
      where: {
        token,
      },
      data: {
        isUsed: true,
      },
    });

    res.status(200).json({ Code: 'RESET_SUCCESSFUL', success: true });
  } catch (error) {
    logger.error('Failed to reset password', { error });
    return next(
      new InternalServerError(
        'An Unknown error occurred during password reset.'
      )
    );
  }
};

const verifyResetToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.params;

  try {
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: {
        token,
      },
    });

    const now = new Date();

    if (!resetToken || now > resetToken.expireAt || resetToken.isUsed) {
      res.status(200).json({ Code: 'INVALID_TOKEN', success: true });
      return;
    }

    res.status(200).json({ Code: 'VALID_TOKEN', success: true });
  } catch (error) {
    logger.error('Failed to verify reset token', { error });
    return next(
      new InternalServerError(
        'An Unknown error occurred during token verification'
      )
    );
  }
};

const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return next(new ForbiddenError('No refresh token provided'));
    }

    verify(
      refreshToken,
      process.env.REFRESH_JWT_SECRET!,
      async (err: Error | null, decoded: unknown) => {
        if (err || !decoded || typeof decoded === 'string') {
          return next(new ForbiddenError('Invalid or expired refresh token'));
        }

        const payload = decoded as { id?: string };
        if (!payload.id) {
          return next(new ForbiddenError('Invalid or expired refresh token'));
        }

        const user = await getUserById(payload.id);
        if (!user) {
          return next(new ForbiddenError('User not found'));
        }

        const { accessToken } = generateTokens(user.id);

        res.json({ accessToken, user: user.username });
      }
    );
  } catch (error) {
    logger.error('Failed to refresh token', { error });
    return next(new InternalServerError('Error refreshing token'));
  }
};

const googleCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _req = req as AuthRequest;

  const { accessToken, refreshToken } = generateTokens(_req.user.id);
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.redirect(process.env.FRONTEND_URL!);
};

const githubCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _req = req as AuthRequest;
  const { accessToken, refreshToken } = generateTokens(_req.user.id);
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.redirect(
    `${process.env.FRONTEND_URL}/success?accessToken=${accessToken}`
  );
};

export {
  signup,
  signin,
  verifyEmail,
  googleCallback,
  githubCallback,
  resetPassword,
  generateResetToken,
  verifyResetToken,
  refreshToken,
};
