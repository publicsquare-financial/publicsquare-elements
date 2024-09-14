'use client'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { PublicSquare } from '@publicsquare/elements-js'
import SubmitButton from '@/components/SubmitButton'
import {
  CardElement,
  CardExpirationDateElement,
  CardNumberElement,
  CardVerificationCodeElement,
  PublicSquareInitOptions
} from '@publicsquare/elements-js/dist/types/sdk'
import NameInput from '@/components/NameInput'
import CardCaptureSuccess from '@/components/Modals/CardCaptureSuccess'
import { CardsCreateInput } from '@publicsquare/elements-js/dist/types/sdk/cards'

export default function CardElementsJs() {
  const [publicsquare, setPublicSquare] = useState<PublicSquare>()
  const cardRef = useRef(null)
  const [cardElement, setCardElement] = useState<CardElement>()
  const [cardNumberElement, setCardNumberElement] =
    useState<CardNumberElement>()
  const [cardExpirationDateElement, setCardExpirationDateElement] =
    useState<CardExpirationDateElement>()
  const [cardVerificationCodeElement, setCardVerificationCodeElement] =
    useState<CardVerificationCodeElement>()
  const [jsCardSuccessMessage, setJsCardSuccessMessage] = useState<object>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    /**
     * Step 1: Init the PublicSquare sdk
     */
    const apiKey = process.env.NEXT_PUBLIC_PUBLICSQUARE_KEY!;
    const options: PublicSquareInitOptions = {
      apiBaseUrl: process.env.NEXT_PUBLIC_CAPTURE_URL,
    };
    
    new PublicSquare().init(apiKey, options)
      .then((_publicsquare) => setPublicSquare(_publicsquare));
  }, []);

  useEffect(() => {
    if (publicsquare) {
      /**
       * Step 2: Initialize the elements you want to use
       */
      // The whole card
      const cardElement = publicsquare.createCardElement({})
      cardElement.mount('#card-element')
      cardElement.focus()
      setCardElement(cardElement)
      // Just the number
      const cardNumberElement = publicsquare.createCardNumberElement({})
      cardNumberElement.mount('#card-number-element')
      setCardNumberElement(cardNumberElement)
      // Just the expiration date
      const cardExpirationDateElement = publicsquare.createCardExpirationDateElement(
        {}
      )
      cardExpirationDateElement.mount('#card-expiration-date-element')
      setCardExpirationDateElement(cardExpirationDateElement)
      // Just the verification code
      const cardVerificationCodeElement =
        publicsquare.createCardVerificationCodeElement({})
      cardVerificationCodeElement.mount('#card-verification-code-element')
      setCardVerificationCodeElement(cardVerificationCodeElement)
    }
  }, [publicsquare])

  function onSubmitCardElement(e: FormEvent<HTMLFormElement>) {
    if (cardElement) {
      onSubmit(e, cardElement)
    }
  }

  function onSubmitCardElements(e: FormEvent<HTMLFormElement>) {
    if (
      cardNumberElement &&
      cardExpirationDateElement &&
      cardVerificationCodeElement
    ) {
      onSubmit(e, {
        number: cardNumberElement!,
        expirationMonth: cardExpirationDateElement!.month(),
        expirationYear: cardExpirationDateElement!.year(),
        cvc: cardVerificationCodeElement!
      })
    }
  }

  async function onSubmit(
    e: FormEvent<HTMLFormElement>,
    card: CardsCreateInput['card']
  ) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const formProps = Object.fromEntries(formData)
    if (loading) return
    if (formProps.cardholder_name && card) {
      setLoading(true)
      try {
        const response = await publicsquare?.cards.create({
          cardholder_name: formProps.cardholder_name as string,
          card
        })
        if (response) {
          setJsCardSuccessMessage(response)
        }
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 w-full">
      <h3 className="text-lg font-bold">Javascript: All-in-one Card Element</h3>
      <form onSubmit={onSubmitCardElement} name="js-form-cardelement">
        <div className="w-full max-w-md space-y-4">
          <NameInput />
          <div className="space-y-2">
            <label>Card element</label>
            <div className="w-full max-w-md rounded-lg bg-white p-2 shadow">
              <div id="card-element" ref={cardRef}></div>
            </div>
          </div>
          <div className="flex justify-end">
            <SubmitButton loading={loading} />
          </div>
        </div>
      </form>
      <h3 className="text-lg font-bold">Javascript: Individual Elements</h3>
      <form onSubmit={onSubmitCardElements} name="js-form-cardelements">
        <div className="w-full max-w-md space-y-4">
          <NameInput />
          <div className="space-y-2">
            <label>Card number element</label>
            <div className="w-full max-w-md rounded-lg bg-white p-2 shadow">
              <div id="card-number-element"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 items-start">
            <div>
              <label>Expiration element</label>
              <div className="w-full max-w-md rounded-lg bg-white p-2 shadow">
                <div id="card-expiration-date-element"></div>
              </div>
            </div>
            <div>
              <label>CVC element</label>
              <div className="w-full max-w-md rounded-lg bg-white p-2 shadow">
                <div id="card-verification-code-element"></div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <SubmitButton loading={loading} />
          </div>
        </div>
      </form>
      <CardCaptureSuccess
        message={jsCardSuccessMessage}
        onClose={() => setJsCardSuccessMessage(undefined)}
      />
    </div>
  )
}
