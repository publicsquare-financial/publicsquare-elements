import { BankAccountCreateErrorResponse } from './bankAccounts'

export type BankVerificationRequestBody = {
  firstName: string
  lastName: string
  email: string
  phone: string
  accountType: string
}

export type BankVerificationRequestToken = {
  token?: string
  requestCode?: string
}

export type BankVerificationUrlResponse = {
  authorization_url: string
}

export type BankVerificationIdRequest = {
  verification_code: string
  request_id: string
}

export type BankVerificationIdResponse = {
  bank_account_verification_id: string
}
