import { useGetOrganizations } from '@/http/get-organizations'
import { useParams } from 'react-router-dom'

export function useCurrentOrganization() {
  const { slug } = useParams<{ slug: string }>()

  const { data, isLoading } = useGetOrganizations()

  const currentOrganization = data?.organizations.find(org => org.slug === slug)

  return {
    organization: currentOrganization,
    slug,
    isLoading,
  }
}