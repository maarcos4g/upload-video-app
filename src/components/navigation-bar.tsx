import { Code2, FilePlus, ListVideo, Settings } from "lucide-react";
import { NavLink } from "@/components/nav-link";
import { useGetOrganizations } from "@/http/get-organizations";
import { useCurrentOrganization } from "@/hooks/use-current-organization";

export function NavigationBar() {

  const { data } = useGetOrganizations()

  const { slug } = useCurrentOrganization(data?.organizations ?? [])

  const baseURL = slug ? `/org/${slug}` : ''

  return (
    <nav
      className="min-w-full flex items-center px-6 gap-4"
    >
      <NavLink to={baseURL}>
        <ListVideo className="size-4" />
        Uploads
      </NavLink>

      <NavLink to={`${baseURL}/upload`}>
        <FilePlus className="size-4" />
        Novo Upload
      </NavLink>

      <NavLink to={`${baseURL}/settings`}>
        <Settings className="size-4" />
        Configurações
      </NavLink>

      <NavLink to={`${baseURL}/developers`}>
        <Code2 className="size-4" />
        Desenvolvedor
      </NavLink>
    </nav>
  )
}