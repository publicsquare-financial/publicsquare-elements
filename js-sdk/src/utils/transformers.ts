import type { ValidatedCardsCreateInput } from '@/types/sdk/cards'
import type { CardsCreateInput } from '@/types/api'

/**
 * Transform input from the sdk to the proxy input format
 * @param {ValidatedCardsCreateInput} input
 * @returns {CardsCreateInput} API input
 */
export function transformCreateCardInput({
  validated
}: ValidatedCardsCreateInput): CardsCreateInput {
  return {
    ...(validated.card && {
      card: {
        pan: validated.card.number,
        cvv: validated.card.cvc,
        exp_month: validated.card.expirationMonth,
        exp_year: validated.card.expirationYear
      }
    })
  }
}
