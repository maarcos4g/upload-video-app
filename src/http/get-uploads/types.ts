export type GetUploadsRequest = {
  slug: string
  collectionId?: string | undefined
}

export type GetUploadResponse = {
  uploads: {
    id: string
    externalId: string | null,
    title: string,
    slug: string,
    duration: number | null,
    sizeInBytes: number | null,
    status: string | null,
    batchId: string | null,
    thumbnailURL: string | null,
    createdAt: string | null,
    author: {
      id: string,
      name: string,
      avatarURL: string | null,
    } | null
  }[]
}