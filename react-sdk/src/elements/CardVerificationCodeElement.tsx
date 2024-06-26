import React from 'react'
import CredovaElement from './element'

type CardElementProps = {
  id: string
}

export function CardVerifcationCodeElement(props: CardElementProps) {
  return <CredovaElement type="cardVerificationCode" {...props} />
}
