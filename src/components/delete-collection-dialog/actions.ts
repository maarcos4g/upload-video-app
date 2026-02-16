import type { DeleteCollectionResponse } from "@/http/delete-collection/types";
import { deleteCollectionSchema, type DeleteCollectionSchema } from "./schema";

export async function handleDeleteCollection(
  data: FormData,
  deleteCollection: (variables: DeleteCollectionSchema) => Promise<DeleteCollectionResponse>
) {
  const result = deleteCollectionSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { slug, collectionId } = result.data

  try {
    deleteCollection({
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
