import { createUploadBatchSchema, type CreateUploadBatchSchema } from "./schema";
import type { CreateUploadBatchResponse } from "@/http/create-upload-batch/types";

export async function handleCreateUploadBatch(
  data: FormData,
  createUploadBatch: (variables: CreateUploadBatchSchema) => Promise<CreateUploadBatchResponse>
) {
  const result = createUploadBatchSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { titles, collectionId, slug } = result.data

  try {
    createUploadBatch({
      titles,
      slug,
      collectionId
    })
  } catch (error) {
    console.error(error)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null
    }
  }

  return { success: true, message: null, errors: null }
}