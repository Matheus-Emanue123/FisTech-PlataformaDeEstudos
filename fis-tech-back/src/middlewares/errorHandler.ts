import { Request, Response, NextFunction } from 'express';
import { PrismaClientKnownRequestError, PrismaClientInitializationError, PrismaClientValidationError } from '../generated/prisma/runtime/library';
import { apiResponse } from '../utils/apiResponse';

export class AppError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  let statusCode = 500;
  let message = 'Internal server error';

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } 
  else if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      statusCode = 409;
      message = 'Duplicate record';
    } else {
      message = `Database error: ${err.message}`;
    }
  } 
  else if (err instanceof PrismaClientInitializationError) {
    message = 'Database connection error';
  }
  else if (err instanceof PrismaClientValidationError) {
    statusCode = 400;
    message = 'Invalid database operation';
  }

  apiResponse(res, statusCode, null, message);
};
