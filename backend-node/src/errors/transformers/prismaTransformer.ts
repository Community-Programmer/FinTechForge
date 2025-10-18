import { AppError } from '../AppError';
import { BadRequestError, ConflictError, NotFoundError } from '../HttpErrors';

enum PrismaErrorCode {
  UNIQUE_CONSTRAINT = 'P2002',
  RECORD_NOT_FOUND = 'P2025',
  FOREIGN_KEY_CONSTRAINT = 'P2003',
  RECORD_DOES_NOT_EXIST = 'P2001',
  RELATION_VIOLATION = 'P2014',
  VALUE_TOO_LONG = 'P2000',
  REQUIRED_FIELD_MISSING = 'P2012',
}

export const transformPrismaError = (error: any): AppError => {
  const code = error.code as string;

  switch (code) {
    case PrismaErrorCode.UNIQUE_CONSTRAINT: {
      const target = error.meta?.target;
      const field = Array.isArray(target) ? target.join(', ') : target;
      return new ConflictError(
        `Duplicate value for field: ${field || 'unknown'}`,
        'DUPLICATE_ERROR',
        { field }
      );
    }

    case PrismaErrorCode.RECORD_NOT_FOUND:
    case PrismaErrorCode.RECORD_DOES_NOT_EXIST: {
      return new NotFoundError(
        'The requested record was not found',
        'RECORD_NOT FOUND'
      );
    }

    case PrismaErrorCode.FOREIGN_KEY_CONSTRAINT: {
      const field = error.meta?.field_name;
      return new BadRequestError(
        `Related record not found for field: ${field || 'unknown'}`,
        'FOREIGN_KEY_ERROR',
        { field }
      );
    }

    case PrismaErrorCode.RELATION_VIOLATION: {
      return new BadRequestError(
        'Cannot delete record due to existing relations',
        'RELATION_VIOLATION'
      );
    }

    case PrismaErrorCode.VALUE_TOO_LONG: {
      const field = error.meta?.field_name;
      return new BadRequestError(
        `Required field missing: ${field || 'unknown'}`,
        'REQUIRED_FIELD_MISSING',
        { field }
      );
    }

    default: {
      return new AppError('Database operation failed', 500, 'DATABASE_ERROR', {
        prismaCode: code,
      });
    }
  }
};
