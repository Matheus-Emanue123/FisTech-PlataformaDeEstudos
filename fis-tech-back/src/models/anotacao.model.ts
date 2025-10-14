import { PrismaClient } from '../generated/prisma/client.js';
import { AnotacaoCreateData, AnotacaoUpdateData } from '../DTO/anotacao.dto';

const prisma = new PrismaClient();

export const createAnotacao = async (data: AnotacaoCreateData) => {
  return prisma.anotacao.create({
    data,
    include: {
      Usuario: true,
      Topico: true,
    },
  });
};

export const getAnotacaoById = async (id: number) => {
  return prisma.anotacao.findUnique({
    where: { id },
    include: {
      Usuario: true,
      Topico: true,
    },
  });
};

export const getAllAnotacoes = async () => {
  return prisma.anotacao.findMany({
    include: {
      Usuario: true,
      Topico: true,
    },
  });
};

// Função extra para buscar anotações por usuário
export const getAnotacoesByUserId = async (userId: number) => {
    return prisma.anotacao.findMany({
        where: { user_id: userId },
        include: {
            Topico: true
        },
        orderBy: {
            data_criacao: 'desc'
        }
    });
};

export const updateAnotacao = async (id: number, data: AnotacaoUpdateData) => {
  return prisma.anotacao.update({
    where: { id },
    data,
    include: {
      Usuario: true,
      Topico: true,
    },
  });
};

export const deleteAnotacao = async (id: number) => {
  return prisma.anotacao.delete({
    where: { id },
  });
};