import { z } from 'zod';
import { ValidationError, ErrorCode } from './errors';

/**
 * Validates data against a Zod schema and returns the validated data
 * @param schema - The Zod schema to validate against
 * @param data - The data to validate
 * @returns The validated data
 * @throws ValidationError with validation details if validation fails
 */
export const validateData = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  try {
    return schema.parse(data);
  } 
  catch (e) {
    if (e instanceof z.ZodError) {
      // Join all error messages with field names into a single message
      const errorMessages = e.errors.map(err => {
        const fieldName = err.path.join('.');
        return `${fieldName}: ${err.message}`;
      });
      const combinedMessage = errorMessages.join('; ');
      
      throw new ValidationError(combinedMessage, ErrorCode.BAD_REQUEST);
    }
    throw new ValidationError('Unknown validation error', ErrorCode.BAD_REQUEST);
  }
};

/**
 * Validates ID parameters from request
 * @param id - The ID to validate
 * @returns The validated ID as number
 * @throws ValidationError if ID is invalid
 */
export const validateId = (id: string | number): number => {
  const numId = typeof id === 'string' ? parseInt(id, 10) : id;
  
  if (isNaN(numId) || numId <= 0 || !Number.isInteger(numId)) {
    throw new ValidationError('Invalid ID format - Please provide a valid positive integer ID', ErrorCode.BAD_REQUEST);
  }
  
  return numId;
};
