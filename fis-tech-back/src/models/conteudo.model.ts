import { PrismaClient } from '../generated/prisma/client.js';
import { ConteudoInternalCreateData, ConteudoUpdateData } from '../DTO/conteudo.dto';

const prisma = new PrismaClient();


const includeRelations = {
  Topico: true,
  NivelDificuldade: true,
  Usuario: { // Seleciona apenas campos seguros do usuário criador
    select: { id: true, nome: true, email: true }
  },
  Questao: true,
};

export const createConteudo = async (data: ConteudoInternalCreateData) => {
  return prisma.conteudo.create({
    data,
    include: includeRelations,
  });
};

export const getConteudoById = async (id: number) => {
  return prisma.conteudo.findUnique({
    where: { id },
    include: includeRelations,
  });
};

export const getAllConteudos = async () => {
  return prisma.conteudo.findMany({
    include: includeRelations,
  });
};

export const updateConteudo = async (id: number, data: ConteudoUpdateData) => {
  return prisma.conteudo.update({
    where: { id },
    data,
    include: includeRelations,
  });
};

export const deleteConteudo = async (id: number) => {
  return prisma.conteudo.delete({
    where: { id },
  });
};