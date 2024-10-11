import type {
  ValidatedBankAccountCreateInput,
  ValidatedCardsCreateInput
} from '@/types/sdk'

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

/**
 * Transform input from the sdk to the proxy input format
 * @param {ValidatedBankAccountCreateInput} input
 * @returns {BankAccountCreateInput} API input
 */
export function transformCreateBankAccountInput({
  validated
}: ValidatedBankAccountCreateInput) {
  return validated
}
