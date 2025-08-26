import {
  GooglePayCreateInput,
  ValidatedGooglePayCreateInput,
} from '@/types'

export function validateCreateGooglePayInput(
  input: GooglePayCreateInput
): ValidatedGooglePayCreateInput {
  if (typeof input.google_payment_method_token !== 'object') {
    throw new Error('google_payment_method_token is required')
  }
  if (!['string', 'undefined'].includes(typeof input.customer_id)) {
    throw new Error('customer_id must be a string if included')
  }
  if (!['object', 'undefined'].includes(typeof input.billing_details)) {
    throw new Error('billing_details must be an object if included')
  }
  return {
    validated: {
      google_payment_method_token: input.google_payment_method_token as any,
      customer_id: input.customer_id,
      billing_details: input.billing_details
    }
  }
}
