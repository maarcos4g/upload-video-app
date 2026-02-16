import { updateCollectionSchema, type UpdateCollectionSchema } from "./schema";
import type { UpdateCollectionResponse } from "@/http/update-collection/types";

export async function handleUpdateCollection(
  data: FormData,
  updateCollection: (variables: UpdateCollectionSchema) => Promise<UpdateCollectionResponse>
) {
  const result = updateCollectionSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, slug, collectionId, parentId } = result.data

  const formattedParentId = parentId === 'none' || parentId === ''
    ? null
    : parentId

  try {
    updateCollection({
      name: name ?? null,
      parentId: formattedParentId,
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
