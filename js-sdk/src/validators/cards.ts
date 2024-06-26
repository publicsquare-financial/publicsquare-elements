import type {
  CardsCreateInput,
  ValidatedCardsCreateInput
} from '@/types/sdk/cards'

export function validateCreateCardInput(
  input: CardsCreateInput
): ValidatedCardsCreateInput {
  if (typeof input.card !== 'object') {
    throw new Error('card is required')
  }
  if (typeof input.cardholder_name !== 'string') {
    throw new Error('cardholder_name is required')
  }
  if (!['string', 'undefined'].includes(typeof input.customer_id)) {
    throw new Error('customer_id must be a string if included')
  }
  if (!['object', 'undefined'].includes(typeof input.billing_details)) {
    throw new Error('billing_details must be an object if included')
  }
  return {
    validated: {
      cardholder_name: input.cardholder_name,
      card: input.card as any,
      customer_id: input.customer_id,
      billing_details: input.billing_details
    }
  }
}
