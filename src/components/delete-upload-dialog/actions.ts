import type { DeleteUploadResponse } from "@/http/delete-upload/types";
import { deleteUploadSchema, type DeleteUploadSchema } from "./schema";

export async function handleDeleteUpload(
  data: FormData,
  deleteUpload: (variables: DeleteUploadSchema) => Promise<DeleteUploadResponse>
) {
  const result = deleteUploadSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { slug, uploadId } = result.data

  try {
    deleteUpload({
      slug,
      uploadId
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
