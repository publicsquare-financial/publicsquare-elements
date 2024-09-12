import React, { forwardRef } from 'react'
import CredovaElement from './element'
import Types from '@credova/elements-js/types/sdk'

type CardElementProps = {
  id: string
}

export const CardNumberElement = forwardRef<
  Types.CardNumberElement,
  CardElementProps
>(function Component(props, ref) {
  return <CredovaElement type="cardNumber" {...props} ref={ref} />
})
