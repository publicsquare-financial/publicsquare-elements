import React, { forwardRef } from 'react'
import PublicSquareElement from './element'
import * as Types from '../types'

export const BankAccountVerificationElement = forwardRef<
  Types.BankAccountVerificationElement,
  Types.BankAccountVerificationElementProps
>(function Component({ id, onVerificationComplete, ...options }, ref) {
  return (
    <PublicSquareElement
      type="bankAccountVerification"
      id={id}
      options={{ ...options, onVerificationComplete }}
      ref={ref}
    />
  )
})
