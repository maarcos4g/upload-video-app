import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { toast, Toaster } from 'sonner'

import { router } from "./routes";
import { isAxiosError } from "axios";

export function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        onError(error) {
          if (isAxiosError(error)) {
            if ('message' in error.response?.data) {
              toast.error(error.response?.data.message)
            } else {
              toast.error('Erro ao processar operação.')
            }
          }
        }
      }
    }
  })

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster richColors />
    </QueryClientProvider>
  )
}
