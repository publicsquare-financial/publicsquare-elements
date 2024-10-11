import {
  BankAccountCreateInput,
  ValidatedBankAccountCreateInput
} from '@/types/sdk'

export function validateCreateBankAccountInput(
  input: BankAccountCreateInput
): ValidatedBankAccountCreateInput {
  if (typeof input.routing_number !== 'string') {
    throw new Error('routing_number is required')
  }
  if (typeof input.account_number !== 'string') {
    throw new Error('account_number is required')
  }
  if (typeof input.country !== 'string') {
    throw new Error('country is required')
  }
  return {
    validated: input
  }
}
