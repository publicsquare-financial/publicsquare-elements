import React, { forwardRef } from 'react'
import PublicSquareElement from './element'
import Types from '@credova/elements-js/types/sdk'

type CardElementProps = {
  id: string
}

export const CardVerifcationCodeElement = forwardRef<
  Types.CardVerificationCodeElement,
  CardElementProps
>(function Component(props, ref) {
  return <PublicSquareElement type="cardVerificationCode" {...props} ref={ref} />
})
