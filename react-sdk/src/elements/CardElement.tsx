import React from 'react'
import { CardElement as BTCardElement } from '@basis-theory/basis-theory-react'

type CardElementProps = {
  id: string
}

export function CardElement(props: CardElementProps) {
  return <BTCardElement {...props} />
}
