import { z } from "zod/v4"

export const createCollectionSchema = z.object({
  name: z.string().min(1, 'O nome da coleção precisa conter ao menos 1 caractere.'),
  parentId: z
  .uuid('Selecione a coleção')
  .nullable()
  .optional()
  .transform((val) => val ?? null),
  organizationSlug: z.string()
})

export type CreateCollectionSchema = z.infer<typeof createCollectionSchema>