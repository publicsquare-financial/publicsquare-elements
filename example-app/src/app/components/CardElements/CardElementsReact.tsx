'use client'
import { PropsWithChildren, useEffect, useState } from 'react'
import {
  CredovaProvider,
  CardElement,
  CardNumberElement,
  CardExpirationDateElement,
  CardVerifcationCodeElement
} from '@credova/elements-react'

export default function CredovaContextWrapper() {
  return (
    <CredovaProvider>
      <CardElementsJs />
    </CredovaProvider>
  )
}

function CardElementsJs() {
  return (
    <div className="space-y-4 w-full">
      <h3 className="text-lg font-bold">Credova React Elements</h3>
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2">
          <h2>Card element</h2>
          <div className="w-full max-w-md rounded-lg bg-white p-2 shadow">
            <CardElement id="react-card-element" />
          </div>
        </div>
        <div className="space-y-2">
          <h2>Card number element</h2>
          <div className="w-full max-w-md rounded-lg bg-white p-2 shadow">
            <CardNumberElement id="react-card-number-element" />
          </div>
        </div>
        <div className="space-y-2">
          <h2>Card expiration date element</h2>
          <div className="w-full max-w-md rounded-lg bg-white p-2 shadow">
            <CardExpirationDateElement id="react-card-expiration-date-element" />
          </div>
        </div>
        <div className="space-y-2">
          <h2>Card verification code element</h2>
          <div className="w-full max-w-md rounded-lg bg-white p-2 shadow">
            <CardVerifcationCodeElement id="react-card-verification-code-element" />
          </div>
        </div>
      </div>
    </div>
  )
}
