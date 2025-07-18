import React, { forwardRef } from 'react'
import PublicSquareElement from './PublicSquareElement'
import { CardNumberElement as CardNumberElementJs } from '@publicsquare/elements-js'
import { CardNumberElementProps } from '@/types'

export const CardNumberElement = forwardRef<
  CardNumberElementJs,
  CardNumberElementProps
>(function Component(props, ref) {
  return <PublicSquareElement type="cardNumber" {...props} ref={ref} />
})
