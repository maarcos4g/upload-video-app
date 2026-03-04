import { z } from "zod/v4"

export const deleteUploadSchema = z.object({
  slug: z.string().min(1, 'Slug é um campo obrigatório'),
  uploadId: z.uuid('ID da coleção é um campo obrigatório'),
})

export type DeleteUploadSchema = z.infer<typeof deleteUploadSchema>