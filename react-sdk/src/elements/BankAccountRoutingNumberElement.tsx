import React, { forwardRef } from 'react'
import PublicSquareElement from './PublicSquareElement'
import { BankAccountRoutingNumberElement as BankAccountRoutingNumberElementJs } from '@publicsquare/elements-js'
import { BankAccountRoutingNumberElementProps } from '@/types'

export const BankAccountRoutingNumberElement = forwardRef<
  BankAccountRoutingNumberElementJs,
  BankAccountRoutingNumberElementProps
>(function Component({ id, ...options }, ref) {
  return (
    <PublicSquareElement
      type="bankAccountRoutingNumber"
      id={id}
      options={options}
      ref={ref}
    />
  )
})
