import { UnauthorizedError } from '../HttpErrors';

/**
 *
 * @param error - JWT error
 * @returns Unauthorized with a specific code
 */
export const transformJWTError = (error: Error): UnauthorizedError => {
  switch (error.name) {
    case 'TokenExpiredError':
      return new UnauthorizedError('Your session has expired', 'TOKEN_EXPIRED');
    case 'JsonWebTokenError':
      return new UnauthorizedError(
        'Invalid authentication token',
        'INVALID_TOKEN'
      );
    case 'NotBeforeError':
      return new UnauthorizedError('Token not yet valid', 'TOKEN_NOT_ACTIVE');
    default:
      return new UnauthorizedError('Authentication failed', 'AUTH_ERROR');
  }
};

/**
 * Checks whether an error is a JWT error
 */
export const isJWTError = (error: any): boolean => {
  return ['JsonWebTokenError', 'TokenExpiredError', 'NotBeforeError'].includes(
    error?.name
  );
};
