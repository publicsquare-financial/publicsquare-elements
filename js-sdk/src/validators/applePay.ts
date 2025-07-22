import {
  ApplePayCreateInput,
  ApplePayCreateSessionInput,
  ValidatedApplePayCreateInput,
  ValidatedApplePayCreateSessionInput
} from '@/types'

export function validateCreateApplePayInput(
  input: ApplePayCreateInput
): ValidatedApplePayCreateInput {
  if (typeof input.apple_payment_data !== 'object') {
    throw new Error('apple_payment_data is required')
  }
  if (!['string', 'undefined'].includes(typeof input.customer_id)) {
    throw new Error('customer_id must be a string if included')
  }
  if (!['object', 'undefined'].includes(typeof input.billing_details)) {
    throw new Error('billing_details must be an object if included')
  }
  return {
    validated: {
      apple_payment_data: input.apple_payment_data as any,
      customer_id: input.customer_id,
      billing_details: input.billing_details
    }
  }
}

export function validateCreateApplePaySessionInput(
  input: ApplePayCreateSessionInput
): ValidatedApplePayCreateSessionInput {
  if (typeof input.display_name !== 'string') {
    throw new Error('display_name is required')
  }
  if (typeof input.domain !== 'string') {
    throw new Error('domain is required')
  }
  return {
    validated: {
      display_name: input.display_name,
      domain: input.domain
    }
  }
}
