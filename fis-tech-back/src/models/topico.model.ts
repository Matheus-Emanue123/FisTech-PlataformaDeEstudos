import { PrismaClient } from '../generated/prisma/client.js';
import { TopicoCreateData, TopicoUpdateData } from '../DTO/topico.dto';

const prisma = new PrismaClient();

// Cria um novo tópico
export const createTopico = async (data: TopicoCreateData) => {
  return prisma.topico.create({
    data,
    include: {
      Assunto: true, // Retorna o assunto relacionado
    },
  });
};

// Busca um tópico pelo ID
export const getTopicoById = async (id: number) => {
  return prisma.topico.findUnique({
    where: { id },
    include: {
      Assunto: true,
    },
  });
};

// Busca um tópico pelo nome dentro de um assunto específico (para evitar duplicatas)
export const getTopicoByNameAndAssuntoId = async (nome: string, assunto_id: number) => {
  return prisma.topico.findFirst({
    where: {
      nome,
      assunto_id,
    },
  });
};

// Busca todos os tópicos
export const getAllTopicos = async () => {
  return prisma.topico.findMany({
    include: {
      Assunto: true,
    },
  });
};

// Atualiza um tópico
export const updateTopico = async (id: number, data: TopicoUpdateData) => {
  return prisma.topico.update({
    where: { id },
    data,
    include: {
      Assunto: true,
    },
  });
};

// Deleta um tópico
export const deleteTopico = async (id: number) => {
  return prisma.topico.delete({
    where: { id },
  });
};