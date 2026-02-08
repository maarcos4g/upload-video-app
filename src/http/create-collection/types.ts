export type CreateCollectionRequest = {
  name: string
  parentId: string | null
  organizationSlug: string
}

export type CreateCollectionResponse = {
  collectionId: string
}