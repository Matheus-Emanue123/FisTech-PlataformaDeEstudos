export enum ErrorType {
  VALIDATION = 'VALIDATION',
  BUSINESS_LOGIC = 'BUSINESS_LOGIC',
  DATABASE = 'DATABASE',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  SYSTEM = 'SYSTEM',
  EXTERNAL_SERVICE = 'EXTERNAL_SERVICE'
}

// HTTP Status Codes as Error Codes
export enum ErrorCode {
  // 4xx Client Errors
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  
  // 5xx Server Errors
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
  
  // Custom business error codes (still using numbers for consistency)
  EMAIL_ALREADY_EXISTS = 409,
  USER_NOT_FOUND = 404,
  INVALID_OPERATION = 400,
  DATABASE_CONNECTION_ERROR = 503,
  DATABASE_QUERY_ERROR = 500
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly errorType: ErrorType;
  public readonly errorCode: number; // Changed to number for HTTP status codes
  public readonly isOperational: boolean;
  public readonly timestamp: Date;

  constructor(
    statusCode: number,
    message: string,
    errorType: ErrorType,
    errorCode: number,
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorType = errorType;
    this.errorCode = errorCode;
    this.isOperational = isOperational;
    this.timestamp = new Date();
    
    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, errorCode: number = ErrorCode.BAD_REQUEST) {
    super(400, message, ErrorType.VALIDATION, errorCode, true);
  }
}

export class BusinessLogicError extends AppError {
  constructor(message: string, errorCode: number) {
    super(errorCode, message, ErrorType.BUSINESS_LOGIC, errorCode, true);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, errorCode: number = ErrorCode.DATABASE_QUERY_ERROR) {
    super(500, message, ErrorType.DATABASE, errorCode, true);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, errorCode: number = ErrorCode.NOT_FOUND) {
    super(404, message, ErrorType.BUSINESS_LOGIC, errorCode, true);
  }
} 