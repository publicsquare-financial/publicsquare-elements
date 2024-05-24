'use client'
import { useEffect, useState } from 'react'
import { Credova } from '@credova/elements-js'

export default function CardElementJs() {
  const [credova, setCredova] = useState<Credova>()
  useEffect(() => {
    /**
     * Step 1: Init the Credova sdk
     */
    new Credova().init('something', {}).then((_credova) => setCredova(_credova))
  }, [])

  useEffect(() => {
    if (credova) {
      /**
       * Step 2: Initialize the elements you want to use
       */
      // The whole card
      const cardElement = credova.createCardElement({})
      cardElement.mount('#card-element')
      // Just the number
      const cardNumberElement = credova.createCardNumberElement({})
      cardNumberElement.mount('#card-number-element')
      // Just the expiration date
      const cardExpirationDateElement = credova.createCardExpirationDateElement(
        {}
      )
      cardExpirationDateElement.mount('#card-expiration-date-element')
      // Just the verification code
      const cardVerificationCodeElement =
        credova.createCardVerificationCodeElement({})
      cardVerificationCodeElement.mount('#card-verification-code-element')
    }
  }, [credova])

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="space-y-2">
        <h2>Card element</h2>
        <div className="w-full max-w-md rounded-lg bg-white p-2 shadow">
          <div id="card-element"></div>
        </div>
      </div>
      <div className="space-y-2">
        <h2>Card number element</h2>
        <div className="w-full max-w-md rounded-lg bg-white p-2 shadow">
          <div id="card-number-element"></div>
        </div>
      </div>
      <div className="space-y-2">
        <h2>Card expiration date element</h2>
        <div className="w-full max-w-md rounded-lg bg-white p-2 shadow">
          <div id="card-expiration-date-element"></div>
        </div>
      </div>
      <div className="space-y-2">
        <h2>Card verification code element</h2>
        <div className="w-full max-w-md rounded-lg bg-white p-2 shadow">
          <div id="card-verification-code-element"></div>
        </div>
      </div>
    </div>
  )
}
