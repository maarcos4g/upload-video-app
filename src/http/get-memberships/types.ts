export type GetMembershipsRequest = {
  slug: string
}

export type GetMembershipsResponse = {
  memberships: {
    id: string
    role: string
    user: {
      id: string
      email: string
      name: string
      avatarURL: string
    }
  }[]
}