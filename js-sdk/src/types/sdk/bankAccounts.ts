import { Environment } from './publicsquare'
import { PSQTextElement } from './elements'

export type BankAccountHolderType = 'individual' | 'company'

export type BankAccountType = 'checking' | 'savings'

export type BankAccountCreateInput = {
  account_holder_name?: string
  account_holder_type?: BankAccountHolderType
  account_type?: BankAccountType
  routing_number: string
  account_number: string
  country: string
  customer_id?: string
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
}

export type RoutingNumberElement = PSQTextElement

export type AccountNumberElement = PSQTextElement

export type BankAccountElement = {
  mount: (targetId: string) => void
  accountNumber: AccountNumberElement
  routingNumber: RoutingNumberElement
}
