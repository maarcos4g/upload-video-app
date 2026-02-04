import { Header } from "@/components/header";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <main
      className="w-full flex flex-col min-h-screen bg-zinc-950 text-zinc-100 space-y-4"
    >
      <Header />

      <main className="flex-1 flex flex-col max-w-300 mx-auto">
        <Outlet />
      </main>
    </main>
  )
}