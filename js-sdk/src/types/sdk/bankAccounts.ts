import { Environment } from './publicsquare'
import { InputElementOptions, PSQTextElement } from './elements'
import { CardBillingDetails } from './cards'

export type BankAccountHolderType = 'individual' | 'company'

export type BankAccountType = 'checking' | 'savings'

export type BankAccountCreateInput =
  | {
      account_holder_name?: string
      account_holder_type?: BankAccountHolderType | string
      account_type?: BankAccountType | string
      routing_number: string
      account_number: string
      customer_id?: string
      billing_details?: CardBillingDetails
    }
  | {
      verification: boolean
    }

export type ValidatedBankAccountCreateInput = {
  validated: BankAccountCreateInput
}

export type BankAccountCreateResponse = {
  id?: string
  account_id?: string
  environment?: Environment
  account_holder_name?: string
  account_holder_type?: BankAccountHolderType
  account_type?: BankAccountType
  routing_number?: string
  account_number_last4?: string
  customer_id?: string
  created_at?: string
  modified_at?: string
  error?: BankAccountCreateErrorResponse
}

export type BankAccountCreateErrorResponse = {
  errors: {
    [field: string]: string
  }
  type: string
  title: string
  status: number
  detail: string
  instance: string
}

export type BankAccountRoutingNumberElement = PSQTextElement

export type BankAccountAccountNumberElement = PSQTextElement

export type BankAccountElement = {
  mount: (targetId: string) => void
  accountNumber: BankAccountAccountNumberElement
  routingNumber: BankAccountRoutingNumberElement
}

export type CreateBankAccountElementOptions = {
  routingNumberOptions?: InputElementOptions
  accountNumberOptions?: InputElementOptions
  className?: string
}

export type CreateBankAccountRoutingNumberElementOptions = InputElementOptions

export type CreateBankAccountAccountNumberElementOptions = InputElementOptions
