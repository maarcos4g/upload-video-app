export type GetCollectionsRequest = {
  slug: string
}

export type Collection = {
  id: string,
  name: string,
  parentId: string | null,
  createdAt: string,
  ownerId: string,
  children: Collection[]
}

export type GetCollectionsResponse = {
  collections: Collection[]
}