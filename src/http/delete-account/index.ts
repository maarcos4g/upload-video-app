import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "../client"

export function useDeleteAccount() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const response = await api.delete(
        `/profile`,
      )

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-profile'] })
    },
  })
}