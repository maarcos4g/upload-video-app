import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AcceptInvitationRequest } from "./types";
import { api } from "../client";
import { toast } from "sonner";

export function useAcceptInvitation() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: AcceptInvitationRequest) => {
      const response = await api.patch(
        `/invitations/${data.inviteId}/accept`
      )

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-invitations'] })
      queryClient.invalidateQueries({ queryKey: ['get-organizations'] })
      toast.success('Convite aceito com sucesso!')
    }
  })
}