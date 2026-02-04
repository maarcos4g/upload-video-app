import { ChevronDown, LogOut } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

function getInitials(name: string): string {
  const initials = name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')

  return initials
}

export function ProfileButton() {

  const user = {
    id: crypto.randomUUID(),
    name: 'Jhon Doe',
    email: 'jhon@upload.video',
    avatarURL: 'https://github.com/shadcn.png'
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 outline-none">
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium">{user.name}</span>
          <span className="text-xs text-zinc-400">{user.email}</span>
        </div>
        <Avatar className="size-8">
          {user.avatarURL && <AvatarImage src={user.avatarURL} />}
          {user.name && (
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          )}
        </Avatar>
        <ChevronDown className="size-4 text-zinc-600" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 bg-zinc-900 border-zinc-800 text-zinc-200">
        <DropdownMenuItem asChild>
          <a href="">
            <LogOut className="mr-2 size-4" />
            Sign Out
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}