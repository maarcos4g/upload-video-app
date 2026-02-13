import { z } from "zod/v4"

export const updateOrganizationSchema = z.object({
  name: z.string().min(3, 'O nome da organização precisa ter ao mínimo 3 caracteres').nullish(),
  domain: z.string().nullish(),
  shouldAttachUsersByDomain: z.boolean().optional(),
  slug: z.string()
})

export type UpdateOrganizationSchema = z.infer<typeof updateOrganizationSchema>