import type { ComponentProps } from 'react'
import { Link, useLocation } from 'react-router-dom'

export type NavLinkProps = ComponentProps<typeof Link>

export function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation()

  return (
    <Link
      {...props}
      data-current={pathname === props.to}
      className="flex items-center gap-1.5 px-3 py-1 text-sm font-medium text-zinc-300 transition-colors hover:text-zinc-300/80 data-[current=true]:bg-zinc-800 data-[current=true]:rounded-xl data-[current=true]:text-zinc-100"
    />
  )
}