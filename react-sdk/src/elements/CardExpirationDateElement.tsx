import React, { forwardRef } from 'react'
import PublicSquareElement from './PublicSquareElement'
import { CardExpirationDateElement as CardExpirationDateElementJs } from '@publicsquare/elements-js'
import { CardExpirationDateElementProps } from '@/types'

export const CardExpirationDateElement = forwardRef<
  CardExpirationDateElementJs,
  CardExpirationDateElementProps
>(function Component(props, ref) {
  return <PublicSquareElement type="cardExpirationDate" {...props} ref={ref} />
})
