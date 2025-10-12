export enum ErrorType {
  VALIDATION = 'VALIDATION',
  BUSINESS_LOGIC = 'BUSINESS_LOGIC',
  DATABASE = 'DATABASE',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  SYSTEM = 'SYSTEM',
  RATE_LIMIT = 'RATE_LIMIT',
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND'
}

// HTTP Status Codes as Error Codes
export enum ErrorCode {
  // 4xx Client Errors
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,
  
  // 5xx Server Errors
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  SERVICE_UNAVAILABLE = 503,
  
  // Custom business error codes (still using numbers for consistency)
  EMAIL_ALREADY_EXISTS = 409, // Conflict
  USER_NOT_FOUND = 404, // Not Found
  INVALID_OPERATION = 400,
  DATABASE_CONNECTION_ERROR = 503,
  DATABASE_QUERY_ERROR = 500,
  INVALID_CREDENTIALS = 401,
  ACCOUNT_LOCKED = 423,
  INVALID_TOKEN = 401,
  TOKEN_EXPIRED = 401,

  // --- NOVOS CÓDIGOS ADICIONADOS ---
  /** O assunto com o ID especificado não foi encontrado. */
  ASSUNTO_NOT_FOUND = 404, // Not Found
  /** Já existe um assunto com o nome fornecido. */
  ASSUNTO_NAME_EXISTS = 409, // Conflict

  
  /** O tópico com o ID especificado não foi encontrado. */
  TOPICO_NOT_FOUND = 404, // Not Found
  /** Já existe um tópico com o nome fornecido dentro do mesmo assunto. */
  TOPICO_NAME_EXISTS = 409, // Conflict
}

export interface ErrorContext {
  field?: string;
  value?: any;
  suggestion?: string;
  requestId?: string;
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly errorType: ErrorType;
  public readonly errorCode: number;
  public readonly isOperational: boolean;
  public readonly timestamp: Date;
  public readonly context?: ErrorContext;

  constructor(
    statusCode: number,
    message: string,
    errorType: ErrorType,
    errorCode: number,
    isOperational: boolean = true,
    context?: ErrorContext
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorType = errorType;
    this.errorCode = errorCode;
    this.isOperational = isOperational;
    this.timestamp = new Date();
    this.context = context;
    
    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, this.constructor);
  }

  public toJSON() {
    return {
      type: this.errorType,
      code: this.errorCode,
      message: this.message,
      timestamp: this.timestamp.toISOString(),
      context: this.context
    };
  }
}

// ... (Restante das classes de erro: ValidationError, BusinessLogicError, etc. permanecem iguais)

export class ValidationError extends AppError {
  constructor(message: string, errorCode: number = ErrorCode.BAD_REQUEST, context?: ErrorContext) {
    super(400, message, ErrorType.VALIDATION, errorCode, true, context);
  }
}

export class BusinessLogicError extends AppError {
  constructor(message: string, errorCode: number, context?: ErrorContext) {
    // O statusCode é o próprio errorCode para erros de negócio
    super(errorCode, message, ErrorType.BUSINESS_LOGIC, errorCode, true, context);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, errorCode: number = ErrorCode.DATABASE_QUERY_ERROR, context?: ErrorContext) {
    super(500, message, ErrorType.DATABASE, errorCode, true, context);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, errorCode: number = ErrorCode.NOT_FOUND, context?: ErrorContext) {
    super(404, message, ErrorType.RESOURCE_NOT_FOUND, errorCode, true, context);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string, errorCode: number = ErrorCode.UNAUTHORIZED, context?: ErrorContext) {
    super(401, message, ErrorType.AUTHENTICATION, errorCode, true, context);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string, errorCode: number = ErrorCode.FORBIDDEN, context?: ErrorContext) {
    super(403, message, ErrorType.AUTHORIZATION, errorCode, true, context);
  }
}

export class RateLimitError extends AppError {
  constructor(message: string, context?: ErrorContext) {
    super(429, message, ErrorType.RATE_LIMIT, ErrorCode.TOO_MANY_REQUESTS, true, context);
  }
}