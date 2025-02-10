import React, { forwardRef } from 'react'
import PublicSquareElement from './element'
import * as Types from '../types'

export const BankAccountElement = forwardRef<
  Types.BankAccountElement,
  Types.BankAccountElementProps
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
