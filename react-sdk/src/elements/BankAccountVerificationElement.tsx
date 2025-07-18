import React, { forwardRef } from 'react'
import PublicSquareElement from './PublicSquareElement'
import { BankAccountVerificationElement as BankAccountVerificationElementJs } from '@publicsquare/elements-js'
import { BankAccountVerificationElementProps } from '@/types'

export const BankAccountVerificationElement = forwardRef<
  BankAccountVerificationElementJs,
  BankAccountVerificationElementProps
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
