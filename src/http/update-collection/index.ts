import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../client";
import { toast } from "sonner";
import type { UpdateCollectionRequest, UpdateCollectionResponse } from "./types";

export function useUpdateCollection() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateCollectionRequest) => {
      const response = await api.put<UpdateCollectionResponse>(
        `/organizations/${data.slug}/collections/${data.collectionId}`,
        {
          name: data.name,
          parentId: data.parentId
        }
      )

      return response.data
    },
    onSuccess: (_, data) => {
      toast.success('As informações da coleção foram atualizadas.')
      queryClient.invalidateQueries({ queryKey: ['get-collections', data.slug] })
    },
  })
}