import type { ShutdownOrganizationResponse } from "@/http/shutdown-organization/types";
import { shutdownOrganizationSchema, type ShutdownOrganizationSchema } from "./schema";

export async function handleShutdownOrganization(
  data: FormData,
  shutdownOrganization: (variables: ShutdownOrganizationSchema) => Promise<ShutdownOrganizationResponse>
) {
  const result = shutdownOrganizationSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { slug } = result.data

  try {
    shutdownOrganization({
      slug,
    })
  } catch (error) {
    console.error(error)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null
    }
  }

  return { success: true, message: null, errors: null }
}
