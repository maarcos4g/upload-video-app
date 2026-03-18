export type GetUsageRequest = {
  slug: string
}

export type GetUsageResponse = {
  storageUsedBytes: number
  storageLimitBytes: number
}