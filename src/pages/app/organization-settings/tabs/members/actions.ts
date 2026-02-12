import type { CreateInviteResponse } from "@/http/create-invite/types"
import { createInviteSchema, type CreateInviteSchema } from "./schema"

export async function handleCreateInvite(
  data: FormData,
  createInvite: (variables: CreateInviteSchema) => Promise<CreateInviteResponse>
) {
  const result = createInviteSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const inviteData = result.data

  try {
    createInvite(inviteData)
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