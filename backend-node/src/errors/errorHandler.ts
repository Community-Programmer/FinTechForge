import { AppError, ErrorDetails } from './AppError';

type ErrorStatus = 'fail' | 'error';

interface ErrorResponse {
  status: ErrorStatus;
  statusCode: number;
  message: string;
  errorCode?: string;
  details?: ErrorDetails;
  stack?: string;
}

const statusFromCode = (statusCode: number): ErrorStatus => {
  return statusCode >= 500 ? 'error' : 'fail';
};

export const buildErrorResponse = (
  error: AppError,
  includeStack: boolean
): ErrorResponse => {
  return {
    status: statusFromCode(error.statusCode),
    statusCode: error.statusCode,
    message: error.message,
    errorCode: error.errorCode,
    datails: error.details,
    stack: includeStack ? error.stack : undefined,
  };
};
