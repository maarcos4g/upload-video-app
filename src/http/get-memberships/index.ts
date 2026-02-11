import { useQuery } from "@tanstack/react-query";
import type { GetMembershipsRequest, GetMembershipsResponse } from "./types";
import { api } from "../client";

export function useGetMemberships({ slug }: GetMembershipsRequest) {
  return useQuery({
    queryKey: ['get-memberships', slug],
    queryFn: async () => {
      const response = await api.get<GetMembershipsResponse>(`/organizations/${slug}/memberships`)

      return response.data
    }
  })
}