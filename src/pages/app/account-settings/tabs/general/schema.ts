import { z } from "zod/v4"

export const updateProfileSchema = z.object({
  email: z.email('Insira um e-mail válido'),
  name: z.string().min(3, 'O nome precisa conter pelo menos 3 caracteres')
})

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>