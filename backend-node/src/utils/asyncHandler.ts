import { NextFunction, Request, RequestHandler, Response } from 'express';

/**
 * Wrap async route handlers and forward rejections to Express' error pipeline
 */
export const asyncHandler = (handler: RequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
};
