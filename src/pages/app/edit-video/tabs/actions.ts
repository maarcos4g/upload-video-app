import { updateUploadSchema, type UpdateUploadSchema } from "./schemas";
import type { UpdateUploadResponse } from "@/http/update-upload/types";

export async function handleUpdateUpload(
  data: FormData,
  updateUpload: (variables: UpdateUploadSchema) => Promise<UpdateUploadResponse>
) {
  const result = updateUploadSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { slug, uploadId, description, title } = result.data

  try {
    await updateUpload({
      slug,
      uploadId,
      description,
      title
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
