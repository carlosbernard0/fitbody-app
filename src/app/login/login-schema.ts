import { z } from 'zod'

export type FormLoginData = z.infer<typeof loginSchema>

export const loginSchema = z.object({
  login: z.string().min(1, { message: 'Login is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
})
