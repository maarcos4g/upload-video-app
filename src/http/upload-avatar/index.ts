import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UploadAvatarRequest, UploadAvatarResponse } from "./types";
import { api } from "../client";
import { toast } from "sonner";

export function useUploadAvatar() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UploadAvatarRequest) => {
      const formData = new FormData()

      formData.append('file', data.file)

      if (data.organizationSlug) {
        formData.append('organization_slug', data.organizationSlug)
      }

      if (data.userId) {
        formData.append('user_id', data.userId)
      }

      const response = await api.post<UploadAvatarResponse>(
        '/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      return response.data
    },
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: ['get-organization', data.organizationSlug] })
      queryClient.invalidateQueries({ queryKey: ['get-organizations'] })
      queryClient.invalidateQueries({ queryKey: ['get-profile'] })

      toast.success('Avatar atualizado com sucesso!')
    }
  })
}