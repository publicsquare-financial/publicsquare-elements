import React, { forwardRef } from 'react'
import PublicSquareElement from './element'
import * as Types from '../types'

export const BankAccountAccountNumberElement = forwardRef<
  Types.BankAccountAccountNumberElement,
  Types.BankAccountAccountNumberElementProps
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
