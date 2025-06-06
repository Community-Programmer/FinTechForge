import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../prisma/client';
import createHttpError from 'http-errors';
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

const { verify, sign } = pkg;

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
      const error = createHttpError(400, 'User already exists with this email');
      return next(error);
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
      createHttpError(500, 'Unexpected error occurred while creating user')
    );
  } catch (err) {
    console.log(err);
    return next(createHttpError(500, 'Error while processing your request'));
  }
};

const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (!user) {
      res.status(404).json({ message: 'User with email not found' });
      return;
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
      return next(createHttpError(400, 'Invalid credentials'));
    }

    const isMatch = await bcrypt.compare(password, user.password as string);

    if (!isMatch) {
      return next(createHttpError(400, 'Invalid credentials'));
    }

    const { accessToken, refreshToken } = generateTokens(user.id);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.json({ accessToken, isVerified: true, success: true });
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, 'Error while processing your request'));
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
          createHttpError(
            400,
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
        createHttpError(
          400,
          "We couldn't verify your email. The link may have expired or is invalid."
        )
      );
    }
  } catch (err) {
    console.log(err);

    return next(
      createHttpError(400, 'Unknown error occurred during token verification.')
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
    console.log(email);
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
    console.log(error);
    return next(
      createHttpError(400, 'An Unknown error occurred during password reset')
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
      return next(createHttpError(400, 'Invalid reset token'));
    }

    if (password !== confirmPassword) {
      return next(createHttpError(400, 'Password does not match'));
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
    console.log(error);
    return next(
      createHttpError(400, 'An Unknown error occurred during password reset.')
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
    console.log(error);
    return next(
      createHttpError(
        400,
        'An Unknown error occurred during token verification.'
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
      return next(createHttpError(403, 'No refresh token provided'));
    }

    verify(
      refreshToken,
      process.env.REFRESH_JWT_SECRET!,
      async (err: Error | null, decoded: any) => {
        if (err || !decoded) {
          return next(createHttpError(403, 'Invalid or expired refresh token'));
        }

        const user = await getUserById(decoded.id);
        if (!user) {
          return next(createHttpError(403, 'User not found'));
        }

        const { accessToken } = generateTokens(user.id);

        res.json({ accessToken, user: user.username });
      }
    );
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, 'Error refreshing token'));
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
  res.redirect(`http://localhost:5173`);
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
  res.redirect(`http://localhost:5173/success?accessToken=${accessToken}`);
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
