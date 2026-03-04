import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "../client"
import type { DeleteCollectionResponse } from "../delete-collection/types"
import type { DeleteUploadRequest } from "./types"

export function useDeleteUpload() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: DeleteUploadRequest) => {
      const response = await api.delete<DeleteCollectionResponse>(
        `/organizations/${data.slug}/uploads/${data.uploadId}`,
      )

      return response.data
    },
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: ['get-uploads', data.slug] })
    },
  })
}