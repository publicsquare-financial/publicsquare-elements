'use client'
import CardCaptureSuccess from '@/components/Modals/CardCaptureSuccess'
import NameInput from '@/components/NameInput'
import SubmitButton from '@/components/SubmitButton'
import CredovaTypes from '@credova/elements-react/dist/types/sdk'
import {
  CredovaProvider,
  CardElement,
  CardNumberElement,
  CardExpirationDateElement,
  CardVerifcationCodeElement,
  useCredova
} from '@credova/elements-react'
import { FormEvent, useRef, useState } from 'react'

export default function CredovaContextWrapper() {
  return (
    <CredovaProvider apiKey={process.env.NEXT_PUBLIC_CREDOVA_KEY!}>
      <CardElements />
    </CredovaProvider>
  )
}

function CardElements() {
  const { credova } = useCredova()
  const [loading, setLoading] = useState(false)
  const [cardSuccessMessage, setCardSuccessMessage] = useState<object>()
  const cardElement = useRef<CredovaTypes.CardElement>(null)
  const cardNumberElement = useRef<CredovaTypes.CardNumberElement>(null)
  const cardExpirationDateElement =
    useRef<CredovaTypes.CardExpirationDateElement>(null)
  const cardVerificationCodeElement =
    useRef<CredovaTypes.CardVerificationCodeElement>(null)

  function onSubmitCardElement(e: FormEvent<HTMLFormElement>) {
    if (cardElement.current) {
      onSubmit(e, cardElement.current)
    }
  }

  function onSubmitCardElements(e: FormEvent<HTMLFormElement>) {
    if (
      cardNumberElement.current &&
      cardExpirationDateElement.current &&
      cardVerificationCodeElement.current
    ) {
      onSubmit(e, {
        number: cardNumberElement.current,
        expirationMonth: cardExpirationDateElement.current.month(),
        expirationYear: cardExpirationDateElement.current.year(),
        cvc: cardVerificationCodeElement.current
      })
    }
  }

  async function onSubmit(
    e: FormEvent<HTMLFormElement>,
    card: CredovaTypes.CardsCreateInput['card']
  ) {
    e.preventDefault()
    if (!process.env.NEXT_PUBLIC_PROXY_KEY) {
      throw new Error('process.env.NEXT_PUBLIC_PROXY_KEY is undefined')
    }
    const formData = new FormData(e.currentTarget)
    const formProps = Object.fromEntries(formData)
    if (loading) return
    if (formProps.cardholder_name && card && credova) {
      setLoading(true)
      try {
        const response = await credova.cards.create({
          cardholder_name: formProps.cardholder_name as string,
          card
        })
        if (response) {
          setCardSuccessMessage(response)
        }
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 w-full">
      <h3 className="text-lg font-bold">React: All-in-one Card Element</h3>
      <form onSubmit={onSubmitCardElement} name="react-form-cardelement">
        <div className="w-full max-w-md space-y-4">
          <NameInput />
          <div className="space-y-2">
            <label>Card element</label>
            <div className="w-full max-w-md rounded-lg bg-white p-2 shadow">
              <CardElement id="react-card-element" ref={cardElement} />
            </div>
          </div>
          <div className="flex justify-end">
            <SubmitButton loading={loading} />
          </div>
        </div>
      </form>
      <h3 className="text-lg font-bold">React: Individual Elements</h3>
      <form onSubmit={onSubmitCardElements} name="react-form-cardelements">
        <div className="w-full max-w-md space-y-4">
          <NameInput />
          <div className="space-y-2">
            <label>Card number element</label>
            <div className="w-full max-w-md rounded-lg bg-white p-2 shadow">
              <CardNumberElement
                id="react-card-number-element"
                ref={cardNumberElement}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 items-start">
            <div>
              <label>Expiration element</label>
              <div className="w-full max-w-md rounded-lg bg-white p-2 shadow">
                <CardExpirationDateElement
                  id="react-card-expiration-date-element"
                  ref={cardExpirationDateElement}
                />
              </div>
            </div>
            <div>
              <label>CVC element</label>
              <div className="w-full max-w-md rounded-lg bg-white p-2 shadow">
                <CardVerifcationCodeElement
                  id="react-card-verification-code-element"
                  ref={cardVerificationCodeElement}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <SubmitButton loading={loading} />
          </div>
        </div>
      </form>
      <CardCaptureSuccess
        message={cardSuccessMessage}
        onClose={() => setCardSuccessMessage(undefined)}
      />
    </div>
  )
}
