import { Request, Response, NextFunction } from 'express';
import * as conteudoService from '../services/conteudo.service';
import { apiResponse } from '../utils/apiResponse';
import { validateId, validateData } from '../utils/validation';
import { asyncHandler } from '../utils/asyncHandler';
import { ConteudoCreateSchema, ConteudoUpdateSchema } from '../DTO/conteudo.dto';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

export const createConteudo = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

     if(!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
     }

    const validatedBody = validateData(ConteudoCreateSchema, req.body);
    const conteudo = await conteudoService.createConteudo(validatedBody, req.user.userId);
    apiResponse(res, 201, conteudo, 'Conteúdo criado com sucesso.');
});

export const getConteudoById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const id = validateId(req.params.id);
    const conteudo = await conteudoService.getConteudoById(id);
     apiResponse(res, 200, conteudo, 'Conteúdo retornado com sucesso.');
});

export const getAllConteudos = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const conteudos = await conteudoService.getAllConteudos();
    apiResponse(res, 200, conteudos, 'Conteúdos retornados com sucesso.');
});

export const updateConteudo = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    if(!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const id = validateId(req.params.id);
    const validatedBody = validateData(ConteudoUpdateSchema, req.body);
    const conteudo = await conteudoService.updateConteudo(id, validatedBody, req.user.userId);
    apiResponse(res, 200, conteudo, 'Conteúdo atualizado com sucesso.');
});

export const deleteConteudo = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if(!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
    }
    const id = validateId(req.params.id);
    await conteudoService.deleteConteudo(id, req.user.userId);
    apiResponse(res, 200, null, 'Conteúdo deletado com sucesso.');
});