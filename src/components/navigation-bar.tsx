import { FilePlus, ListVideo, Settings } from "lucide-react";
import { NavLink } from "@/components/nav-link";
import { useCurrentOrganization } from "@/hooks/use-current-organization";
import { useGetCollections } from "@/http/get-collections";
import { toast } from "sonner";

export function NavigationBar() {
  const { slug } = useCurrentOrganization()
  const { data: collectionsData, isLoading: collectionsIsLoading } = useGetCollections({
    slug: slug!
  })

  const baseURL = slug ? `/org/${slug}` : ''

  const hasCollections = !collectionsIsLoading && collectionsData && collectionsData.collections.length > 0

  return (
    <nav
      className="min-w-full flex items-center px-6 gap-4"
    >
      <NavLink to={baseURL}>
        <ListVideo className="size-4" />
        Uploads
      </NavLink>

      <NavLink to={`${baseURL}/upload`} onClick={
        (e) => {
          if (!hasCollections) {
            e.preventDefault()
            toast.error('Crie uma coleção antes de criar um upload.')
          }
        }
      }>
        <FilePlus className="size-4" />
        Novo Upload
      </NavLink>

      <NavLink to={`${baseURL}/settings`}>
        <Settings className="size-4" />
        Configurações
      </NavLink>

      {/* <NavLink to={`${baseURL}/developers`}>
        <Code2 className="size-4" />
        Desenvolvedor
      </NavLink> */}
    </nav>
  )
}