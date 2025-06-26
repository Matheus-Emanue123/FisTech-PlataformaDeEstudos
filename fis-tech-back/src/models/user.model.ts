import { PrismaClient } from '../generated/prisma/client.js';
import { z } from 'zod';

const prisma = new PrismaClient();

// Zod validation schemas
export const UserDataSchema = z.object({
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
});

export const UserUpdateSchema = UserDataSchema.partial();

export const UserIdSchema = z.object({
  id: z.number().int().positive('ID must be a positive integer'),
});

// Type inference from schemas
export type UserData = z.infer<typeof UserDataSchema>;
export type UserUpdateData = z.infer<typeof UserUpdateSchema>;
export type UserId = z.infer<typeof UserIdSchema>;

export const createUser = async (userData: UserData) => {
  return prisma.usuario.create({
    data: userData,
  });
};

export const getUserById = async (id: number) => {
  return prisma.usuario.findUnique({
    where: { id },
  });
};

export const getUserByEmail = async (email: string) => {
  return prisma.usuario.findFirst({
    where: { email },
  });
};

export const updateUser = async (id: number, userData: UserUpdateData) => {
  return prisma.usuario.update({
    where: { id },
    data: userData,
  });
};

export const deleteUser = async (id: number) => {
  return prisma.usuario.delete({
    where: { id },
  });
};

export const getUsers = async () => {
  return prisma.usuario.findMany();
};
