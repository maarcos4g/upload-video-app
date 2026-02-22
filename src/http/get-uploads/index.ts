import { useQuery } from "@tanstack/react-query";
import { api } from "../client";
import type { GetUploadResponse, GetUploadsRequest } from "./types";

export function useGetOrganizationUploads(data: GetUploadsRequest) {
  return useQuery({
    queryKey: ['get-uploads', data.slug, data.collectionId],
    queryFn: async () => {
      const response = await api.get<GetUploadResponse>(
        `/organizations/${data.slug}/uploads`, {
        params: { collectionId: data.collectionId }
      }
      )

      return response.data
    },
    enabled: !!data.slug
  })
}