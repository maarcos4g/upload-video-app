import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenu
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { useCurrentOrganization } from "@/hooks/use-current-organization";

type Organization = {
  id: string
  name: string
  slug: string
  avatarURL: string | null
}

type OrganizationSwitcherProps = {
  organizations: Organization[]
}

export function OrganizationSwitcher({ organizations }: OrganizationSwitcherProps) {

  const { organization: currentOrganization } = useCurrentOrganization(organizations)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className="bg-zinc-800 border border-zinc-600 rounded-md px-4 py-2 flex items-center justify-between gap-3 w-42"
        >
          <span className="font-semibold text-sm text-zinc-100">{currentOrganization.name}</span>
          <ChevronsUpDown className="size-4 text-zinc-500 stroke-2" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        sideOffset={12}
        className="w-72 bg-zinc-900 border-zinc-800 text-zinc-200"
      >
        <DropdownMenuLabel className="text-sm font-semibold">Organizações</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-zinc-700/50" />
        <DropdownMenuGroup>

          {organizations.map((organization) => {
            return (
              <DropdownMenuItem key={organization.id} asChild>
                <Link to={`/org/${organization.slug}`} className="justify-between hover:bg-zinc-700/50">
                  <div className="flex items-center gap-4">
                    <Avatar className="size-4">
                      {organization.avatarURL && (
                        <AvatarImage src={organization.avatarURL} />
                      )}
                      <AvatarFallback
                        className="bg-zinc-800"
                      >
                        {organization.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="line-clamp-1">{organization.name}</span>
                  </div>

                  {currentOrganization?.slug === organization.slug && (
                    <Check className="size-4 text-emerald-500" />
                  )}

                </Link>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="my-2 bg-zinc-700/50" />
        <DropdownMenuItem asChild>
          <Link to="" className="hover:bg-zinc-700/50">
            <PlusCircle className="mr-2 size-4 text-emerald-600" />
            Criar Organização
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}