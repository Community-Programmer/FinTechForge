import { AppError } from './AppError';

/**
 * 400 Bad Request
 * Malformed request or invalid parameters
 */
export class BadRequestError extends AppError {
  constructor(
    message: string = 'Bad Request',
    errorCode?: string,
    details?: any
  ) {
    super(message, 400, errorCode, details);
  }
}

/**
 * 401 Unauthorized
 * Missing authentication or invalid credentials
 */
export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized', errorCode?: string) {
    super(message, 401, errorCode);
  }
}

/**
 * 403 Forbidden
 * Authenticated user but lacking permissions
 */
export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden', errorCode?: string) {
    super(message, 403, errorCode);
  }
}

/**
 * 404 Not Found
 * Resource not found
 */
export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found', errorCode?: string) {
    super(message, 404, errorCode);
  }
}

/**
 * 409 Conflict
 * Conflict with the current state
 */
export class ConflictError extends AppError {
  constructor(
    message: string = 'Resource already exists',
    errorCode?: string,
    details?: any
  ) {
    super(message, 409, errorCode, details);
  }
}

/**
 * 422 Unprocessable Entity
 * Validation errors
 */
export class ValidationError extends AppError {
  constructor(message: string = 'Validation failed', details?: any) {
    super(message, 422, 'VALIDATION_ERROR', details);
  }
}

/**
 * 500 Internal Server Error
 * Internal Server Error
 */
export class InternalServerError extends AppError {
  constructor(message: string = 'Internal server error', errorCode?: string) {
    super(message, 500, errorCode, undefined, false);
  }
}

/**
 * 503 Servcie Unavailable
 * Service temporarily unavailable
 */
export class ServiceUnavailableError extends AppError {
  constructor(
    message: string = 'Service temporarily unavailable',
    errorCode?: string
  ) {
    super(message, 503, errorCode);
  }
}
