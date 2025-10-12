import * as anotacaoModel from '../models/anotacao.model';
import * as userModel from '../models/user.model';
import * as topicoModel from '../models/topico.model';
import { validateData } from '../utils/validation';
import { BusinessLogicError, NotFoundError, ErrorCode, AuthorizationError } from '../utils/errors';
import { AnotacaoCreateSchema, AnotacaoUpdateSchema, AnotacaoIdSchema, AnotacaoInternalCreateData, AnotacaoCreateData } from '../DTO/anotacao.dto';

export const createAnotacao = async (validatedData: AnotacaoCreateData, creatingUserId: number) => {
  
  
  // Validações de negócio:
  const userExists = await userModel.getUserById(creatingUserId);
  if (!userExists) {
    throw new NotFoundError('Usuário autenticado não encontrado no banco de dados.', ErrorCode.USER_NOT_FOUND);
  }

  const topicoExists = await topicoModel.getTopicoById(validatedData.topico_id);
  if (!topicoExists) {
    throw new NotFoundError('Tópico não encontrado.', ErrorCode.TOPICO_NOT_FOUND);
  }

  // Monta o objeto completo para enviar ao model
  const fullDataToCreate: AnotacaoInternalCreateData = {
    ...validatedData,
    user_id: creatingUserId
  };

  return anotacaoModel.createAnotacao(fullDataToCreate);
};

export const updateAnotacao = async (id: number, anotacaoData: unknown, requestingUserId: number) => {
  const validatedId = validateData(AnotacaoIdSchema, { id });
  const validatedData = validateData(AnotacaoUpdateSchema, anotacaoData);

  const existingAnotacao = await anotacaoModel.getAnotacaoById(validatedId.id);
  if (!existingAnotacao) {
    throw new NotFoundError('Anotação não encontrada.', ErrorCode.ANOTACAO_NOT_FOUND); // Adicionar este erro
  }
  
  // REGRA DE NEGÓCIO: Apenas o dono da anotação pode editá-la
  if (existingAnotacao.user_id !== requestingUserId) {
    throw new AuthorizationError('Você não tem permissão para editar esta anotação.', ErrorCode.FORBIDDEN);
  }

  return anotacaoModel.updateAnotacao(validatedId.id, validatedData);
};

export const getAnotacaoById = async (id: number, requestingUserId: number) => {
  const validatedId = validateData(AnotacaoIdSchema, { id });
  const anotacao = await anotacaoModel.getAnotacaoById(validatedId.id);
  
  
  if (!anotacao || anotacao.user_id !== requestingUserId) {
   
    throw new NotFoundError('Anotação não encontrada.', ErrorCode.ANOTACAO_NOT_FOUND);
  }
  
  return anotacao;
};


export const getAnotacoesByUserId = async (userId: number) => {
    return anotacaoModel.getAnotacoesByUserId(userId);
};

export const deleteAnotacao = async (id: number, requestingUserId: number) => {
  const validatedId = validateData(AnotacaoIdSchema, { id });
  
  const existingAnotacao = await anotacaoModel.getAnotacaoById(validatedId.id);
  if (!existingAnotacao) {
    throw new NotFoundError('Anotação não encontrada.', ErrorCode.ANOTACAO_NOT_FOUND);
  }
  
  // REGRA DE NEGÓCIO: Apenas o dono da anotação pode deletá-la
  if (existingAnotacao.user_id !== requestingUserId) {
    throw new AuthorizationError('Você não tem permissão para deletar esta anotação.', ErrorCode.FORBIDDEN);
  }

  return anotacaoModel.deleteAnotacao(validatedId.id);
};

export const getAllAnotacoes = async () => {
  return anotacaoModel.getAllAnotacoes();
};