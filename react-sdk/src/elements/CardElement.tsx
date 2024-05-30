import React from 'react'

type CardElementProps = {
  id: string
}

export function CardElement(props: CardElementProps) {
  return <div {...props} />
}
