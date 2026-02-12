import { z } from "zod/v4"

export const shutdownOrganizationSchema = z.object({
  slug: z.string().min(1, 'Slug é um campo obrigatório'),
})

export type ShutdownOrganizationSchema = z.infer<typeof shutdownOrganizationSchema>