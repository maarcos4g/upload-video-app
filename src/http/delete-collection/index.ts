import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { DeleteCollectionRequest, DeleteCollectionResponse } from "./types"
import { api } from "../client"

export function useDeleteCollection() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: DeleteCollectionRequest) => {
      const response = await api.delete<DeleteCollectionResponse>(
        `/organizations/${data.slug}/collections/${data.collectionId}`,
      )

      return response.data
    },
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: ['get-collections', data.slug] })
    },
  })
}