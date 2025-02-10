import React, { forwardRef } from 'react'
import PublicSquareElement from './element'
import * as Types from '../types'

export const BankAccountRoutingNumberElement = forwardRef<
  Types.BankAccountRoutingNumberElement,
  Types.BankAccountRoutingNumberElementProps
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
