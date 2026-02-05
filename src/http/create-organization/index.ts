import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateOrganizationRequest, CreateOrganizationResponse } from "./types";
import { api } from "../client";

export function useCreateOrganization() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: CreateOrganizationRequest) => {
      const response = await api.post<CreateOrganizationResponse>(
        '/organization',
        data
      )

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-organizations'] })
    }
  })
}