import { PrismaClient } from '../generated/prisma/client.js';
import { UserCreateData, UserUpdateData, UserQuery } from '../DTO/user.dto';

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

export const getUsers = async (queryParams: UserQuery) => {
  const { page = 1, size = 10, sortBy, direction, nome, userType } = queryParams;

  const skip = (page - 1) * size;

  const where: any = {
    disabled: false, 
  };
  
  if (nome) {
    where.nome = {
      contains: nome,
      mode: 'insensitive',
    };
  }
  if (userType) {
    where.user_type_id = userType;
  }

  const orderBy: any = {};
  if (sortBy === 'createdAt') {
    orderBy.data_criacao = direction;
  } else if (sortBy === 'nome') {
    orderBy.nome = direction;
  }

  const users = await prisma.usuario.findMany({
    skip,
    take: size,
    where,
    orderBy,
    include: {
      UserType: true,
    },
  });

  const total = await prisma.usuario.count({ where });

  return { users, total };
};
