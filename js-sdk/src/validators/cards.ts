import type {
  CardsCreateInput,
  ValidatedCardsCreateInput
} from '@/types/sdk/cards'

export function validateCreateInput(
  input: CardsCreateInput
): ValidatedCardsCreateInput {
  return {
    validated: input
  }
}
