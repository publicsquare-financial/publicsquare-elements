import React, { forwardRef } from 'react'
import PublicSquareElement from './PublicSquareElement'
import { BankAccountAccountNumberElement as BankAccountAccountNumberElementJs } from '@publicsquare/elements-js'
import { BankAccountAccountNumberElementProps } from '@/types'

export const BankAccountAccountNumberElement = forwardRef<
  BankAccountAccountNumberElementJs,
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
