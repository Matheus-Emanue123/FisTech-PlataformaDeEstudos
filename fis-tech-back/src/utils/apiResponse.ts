import { Response } from 'express';

/**
 * Envia uma resposta padronizada para a API
 * 
 * @param res Objeto de resposta do Express
 * @param status Código de status HTTP
 * @param data Dados a serem enviados (opcional)
 * @param message Mensagem descritiva (opcional)
 */
export const apiResponse = (
  res: Response,
  status: number,
  data: any = null,
  message: string = '',
  meta?: Record<string, any>
) => {
  const success = status >= 200 && status < 300;
  
  const response: any = {
    success,
    message: message || (success ? 'Operação bem-sucedida' : 'Erro na operação'),
    timestamp: new Date().toISOString()
  };

  if (data !== null) {
    response.data = data;
  }

  if (meta) {
    response.meta = meta;
  }

  res.status(status).json(response);
};


/**
 * Envia uma resposta de lista paginada
 */
export const paginatedResponse = (
  res: Response,
  data: any[],
  page: number,
  limit: number,
  total: number,
  message: string = 'Dados recuperados com sucesso'
) => {
  const totalPages = Math.ceil(total / limit);
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  const meta = {
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext,
      hasPrev
    }
  };

  apiResponse(res, 200, data, message, meta);
};