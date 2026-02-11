export type GetPendingInvitesRequest = {
  slug: string
}

export type GetPendingInvitesResponse = {
  invitations: {
    id: string
    email: string
    role: string
    status: string
    token: string
    authorId: string
  }[]
}