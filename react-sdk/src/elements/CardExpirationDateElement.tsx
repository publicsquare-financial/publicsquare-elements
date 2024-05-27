import React from 'react'
import { CardExpirationDateElement as BTCardExpirationDateElement } from '@basis-theory/basis-theory-react'

type CardElementProps = {
  id: string
}

export function CardExpirationDateElement(props: CardElementProps) {
  return <BTCardExpirationDateElement {...props} />
}
