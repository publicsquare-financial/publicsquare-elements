import React, { forwardRef } from 'react'
import PublicSquareElement from './PublicSquareElement'
import { BankAccountElement as BankAccountElementJs } from '@publicsquare/elements-js'
import { BankAccountElementProps } from '@/types'

export const BankAccountElement = forwardRef<
  BankAccountElementJs,
  BankAccountElementProps
>(function Component({ id, ...options }, ref) {
  return (
    <PublicSquareElement
      type="bankAccount"
      id={id}
      options={options}
      ref={ref}
    />
  )
})
