import { useQuery } from "@tanstack/react-query";
import { api } from "../client";
import type { GetUploadRequest, GetUploadResponse } from "./types";

export function useGetUpload(data: GetUploadRequest) {
  return useQuery({
    queryKey: ['get-upload', data.uploadId],
    queryFn: async () => {
      const response = await api.get<GetUploadResponse>(
        `/organizations/${data.slug}/uploads/${data.uploadId}`, {
      }
      )

      return response.data
    },
    refetchInterval: 5000
  })
}