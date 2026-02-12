import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateInviteRequest, CreateInviteResponse } from "./types";
import { api } from "../client";
import { toast } from "sonner";

export function useCreateInvite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateInviteRequest) => {
      const response = await api.post<CreateInviteResponse>(
        `/invite`,
        data
      )

      return response.data
    },
    onSuccess: (data, { slug, email }) => {
      queryClient.invalidateQueries({ queryKey: ['pending-invites', slug] })

      if (email === null) {
        navigator.clipboard.writeText(data.invitationURL)
        toast.success('O Link de convite foi copiado para a área de transferência.')
      }
    },
  })
}