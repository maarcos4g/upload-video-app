import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { RevokeInvitationRequest } from "./types";
import { api } from "../client";
import { toast } from "sonner";

export function useRevokeInvitation() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: RevokeInvitationRequest) => {
      const response = await api.patch(
        `/invitations/${data.inviteId}/revoke`
      )

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-invitations'] })
      toast.success('Convite revogado com sucesso!')
    }
  })
}