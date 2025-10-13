import { z } from 'zod';

// criação de uma Anotação
export const AnotacaoCreateSchema = z.object({
  texto: z.string().min(1, 'O texto da anotação não pode estar vazio.'),
  user_id: z.number().int().positive('O ID do usuário é obrigatório.').optional(),
  topico_id: z.number().int().positive('O ID do tópico é obrigatório.'),
});

// atualização de uma Anotação
export const AnotacaoUpdateSchema = z.object({
  texto: z.string().min(1, 'O texto da anotação não pode estar vazio.').optional(),
  user_id: z.number().int().positive('O ID do usuário é obrigatório.').optional(),
  topico_id: z.number().int().positive('O ID do tópico é obrigatório.').optional(),
});

//validar o ID da Anotação
export const AnotacaoIdSchema = z.object({
  id: z.number().int().positive('O ID deve ser um inteiro positivo.'),
});

// Tipos inferidos
export type AnotacaoCreateData = z.infer<typeof AnotacaoCreateSchema>;
export type AnotacaoUpdateData = z.infer<typeof AnotacaoUpdateSchema>;
export type AnotacaoId = z.infer<typeof AnotacaoIdSchema>;

export type AnotacaoInternalCreateData = z.infer<typeof AnotacaoCreateSchema>;