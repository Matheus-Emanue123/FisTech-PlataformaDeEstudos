import { z } from 'zod';

// Schema para a criação de um Tópico
export const TopicoCreateSchema = z.object({
  nome: z.string()
    .min(3, 'O nome deve ter no mínimo 3 caracteres.')
    .max(100, 'O nome deve ter no máximo 100 caracteres.'),
  descricao: z.string().optional(),
  assunto_id: z.number().int().positive('O ID do assunto é obrigatório.'),
});

// Schema para a atualização de um Tópico
export const TopicoUpdateSchema = z.object({
  nome: z.string()
    .min(3, 'O nome deve ter no mínimo 3 caracteres.')
    .max(100, 'O nome deve ter no máximo 100 caracteres.')
    .optional(),
  descricao: z.string().optional(),
  assunto_id: z.number().int().positive('O ID do assunto é obrigatório.').optional(),
});

// Schema para validar o ID do Tópico
export const TopicoIdSchema = z.object({
  id: z.number().int().positive('O ID deve ser um inteiro positivo.'),
});

// Tipos inferidos
export type TopicoCreateData = z.infer<typeof TopicoCreateSchema>;
export type TopicoUpdateData = z.infer<typeof TopicoUpdateSchema>;
export type TopicoId = z.infer<typeof TopicoIdSchema>;