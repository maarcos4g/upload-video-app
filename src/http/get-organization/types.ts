export type GetOrganizationRequest = {
  slug: string
}

export type GetOrganizationResponse = {
  organization: {
    id: string
    name: string
    avatarURL: string | null
    slug: string
    domain: string
    shouldAttachUsersByDomain: boolean
    createdAt: string
    ownerId: string
  }
}