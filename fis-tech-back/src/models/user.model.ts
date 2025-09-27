import { PrismaClient } from '../generated/prisma/client.js';
import { UserCreateData, UserUpdateData, UserId } from '../DTO/user.dto';

const prisma = new PrismaClient();

export const createUser = async (userData: UserCreateData) => {
  return prisma.usuario.create({
    data: userData,
    include: {
      UserType: true
    }
  });
};

export const getUserById = async (id: number) => {
  return prisma.usuario.findUnique({
    where: { id },
    include: {
      UserType: true
    }
  });
};

export const getUserByEmail = async (email: string) => {
  return prisma.usuario.findFirst({
    where: { email },
    include: {
      UserType: true
    }
  });
};

export const updateUser = async (id: number, userData: UserUpdateData) => {
  return prisma.usuario.update({
    where: { id },
    data: userData,
    include: {
      UserType: true
    }
  });
};

export const deleteUser = async (id: number) => {
  return prisma.usuario.delete({
    where: { id },
  });
};

export const getUsers = async () => {
  return prisma.usuario.findMany({
    include: {
      UserType: true
    }
  });
};
