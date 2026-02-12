export type GetMembershipRequest = {
  slug: string
}

export type GetMembershipResponse = {
  membership: {
    id: string
    role: string
    userId: string
    organizationId: string
  }
}