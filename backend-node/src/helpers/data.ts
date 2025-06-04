import prisma from '../../prisma/client';

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

export const getUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
};

export const getEmailVerificationToken = async (token: string) => {
  const verificationToken = await prisma.emailVerificationToken.findUnique({
    where: {
      token,
    },
  });

  return verificationToken;
};

export const getEmailVerificationTokenById = async (userId: string) => {
  const verificationToken = await prisma.emailVerificationToken.findUnique({
    where: {
      userId,
    },
  });

  return verificationToken;
};

export const getPassowrdVerificationToken = async (token: string) => {
  const verificationToken = await prisma.passwordResetToken.findUnique({
    where: {
      token,
    },
  });

  return verificationToken;
};

export const getPasswordVerificationTokenById = async (userId: string) => {
  const verificationToken = await prisma.passwordResetToken.findUnique({
    where: {
      userId,
    },
  });

  return verificationToken;
};
