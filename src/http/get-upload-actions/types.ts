export type GetUploadActionsRequest = {
  slug: string
  uploadId: string
}

export type GetUploadActionsResponse = {
  actions: {
    id: string
    uploadId: string
    type: string
    status: string | null
    error: string | null
    createdAt: string
    updatedAt: string
    completedAt: string | null
  }[]
}