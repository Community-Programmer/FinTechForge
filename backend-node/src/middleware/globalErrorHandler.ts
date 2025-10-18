// src/middleware/globalErrorHandler.ts
import { Request, Response, NextFunction } from 'express';
import createError, { HttpError } from 'http-errors';
import { logger } from '../utils/logger';

const globalErrorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.status || 500;
  const isDev = process.env.NODE_ENV === 'development';

  // Log error (stack trace included in dev)
  logger.error(`[${req.method}] ${req.originalUrl} - ${err.message}`, {
    stack: isDev ? err.stack : undefined,
    statusCode,
  });

  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    errorStack: isDev ? err.stack : undefined,
  });
};

export default globalErrorHandler;
