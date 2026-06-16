'use client'
import { FormEvent, useEffect, useState } from 'react'
import { PublicSquare } from '@publicsquare/elements-js'
import SubmitButton from '@/components/SubmitButton'
import {
  CardElement,
  CardExpirationDateElement,
  CardNumberElement,
  CardVerificationCodeElement,
  CardsCreateInput
} from '@publicsquare/elements-js/types'
import NameInput from '@/components/Form/NameInput'
import CaptureModal from '@/components/Modals/CaptureModal'
import { environment } from '@/config/environments'

type ChallengeResult = {
  id: string
  isCompleted: boolean
  authenticationStatus: string
}

export default function ThreeDSElementsJs({ allInOne }: { allInOne: boolean }) {
  const [publicsquare, setPublicSquare] = useState<PublicSquare>()
  const [cardElement, setCardElement] = useState<CardElement>()
  const [cardNumberElement, setCardNumberElement] = useState<CardNumberElement>()
  const [cardExpirationDateElement, setCardExpirationDateElement] =
    useState<CardExpirationDateElement>()
  const [cardVerificationCodeElement, setCardVerificationCodeElement] =
    useState<CardVerificationCodeElement>()
  const [message, setMessage] = useState<{ message?: object; error?: boolean }>()
  const [loading, setLoading] = useState(false)
  const [challengeActive, setChallengeActive] = useState(false)

  function unmountElements() {
    try {
      cardElement?.unmount()
    } catch {}
    try {
      cardNumberElement?.unmount()
    } catch {}
    try {
      cardExpirationDateElement?.unmount()
    } catch {}
    try {
      cardVerificationCodeElement?.unmount()
    } catch {}
  }

  useEffect(() => {
    new PublicSquare()
      .init(environment.apiKey, { ...environment.card, ...environment.threeDs })
      .then((_publicsquare) => setPublicSquare(_publicsquare))
  }, [])

  useEffect(() => {
    if (publicsquare) {
      requestAnimationFrame(() => {
        unmountElements()
        if (allInOne) {
          const cardElement = publicsquare.createCardElement({})
          cardElement.mount('#js-threeds-card-element')
          setCardElement(cardElement)
        } else {
          const cardNumberElement = publicsquare.createCardNumberElement({})
          cardNumberElement.mount('#js-threeds-card-number-element')
          setCardNumberElement(cardNumberElement)

          const cardExpirationDateElement =
            publicsquare.createCardExpirationDateElement({})
          cardExpirationDateElement.mount('#js-threeds-card-expiration-date-element')
          setCardExpirationDateElement(cardExpirationDateElement)

          const cardVerificationCodeElement =
            publicsquare.createCardVerificationCodeElement({})
          cardVerificationCodeElement.mount('#js-threeds-card-verification-code-element')
          setCardVerificationCodeElement(cardVerificationCodeElement)
        }
      })
    }
  }, [publicsquare, allInOne])

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
        number: cardNumberElement,
        expirationMonth: cardExpirationDateElement.month(),
        expirationYear: cardExpirationDateElement.year(),
        cvc: cardVerificationCodeElement
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
    if (formProps.cardholder_name && card && publicsquare) {
      setLoading(true)
      try {
        const cardResponse = await publicsquare.cards.create({
          cardholder_name: formProps.cardholder_name as string,
          card
        })

        if (cardResponse && !cardResponse.error) {
          const sessionResponse = await publicsquare.threeDs.createSession({
            token_id: cardResponse.id,
            payment_intent_id: formProps.payment_intent_id as string
          })

          if (sessionResponse && sessionResponse.id !== null) {
            setChallengeActive(true)
            const result = await publicsquare.threeDs.startChallenge({
              sessionId: sessionResponse.id,
              acsChallengeUrl: formProps.acs_challenge_url as string,
              acsTransactionId: sessionResponse.acs_transaction_id,
              containerId: 'js-threeds-challenge-container'
            })
            setChallengeActive(false)
            setMessage({ message: result as ChallengeResult, error: false })
          } else {
            setMessage({ message: sessionResponse, error: true })
          }
        } else {
          setMessage({ message: cardResponse, error: !!cardResponse?.error })
        }
      } catch (error) {
        console.log(error)
        setChallengeActive(false)
      }
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 w-full">
      {challengeActive && (
        <div id="js-threeds-challenge-container" className="w-full min-h-[400px]" />
      )}
      <form
        onSubmit={(e) =>
          allInOne ? onSubmitCardElement(e) : onSubmitCardElements(e)
        }
        name="js-form-threeds"
        className={challengeActive ? 'hidden' : ''}
      >
        <div className="w-full space-y-4">
          <NameInput />
          {allInOne ? (
            <div className="space-y-2 border-2 border-dashed border-gray-300 rounded-lg p-4">
              <label>Card element</label>
              <div
                className="w-full rounded-lg bg-white p-2 shadow"
                id="js-threeds-card-element"
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 items-start border-2 border-dashed border-gray-300 rounded-lg p-4">
              <div>
                <label>Card number element</label>
                <div
                  className="w-full rounded-lg bg-white p-2 shadow"
                  id="js-threeds-card-number-element"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 items-start">
                <div>
                  <label>Expiration</label>
                  <div
                    className="w-full rounded-lg bg-white p-2 shadow"
                    id="js-threeds-card-expiration-date-element"
                  />
                </div>
                <div>
                  <label>CVC</label>
                  <div
                    className="w-full rounded-lg bg-white p-2 shadow"
                    id="js-threeds-card-verification-code-element"
                  />
                </div>
              </div>
            </div>
          )}
          <div>
            <label htmlFor="js-payment_intent_id" className="block">
              Payment Intent ID
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="payment_intent_id"
                id="js-payment_intent_id"
                required
                placeholder="Enter payment intent ID"
                className="block w-full border-0 px-4 py-3 placeholder:text-gray-400 rounded-lg bg-white shadow focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label htmlFor="js-acs_challenge_url" className="block">
              ACS Challenge URL
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="acs_challenge_url"
                id="js-acs_challenge_url"
                required
                placeholder="https://acs.example.com/challenge"
                className="block w-full border-0 px-4 py-3 placeholder:text-gray-400 rounded-lg bg-white shadow focus:outline-none"
              />
            </div>
          </div>
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
