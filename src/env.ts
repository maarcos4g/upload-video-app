import { z } from "zod/v4";

export const envSchema = z.object({
  VITE_API_URL: z.string(),
  VITE_BUNNY_API_KEY: z.string()
})

export const env = envSchema.parse(import.meta.env)