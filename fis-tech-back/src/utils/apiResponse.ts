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
  message: string = ''
) => {
  const success = status >= 200 && status < 300;
  
  res.status(status).json({
    success,
    message: message || (success ? 'Operação bem-sucedida' : 'Erro na operação'),
    data
  });
};