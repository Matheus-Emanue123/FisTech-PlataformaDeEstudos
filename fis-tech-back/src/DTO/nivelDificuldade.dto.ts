import { z } from 'zod';

// criação de um NivelDificuldade
export const NivelDificuldadeCreateSchema = z.object({
  nome: z.string()
    .min(3, 'O nome deve ter no mínimo 3 caracteres.')
    .max(50, 'O nome deve ter no máximo 50 caracteres.'),
  xp: z.number().int().positive('A quantidade de XP deve ser um inteiro positivo.'),
});

// atualização de um NivelDificuldade
export const NivelDificuldadeUpdateSchema = z.object({
  nome: z.string()
    .min(3, 'O nome deve ter no mínimo 3 caracteres.')
    .max(50, 'O nome deve ter no máximo 50 caracteres.')
    .optional(),
  xp: z.number().int().positive('A quantidade de XP deve ser um inteiro positivo.').optional(),
});

// validação do ID
export const NivelDificuldadeIdSchema = z.object({
  id: z.number().int().positive('O ID deve ser um inteiro positivo.'),
});

// Tipos inferidos
export type NivelDificuldadeCreateData = z.infer<typeof NivelDificuldadeCreateSchema>;
export type NivelDificuldadeUpdateData = z.infer<typeof NivelDificuldadeUpdateSchema>;
export type NivelDificuldadeId = z.infer<typeof NivelDificuldadeIdSchema>;