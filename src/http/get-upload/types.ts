export type GetUploadRequest = {
  slug: string
  uploadId: string
}

export type GetUploadResponse = {
  upload: {
    id: string
    externalId: string | null
    title: string
    description: string | null
    status: string | null
    streamURL: string | null
    thumbnailURL: string | null
    createdAt: string
    transcription: string | null
    audioURL: string | null
  }
}