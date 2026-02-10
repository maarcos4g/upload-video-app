import { Header } from "@/components/header";
import { NavigationBar } from "@/components/navigation-bar";
import { api } from "@/http/client";
import { isAxiosError } from "axios";
import { useLayoutEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function AppLayout() {

  const navigate = useNavigate()

  useLayoutEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status
          // const code = error.response?.data.code

          if (status === 401) {
            navigate(
              '/sign-in', {
              replace: true
            }
            )
          }
        }

        return Promise.reject(error)
      }
    )

    return () => {
      api.interceptors.response.eject(interceptorId)
    }
  }, [navigate])

  return (
    <main
      className="w-full flex flex-col min-h-screen bg-zinc-950 text-zinc-100 space-y-4"
    >
      <Header />
      <NavigationBar />

      <main className="flex-1 flex flex-col w-full mx-auto space-y-4">
        <Outlet />
      </main>
    </main>
  )
}