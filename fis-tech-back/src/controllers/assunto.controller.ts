import { Request, Response, NextFunction } from 'express';
import * as assuntoService from '../services/assunto.service';
import { apiResponse } from '../utils/apiResponse';
import { validateId } from '../utils/validation';
import { asyncHandler } from '../utils/asyncHandler';

export const createAssunto = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const assunto = await assuntoService.createAssunto(req.body);
  apiResponse(res, 201, assunto, 'Assunto criado com sucesso.');
});

export const getAssuntoById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const id = validateId(req.params.id);
  const assunto = await assuntoService.getAssuntoById(id);
  apiResponse(res, 200, assunto, 'Assunto retornado com sucesso.');
});

export const getAllAssuntos = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const assuntos = await assuntoService.getAllAssuntos();
  apiResponse(res, 200, assuntos, 'Assuntos retornados com sucesso.');
});

export const updateAssunto = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const id = validateId(req.params.id);
  const assunto = await assuntoService.updateAssunto(id, req.body);
  apiResponse(res, 200, assunto, 'Assunto atualizado com sucesso.');
});

export const deleteAssunto = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const id = validateId(req.params.id);
  await assuntoService.deleteAssunto(id);
  apiResponse(res, 200, null, 'Assunto deletado com sucesso.');
});