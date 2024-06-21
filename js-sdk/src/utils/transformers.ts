import type { ValidatedCardsCreateInput } from '@/types/sdk/cards'

/**
 * Transform input from the sdk to the proxy input format
 * @param {ValidatedCardsCreateInput} input
 * @returns {CardsCreateInput} API input
 */
export function transformCreateCardInput({
  validated
}: ValidatedCardsCreateInput) {
  return {
    ...validated,
    ...(validated.card.cvc
      ? {
          card: {
            pan: validated.card.number,
            cvv: validated.card.cvc,
            exp_month: validated.card.expirationMonth,
            exp_year: validated.card.expirationYear
          }
        }
      : { card: validated.card })
  }
}
