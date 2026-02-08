import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateCollectionRequest, CreateCollectionResponse } from "./types";
import { api } from "../client";

export function useCreateCollection() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateCollectionRequest) => {
      const response = await api.post<CreateCollectionResponse>(
        `/organizations/${data.organizationSlug}/collections`,
        {
          name: data.name,
          parentId: data.parentId
        }
      )

      return response.data
    },
    onSuccess: (_data, { organizationSlug }) => {
      queryClient.invalidateQueries({ queryKey: ['get-collections', organizationSlug] })
    },
  })
}