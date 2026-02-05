import { useQuery } from "@tanstack/react-query";
import { api } from "../client";
import type { GetOrganizationsResponse } from "./types";

export function useGetOrganizations() {
  return useQuery({
    queryKey: ['get-organizations'],
    queryFn: async () => {
      const response = await api.get<GetOrganizationsResponse>('/organizations')

      return response.data
    },
    staleTime: 1000 * 60 * 5
  })
}