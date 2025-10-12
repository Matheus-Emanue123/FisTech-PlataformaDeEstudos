import { Request, Response, NextFunction } from 'express';
import * as topicoService from '../services/topico.service';
import { apiResponse } from '../utils/apiResponse';
import { validateId } from '../utils/validation';
import { asyncHandler } from '../utils/asyncHandler';


export const createTopico = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const topico = await topicoService.createTopico(req.body);
  apiResponse(res, 201, topico, 'Tópico criado com sucesso.');
});

export const getTopicoById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const id = validateId(req.params.id);
  const topico = await topicoService.getTopicoById(id);
  apiResponse(res, 200, topico, 'Tópico retornado com sucesso.');
});

export const getAllTopicos = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const topicos = await topicoService.getAllTopicos();
  apiResponse(res, 200, topicos, 'Tópicos retornados com sucesso.');
});

export const updateTopico = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const id = validateId(req.params.id);
  const topico = await topicoService.updateTopico(id, req.body);
  apiResponse(res, 200, topico, 'Tópico atualizado com sucesso.');
});

export const deleteTopico = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const id = validateId(req.params.id);
  await topicoService.deleteTopico(id);
  apiResponse(res, 200, null, 'Tópico deletado com sucesso.');
});