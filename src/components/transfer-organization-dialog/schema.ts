import { z } from "zod/v4"

export const transferOrganizationSchema = z.object({
  slug: z.string().min(1, 'Slug é um campo obrigatório'),
  transferToUserEmail: z.email('Insira um e-mail válido')
})

export type TransferOrganizationSchema = z.infer<typeof transferOrganizationSchema>