import { z } from "zod/v4"

export const createOrganizationSchema = z.object({
  name: z.string().min(3, 'O nome da organização precisa ter ao mínimo 3 caracteres'),
  slug: z.string().min(1, 'Slug é um campo obrigatório'),
  domain: z.string().min(1, 'Domínio é um campo obrigtório'),
  shouldAttachUsersByDomain: z.boolean().nullable()
})

export type CreateOrganizationSchema = z.infer<typeof createOrganizationSchema>