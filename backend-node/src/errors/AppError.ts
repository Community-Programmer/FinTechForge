/**
 * Base class for application errors
 * Extends the native Error and adds custom properties
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly errorCode?: string;
  public readonly details?: any;

  constructor(
    message: string,
    statusCode: number = 500,
    errorCode?: string,
    details?: any,
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

  /**
   * Serializes the error for logging
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      errorCode: this.errorCode,
      details: this.details,
      isOperational: this.isOperational,
      stack: this.stack,
    };
  }
}
