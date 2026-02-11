import { useQuery } from "@tanstack/react-query";
import type { GetPendingInvitesRequest, GetPendingInvitesResponse } from "./types";
import { api } from "../client";

export function useGetPendingInvites({ slug }: GetPendingInvitesRequest) {
  return useQuery({
    queryKey: ['pending-invites', slug],
    queryFn: async () => {
      const response = await api.get<GetPendingInvitesResponse>(`/organizations/${slug}/invitations`)

      return response.data
    }
  })
}