import { useGetOrganizations } from '@/http/get-organizations'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export function useCurrentOrganization() {
  const { slug } = useParams<{ slug: string }>()

  const { data, isLoading } = useGetOrganizations()

  useEffect(() => {
    if (slug) {
      localStorage.setItem('@upload.video:last-org-slug', slug)
    }
  }, [slug])

  const activeSlug = slug ?? localStorage.getItem('@upload.video:last-org-slug')

  const currentOrganization = data?.organizations.find(org => org.slug === activeSlug)

  return {
    organization: currentOrganization,
    slug: activeSlug,
    isLoading,
  }
}