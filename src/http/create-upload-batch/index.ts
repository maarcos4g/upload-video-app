import { useMutation } from "@tanstack/react-query";
import type { CreateUploadBatchRequest, CreateUploadBatchResponse } from "./types";
import { api } from "../client";

export function useCreateUploadBatch() {
  return useMutation({
    mutationFn: async (data: CreateUploadBatchRequest) => {
      const response = await api.post<CreateUploadBatchResponse>(
        `/organizations/${data.slug}/${data.collectionId}/batch`,
        {
          titles: data.titles
        }
      )

      return response.data
    }
  })
}