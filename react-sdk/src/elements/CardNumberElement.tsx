import React from 'react'
import CredovaElement from './element'

type CardElementProps = {
  id: string
}

export function CardNumberElement(props: CardElementProps) {
  return <CredovaElement type="cardNumber" {...props} />
}
