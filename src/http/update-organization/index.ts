import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../client";
import { toast } from "sonner";
import type { UpdateOrganizationRequest, UpdateOrganizationResponse } from "./types";

export function useUpdateOrganization() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateOrganizationRequest) => {
      const response = await api.put<UpdateOrganizationResponse>(
        `/organization/${data.slug}`,
        data
      )

      return response.data
    },
    onSuccess: (_, data) => {
      toast.success('As informações da organização foram atualizadas.')
      queryClient.invalidateQueries({ queryKey: ['get-organizations'] })
      queryClient.invalidateQueries({ queryKey: ['get-organization', data.slug] })
    },
  })
}