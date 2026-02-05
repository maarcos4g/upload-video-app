import { ChevronDown, LogOut, User2 } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { useProfile } from '@/http/profile'
import { Skeleton } from './ui/skeleton'
import { useSignOut } from '@/http/sign-out'

function getInitials(name: string): string {
  const initials = name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')

  return initials
}

export function ProfileButton() {

  const { data: user, isLoading } = useProfile()

  const { mutateAsync: signOut } = useSignOut()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 outline-none">
        {!isLoading ? (
          <>
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium">{user?.name}</span>
              <span className="text-xs text-zinc-400">{user?.email}</span>
            </div>
            <Avatar className="size-8">
              {user?.avatarURL && <AvatarImage src={user?.avatarURL} />}
              {user?.name && (
                <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
              )}
            </Avatar>
            <ChevronDown className="size-4 text-zinc-600" />
          </>
        ) : (
          <>
            <div className="flex flex-col items-end space-y-1.5">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="size-8 rounded-full" />
          </>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 bg-zinc-900 border-zinc-800 text-zinc-200">

        <DropdownMenuLabel className="text-sm font-semibold">Perfil do usuário</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-zinc-700/50" />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <button className='w-full '>
              <User2 className='size-4' />
              <span>Editar Perfil</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-2 bg-zinc-700/50" />

        <DropdownMenuItem asChild>
          <button className='w-full' onClick={() => signOut()}>
            <LogOut className="mr-2 size-4" />
            Sair
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}