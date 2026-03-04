import { z } from "zod/v4"

export const updateUploadSchema = z.object({
  title: z.string('Insira o título'),
  description: z.string('Insira a descrição'),
  uploadId: z.uuid(),
  slug: z.string().min(1, 'Slug é um campo obrigatório'),
})

export type UpdateUploadSchema = z.infer<typeof updateUploadSchema>