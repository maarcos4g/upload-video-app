import { useQuery } from "@tanstack/react-query";
import { api } from "../client";
import type { GetMembershipRequest, GetMembershipResponse } from "./types";

export function useGetMembership({ slug }: GetMembershipRequest) {
  return useQuery({
    queryKey: ['get-membership', slug],
    queryFn: async () => {
      const response = await api.get<GetMembershipResponse>(
        `/organization/${slug}/membership`
      )

      return response.data
    }
  })
}