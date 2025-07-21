import {
  CardElement,
  CardExpirationDateElement,
  CardNumberElement,
  CardVerificationCodeElement,
  Environment
} from './publicsquare'

export type Card = {
  number: CardNumberElement
  expirationMonth: ReturnType<CardExpirationDateElement['month']>
  expirationYear: ReturnType<CardExpirationDateElement['year']>
  cvc: CardVerificationCodeElement
}

export type CardBillingDetails = {
  address_line_1: string
  address_line_2?: string
  city: string
  state: string
  postal_code: string
  country: string
}

export type CardCreateInput = {
  cardholder_name: string
  card: Card | CardElement
  customer_id?: string
  billing_details?: CardBillingDetails
}

export { CardCreateInput as CardsCreateInput };

export type ValidatedCardsCreateInput = {
  validated: {
    cardholder_name: string
    card: Card
    customer_id?: string
    billing_details?: CardBillingDetails
  }
}

export type CardCreateResponse = {
  account_id: string
  cardholder_name: string
  created_at: string
  environment: Environment
  exp_month: string
  exp_year: string
  fingerprint: string
  id: string
  last4: string
  modified_at: string
  billing_details?: CardBillingDetails
  error?: CardCreateErrorResponse
}

export type CardCreateErrorResponse = {
  error: string
}
