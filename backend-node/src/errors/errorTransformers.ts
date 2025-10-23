import { ZodError } from 'zod';
import { AppError } from './AppError';
import { Prisma } from '@prisma/client';
import createHttpError from 'http-errors';

/**
 * Transform Zod errors into ValidationError
 * @param error - Zod error
 * @returns AppError with validation details
 */
export function transformZodError(error: ZodError): AppError {
  const details = error.errors.map(err => ({
    field: err.path.join('.'),
    message: err.message,
  }));

  const fields = details.map(d => d.field).join(', ');

  return new AppError(`Validation failed: ${fields}`, 422, 'VALIDATION_ERROR', {
    errors: details,
  });
}

/**
 * Transform Prisma database errors into an AppError
 * @param error - Prisma client error
 * @returns AppError with appropriate status and message
 */
export function transformPrismaError(
  error: Prisma.PrismaClientKnownRequestError
): AppError {
  switch (error.code) {
    case 'P2002': {
      const field = (error.meta?.target as string[])?.join(', ') || 'field';
      return new AppError(
        `Duplicate entry for: ${field}`,
        409,
        'DUPLICATE_ERROR',
        { field }
      );
    }

    case 'P2025': {
      return new AppError('Record not found', 404, 'NOT_FOUND');
    }

    case 'P2003': {
      const field = error.meta?.field_name || 'field';
      return new AppError(
        `Related record not found for: ${field}`,
        400,
        'FOREIGN_KEY_ERROR',
        { field }
      );
    }

    case 'P2014': {
      return new AppError(
        'Cannot delete record due to existing relations',
        400,
        'RELATION_VIOLATION'
      );
    }

    default: {
      return new AppError('Database operation failed', 500, 'DATABASE_ERROR', {
        code: error.code,
      });
    }
  }
}

/**
 * Transform JWT authentication errors to AppError
 * @param error - JWT error
 * @returns AppError with appropriate auth message
 */
export function transformJWTError(error: Error): AppError {
  switch (error.name) {
    case 'TokenExpiredError':
      return new AppError('Session expired', 401, 'TOKEN_EXPIRED');
    case 'JsonWebTokenError':
      return new AppError('Invalid token', 401, 'INVALID_TOKEN');
    case 'NotBeforeError':
      return new AppError('Token not yet valid', 401, 'TOKEN_NOT_ACTIVE');
    default:
      return new AppError('Authentication failed', 401, 'AUTH_ERROR');
  }
}

/**
 * Convert any error to AppError
 * Main error transformation orchestrator
 * @param error - Unknown error type
 * @returns AppError instance
 */
export function toAppError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof ZodError) {
    return transformZodError(error);
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return transformPrismaError(error);
  }

  if (createHttpError.isHttpError(error)) {
    return new AppError(
      error.message || 'HTTP error occurred',
      error.status,
      error.name
    );
  }

  if (error instanceof Error) {
    const jwtErrorNames = [
      'TokenExpiredError',
      'JsonWebTokenError',
      'NotBeforeError',
    ];
    if (jwtErrorNames.includes(error.name)) {
      return transformJWTError(error);
    }
    return new AppError(error.message, 500, 'INTERNAL_ERROR');
  }

  return new AppError('An unexpected error occurred', 500, 'UNKNOWN_ERROR');
}
