import * as nivelDificuldadeModel from '../models/nivelDificuldade.model';
import { validateData } from '../utils/validation';
import { BusinessLogicError, NotFoundError, ErrorCode } from '../utils/errors';
import { NivelDificuldadeCreateSchema, NivelDificuldadeUpdateSchema, NivelDificuldadeIdSchema } from '../DTO/nivelDificuldade.dto';

export const createNivelDificuldade = async (data: unknown) => {
  const validatedData = validateData(NivelDificuldadeCreateSchema, data);

  const existingNivel = await nivelDificuldadeModel.getNivelDificuldadeByName(validatedData.nome);
  if (existingNivel) {
    throw new BusinessLogicError(
      'Já existe um nível de dificuldade com este nome.',
      ErrorCode.NIVEL_DIFICULDADE_NAME_EXISTS 
    );
  }

  return nivelDificuldadeModel.createNivelDificuldade(validatedData);
};

export const updateNivelDificuldade = async (id: number, data: unknown) => {
  const validatedId = validateData(NivelDificuldadeIdSchema, { id });
  const validatedData = validateData(NivelDificuldadeUpdateSchema, data);

  const nivelToUpdate = await nivelDificuldadeModel.getNivelDificuldadeById(validatedId.id);
  if (!nivelToUpdate) {
    throw new NotFoundError('Nível de dificuldade não encontrado.', ErrorCode.NIVEL_DIFICULDADE_NOT_FOUND); 
  }

  if (validatedData.nome && validatedData.nome !== nivelToUpdate.nome) {
    const existingNivel = await nivelDificuldadeModel.getNivelDificuldadeByName(validatedData.nome);
    if (existingNivel) {
      throw new BusinessLogicError(
        'Já existe um nível de dificuldade com este nome.',
        ErrorCode.NIVEL_DIFICULDADE_NAME_EXISTS
      );
    }
  }

  return nivelDificuldadeModel.updateNivelDificuldade(validatedId.id, validatedData);
};

export const getNivelDificuldadeById = async (id: number) => {
  const validatedId = validateData(NivelDificuldadeIdSchema, { id });
  const nivel = await nivelDificuldadeModel.getNivelDificuldadeById(validatedId.id);
  
  if (!nivel) {
    throw new NotFoundError('Nível de dificuldade não encontrado.', ErrorCode.NIVEL_DIFICULDADE_NOT_FOUND);
  }
  
  return nivel;
};

export const deleteNivelDificuldade = async (id: number) => {
  const validatedId = validateData(NivelDificuldadeIdSchema, { id });
  
  const existingNivel = await nivelDificuldadeModel.getNivelDificuldadeById(validatedId.id);
  if (!existingNivel) {
    throw new NotFoundError('Nível de dificuldade não encontrado.', ErrorCode.NIVEL_DIFICULDADE_NOT_FOUND);
  }

  return nivelDificuldadeModel.deleteNivelDificuldade(validatedId.id);
};

export const getAllNiveisDificuldade = async () => {
  return nivelDificuldadeModel.getAllNiveisDificuldade();
};