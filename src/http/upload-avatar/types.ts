export type UploadAvatarRequest = {
  file: File
  organizationSlug?: string
  userId?: string
}

export type UploadAvatarResponse = {
  fileKey: string
}