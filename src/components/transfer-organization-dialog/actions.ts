import { transferOrganizationSchema, type TransferOrganizationSchema } from "./schema";
import type { TransferOrganizationResponse } from "@/http/transfer-organization/types";

export async function handleTransferOrganization(
  data: FormData,
  transferOrganization: (variables: TransferOrganizationSchema) => Promise<TransferOrganizationResponse>
) {
  const result = transferOrganizationSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { slug, transferToUserEmail } = result.data

  try {
    transferOrganization({
      slug,
      transferToUserEmail
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
