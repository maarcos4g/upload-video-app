import { useQuery } from "@tanstack/react-query";
import type { GetCollectionsResponse, GetCollectionsRequest } from "./types";
import { api } from "../client";

export function useGetCollections({ slug }: GetCollectionsRequest) {
  return useQuery({
    queryKey: ['get-collections', slug],
    queryFn: async () => {
      const response = await api.get<GetCollectionsResponse>(
        `/organizations/${slug}/collections`
      )

      return response.data
    }
  })
}