import * as conteudoModel from '../models/conteudo.model';
import * as topicoModel from '../models/topico.model';
import * as nivelDificuldadeModel from '../models/nivelDificuldade.model';
// import * as questaoModel from '../models/questao.model'; 

import { NotFoundError, AuthorizationError, ErrorCode } from '../utils/errors';
import { ConteudoCreateData, ConteudoInternalCreateData, ConteudoUpdateData } from '../DTO/conteudo.dto';

export const createConteudo = async (validatedData: ConteudoCreateData, creatingUserId: number) => {
  // Validações de existência das chaves estrangeiras
  const topicoExists = await topicoModel.getTopicoById(validatedData.topico_id);
  if (!topicoExists) throw new NotFoundError('Tópico não encontrado.', ErrorCode.TOPICO_NOT_FOUND);
  
  const nivelExists = await nivelDificuldadeModel.getNivelDificuldadeById(validatedData.nivel_id);
  if (!nivelExists) throw new NotFoundError('Nível de dificuldade não encontrado.', ErrorCode.NIVEL_DIFICULDADE_NOT_FOUND);
  
  // if (validatedData.questao_id) { 
  //   const questaoExists = await questaoModel.getQuestaoById(validatedData.questao_id);
  //   if (!questaoExists) throw new NotFoundError('Questão não encontrada.', ErrorCode.QUESTAO_NOT_FOUND);
  // }

  const fullDataToCreate: ConteudoInternalCreateData = {
    ...validatedData,
    criado_por: creatingUserId
  };

  return conteudoModel.createConteudo(fullDataToCreate);
};

export const updateConteudo = async (id: number, updateData: ConteudoUpdateData, requestingUserId: number) => {
  const existingConteudo = await conteudoModel.getConteudoById(id);
  if (!existingConteudo) {
    throw new NotFoundError('Conteúdo não encontrado.', ErrorCode.CONTEUDO_NOT_FOUND); 
  }

  // REGRA DE NEGÓCIO: Apenas o criador pode editar o conteúdo.
  if (existingConteudo.criado_por !== requestingUserId) {
    throw new AuthorizationError('Você não tem permissão para editar este conteúdo.', ErrorCode.FORBIDDEN);
  }

  return conteudoModel.updateConteudo(id, updateData);
};

export const deleteConteudo = async (id: number, requestingUserId: number) => {
  const existingConteudo = await conteudoModel.getConteudoById(id);
  if (!existingConteudo) {
    throw new NotFoundError('Conteúdo não encontrado.', ErrorCode.CONTEUDO_NOT_FOUND);
  }

  // REGRA DE NEGÓCIO: Apenas o criador pode deletar o conteúdo.
  if (existingConteudo.criado_por !== requestingUserId) {
    throw new AuthorizationError('Você não tem permissão para deletar este conteúdo.', ErrorCode.FORBIDDEN);
  }

  return conteudoModel.deleteConteudo(id);
};

export const getConteudoById = async (id: number) => {
  const conteudo = await conteudoModel.getConteudoById(id);
  if (!conteudo) {
    throw new NotFoundError('Conteúdo não encontrado.', ErrorCode.CONTEUDO_NOT_FOUND);
  }
  return conteudo;
};

export const getAllConteudos = async () => {
  return conteudoModel.getAllConteudos();
};