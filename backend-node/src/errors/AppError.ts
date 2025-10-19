/**
 * Base class for application errors
 * Extends the native Error and adds custom properties
 */

export type ErrorDetails =
  | Record<string, unknown>
  | Array<Record<string, unknown>>;

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly errorCode?: string;
  public readonly details?: ErrorDetails;

  constructor(
    message: string,
    statusCode: number = 500,
    errorCode?: string,
    details?: ErrorDetails,
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errorCode = errorCode;
    this.details = details;
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}
