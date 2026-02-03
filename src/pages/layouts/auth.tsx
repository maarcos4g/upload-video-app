import { Outlet } from "react-router-dom";
import mock from '@/assets/mock.svg'
import logo from '@/assets/logo.svg'

export function AuthLayout() {
  return (
    <main
      className="w-full min-h-screen bg-zinc-900 text-zinc-100 grid grid-cols-2"
    >
      <div
        className="px-8 py-12 flex flex-col justify-between relative border-r border-zinc-500"
      >
        <img src={logo} alt="Logo do upload.video" className="w-39 h-8" />

        <span>
          Upload de videos © <strong>upload.video</strong> - {new Date().getFullYear()}
        </span>

        <img src={mock} alt="Mock do dashboard do upload.video" className="w-147 h-117.75 absolute right-0 top-1/2 -translate-y-1/2" />
      </div>
      <div
        className="w-full h-screen bg-zinc-950 flex flex-col items-center justify-center"
      >
        <Outlet />
      </div>
    </main>
  )
}