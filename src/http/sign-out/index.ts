import { useMutation } from "@tanstack/react-query";
import { api } from "../client";
import { useNavigate } from "react-router-dom";

export function useSignOut() {
  const navigate = useNavigate()
  
  return useMutation({
    mutationFn: async () => {
      await api.post(
        '/sign-out'
      )
    },
    onSuccess: () => {
      navigate('/sign-in')
    }
  })
}