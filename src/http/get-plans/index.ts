import { useQuery } from "@tanstack/react-query";
import { api } from "../client";
import type { GetPlansResponse } from "./types";

export function useGetPlans() {
  return useQuery({
    queryKey: ['get-plans'],
    queryFn: async () => {
      const response = await api.get<GetPlansResponse>('/plans')

      return response.data
    },
  })
}