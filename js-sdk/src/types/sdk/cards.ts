import {
  CardElement,
  CardExpirationDateElement,
  CardNumberElement,
  CardVerificationCodeElement, 
  Environment
} from './publicsquare'
import {BillingDetails} from "@/types/sdk/billingdetails";

export type Card = {
  number: CardNumberElement
  expirationMonth: ReturnType<CardExpirationDateElement['month']>
  expirationYear: ReturnType<CardExpirationDateElement['year']>
  cvc: CardVerificationCodeElement
}

export type CardsCreateInput = {
  cardholder_name: string
  card: Card | CardElement
  customer_id?: string
  billing_details?: BillingDetails
}

export type ValidatedCardsCreateInput = {
  validated: {
    cardholder_name: string
    card: Card
    customer_id?: string
    billing_details?: BillingDetails
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
  billing_details?: BillingDetails
}

export type CardCreateErrorResponse = {
  error: string
}
