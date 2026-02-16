import { z } from "zod/v4"

export const updateCollectionSchema = z.object({
  slug: z.string().min(1, 'Slug é um campo obrigatório'),
  collectionId: z.uuid('ID da coleção é um campo obrigatório'),
  name: z.string().nullish(),
  parentId: z.string().nullish()
})

export type UpdateCollectionSchema = z.infer<typeof updateCollectionSchema>