import { z } from 'zod';

// criação do assunto
export const AssuntoCreateSchema = z.object({
  nome: z.string()
    .min(3, 'O nome deve ter no mínimo 3 caracteres.')
    .max(100, 'O nome deve ter no máximo 100 caracteres.'),
  descricao: z.string().optional(), 

});


// atualização do assunto
export const AssuntoUpdateSchema = z.object({
  nome: z.string()
    .min(3, 'O nome deve ter no mínimo 3 caracteres.')
    .max(100, 'O nome deve ter no máximo 100 caracteres.')
    .optional(),
  descricao: z.string().optional(),
});


// validação do ID do assunto
export const AssuntoIdSchema = z.object({
  id: z.number().int().positive('O ID deve ser um inteiro positivo.'),
});

// tipos inferidos
export type AssuntoCreateData = z.infer<typeof AssuntoCreateSchema>;
export type AssuntoUpdateData = z.infer<typeof AssuntoUpdateSchema>;
export type AssuntoId = z.infer<typeof AssuntoIdSchema>;