import { type UpdateOrganizationSchema, updateOrganizationSchema } from "./schema";

export async function handleUpdateOrganization(
  data: FormData,
  updateOrganization: (variables: UpdateOrganizationSchema) => Promise<UpdateOrganizationSchema>
) {
  const result = updateOrganizationSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name } = result.data

  try {
    updateOrganization({
      name,
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
