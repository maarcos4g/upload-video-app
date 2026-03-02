import { Check, ChevronDown, Loader2, LogOut, User2, UserRoundPlus, X } from 'lucide-react'

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
import { useGetInvitations } from '@/http/get-invitations'
import dayjs from 'dayjs'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { useAcceptInvitation } from '@/http/accept-invitation.ts'
import { useRevokeInvitation } from '@/http/revoke-invitation'

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
  const { data, isLoading: isLoadingInvitations } = useGetInvitations()

  const { mutateAsync: signOut } = useSignOut()
  const { mutateAsync: acceptInvitation, isPending: isAccepting } = useAcceptInvitation()
  const { mutateAsync: revokeInvitation, isPending: isRevoking } = useRevokeInvitation()

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
          <Sheet>
            <SheetTrigger asChild>
              <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
                <button className='w-full '>
                  <UserRoundPlus className='size-4' />
                  <span>Convites</span>

                  {!isLoadingInvitations ? (
                    <div className="ml-auto bg-zinc-700 rounded-full px-2 py-0.5 text-xs text-zinc-200">
                      {data?.invitations.length}
                    </div>
                  ) : (
                    <Skeleton className="ml-auto h-5 w-5 rounded-full" />
                  )}
                </button>
              </DropdownMenuItem>
            </SheetTrigger>
            <SheetContent className='bg-zinc-900 text-accent border-zinc-700 px-4 py-6'>
              <SheetHeader>
                <SheetTitle className='text-zinc-200'>Gerenciar convites</SheetTitle>
                <SheetDescription className="text-xs">
                  Visualize e gerencie os convites pendentes para ingressar em organizações.
                </SheetDescription>
              </SheetHeader>

              <div className='flex flex-col'>
                {isLoadingInvitations ? (
                  <Skeleton className="h-10 w-full rounded-md mb-2" />
                ) : data?.invitations.length === 0 ? (
                  <p className='text-sm text-zinc-500 mx-auto my-auto'>Nenhum convite pendente</p>
                ) : (
                  <div className='flex flex-col gap-3 divide-y divide-zinc-700'>
                    {data?.invitations && data.invitations.map((invitation) => {
                      const roleLabel = invitation.role === 'admin' ? 'Administrador' : 'Membro'
                      return (
                        <div key={invitation.id} className='flex gap-4 items-center pb-2'>
                          <Avatar>
                            {invitation.organization.avatarURL && <AvatarImage src={invitation.organization.avatarURL} />}
                            <AvatarFallback>{getInitials(invitation.organization.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <span className='text-sm text-zinc-300'>{invitation.organization.name} | {roleLabel}</ span>
                            <p className='text-xs text-zinc-500'>Convite enviado {dayjs(invitation.createdAt).fromNow()}</p>
                          </div>
                          <div className='ml-auto flex gap-2'>
                            <button
                              onClick={() => revokeInvitation({
                                inviteId: invitation.id
                              })}
                              className='flex items-center px-2 py-1 gap-2 border border-red-500/50 rounded text-sm text-zinc-300 cursor-pointer hover:bg-red-500/50 transition-colors'>
                              {isRevoking ? (
                                <Loader2 className='size-4 animate-spin' />
                              ) : (
                                <X className='size-4' />
                              )}
                            </button>

                            <button
                              onClick={() => acceptInvitation({
                                inviteId: invitation.id
                              })}
                              className='flex items-center px-2 py-1 gap-2 border border-emerald-500/50 rounded text-sm text-zinc-300 cursor-pointer hover:bg-emerald-500/50 transition-colors'>
                              {isAccepting ? (
                                <Loader2 className='size-4 animate-spin' />
                              ) : (
                                <Check className='size-4' />
                              )}
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-2 bg-zinc-700/50" />

        <DropdownMenuItem asChild>
          <button className='w-full' onClick={() => signOut()}>
            <LogOut className="mr-2 size-4" />
            Sair
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu >
  )
}