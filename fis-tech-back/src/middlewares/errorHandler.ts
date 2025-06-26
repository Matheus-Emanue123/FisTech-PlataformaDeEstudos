import { Request, Response, NextFunction } from 'express';
import { PrismaClientKnownRequestError, PrismaClientInitializationError, PrismaClientValidationError } from '../generated/prisma/runtime/library';
import { AppError, ErrorType, ErrorCode, ValidationError, DatabaseError, NotFoundError } from '../utils/errors';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  console.error('Error occurred', {
    error: err.message,
    stack: err.stack,
    method: req.method,
    url: req.url,
    userAgent: req.get('User-Agent'),
    ip: req.ip,
    timestamp: new Date().toISOString()
  });

  let appError: AppError;

  // Convert different error types to AppError
  if (err instanceof AppError) {
    appError = err;
  } else if (err instanceof PrismaClientKnownRequestError) {
    appError = handlePrismaError(err);
  } else if (err instanceof PrismaClientInitializationError) {
    appError = new DatabaseError('Database connection failed', ErrorCode.DATABASE_CONNECTION_ERROR);
  } else if (err instanceof PrismaClientValidationError) {
    appError = new ValidationError('Invalid database operation', ErrorCode.BAD_REQUEST);
  } else {
    // Unknown error - treat as system error
    appError = new AppError(
      500,
      'Internal server error',
      ErrorType.SYSTEM,
      ErrorCode.INTERNAL_SERVER_ERROR,
      false // Non-operational error
    );
  }

  const errorResponse = {
    success: false,
    error: {
      type: appError.errorType,
      code: appError.errorCode,
      message: appError.message,
      timestamp: appError.timestamp.toISOString()
    }
  };

  res.status(appError.statusCode).json(errorResponse);
};

function handlePrismaError(err: PrismaClientKnownRequestError): AppError {
  switch (err.code) {
    case 'P2002':
      return new AppError(409, 'Duplicate record', ErrorType.DATABASE, ErrorCode.CONFLICT, true);
    case 'P2025':
      return new NotFoundError('Record not found', ErrorCode.NOT_FOUND);
    case 'P2003':
      return new ValidationError('Foreign key constraint failed', ErrorCode.BAD_REQUEST);
    case 'P2014':
      return new ValidationError('Invalid ID provided', ErrorCode.BAD_REQUEST);
    case 'P2000':
      return new ValidationError('Value too long for column', ErrorCode.BAD_REQUEST);
    case 'P2001':
      return new NotFoundError('Record not found', ErrorCode.NOT_FOUND);
    default:
      return new DatabaseError(`Database error: ${err.message}`, ErrorCode.DATABASE_QUERY_ERROR);
  }
}
