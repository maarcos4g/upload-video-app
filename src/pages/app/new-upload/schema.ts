import { z } from "zod/v4"

export const createUploadBatchSchema = z.object({
  titles: z
    .array(z.string())
    .min(1, 'Envie pelo menos um vídeo')
    .max(10, 'Apenas 10 vídeo por vez'),
  slug: z.string(),
  collectionId: z.uuid()
})

export type CreateUploadBatchSchema = z.infer<typeof createUploadBatchSchema>