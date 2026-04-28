import { useMutation } from "@tanstack/react-query";
import type { CreateBillingPortalRequest, CreateBillingPortalResponse } from "./types";
import { api } from "../client";

export function useCreateBillingPortal() {
  return useMutation({
    mutationFn: async (data: CreateBillingPortalRequest) => {
      const response = await api.post<CreateBillingPortalResponse>(
        `/organizations/${data.slug}/billing-portal`
      )

      return response.data
    }
  })
}