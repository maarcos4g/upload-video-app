import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateProfileRequest, UpdateProfileResponse } from "./types";
import { api } from "../client";
import { toast } from "sonner";

export function useUpdateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateProfileRequest) => {
      const response = await api.put<UpdateProfileResponse>(
        '/profile',
        data
      )

      return response.data
    },
    onSuccess: () => {
      toast.success('As informações do perfil foram atualizadas.')
      queryClient.invalidateQueries({ queryKey: ['get-profile'] })
    }
  })
}