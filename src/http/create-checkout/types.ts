export type CreateCheckoutRequest = {
  slug: string
  planSlug: string
}

export type CreateCheckoutResponse = {
  checkoutURL: string
}