import React, { forwardRef } from 'react'
import PublicSquareElement from './element'
import Types from '@publicsquare/elements-js/types/sdk'

type BankAccountElementProps = {
  id: string
} & Types.CreateBankAccountElementOptions

export const BankAccountElement = forwardRef<
  Types.BankAccountElement,
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
