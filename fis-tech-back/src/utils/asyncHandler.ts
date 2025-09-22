import { Request, Response, NextFunction } from 'express';

/**
 * Wraps async route handlers to automatically catch and forward errors to the error handler
 * @param fn - The async route handler function
 * @returns Express middleware function
 */
export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Wraps async service functions to automatically catch and handle errors
 * @param fn - The async service function
 * @returns Wrapped function that returns a promise
 */
export const asyncServiceHandler = <T extends any[], R>(
  fn: (...args: T) => Promise<R>
) => {
  return async (...args: T): Promise<R> => {
    try {
      return await fn(...args);
    } catch (error) {
      // Re-throw the error to be handled by the error middleware
      throw error;
    }
  };
};

/**
 * Creates a safe async function that returns a result object instead of throwing
 * @param fn - The async function to wrap
 * @returns Function that returns { success: boolean, data?: any, error?: string }
 */
export const safeAsync = <T extends any[], R>(
  fn: (...args: T) => Promise<R>
) => {
  return async (...args: T): Promise<{ success: true; data: R } | { success: false; error: string }> => {
    try {
      const result = await fn(...args);
      return { success: true, data: result };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  };
}; 