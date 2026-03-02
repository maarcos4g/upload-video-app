import { useQuery } from "@tanstack/react-query";
import type { GetInvitationsResponse } from "./types";
import { api } from "../client";

export function useGetInvitations() {
  return useQuery({
    queryKey: ['get-invitations'],
    queryFn: async () => {
      const response = await api.get<GetInvitationsResponse>(
        `/invitations`
      )

      return response.data
    }
  })
}