import React, { forwardRef } from 'react'
import PublicSquareElement from './element'
import * as Types from '../types'

export const CardNumberElement = forwardRef<
  Types.CardNumberElement,
  Types.CardNumberElementProps
>(function Component(props, ref) {
  return <PublicSquareElement type="cardNumber" {...props} ref={ref} />
})

