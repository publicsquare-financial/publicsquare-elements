import {
  CardElement,
  CreateBankAccountAccountNumberElementOptions,
  BankAccountAccountNumberElement,
  BankAccountElement,
  BankAccountVerificationElement,
  CreateBankAccountElementOptions,
  BankAccountRoutingNumberElement,
  CreateBankAccountRoutingNumberElementOptions,
  CardExpirationDateElement,
  CreateCardExpirationDateElementOptions,
  CardNumberElement,
  CreateCardNumberElementOptions,
  CardVerificationCodeElement,
  CreateCardVerificationCodeElementOptions,
  ElementType,
  CreateElementOptions,
  PublicSquareInitOptions,
  Card,
  CardsCreateInput,
  CardCreateResponse,
  CardBillingDetails,
  ValidatedCardsCreateInput,
  CardCreateErrorResponse,
  BankAccountCreateErrorResponse,
  BankAccountCreateResponse,
  BankAccountCreateInput,
  BankAccountHolderType,
  CreateBankAccountVerificationElementOptions
} from '@publicsquare/elements-js/dist/types'
import { BankVerificationIdResponse } from '@publicsquare/elements-js/dist/types/sdk/verificationWidget'
import { PublicSquare } from '@publicsquare/elements-js'

export type PublicSquareProviderValue = {
  publicsquare?: PublicSquare
  createElement(
    type: ElementType,
    options: CreateElementOptions
  ): ReturnType<InstanceType<typeof PublicSquare>['createElement']>
}

export type PublicSquareProviderProps = {
  apiKey: string
  options?: PublicSquareInitOptions
}

export type ElementProps = {
  id: string
  type: ElementType
  options?: CreateElementOptions
}

export type CardElementProps = {
  id: string
}

export type CardNumberElementProps = {
  id: string
}

export type CardExpirationDateElementProps = {
  id: string
}

export type CardVerificationCodeElementProps = {
  id: string
}

export type BankAccountElementProps = {
  id: string
} & CreateBankAccountElementOptions

export type BankAccountVerificationElementProps = {
  id: string
  onVerificationComplete?: (result: BankVerificationIdResponse) => void
} & CreateBankAccountVerificationElementOptions

export type BankAccountRoutingNumberElementProps = {
  id: string
} & CreateBankAccountRoutingNumberElementOptions

export type BankAccountAccountNumberElementProps = {
  id: string
} & CreateBankAccountAccountNumberElementOptions

export {
  CardElement,
  CreateBankAccountAccountNumberElementOptions,
  BankAccountAccountNumberElement,
  BankAccountElement,
  BankAccountVerificationElement,
  CreateBankAccountElementOptions,
  BankAccountRoutingNumberElement,
  CreateBankAccountRoutingNumberElementOptions,
  CardExpirationDateElement,
  CreateCardExpirationDateElementOptions,
  CardNumberElement,
  CreateCardNumberElementOptions,
  CardVerificationCodeElement,
  CreateCardVerificationCodeElementOptions,
  ElementType,
  CreateElementOptions,
  PublicSquareInitOptions,
  Card,
  CardsCreateInput,
  CardCreateResponse,
  CardBillingDetails,
  ValidatedCardsCreateInput,
  CardCreateErrorResponse,
  BankAccountCreateErrorResponse,
  BankAccountCreateResponse,
  BankAccountCreateInput,
  BankAccountHolderType,
  CreateBankAccountVerificationElementOptions
}
