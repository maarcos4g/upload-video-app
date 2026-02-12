export type CreateInviteRequest = {
  email?: string | null | undefined;
  role?: string | null | undefined;
  slug: string
}

export type CreateInviteResponse = {
  invitationId: string
  invitationURL: string
}