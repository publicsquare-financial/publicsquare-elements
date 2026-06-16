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
  ThreeDSChallenge,
  usePublicSquare
} from '@publicsquare/elements-react'
import PublicSquareTypes from '@publicsquare/elements-react/types/sdk'
import { FormEvent, useRef, useState } from 'react'
import { environment } from '@/config/environments'
import type { ThreeDSChallengeResult } from '@publicsquare/elements-react'

export default function ThreeDSElementsReact({ allInOne }: { allInOne: boolean }) {
  return (
    <PublicSquareProvider
      apiKey={environment.apiKey}
      options={{ 
        ...environment.card, 
        ...environment.threeDs 
        // cardCreateUrl: 'https://api.test.basistheory.com/proxy',
        // proxyKey: 'key_test_us_proxy_FrL4kJFRXU1AwuYVnMbTnP',
        // threeBtDsApiBaseUrl: 'https://api.test.basistheory.com', 
        // public3dsAppKey: 'key_test_us_pub_Tkia8nWTAWwFZ8QJyUJvES' 
      }}
    >
      <Elements allInOne={allInOne} />
    </PublicSquareProvider>
  )
}

type ChallengeData = {
  sessionId: string
  acsChallengeUrl: string
  acsTransactionId: string
}

function Elements({ allInOne }: { allInOne: boolean }) {
  const { publicsquare } = usePublicSquare()
  const [loading, setLoading] = useState(false)
  const [challengeData, setChallengeData] = useState<ChallengeData | null>(null)
  const [message, setMessage] = useState<{ message?: object; error?: boolean }>()

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
        const cardResponse = await publicsquare.cards.create({
          cardholder_name: formProps.cardholder_name as string,
          card
        })

        if (cardResponse && !cardResponse.error) {
          const sessionResponse = await publicsquare.threeDs.createSession({
            token_id: cardResponse.token,
            payment_intent_id: formProps.payment_intent_id as string
          })

          //console.log('session response: ', sessionResponse)
          if (sessionResponse && sessionResponse.id !== 'undefined') {
            setChallengeData({
              sessionId: sessionResponse.id,
              acsChallengeUrl: formProps.acs_challenge_url as string,
              acsTransactionId: sessionResponse.acs_transaction_id
            })
          } else {
            setMessage({ message: sessionResponse, error: true })
          }
        } else {
          setMessage({ message: cardResponse, error: !!cardResponse?.error })
        }
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
  }

  function handleChallengeComplete(result: ThreeDSChallengeResult) {
    setMessage({ message: result, error: false })
  }

  function handleChallengeFailure(error: Error) {
    setMessage({ message: { error: error.message }, error: true })
  }

  function handleModalClose() {
    setMessage(undefined)
    setChallengeData(null)
  }

  return (
    <div className="space-y-4 w-full">
      {challengeData ? (
        <ThreeDSChallenge
          sessionId={challengeData.sessionId}
          acsChallengeUrl={challengeData.acsChallengeUrl}
          acsTransactionId={challengeData.acsTransactionId}
          onComplete={handleChallengeComplete}
          onFailure={handleChallengeFailure}
        />
      ) : (
        <form
          onSubmit={(e) =>
            allInOne ? onSubmitCardElement(e) : onSubmitCardElements(e)
          }
          name="react-form-threeds"
        >
          <div className="w-full space-y-4">
            <NameInput />
            {allInOne ? (
              <div className="space-y-2 border-2 border-dashed border-gray-300 rounded-lg p-4">
                <label>Card element</label>
                <div className="w-full rounded-lg bg-white p-2 shadow">
                  <CardElement id="react-threeds-card-element" ref={cardElement} />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 items-start border-2 border-dashed border-gray-300 rounded-lg p-4">
                <div>
                  <label>Card number element</label>
                  <div className="w-full rounded-lg bg-white p-2 shadow">
                    <CardNumberElement
                      id="react-threeds-card-number-element"
                      ref={cardNumberElement}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 items-start">
                  <div>
                    <label>Expiration</label>
                    <div className="w-full rounded-lg bg-white p-2 shadow">
                      <CardExpirationDateElement
                        id="react-threeds-card-expiration-date-element"
                        ref={cardExpirationDateElement}
                      />
                    </div>
                  </div>
                  <div>
                    <label>CVC</label>
                    <div className="w-full rounded-lg bg-white p-2 shadow">
                      <CardVerifcationCodeElement
                        id="react-threeds-card-verification-code-element"
                        ref={cardVerificationCodeElement}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div>
              <label htmlFor="payment_intent_id" className="block">
                Payment Intent ID
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="payment_intent_id"
                  id="payment_intent_id"
                  required
                  placeholder="Enter payment intent ID"
                  className="block w-full border-0 px-4 py-3 placeholder:text-gray-400 rounded-lg bg-white shadow focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label htmlFor="acs_challenge_url" className="block">
                ACS Challenge URL
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="acs_challenge_url"
                  id="acs_challenge_url"
                  defaultValue="http://localhost:3000/three-ds"
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
      )}
      <CaptureModal
        message={message?.message}
        onClose={handleModalClose}
        error={message?.error}
      />
    </div>
  )
}
