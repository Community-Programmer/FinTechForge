// src/middleware/globalErrorHandler.ts

import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError';
import { toAppError } from '../errors/errorTransformers';
import { buildErrorResponse } from '../errors/errorHandler';
import { logger } from '../utils/logger';

const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const appError: AppError = toAppError(err);

  if (res.headersSent) {
    next(appError);
    return;
  }

  const isDev = process.env.NODE_ENV === 'development';
  const errorResponse = buildErrorResponse(appError, isDev);

  // Log error (stack trace included in dev)
  logger.error(`[${req.method}] ${req.originalUrl}`, {
    statusCode: appError.statusCode,
    errorCode: appError.errorCode,
    message: appError.message,
    details: appError.details,
    stack: isDev ? appError.stack : undefined,
  });

  res.status(appError.statusCode).json(errorResponse);
};

export default globalErrorHandler;
