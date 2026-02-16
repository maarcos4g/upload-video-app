import { z } from "zod/v4"

export const deleteCollectionSchema = z.object({
  slug: z.string().min(1, 'Slug é um campo obrigatório'),
  collectionId: z.uuid('ID da coleção é um campo obrigatório'),
})

export type DeleteCollectionSchema = z.infer<typeof deleteCollectionSchema>