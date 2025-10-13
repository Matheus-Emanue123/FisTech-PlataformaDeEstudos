import { PrismaClient } from '../generated/prisma/client.js';
import { NivelDificuldadeCreateData, NivelDificuldadeUpdateData } from '../DTO/nivelDificuldade.dto';

const prisma = new PrismaClient();

export const createNivelDificuldade = async (data: NivelDificuldadeCreateData) => {
  return prisma.nivelDificuldade.create({ data });
};

export const getNivelDificuldadeById = async (id: number) => {
  return prisma.nivelDificuldade.findUnique({ where: { id } });
};

export const getNivelDificuldadeByName = async (nome: string) => {
  return prisma.nivelDificuldade.findUnique({ where: { nome } });
};

export const getAllNiveisDificuldade = async () => {
  return prisma.nivelDificuldade.findMany();
};

export const updateNivelDificuldade = async (id: number, data: NivelDificuldadeUpdateData) => {
  return prisma.nivelDificuldade.update({ where: { id }, data });
};

export const deleteNivelDificuldade = async (id: number) => {
  return prisma.nivelDificuldade.delete({ where: { id } });
};