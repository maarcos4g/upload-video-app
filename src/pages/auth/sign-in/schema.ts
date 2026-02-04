import { z } from "zod/v4"

export const signInSchema = z.object({
  email: z.email('Insira um e-mail válido'),
})

export type SignInSchema = z.infer<typeof signInSchema>