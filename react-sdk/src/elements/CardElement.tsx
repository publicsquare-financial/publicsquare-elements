import React, { forwardRef } from 'react'
import PublicSquareElement from './PublicSquareElement'
import * as Types from '../types'

export const CardElement = forwardRef<
  Types.CardElement,
  Types.CardElementProps
>(function Component(props, ref) {
  return <PublicSquareElement type="card" {...props} ref={ref} />
})
