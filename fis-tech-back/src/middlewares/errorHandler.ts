import { Request, Response, NextFunction } from 'express';
import { PrismaClientKnownRequestError, PrismaClientInitializationError, PrismaClientValidationError } from '../generated/prisma/runtime/library';
import { 
  AppError, 
  ErrorType, 
  ErrorCode, 
  ValidationError, 
  DatabaseError, 
  NotFoundError,
  AuthenticationError,
  AuthorizationError,
  RateLimitError,
  ErrorContext
} from '../utils/errors';

// Generate a unique request ID for tracking
const generateRequestId = (): string => {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requestId = generateRequestId();
  
  console.error('Error occurred', {
    requestId,
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
  switch (true) {
    case err instanceof AppError:
      appError = err;
      break;
      
    case err instanceof PrismaClientKnownRequestError:
      appError = handlePrismaError(err, requestId);
      break;
      
    case err instanceof PrismaClientInitializationError:
      appError = new DatabaseError(
        'Database connection failed', 
        ErrorCode.DATABASE_CONNECTION_ERROR,
        { requestId }
      );
      break;
      
    case err instanceof PrismaClientValidationError:
      appError = new ValidationError(
        'Invalid database operation', 
        ErrorCode.BAD_REQUEST,
        { requestId }
      );
      break;
      
    case err.name === 'JsonWebTokenError':
      appError = new AuthenticationError(
        'Invalid token provided',
        ErrorCode.INVALID_TOKEN,
        { requestId }
      );
      break;
      
    case err.name === 'TokenExpiredError':
      appError = new AuthenticationError(
        'Token has expired',
        ErrorCode.TOKEN_EXPIRED,
        { requestId }
      );
      break;
      
    case err.name === 'CastError':
      appError = new ValidationError(
        'Invalid ID format',
        ErrorCode.BAD_REQUEST,
        { requestId, suggestion: 'Please provide a valid ID format' }
      );
      break;
      
    case err.name === 'ValidationError':
      appError = new ValidationError(
        'Validation failed',
        ErrorCode.BAD_REQUEST,
        { requestId }
      );
      break;
      
    default:
      // Unknown error - treat as system error
      appError = new AppError(
        500,
        'Internal server error',
        ErrorType.SYSTEM,
        ErrorCode.INTERNAL_SERVER_ERROR,
        false, // Non-operational error
        { requestId }
      );
      break;
  }

  // Add request context to error if not already present
  if (!appError.context?.requestId) {
    const updatedContext = { ...appError.context, requestId };
    // Since context is readonly, we need to create a new error instance
    const newError = new AppError(
      appError.statusCode,
      appError.message,
      appError.errorType,
      appError.errorCode,
      appError.isOperational,
      updatedContext
    );
    newError.stack = appError.stack;
    appError = newError;
  }

  const errorResponse = {
    success: false,
    error: appError.toJSON(),
    path: req.path,
    method: req.method
  };

  // Add additional headers for certain error types
  if (appError instanceof RateLimitError) {
    res.set('Retry-After', '60');
  }

  res.status(appError.statusCode).json(errorResponse);
};

function handlePrismaError(err: PrismaClientKnownRequestError, requestId: string): AppError {
  const context: ErrorContext = { requestId };
  
  switch (err.code) {
    case 'P2002':
      return new ValidationError(
        'Duplicate record - this value already exists', 
        ErrorCode.CONFLICT,
        { ...context, suggestion: 'Please use a different value' }
      );
    case 'P2025':
      return new NotFoundError(
        'Record not found', 
        ErrorCode.NOT_FOUND,
        context
      );
    case 'P2003':
      return new ValidationError(
        'Foreign key constraint failed - referenced record does not exist', 
        ErrorCode.BAD_REQUEST,
        { ...context, suggestion: 'Please ensure the referenced record exists' }
      );
    case 'P2014':
      return new ValidationError(
        'Invalid ID provided', 
        ErrorCode.BAD_REQUEST,
        { ...context, suggestion: 'Please provide a valid ID' }
      );
    case 'P2000':
      return new ValidationError(
        'Value too long for column', 
        ErrorCode.BAD_REQUEST,
        { ...context, suggestion: 'Please provide a shorter value' }
      );
    case 'P2001':
      return new NotFoundError(
        'Record not found', 
        ErrorCode.NOT_FOUND,
        context
      );
    case 'P2015':
      return new NotFoundError(
        'Related record not found', 
        ErrorCode.NOT_FOUND,
        context
      );
    case 'P2016':
      return new ValidationError(
        'Invalid relation data', 
        ErrorCode.BAD_REQUEST,
        context
      );
    case 'P2017':
      return new ValidationError(
        'Invalid relation data', 
        ErrorCode.BAD_REQUEST,
        context
      );
    case 'P2018':
      return new NotFoundError(
        'Connected record not found', 
        ErrorCode.NOT_FOUND,
        context
      );
    case 'P2019':
      return new ValidationError(
        'Invalid relation data', 
        ErrorCode.BAD_REQUEST,
        context
      );
    case 'P2020':
      return new ValidationError(
        'Value out of range', 
        ErrorCode.BAD_REQUEST,
        context
      );
    case 'P2021':
      return new DatabaseError(
        'Table does not exist', 
        ErrorCode.DATABASE_QUERY_ERROR,
        context
      );
    case 'P2022':
      return new DatabaseError(
        'Column does not exist', 
        ErrorCode.DATABASE_QUERY_ERROR,
        context
      );
    case 'P2023':
      return new ValidationError(
        'Invalid column data', 
        ErrorCode.BAD_REQUEST,
        context
      );
    case 'P2024':
      return new DatabaseError(
        'Database connection timeout', 
        ErrorCode.DATABASE_CONNECTION_ERROR,
        context
      );
    default:
      return new DatabaseError(
        `Database error: ${err.message}`, 
        ErrorCode.DATABASE_QUERY_ERROR,
        context
      );
  }
}

// Middleware to handle 404 errors
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const requestId = generateRequestId();
  
  const error = new NotFoundError(
    `Route ${req.method} ${req.path} not found`,
    ErrorCode.NOT_FOUND,
    { requestId, suggestion: 'Please check the URL and method' }
  );

  next(error);
};

// Middleware to handle unsupported methods
export const methodNotAllowedHandler = (req: Request, res: Response, next: NextFunction) => {
  const requestId = generateRequestId();
  
  const error = new AppError(
    405,
    `Method ${req.method} not allowed for ${req.path}`,
    ErrorType.VALIDATION,
    ErrorCode.METHOD_NOT_ALLOWED,
    true,
    { requestId, suggestion: 'Please use a different HTTP method' }
  );

  next(error);
};
