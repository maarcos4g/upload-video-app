import logo from '@/assets/logo.svg'
import { OrganizationSwitcher } from './organization-switcher'
import { Bell, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProfileButton } from './profile-button'

export function Header() {

  const organizations = [
    {
      id: crypto.randomUUID(),
      name: 'Acme Inc',
      slug: 'acme-inc',
      avatarURL: 'https://avatars.githubusercontent.com/u/22545787?s=200&v=4'
      // avatarURL: null
    },
    {
      id: crypto.randomUUID(),
      name: 'Hub+',
      slug: 'hub-mais',
      avatarURL: 'https://avatars.githubusercontent.com/u/242306825?v=4'
      // avatarURL: null
    },
  ]


  return (
    <header
      className="w-full flex items-center justify-between px-6 py-4 bg-zinc-900 border-b border-zinc-800"
    >
      <div
        className='flex gap-6 items-center'
      >
        <img src={logo} alt="Logo do upload.video" className="w-39 h-8" />

        <div className='w-px h-11.5 bg-zinc-800' />

        {organizations.length > 0 ? (
          <OrganizationSwitcher organizations={organizations} />
        ) : (
          <Link
            to='/create-organization'
            className='flex items-center gap-4 bg-emerald-800/50 rounded-4xl px-4 py-2 text-sm font-semibold cursor-pointer'
          >
            <Plus className='size-4' />
            Nova Organização
          </Link>
        )}
      </div>

      <div className='flex gap-4'>
        <ProfileButton />
          <button
          className='bg-zinc-800 p-2 rounded-full cursor-not-allowed'
          >
          <Bell className='text-zinc-200' />
          </button>
      </div>


    </header>
  )
}