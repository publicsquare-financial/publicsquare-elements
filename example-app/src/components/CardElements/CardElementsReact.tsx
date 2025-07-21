'use client'
import CaptureModal from '@/components/Modals/CaptureModal'
import NameInput from '@/components/Form/NameInput'
import SubmitButton from '@/components/SubmitButton'
import {
  PublicSquareProvider,
  CardElement,
  CardNumberElement,
  CardExpirationDateElement,
  CardVerifcationCodeElement,
  usePublicSquare
} from '@publicsquare/elements-react'
import PublicSquareTypes, {
  PublicSquareInitOptions
} from '@publicsquare/elements-react/types/sdk'
import { FormEvent, useRef, useState } from 'react'

export default function CardElementsReact({ allInOne }: { allInOne: boolean }) {
  const apiKey = process.env.NEXT_PUBLIC_PUBLICSQUARE_KEY!
  const options: PublicSquareInitOptions = {}

  return (
    <PublicSquareProvider apiKey={apiKey} options={options}>
      <Elements allInOne={allInOne} />
    </PublicSquareProvider>
  )
}

function Elements({ allInOne }: { allInOne: boolean }) {
  const { publicsquare } = usePublicSquare()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{
    message?: object
    error?: boolean
  }>()
  const cardElement = useRef<PublicSquareTypes.CardElement>(null)
  const cardNumberElement = useRef<PublicSquareTypes.CardNumberElement>(null)
  const cardExpirationDateElement =
    useRef<PublicSquareTypes.CardExpirationDateElement>(null)
  const cardVerificationCodeElement =
    useRef<PublicSquareTypes.CardVerificationCodeElement>(null)

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
    card: PublicSquareTypes.CardCreateInput['card']
  ) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const formProps = Object.fromEntries(formData)
    if (loading) return
    if (formProps.cardholder_name && card && publicsquare) {
      setLoading(true)
      try {
        const response = await publicsquare.cards.create({
          cardholder_name: formProps.cardholder_name as string,
          card
        })
        if (response) {
          setMessage({
            message: response,
            error: !!response.error
          })
        }
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 w-full">
      <form
        onSubmit={(e) =>
          allInOne ? onSubmitCardElement(e) : onSubmitCardElements(e)
        }
        name="react-form-cardelement"
      >
        <div className="w-full space-y-4">
          <NameInput />
          {allInOne ? (
            <div className="space-y-2 border-2 border-dashed border-gray-300 rounded-lg p-4">
              <label>Card element</label>
              <div className="w-full rounded-lg bg-white p-2 shadow">
                <CardElement id="react-card-element" ref={cardElement} />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 items-start border-2 border-dashed border-gray-300 rounded-lg p-4">
              <div>
                <label>Card number element</label>
                <div className="w-full rounded-lg bg-white p-2 shadow">
                  <CardNumberElement
                    id="react-card-number-element"
                    ref={cardNumberElement}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 items-start">
                <div>
                  <label>Expiration</label>
                  <div className="w-full rounded-lg bg-white p-2 shadow">
                    <CardExpirationDateElement
                      id="react-card-expiration-date-element"
                      ref={cardExpirationDateElement}
                    />
                  </div>
                </div>
                <div>
                  <label>CVC</label>
                  <div className="w-full rounded-lg bg-white p-2 shadow">
                    <CardVerifcationCodeElement
                      id="react-card-verification-code-element"
                      ref={cardVerificationCodeElement}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end">
            <SubmitButton loading={loading} elementType="card" />
          </div>
        </div>
      </form>
      <CaptureModal
        message={message?.message}
        onClose={() => setMessage(undefined)}
        error={message?.error}
      />
    </div>
  )
}
