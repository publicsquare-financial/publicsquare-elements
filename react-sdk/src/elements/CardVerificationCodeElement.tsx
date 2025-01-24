import React, { forwardRef } from 'react'
import PublicSquareElement from './element'
import * as Types from '../types'

export const CardVerifcationCodeElement = forwardRef<
  Types.CardVerificationCodeElement,
  Types.CardVerificationCodeElementProps
>(function Component(props, ref) {
  return (
    <PublicSquareElement type="cardVerificationCode" {...props} ref={ref} />
  )
})
