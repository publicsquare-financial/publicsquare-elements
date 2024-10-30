import { BillingDetails } from "@/types/sdk/billingdetails"
import { Environment } from "@/types/sdk/publicsquare";

export type BankAccountHolderType = 'individual' | 'company'

export type BankAccountType = 'checking' | 'savings'

export type BankAccountCreateInput = {
    account_number: string
    routing_number: string
    account_holder_name?: string
    account_holder_type?: BankAccountHolderType
    account_type?: BankAccountType
    customer_id?: string
    billing_details?: BillingDetails
}

export type ValidatedBankAccountCreateInput = {
    validated: BankAccountCreateInput
}

export type BankAccountCreateResponse = {
    id: string
    account_id: string
    environment: Environment
    customer_id?: string
    created_at: string
    modified_at: string
    billing_details?: BillingDetails
    account_holder_name?: string
    account_holder_type?: BankAccountHolderType
    account_type?: BankAccountType
    routing_number: string
    account_number_last4: string
}