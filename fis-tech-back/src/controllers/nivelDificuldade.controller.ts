import { Request, Response, NextFunction } from 'express';
import * as nivelDificuldadeService from '../services/nivelDificuldade.service';
import { apiResponse } from '../utils/apiResponse';
import { validateId } from '../utils/validation';
import { asyncHandler } from '../utils/asyncHandler';

export const createNivelDificuldade = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const nivel = await nivelDificuldadeService.createNivelDificuldade(req.body);
  apiResponse(res, 201, nivel, 'Nível de dificuldade criado com sucesso.');
});

export const getNivelDificuldadeById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const id = validateId(req.params.id);
  const nivel = await nivelDificuldadeService.getNivelDificuldadeById(id);
  apiResponse(res, 200, nivel, 'Nível de dificuldade retornado com sucesso.');
});

export const getAllNiveisDificuldade = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const niveis = await nivelDificuldadeService.getAllNiveisDificuldade();
  apiResponse(res, 200, niveis, 'Níveis de dificuldade retornados com sucesso.');
});

export const updateNivelDificuldade = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const id = validateId(req.params.id);
  const nivel = await nivelDificuldadeService.updateNivelDificuldade(id, req.body);
  apiResponse(res, 200, nivel, 'Nível de dificuldade atualizado com sucesso.');
});

export const deleteNivelDificuldade = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const id = validateId(req.params.id);
  await nivelDificuldadeService.deleteNivelDificuldade(id);
  apiResponse(res, 200, null, 'Nível de dificuldade deletado com sucesso.');
});