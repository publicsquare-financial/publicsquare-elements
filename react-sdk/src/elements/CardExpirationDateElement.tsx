import React, { forwardRef } from 'react'
import PublicSquareElement from './element'
import * as Types from '../types'

export const CardExpirationDateElement = forwardRef<
  Types.CardExpirationDateElement,
  Types.CardExpirationDateElementProps
>(function Component(props, ref) {
  return <PublicSquareElement type="cardExpirationDate" {...props} ref={ref} />
})
