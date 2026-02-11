import { z } from "zod/v4"

export const updateOrganizationSchema = z.object({
  name: z.string().min(3, 'O nome da organização precisa ter ao mínimo 3 caracteres'),
})

export type UpdateOrganizationSchema = z.infer<typeof updateOrganizationSchema>