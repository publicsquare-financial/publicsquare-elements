import React, { forwardRef } from 'react'
import PublicSquareElement from './PublicSquareElement'
import { CardElementProps } from '@/types'
import { CardElement as CardElementJs } from '@publicsquare/elements-js'

export const CardElement = forwardRef<CardElementJs, CardElementProps>(
  function Component(props, ref) {
    return <PublicSquareElement type="card" {...props} ref={ref} />
  }
)
