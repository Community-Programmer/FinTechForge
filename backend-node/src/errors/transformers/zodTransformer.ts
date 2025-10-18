import { ZodError } from 'zod';
import { ValidationError } from '../HttpErrors';

/**
 * Tranform Zod errors into ValidationError
 * @param error - Zod error
 * @returns ValidationError with structured details
 */
export const transformZodError = (error: ZodError): ValidationError => {
  const details = error.errors.map(err => ({
    field: err.path.join('.'),
    message: err.message,
    code: err.code,
  }));

  const fieldNames = details.map(d => d.field).join(', ');
  const message = `Validation failed for: ${fieldNames}`;

  return new ValidationError(message, details);
};

/**
 * Checks whether an error is a Zod error
 */
export const isZodError = (error: any): error is ZodError => {
  return error?.name === 'ZodError' || error instanceof ZodError;
};
