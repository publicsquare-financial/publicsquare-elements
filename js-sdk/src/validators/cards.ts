import type {
  CardsCreateInput,
  ValidatedCardsCreateInput
} from '@/types/sdk/cards'

function assertTypeofObjectValues(
  value: object,
  type: string,
  message: string
) {
  Object.entries(value).forEach(([_, value]) =>
    console.assert(typeof value === type, message)
  )
}

export function validateCreateCardInput(
  input: CardsCreateInput
): ValidatedCardsCreateInput {
  if (input.card) {
    assertTypeofObjectValues(input.card, 'string', 'Value type not allowed')
  }
  console.assert(
    typeof input.cardholder_name === 'string',
    'cardholder_name is required'
  )
  console.assert(
    ['string', 'undefined'].includes(typeof input.customer_id),
    'customer_id must be a string if included'
  )
  return {
    validated: {
      cardholder_name: input.cardholder_name,
      card: input.card as any,
      customer_id: input.customer_id,
      billing_details: input.billing_details
    }
  }
}
