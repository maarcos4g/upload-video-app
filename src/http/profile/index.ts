import { useQuery } from "@tanstack/react-query";
import { api } from "../client";
import type { GetProfileResponse } from "./types";

export function useProfile() {
  return useQuery({
    queryKey: ['get-profile'],
    queryFn: async () => {
      const response = await api.get<GetProfileResponse>('/profile')
      
      return response.data.user
    }
  })
}