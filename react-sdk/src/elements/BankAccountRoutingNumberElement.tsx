import React, { forwardRef } from 'react'
import PublicSquareElement from './element'
import Types from '@publicsquare/elements-js/types/sdk'

type BankAccountRoutingNumberElementProps = {
  id: string
} & Types.CreateBankAccountRoutingNumberElementOptions

export const BankAccountRoutingNumberElement = forwardRef<
  Types.BankAccountRoutingNumberElement,
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
