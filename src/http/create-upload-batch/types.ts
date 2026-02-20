export type CreateUploadBatchRequest = {
  slug: string
  collectionId: string
  titles: string[]
}

export type CreateUploadBatchResponse = {
  batchId: string
  files: {
    bunnyVideoId: string
    title: string
    signature: string
    expirationTime: number,
    uploadURL: string
    uploadId: string
    slug: string
  }[]
}