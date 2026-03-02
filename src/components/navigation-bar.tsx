import { FilePlus, ListVideo, Settings } from "lucide-react";
import { NavLink } from "@/components/nav-link";
import { useCurrentOrganization } from "@/hooks/use-current-organization";

export function NavigationBar() {
  const { slug } = useCurrentOrganization()

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

      {/* <NavLink to={`${baseURL}/developers`}>
        <Code2 className="size-4" />
        Desenvolvedor
      </NavLink> */}
    </nav>
  )
}