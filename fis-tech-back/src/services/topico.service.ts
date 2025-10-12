import * as topicoModel from '../models/topico.model';
import * as assuntoModel from '../models/assunto.model'; // Importamos para validar
import { validateData } from '../utils/validation';
import { BusinessLogicError, NotFoundError, ErrorCode } from '../utils/errors';
import { TopicoCreateSchema, TopicoUpdateSchema, TopicoIdSchema } from '../DTO/topico.dto';

export const createTopico = async (topicoData: unknown) => {
  const validatedData = validateData(TopicoCreateSchema, topicoData);

  // 1. Validar se o Assunto existe
  const assuntoExists = await assuntoModel.getAssuntoById(validatedData.assunto_id);
  if (!assuntoExists) {
    throw new NotFoundError(
      'O assunto especificado não foi encontrado.',
      ErrorCode.ASSUNTO_NOT_FOUND // Você já tem este erro
    );
  }

  // 2. Validar se já não existe um tópico com o mesmo nome NESTE assunto
  const existingTopico = await topicoModel.getTopicoByNameAndAssuntoId(
    validatedData.nome,
    validatedData.assunto_id
  );
  if (existingTopico) {
    throw new BusinessLogicError(
      'Já existe um tópico com este nome neste assunto.',
      ErrorCode.TOPICO_NAME_EXISTS // Adicionar este novo erro
    );
  }

  return topicoModel.createTopico(validatedData);
};

export const updateTopico = async (id: number, topicoData: unknown) => {
  const validatedId = validateData(TopicoIdSchema, { id });
  const validatedData = validateData(TopicoUpdateSchema, topicoData);

  const existingTopico = await topicoModel.getTopicoById(validatedId.id);
  if (!existingTopico) {
    throw new NotFoundError('Tópico não encontrado.', ErrorCode.TOPICO_NOT_FOUND); // Adicionar este novo erro
  }

  // Se o assunto_id está sendo alterado, verificar se o novo assunto existe
  if (validatedData.assunto_id && validatedData.assunto_id !== existingTopico.assunto_id) {
    const assuntoExists = await assuntoModel.getAssuntoById(validatedData.assunto_id);
    if (!assuntoExists) {
      throw new NotFoundError(
        'O novo assunto especificado não foi encontrado.',
        ErrorCode.ASSUNTO_NOT_FOUND
      );
    }
  }

  return topicoModel.updateTopico(validatedId.id, validatedData);
};

export const getTopicoById = async (id: number) => {
  const validatedId = validateData(TopicoIdSchema, { id });
  const topico = await topicoModel.getTopicoById(validatedId.id);
  
  if (!topico) {
    throw new NotFoundError('Tópico não encontrado.', ErrorCode.TOPICO_NOT_FOUND);
  }
  
  return topico;
};

export const deleteTopico = async (id: number) => {
  const validatedId = validateData(TopicoIdSchema, { id });
  
  const existingTopico = await topicoModel.getTopicoById(validatedId.id);
  if (!existingTopico) {
    throw new NotFoundError('Tópico não encontrado.', ErrorCode.TOPICO_NOT_FOUND);
  }

  return topicoModel.deleteTopico(validatedId.id);
};

export const getAllTopicos = async () => {
  return topicoModel.getAllTopicos();
};