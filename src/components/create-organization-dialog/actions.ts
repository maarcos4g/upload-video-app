import type { CreateAccountResponse } from "@/http/create-account/types";
import { createOrganizationSchema, type CreateOrganizationSchema } from "./schema";

export async function handleCreateOrganization(
  data: FormData,
  createOrganization: (variables: CreateOrganizationSchema) => Promise<CreateAccountResponse>
) {
  const formDataObject = Object.fromEntries(data)

  const result = createOrganizationSchema.safeParse({
    ...formDataObject,
    shouldAttachUsersByDomain: data.get('shouldAttachUsersByDomain') === 'on'
  })

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, slug, domain, shouldAttachUsersByDomain } = result.data

  try {
    createOrganization({
      name,
      slug,
      domain,
      shouldAttachUsersByDomain
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
