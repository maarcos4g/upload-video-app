import { z } from "zod/v4"

const nominalInvite = z.object({
  email: z.string().min(1, 'O e-mail é obrigatório').email('E-mail inválido'),
  role: z.enum(['admin', 'member'], 'Selecione o perfil'),
  slug: z.string()
})

const linkInvite = z.object({
  email: z.preprocess((val) => (val === "" ? null : val), z.null()),
  role: z.preprocess((val) => (val === "" ? null : val), z.null()),
  slug: z.string()
})

export const createInviteSchema = z.union([nominalInvite, linkInvite])

export type CreateInviteSchema = z.infer<typeof createInviteSchema>