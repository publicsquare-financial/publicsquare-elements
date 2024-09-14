import React, { forwardRef } from 'react'
import PublicSquareElement from './element'
import Types from '@credova/elements-js/types/sdk'

type CardElementProps = {
  id: string
}

export const CardExpirationDateElement = forwardRef<
  Types.CardExpirationDateElement,
  CardElementProps
>(function Component(props, ref) {
  return <PublicSquareElement type="cardExpirationDate" {...props} ref={ref} />
})
