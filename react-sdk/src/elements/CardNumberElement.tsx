import React from 'react'
import { CardNumberElement as BTCardNumberElement } from '@basis-theory/basis-theory-react'

type CardElementProps = {
  id: string
}

export function CardNumberElement(props: CardElementProps) {
  return <BTCardNumberElement {...props} />
}
