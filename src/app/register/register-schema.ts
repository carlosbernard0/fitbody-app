import { z } from 'zod'

export type FormRegisterData = z.infer<typeof registerSchema>

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty({ message: 'O nome é obrigatório' })
      .min(4, 'O nome deve ter pelo menos 4 caracteres')
      .regex(/^[A-Za-zÀ-ÿ\s]+$/, {
        message: 'O nome não pode conter números ou caracteres especiais',
      }),
    email: z.string().email('Digite um email válido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não se coincidem',
    path: ['confirmPassword'],
  })
