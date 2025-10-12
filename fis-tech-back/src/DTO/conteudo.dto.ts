import { z } from 'zod';

const ConteudoBaseSchema = z.object({
  titulo: z.string().min(5, 'O título deve ter no mínimo 5 caracteres.').max(255),
  descricao: z.string().optional(),
  url_video: z.string().url('A URL do vídeo deve ser válida.').optional().nullable(),
  tipo: z.string().max(50).optional(),
  topico_id: z.number().int().positive(),
  nivel_id: z.number().int().positive(),
  criado_por: z.number().int().positive(), // Será preenchido pelo sistema
  questao_id: z.number().int().positive().optional().nullable(),
});


export const ConteudoCreateSchema = ConteudoBaseSchema.omit({ criado_por: true });


export const ConteudoUpdateSchema = ConteudoCreateSchema.partial();

// Schema para validar o ID do Conteúdo
export const ConteudoIdSchema = z.object({
  id: z.number().int().positive('O ID deve ser um inteiro positivo.'),
});

// Tipos inferidos
export type ConteudoCreateData = z.infer<typeof ConteudoCreateSchema>;
export type ConteudoUpdateData = z.infer<typeof ConteudoUpdateSchema>;
export type ConteudoId = z.infer<typeof ConteudoIdSchema>;

// Tipo completo para uso interno (Service -> Model)
export type ConteudoInternalCreateData = z.infer<typeof ConteudoBaseSchema>;