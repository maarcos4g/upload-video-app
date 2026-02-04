import { signUpSchema, type SignUpSchema } from "./schema";

export async function handleSignUp(
  data: FormData,
  createAccount: (variables: SignUpSchema) => Promise<void>
) {
  const result = signUpSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { email, name } = result.data

  try {
    console.log(email, name)

    await createAccount({
      email,
      name
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
