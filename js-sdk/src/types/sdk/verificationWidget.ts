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
