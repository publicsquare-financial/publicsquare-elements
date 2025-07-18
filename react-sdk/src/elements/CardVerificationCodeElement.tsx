import React, { forwardRef } from 'react'
import PublicSquareElement from './PublicSquareElement'
import { CardVerificationCodeElement as CardVerificationCodeElementJs } from '@publicsquare/elements-js'
import { CardVerificationCodeElementProps } from '@/types'

export const CardVerifcationCodeElement = forwardRef<
  CardVerificationCodeElementJs,
  CardVerificationCodeElementProps
>(function Component(props, ref) {
  return (
    <PublicSquareElement type="cardVerificationCode" {...props} ref={ref} />
  )
})
