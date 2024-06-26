import React, { forwardRef } from 'react'
import CredovaElement from './element'
import Types from '@credova/elements-js/dist/types/sdk'

type CardElementProps = {
  id: string
}

export const CardExpirationDateElement = forwardRef<
  Types.CardExpirationDateElement,
  CardElementProps
>(function Component(props, ref) {
  return <CredovaElement type="cardExpirationDate" {...props} ref={ref} />
})
