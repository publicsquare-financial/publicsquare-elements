export type BankAccountVerificationRequestBody = {
  firstName: string
  lastName: string
  email: string
  phone: string
  accountType: string
}

export type BankAccountVerificationRequestToken = {
  token?: string
  requestCode?: string
}

export type BankAccountVerificationUrlResponse = {
  authorization_url: string
}

export type BankAccountVerificationIdRequest = {
  verification_code: string
  request_id: string
}

export type BankAccountVerificationIdResponse = {
  bank_account_verification_id: string
}
