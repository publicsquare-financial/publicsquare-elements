import type {
  CardsCreateInput,
  ValidatedCardsCreateInput
} from '@/types/sdk/cards'
import assert from 'assert'

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
  return {
    validated: input
  }
}
