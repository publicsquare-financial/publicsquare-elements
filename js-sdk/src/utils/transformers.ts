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
            number: validated.card.number,
            cvc: validated.card.cvc,
            expiration_month: validated.card.expirationMonth,
            expiration_year: validated.card.expirationYear
          }
        }
      : { card: validated.card })
  }
}
