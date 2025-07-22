import type {
  ApplePayCreateInput,
  ApplePayCreateSessionInput,
  BankAccountCreateInput,
  ValidatedApplePayCreateInput,
  ValidatedApplePayCreateSessionInput,
  ValidatedBankAccountCreateInput,
  ValidatedCardsCreateInput
} from '@/types'

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
 * Transform input from the sdk to the Bank Account input format
 * @param {ValidatedBankAccountCreateInput} input
 * @returns {BankAccountCreateInput} API input
 */
export function transformCreateBankAccountInput({
  validated
}: ValidatedBankAccountCreateInput): BankAccountCreateInput {
  return validated
}

/**
 * Transform input from the sdk to the Apple Pay input format
 * @param {ValidatedApplePayCreateInput} input
 * @returns {ApplePayCreateInput} API input
 */
export function transformCreateApplePayInput({
  validated
}: ValidatedApplePayCreateInput): ApplePayCreateInput {
  return validated
}

/**
 * Transform input from the sdk to the Apple Pay input format
 * @param {ValidatedApplePayCreateInput} input
 * @returns {ApplePayCreateInput} API input
 */
export function transformCreateApplePaySessionInput({
  validated
}: ValidatedApplePayCreateSessionInput): ApplePayCreateSessionInput {
  return validated
}