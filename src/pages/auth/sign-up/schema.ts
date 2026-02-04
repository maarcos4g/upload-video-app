import { z } from "zod/v4"

export const signUpSchema = z.object({
  email: z.email('Insira um e-mail válido'),
  name: z.string().min(3, 'O nome precisa conter pelo menos 3 caracteres')
})

export type SignUpSchema = z.infer<typeof signUpSchema>