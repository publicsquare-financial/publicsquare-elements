import React, { forwardRef } from 'react'
import PublicSquareElement from './element'
import Types from '@publicsquare/elements-js/types/sdk'

type CardElementProps = {
  id: string
}

export const CardNumberElement = forwardRef<
  Types.CardNumberElement,
  CardElementProps
>(function Component(props, ref) {
  return <PublicSquareElement type="cardNumber" {...props} ref={ref} />
})
