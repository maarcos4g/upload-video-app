import { useQuery } from "@tanstack/react-query";
import { api } from "../client";
import type { GetOrganizationRequest, GetOrganizationResponse } from "./types";

export function useGetOrganization({ slug }: GetOrganizationRequest) {
  return useQuery({
    queryKey: ['get-organization', slug],
    queryFn: async () => {
      const response = await api.get<GetOrganizationResponse>(`/organizations/${slug}`)

      return response.data
    }
  })
}