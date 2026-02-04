import { useMutation } from "@tanstack/react-query";
import type { CreateAccountRequest } from "./types";
import { api } from "../client";
import { useNavigate } from "react-router-dom";

export function useCreateAccount() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (data: CreateAccountRequest) => {
      const response = await api.post(
        '/users',
        data
      )

      return response.data
    },
    onSuccess: () => {
      navigate({
        pathname: `/sign-in`,
      })
    }
  })
}