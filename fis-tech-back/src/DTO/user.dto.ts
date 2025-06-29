// src/dto/user.dto.ts
import { z } from 'zod';

export const CreateUserDtoSchema = z.object({
  nome: z.string()
    .min(3, 'Nome deve ter ao menos 3 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras e espaços'),
  email: z.string()
    .email('Formato de e-mail inválido')
    .max(255, 'E-mail deve ter no máximo 255 caracteres'),
  senha: z.string()
    .min(6, 'Senha deve ter ao menos 6 caracteres')
    .max(255, 'Senha deve ter no máximo 255 caracteres'),
});

export type CreateUserDto = z.infer<typeof CreateUserDtoSchema>;

export const UpdateUserDtoSchema = CreateUserDtoSchema.partial();
export type UpdateUserDto = z.infer<typeof UpdateUserDtoSchema>;
