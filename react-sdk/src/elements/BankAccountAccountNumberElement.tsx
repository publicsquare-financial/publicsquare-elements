import React, { forwardRef } from 'react'
import PublicSquareElement from './element'
import Types from '@publicsquare/elements-js/types/sdk'

type BankAccountAccountNumberElementProps = {
  id: string
} & Types.CreateBankAccountAccountNumberElementOptions

export const BankAccountAccountNumberElement = forwardRef<
  Types.BankAccountAccountNumberElement,
  BankAccountAccountNumberElementProps
>(function Component({ id, ...options }, ref) {
  return (
    <PublicSquareElement
      type="bankAccountAccountNumber"
      id={id}
      options={options}
      ref={ref}
    />
  )
})
