import { useMutation } from "@tanstack/react-query";
import type { CreateCheckoutRequest, CreateCheckoutResponse } from "./types";
import { api } from "../client";

export function useCreateCheckout() {
  return useMutation({
    mutationFn: async (data: CreateCheckoutRequest) => {
      const response = await api.post<CreateCheckoutResponse>(
        `/organizations/${data.slug}/checkout`,
        {
          planSlug: data.planSlug
        }
      )

      return response.data
    }
  })
}