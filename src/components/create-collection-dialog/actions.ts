import type { CreateCollectionResponse } from "@/http/create-collection/types";
import { createCollectionSchema, type CreateCollectionSchema } from "./schema";

export async function handleCreateCollection(
  data: FormData,
  createCollection: (variables: CreateCollectionSchema) => Promise<CreateCollectionResponse>
) {
  const result = createCollectionSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, parentId, organizationSlug } = result.data

  try {
    createCollection({
      name,
      parentId: parentId || null,
      organizationSlug
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