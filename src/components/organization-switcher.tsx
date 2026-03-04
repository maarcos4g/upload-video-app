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
import { Link, useLocation } from "react-router-dom";
import { useCurrentOrganization } from "@/hooks/use-current-organization";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { CreateOrganizationDialog } from "./create-organization-dialog";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

type Organization = {
  id: string
  name: string
  slug: string
  avatarURL: string | null
  role: string
}

type OrganizationSwitcherProps = {
  organizations: Organization[]
}

export function OrganizationSwitcher({ organizations }: OrganizationSwitcherProps) {

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { organization: currentOrganization, isLoading: isLoadingOrganization } = useCurrentOrganization()

  const { pathname } = useLocation()

  function getSwitchURL(newSlug: string) {
    if (pathname.startsWith('/org/')) {
      const pathParts = pathname.split('/')
      const currentSubRoute = pathParts[3]


      const safeRoutesToPreserve = ['settings', 'upload', 'developers']

      if (currentSubRoute && safeRoutesToPreserve.includes(currentSubRoute)) {
        pathParts[2] = newSlug
        return pathParts.join('/')
      }
      return `/org/${newSlug}`
    }

    return `/org/${newSlug}`
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isLoadingOrganization ? (
          <Skeleton className="w-42 h-9" />
        ) :
          currentOrganization ? (
            <div
              className="bg-zinc-800 border border-zinc-600 rounded-md px-4 py-2 flex items-center justify-between gap-3 min-w-42"
            >
              <span className="font-semibold text-sm text-zinc-100">{currentOrganization.name}</span>
              <ChevronsUpDown className="size-4 text-zinc-500 stroke-2" />
            </div>
          ) : (
            <div
              className="bg-zinc-800 border border-zinc-600 rounded-md px-4 py-2 flex items-center justify-between gap-3 min-w-42"
            >
              <span className="font-semibold text-sm text-zinc-100">Selecione</span>
              <ChevronsUpDown className="size-4 text-zinc-500 stroke-2" />
            </div>
          )}
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
                <Link to={getSwitchURL(organization.slug)} className="justify-between hover:bg-zinc-700/50">
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
        <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger className="w-full">
              <button className="w-full flex items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground">
                <PlusCircle className="mr-2 size-4 text-emerald-600" />
                Criar Organização
              </button>
            </DialogTrigger>
            <CreateOrganizationDialog onClose={() => setIsDialogOpen(false)} />
          </Dialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}