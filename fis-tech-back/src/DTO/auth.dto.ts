import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export const RegisterSchema = z.object({
  nome: z.string()
    .min(3, 'Nome must be at least 3 characters')
    .max(100, 'Nome must be at most 100 characters')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome must contain only letters and spaces'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  user_type_id: z.number().int().positive('User type ID must be a positive integer'),
});

export type LoginData = z.infer<typeof LoginSchema>;
export type RegisterData = z.infer<typeof RegisterSchema>; 