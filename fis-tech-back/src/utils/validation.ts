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
      const errorDetails = error.errors.map(e => {
        const field = e.path.join('.');
        const message = e.message;
        
        // Provide more specific error messages based on the field
        switch (field) {
          case 'nome':
            if (message.includes('at least 3 characters')) {
              return `${field}: Name must be at least 3 characters long`;
            }
            if (message.includes('only letters and spaces')) {
              return `${field}: Name can only contain letters and spaces`;
            }
            break;
          case 'email':
            if (message.includes('Invalid email format')) {
              return `${field}: Please provide a valid email address`;
            }
            break;
          case 'password':
            if (message.includes('at least 6 characters')) {
              return `${field}: Password must be at least 6 characters long`;
            }
            break;
          case 'user_type_id':
            if (message.includes('positive integer')) {
              return `${field}: User type ID must be a valid positive number`;
            }
            break;
          case 'senha_hash':
            if (message.includes('at least 6 characters')) {
              return `${field}: Password must be at least 6 characters long`;
            }
            break;
          default:
            return `${field}: ${message}`;
        }
        return `${field}: ${message}`;
      }).join(', ');
      
      throw new ValidationError(`Validation failed: ${errorDetails}`, ErrorCode.BAD_REQUEST);
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