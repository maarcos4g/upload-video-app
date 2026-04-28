export type GetPlansResponse = {
  plans: {
    id: string
    name: string
    slug: string
    storageLimitBytes: string
    description: string
    features: string[]
    priceInCents: string
  }[]
}