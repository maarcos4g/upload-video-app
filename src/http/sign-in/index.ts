import { useMutation } from "@tanstack/react-query";
import type { SignInRequest } from "./types";
import { api } from "../client";
import { toast } from "sonner";

export function useSignIn() {
  return useMutation({
    mutationFn: async (data: SignInRequest) => {
      const response = await api.post(
        '/authenticate',
        data
      )

      return response.data
    },
    onSuccess: () => {
      toast.success('Enviamos um e-mail com o link para autenticação.')
    }
  })
}