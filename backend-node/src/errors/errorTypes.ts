import { AppError } from './AppError';

/**
 * 400 - Bad Request
 * Use for malformed request or invalid parameters
 */
export class BadRequestError extends AppError {
  constructor(
    message: string = 'Bad Request',
    details?: Record<string, unknown>
  ) {
    super(message, 400, 'BAD_REQUEST', details);
  }
}

/**
 * 401 - Unauthorized
 * Use for missing authentication or invalid credentials
 */
export class UnauthorizedError extends AppError {
  constructor(
    message: string = 'Unauthorized',
    errorCode: string = 'UNAUTHORIZED'
  ) {
    super(message, 401, errorCode);
  }
}

/**
 * 403 - Forbidden
 * Use for authenticated user without permissions
 */
export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden') {
    super(message, 403, 'FORBIDDEN');
  }
}

/**
 * 404 - Not Found
 * Use when a resource doesn't exist
 */
export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404, 'NOT_FOUND');
  }
}

/**
 * 409 - Conflict
 * Use for conflicts with current state
 */
export class ConflictError extends AppError {
  constructor(
    message: string = 'Resource conflict',
    details?: Record<string, unknown>
  ) {
    super(message, 409, 'CONFLICT', details);
  }
}

/**
 * 422 - Unprocessable Entity
 * Use for validation errors
 */
export class ValidationError extends AppError {
  constructor(
    message: string = 'Validation failed',
    details?: Record<string, unknown>
  ) {
    super(message, 422, 'VALIDATION_ERROR', details);
  }
}

/**
 * 500 - Internal Server Error
 * Use for unexpected server errors
 */
export class InternalServerError extends AppError {
  constructor(message: string = 'Internal server error') {
    super(message, 500, 'INTERNAL_ERROR', undefined, false);
  }
}
