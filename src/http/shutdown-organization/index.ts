import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ShutdownOrganizationRequest, ShutdownOrganizationResponse } from "./types";
import { api } from "../client";
import { useNavigate } from "react-router-dom";

export function useShutdownOrganization() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (data: ShutdownOrganizationRequest) => {
      const response = await api.delete<ShutdownOrganizationResponse>(
        `/organizations/${data.slug}`,
      )

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-organizations'] })

      navigate({
        pathname: '/'
      })
    },
  })
}