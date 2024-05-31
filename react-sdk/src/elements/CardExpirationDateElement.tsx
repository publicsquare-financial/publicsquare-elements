import React from 'react'
import CredovaElement from './element'

type CardElementProps = {
  id: string
}

export function CardExpirationDateElement(props: CardElementProps) {
  return <CredovaElement type="cardExpirationDate" {...props} />
}
