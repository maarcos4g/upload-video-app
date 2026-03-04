import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../client";
import { toast } from "sonner";
import type { UpdateUploadRequest, UpdateUploadResponse } from "./types";

export function useUpdateUpload() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateUploadRequest) => {
      const response = await api.put<UpdateUploadResponse>(
        `/organizations/${data.slug}/uploads/${data.uploadId}`,
        {
          title: data.title,
          description: data.description
        }
      )

      return response.data
    },
    onSuccess: (_, data) => {
      toast.success('As informações do vídeo foram atualizadas.')
      queryClient.invalidateQueries({ queryKey: ['get-uploads', data.slug] })
      queryClient.invalidateQueries({ queryKey: ['get-upload', data.uploadId] })
    },
  })
}