import { useParams } from 'react-router-dom'

type Organization = {
  id: string
  name: string
  slug: string
  avatarURL: string | null
}

export function useCurrentOrganization(organizations: Organization[]) {
  const { slug } = useParams<{ slug: string }>()

  const currentOrganization = organizations.find(org => org.slug === slug)

  return {
    organization: currentOrganization ?? organizations[0],
    slug,
  }
}