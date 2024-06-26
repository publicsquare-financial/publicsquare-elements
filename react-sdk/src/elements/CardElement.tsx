import React from 'react'
import CredovaElement from './element'

type CardElementProps = {
  id: string
}

export function CardElement(props: CardElementProps) {
  return <CredovaElement type="card" {...props} />
}
