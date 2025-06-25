import { PrismaClient } from '../generated/prisma/client.js';

const prisma = new PrismaClient();

export type UserData = {
  nome: string;
  email: string;
  senha_hash: string;
};

export const createUser = async (userData: UserData) => {
  return prisma.usuario.create({
    data: userData,
  });
};

export const getUsers = async () => {
  return prisma.usuario.findMany();
};
