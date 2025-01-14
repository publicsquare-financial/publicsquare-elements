import {
  BankAccountCreateInput,
  ValidatedBankAccountCreateInput
} from '@/types/sdk'

export function validateCreateBankAccountInput(
  input: BankAccountCreateInput
): ValidatedBankAccountCreateInput {
  if (!['string', 'object'].includes(typeof input.routing_number)) {
    throw new Error('routing_number is required')
  }
  if (!['string', 'object'].includes(typeof input.account_number)) {
    throw new Error('account_number is required')
  }
  if (typeof input.country !== 'string') {
    throw new Error('country is required')
  }
  return {
    validated: input
  }
}
