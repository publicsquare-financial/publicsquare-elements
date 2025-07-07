import { Indexable } from '@/types'
import {
  BankAccountCreateInput,
  ValidatedBankAccountCreateInput
} from '@/types/sdk'

export function validateCreateBankAccountInput(
  input: BankAccountCreateInput
): ValidatedBankAccountCreateInput {
  // If bank_account_verification_id is provided, routing_number and account_number are not required
  if (!input.bank_account_verification_id) {
    if (!input.routing_number || typeof input.routing_number !== 'string') {
      throw new Error(
        'routing_number is required when bank_account_verification_id is not provided'
      )
    }
    if (!input.account_number || typeof input.account_number !== 'string') {
      throw new Error(
        'account_number is required when bank_account_verification_id is not provided'
      )
    }
  } else {
    if (input.routing_number || input.account_number) {
      throw new Error(
        'routing_number and account_number should not be provided when bank_account_verification_id is provided'
      )
    }
  }

  if (input.billing_details && typeof input.billing_details !== 'object') {
    throw new Error('billing_details must be an object')
  }

  return {
    validated: [
      'account_holder_name',
      'account_holder_type',
      'account_type',
      'customer_id',
      'billing_details',
      'bank_account_verification_id'
    ].reduce(
      (acc, key) => {
        ;(acc as Indexable)[key] = (input as Indexable)[key]
        return acc
      },
      {
        routing_number: input.routing_number,
        account_number: input.account_number
      }
    )
  }
}

export function validateRoutingNumber(routingNumber: string): boolean {
  const match = routingNumber.match(/^\s*([\d]{9})\s*$/)
  if (!match) {
    console.log('> validateRoutingNumber', routingNumber, match)
    return false
  }

  const weights = [3, 7, 1]
  const aba = match[1]

  let sum = 0
  for (let i = 0; i < 9; ++i) {
    sum += +aba.charAt(i) * weights[i % 3]
  }

  console.log('> validateRoutingNumber', sum)
  return sum !== 0 && sum % 10 === 0
}
