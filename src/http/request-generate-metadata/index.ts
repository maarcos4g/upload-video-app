import { useMutation } from "@tanstack/react-query";
import type { RequestGenerateMetadataRequest, RequestGenerateMetadataResponse } from "./types";
import { api } from "../client";

export function useRequestGenerateMetadata() {
  return useMutation({
    mutationFn: async (data: RequestGenerateMetadataRequest) => {
      const response = await api.post<RequestGenerateMetadataResponse>(
        `/organizations/${data.slug}/uploads/${data.uploadId}/generate-metadata`,
        {
          title: data.title,
          description: data.description
        }
      )

      return response.data
    }
  })
}