import { useState } from 'react'
import logo from '@/assets/logo.svg'
import { OrganizationSwitcher } from './organization-switcher'
import { Bell, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProfileButton } from './profile-button'
import { useGetOrganizations } from '@/http/get-organizations'
import { Skeleton } from './ui/skeleton'
import { Dialog, DialogTrigger } from './ui/dialog'
import { CreateOrganizationDialog } from './create-organization-dialog'

export function Header() {

  const { data, isLoading } = useGetOrganizations()

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const hasOrganizations = (data?.organizations.length ?? 0) > 0

  return (
    <header
      className="w-full flex items-center justify-between px-6 py-4 bg-zinc-900 border-b border-zinc-800"
    >
      <div
        className='flex gap-6 items-center'
      >
        <img src={logo} alt="Logo do upload.video" className="w-39 h-8" />

        <div className='w-px h-11.5 bg-zinc-800' />

        <>
          {!isLoading ? (
            hasOrganizations ? (
              <OrganizationSwitcher organizations={data?.organizations ?? []} />
            ) : (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger className="w-full">
                  <button
                    className='flex items-center gap-4 bg-emerald-800/50 rounded-4xl px-4 py-2 text-sm font-semibold cursor-pointer'
                  >
                    <Plus className='size-4' />
                    Nova Organização
                  </button>
                </DialogTrigger>
                <CreateOrganizationDialog onClose={() => setIsDialogOpen(false)} />
              </Dialog>
            )
          ) : (
            <>
              <Skeleton className='w-42 h-8' />
            </>
          )}
        </>
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