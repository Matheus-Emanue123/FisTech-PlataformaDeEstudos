import { Request, Response, NextFunction } from 'express';
import * as anotacaoService from '../services/anotacao.service';
import { apiResponse } from '../utils/apiResponse';
import { validateData, validateId } from '../utils/validation';
import { asyncHandler } from '../utils/asyncHandler';
import { AnotacaoCreateSchema } from '../DTO/anotacao.dto';

export const createAnotacao = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
  
  const validatedBody = validateData(AnotacaoCreateSchema, req.body);
  
  
  const anotacao = await anotacaoService.createAnotacao(validatedBody, req.user.userId);
  
  apiResponse(res, 201, anotacao, 'Anotação criada com sucesso.');
});
export const getAnotacaoById = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
  const id = validateId(req.params.id);
  const anotacao = await anotacaoService.getAnotacaoById(id, req.user.userId);
  apiResponse(res, 200, anotacao, 'Anotação retornada com sucesso.');
});

export const getAnotacoesByUserId = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const userId = req.user.userId;
    const anotacoes = await anotacaoService.getAnotacoesByUserId(userId);
    apiResponse(res, 200, anotacoes, 'Anotações do usuário retornadas com sucesso.');
});

export const updateAnotacao = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
  const id = validateId(req.params.id);
  const anotacao = await anotacaoService.updateAnotacao(id, req.body, req.user.userId);
  apiResponse(res, 200, anotacao, 'Anotação atualizada com sucesso.');
});

export const deleteAnotacao = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
  const id = validateId(req.params.id);
  await anotacaoService.deleteAnotacao(id, req.user.userId);
  apiResponse(res, 200, null, 'Anotação deletada com sucesso.');
});