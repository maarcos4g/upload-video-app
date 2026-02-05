export interface CreateOrganizationRequest {
  name: string
  domain: string
  shouldAttachUsersByDomain: boolean | null
}

export interface CreateOrganizationResponse {
  organizationSlug: string
}