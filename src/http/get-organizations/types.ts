export type GetOrganizationsResponse = {
  organizations: {
    id: string
    name: string
    avatarURL: string | null
    slug: string
    role: string
  }[]
}