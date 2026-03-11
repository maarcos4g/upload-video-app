import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../client";
import { toast } from "sonner";
import type { TransferOrganizationRequest, TransferOrganizationResponse } from "./types";

export function useTransferOrganization() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: TransferOrganizationRequest) => {
      const response = await api.patch<TransferOrganizationResponse>(
        `/organizations/${data.slug}/owner`,
        {
          transferToUserEmail: data.transferToUserEmail
        }
      )

      return response.data
    },
    onSuccess: () => {
      toast.success('A Organização foi transferida com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['get-organizations'] })
    },
  })
}