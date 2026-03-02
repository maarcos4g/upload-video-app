export type GetInvitationsResponse = {
  invitations: {
    id: string,
    organization: {
      id: string,
      name: string
      avatarURL: string | null
    },
    createdAt: string,
    role: 'admin' | 'member'
  }[]
}