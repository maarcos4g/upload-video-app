export type UpdateCollectionRequest = {
  slug: string
  collectionId: string
  name?: string | null | undefined
  parentId?: string | null | undefined
}

export type UpdateCollectionResponse = {}