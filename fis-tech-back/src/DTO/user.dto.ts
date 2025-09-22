// src/dto/user.dto.ts
import { z } from 'zod';

export const UserCreateSchema = z.object({
  nome: z.string()
    .min(3, 'Nome must be at least 3 characters')
    .max(100, 'Nome must be at most 100 characters')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome must contain only letters and spaces'),
  email: z.string()
    .email('Invalid email format')
    .max(255, 'Email must be at most 255 characters'),
  senha_hash: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(255, 'Password must be at most 255 characters'),
  user_type_id: z.number().int().positive('User type ID must be a positive integer'),
});

export const UserUpdateSchema = z.object({
  nome: z.string()
    .min(3, 'Nome must be at least 3 characters')
    .max(100, 'Nome must be at most 100 characters')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome must contain only letters and spaces')
    .optional(),
  email: z.string()
    .email('Invalid email format')
    .max(255, 'Email must be at most 255 characters')
    .optional(),
  senha_hash: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(255, 'Password must be at most 255 characters')
    .optional(),
  user_type_id: z.number().int().positive('User type ID must be a positive integer').optional(),
});

export const UserIdSchema = z.object({
  id: z.number().int().positive('ID must be a positive integer'),
});

export type UserCreateData = z.infer<typeof UserCreateSchema>;
export type UserUpdateData = z.infer<typeof UserUpdateSchema>;
export type UserId = z.infer<typeof UserIdSchema>;
