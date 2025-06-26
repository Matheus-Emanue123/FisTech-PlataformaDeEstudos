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
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
      throw new ValidationError(`Validation error: ${errorMessages}`, ErrorCode.BAD_REQUEST);
    }
    throw new ValidationError('Unknown validation error', ErrorCode.BAD_REQUEST);
  }
};

/**
 * Safely validates data against a Zod schema and returns the result
 * @param schema - The Zod schema to validate against
 * @param data - The data to validate
 * @returns Object with success status and data/error
 */
export const safeValidate = <T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; error: string } => {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
      return { success: false, error: `Validation error: ${errorMessages}` };
    }
    return { success: false, error: 'Unknown validation error' };
  }
}; 