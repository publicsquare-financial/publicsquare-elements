import React from 'react'
import { CardVerificationCodeElement as BTCardVerificationCodeElement } from '@basis-theory/basis-theory-react'

type CardElementProps = {
  id: string
}

export function CardVerifcationCodeElement(props: CardElementProps) {
  return <BTCardVerificationCodeElement {...props} />
}
