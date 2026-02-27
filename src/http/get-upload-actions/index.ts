import { useQuery } from "@tanstack/react-query";
import { api } from "../client";
import type { GetUploadActionsRequest, GetUploadActionsResponse } from "./types";

export function useGetUploadActions(data: GetUploadActionsRequest) {
  return useQuery({
    queryKey: ['get-actions', data.uploadId],
    queryFn: async () => {
      const response = await api.get<GetUploadActionsResponse>(
        `/organizations/${data.slug}/uploads/${data.uploadId}/actions`, {
      }
      )

      return response.data
    },
    refetchInterval: 5000
  })
}