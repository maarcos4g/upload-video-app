import { useQuery } from "@tanstack/react-query";
import { api } from "../client";
import type { GetUsageRequest, GetUsageResponse } from "./types";

export function useGetOrganizationUsage(data: GetUsageRequest) {
  return useQuery({
    queryKey: ['get-usage', data.slug],
    queryFn: async () => {
      const response = await api.get<GetUsageResponse>(
        `/organization/${data.slug}/usage`
      )

      return response.data
    },
    enabled: !!data.slug
  })
}