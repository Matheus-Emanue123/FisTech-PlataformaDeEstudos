import * as assuntoModel from '../models/assunto.model';
import { validateData } from '../utils/validation';
import { BusinessLogicError, NotFoundError, ErrorCode } from '../utils/errors';
import { AssuntoCreateSchema, AssuntoUpdateSchema, AssuntoIdSchema } from '../DTO/assunto.dto';

export const createAssunto = async (assuntoData: unknown) => {
  const validatedData = validateData(AssuntoCreateSchema, assuntoData);

  // Regra de negócio: não permitir assuntos com nomes duplicados
  const existingAssunto = await assuntoModel.getAssuntoByName(validatedData.nome);
  if (existingAssunto) {
    throw new BusinessLogicError(
      'Já existe um assunto com este nome.',
      ErrorCode.ASSUNTO_NAME_EXISTS
    );
  }

  return assuntoModel.createAssunto(validatedData);
};

export const updateAssunto = async (id: number, assuntoData: unknown) => {
  const validatedId = validateData(AssuntoIdSchema, { id });
  const validatedData = validateData(AssuntoUpdateSchema, assuntoData);

  const existingAssunto = await assuntoModel.getAssuntoById(validatedId.id);
  if (!existingAssunto) {
    throw new NotFoundError('Assunto não encontrado.', ErrorCode.ASSUNTO_NOT_FOUND);
  }

  // Se o nome está sendo alterado, verificar se o novo nome já não existe
  if (validatedData.nome && validatedData.nome !== existingAssunto.nome) {
    const assuntoWithSameName = await assuntoModel.getAssuntoByName(validatedData.nome);
    if (assuntoWithSameName) {
      throw new BusinessLogicError(
        'Já existe um assunto com este nome.',
        ErrorCode.ASSUNTO_NAME_EXISTS
      );
    }
  }

  return assuntoModel.updateAssunto(validatedId.id, validatedData);
};

export const getAssuntoById = async (id: number) => {
  const validatedId = validateData(AssuntoIdSchema, { id });
  const assunto = await assuntoModel.getAssuntoById(validatedId.id);
  
  if (!assunto) {
    throw new NotFoundError('Assunto não encontrado.', ErrorCode.ASSUNTO_NOT_FOUND);
  }
  
  return assunto;
};

export const deleteAssunto = async (id: number) => {
  const validatedId = validateData(AssuntoIdSchema, { id });
  
  const existingAssunto = await assuntoModel.getAssuntoById(validatedId.id);
  if (!existingAssunto) {
    throw new NotFoundError('Assunto não encontrado.', ErrorCode.ASSUNTO_NOT_FOUND);
  }

  return assuntoModel.deleteAssunto(validatedId.id);
};

export const getAllAssuntos = async () => {
  return assuntoModel.getAllAssuntos();
};