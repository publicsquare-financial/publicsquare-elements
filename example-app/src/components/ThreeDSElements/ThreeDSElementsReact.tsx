'use client'
import {
  PublicSquareProvider,
  CardElement,
  CardNumberElement,
  CardExpirationDateElement,
  CardVerifcationCodeElement,
  ThreeDSChallenge,
  usePublicSquare,
} from '@publicsquare/elements-react'
import PublicSquareTypes from '@publicsquare/elements-react/types/sdk'
import { FormEvent, useRef, useState } from 'react'
import { environment } from '@/config/environments'
import NameInput from '@/components/Form/NameInput'
import SubmitButton from '@/components/SubmitButton'

type Step =
  | 'idle'
  | 'tokenizing'
  | 'creating_intent'
  | 'creating_session'
  | 'confirming'
  | 'challenge'
  | 'completing'
  | 'done'
  | 'error'

type ThreeDsNextAction = {
  session_id: string
  acs_challenge_url: string
  acs_transaction_id: string
  three_ds_version: string
  transport: string
}

type PaymentIntentResponse = {
  id: string
  status: string
  next_action?: {
    type: string
    three_d_secure?: ThreeDsNextAction
  }
  [key: string]: unknown
}

type ThreeDSChallengeResult = {
  id: string
  isCompleted: boolean
  authenticationStatus: string
}

export default function ThreeDSElementsReact({ allInOne }: { allInOne: boolean }) {
  return (
    <PublicSquareProvider
      apiKey={environment.apiKey}
      options={{ ...environment.card, ...environment.threeDs }}
    >
      <Elements allInOne={allInOne} />
    </PublicSquareProvider>
  )
}

function Elements({ allInOne }: { allInOne: boolean }) {
  const { publicsquare } = usePublicSquare()

  const [step, setStep] = useState<Step>('idle')
  const [intentId, setIntentId] = useState<string>()
  const [btSessionId, setBtSessionId] = useState<string>()
  const [nextAction, setNextAction] = useState<ThreeDsNextAction>()
  const [finalIntent, setFinalIntent] = useState<PaymentIntentResponse>()
  const [error, setError] = useState<string>()
  const [stepLog, setStepLog] = useState<{ label: string; data: unknown }[]>([])

  const cardElement = useRef<PublicSquareTypes.CardElement>(null)
  const cardNumberElement = useRef<PublicSquareTypes.CardNumberElement>(null)
  const cardExpirationDateElement = useRef<PublicSquareTypes.CardExpirationDateElement>(null)
  const cardVerificationCodeElement = useRef<PublicSquareTypes.CardVerificationCodeElement>(null)

  function log(label: string, data: unknown) {
    setStepLog((prev) => [...prev, { label, data }])
  }

  function fail(label: string, data: unknown) {
    log(label, data)
    setError(typeof data === 'string' ? data : JSON.stringify(data))
    setStep('error')
  }

  function reset() {
    setStep('idle')
    setIntentId(undefined)
    setBtSessionId(undefined)
    setNextAction(undefined)
    setFinalIntent(undefined)
    setError(undefined)
    setStepLog([])
  }

  async function run(
    e: FormEvent<HTMLFormElement>,
    card: PublicSquareTypes.CardCreateInput['card']
  ) {
    e.preventDefault()
    if (step !== 'idle') return
    if (!publicsquare) return
    const formData = new FormData(e.currentTarget)
    const cardholderName = formData.get('cardholder_name') as string
    if (!cardholderName || !card) return

    // Step 1: Tokenize card
    setStep('tokenizing')
    let cardResponse: { id: string; token: string; error?: unknown }
    try {
      cardResponse = await publicsquare.cards.create({ cardholder_name: cardholderName, card }) as typeof cardResponse
    } catch (err) {
      return fail('cards.create threw', String(err))
    }
    if (cardResponse.error) return fail('cards.create error', cardResponse.error)
    log('1. cards.create', cardResponse)

    // Step 2: Create payment intent (server route, uses sk_)
    setStep('creating_intent')
    let intentRes: PaymentIntentResponse
    try {
      const res = await fetch('/api/payment-intents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 5000,
          currency: 'USD',
          capture_method: 'Manual',
          payment_method: { card: cardResponse.id },
          customer: {
            first_name: 'John',
            last_name: 'Smith',
            email: 'john.smith@example.com',
          },
          billing_details: {
            address_line_1: '111 Colorado Ave',
            city: 'Des Moines',
            state: 'IA',
            postal_code: '51111',
            country: 'US',
          },
        }),
      })
      intentRes = await res.json()
      if (!res.ok) return fail('create intent error', intentRes)
    } catch (err) {
      return fail('create intent threw', String(err))
    }
    log('2. create payment intent', intentRes)
    setIntentId(intentRes.id)

    // Step 3: Create 3DS session (client, uses pk_)
    setStep('creating_session')
    let sessionRes: {
      id: string
      bt_session_id: string
      acs_transaction_id: string
      error?: unknown
    }
    try {
      sessionRes = await publicsquare.threeDs.createSession({
        token_id: cardResponse.token,
        payment_intent_id: intentRes.id,
      }) as typeof sessionRes
    } catch (err) {
      return fail('createSession threw', String(err))
    }
    if (sessionRes.error) return fail('createSession error', sessionRes.error)
    if (!sessionRes.id) return fail('createSession error', sessionRes)
    log('3. threeDs.createSession', sessionRes)
    // PSQ session id (sessionRes.id, tds_…) drives confirm + complete.
    // BasisTheory session id drives the iframe challenge (threeDSServerTransID).
    setBtSessionId(sessionRes.bt_session_id)

    // Step 4: Confirm (server route, uses sk_)
    setStep('confirming')
    let confirmRes: PaymentIntentResponse
    try {
      const res = await fetch(`/api/payment-intents/${intentRes.id}/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          three_d_secure: {
            session_id: sessionRes.id,
            transport: 'iframe',
          },
        }),
      })
      confirmRes = await res.json()
      if (!res.ok) return fail('confirm error', confirmRes)
    } catch (err) {
      return fail('confirm threw', String(err))
    }
    log('4. confirm', confirmRes)

    // Step 5: Check for 3DS challenge
    if (
      confirmRes.status === 'requires_action' &&
      confirmRes.next_action?.three_d_secure
    ) {
      setNextAction(confirmRes.next_action.three_d_secure)
      setStep('challenge')
    } else {
      // Frictionless — no challenge needed
      setFinalIntent(confirmRes)
      setStep('done')
    }
  }

  async function onChallengeComplete(result: ThreeDSChallengeResult) {
    log('5. challenge complete', result)
    if (!intentId || !nextAction) return

    // Step 6: Complete (server route, uses sk_)
    setStep('completing')
    let completeRes: PaymentIntentResponse
    try {
      const res = await fetch(`/api/payment-intents/${intentId}/three_d_secure/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          three_d_secure: { session_id: nextAction.session_id },
        }),
      })
      completeRes = await res.json()
      if (!res.ok) return fail('complete error', completeRes)
    } catch (err) {
      return fail('complete threw', String(err))
    }
    log('6. complete', completeRes)
    setFinalIntent(completeRes)
    setStep('done')
  }

  function onChallengeFailure(err: Error) {
    fail('challenge failure', err.message)
  }

  function onSubmitCardElement(e: FormEvent<HTMLFormElement>) {
    if (cardElement.current) run(e, cardElement.current)
  }

  function onSubmitCardElements(e: FormEvent<HTMLFormElement>) {
    if (
      cardNumberElement.current &&
      cardExpirationDateElement.current &&
      cardVerificationCodeElement.current
    ) {
      run(e, {
        number: cardNumberElement.current,
        expirationMonth: cardExpirationDateElement.current.month(),
        expirationYear: cardExpirationDateElement.current.year(),
        cvc: cardVerificationCodeElement.current,
      })
    }
  }

  const isLoading = [
    'tokenizing',
    'creating_intent',
    'creating_session',
    'confirming',
    'completing',
  ].includes(step)

  if (step === 'challenge' && nextAction && btSessionId) {
    return (
      <div className="space-y-4 w-full">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm">
          <b>3DS Challenge</b> — complete the authentication below
        </div>
        <ThreeDSChallenge
          sessionId={btSessionId}
          acsChallengeUrl={nextAction.acs_challenge_url}
          acsTransactionId={nextAction.acs_transaction_id}
          threeDsVersion={nextAction.three_ds_version}
          onComplete={onChallengeComplete}
          onFailure={onChallengeFailure}
        />
      </div>
    )
  }

  if (step === 'done' && finalIntent) {
    return (
      <div className="space-y-4 w-full">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="font-semibold text-green-800 mb-1">
            Flow complete — status: <code>{finalIntent.status}</code>
          </div>
        </div>
        <StepLog entries={stepLog} />
        <button
          onClick={reset}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm text-white shadow-sm hover:bg-indigo-500"
        >
          Reset
        </button>
      </div>
    )
  }

  if (step === 'error') {
    return (
      <div className="space-y-4 w-full">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
          <b>Error:</b> {error}
        </div>
        <StepLog entries={stepLog} />
        <button
          onClick={reset}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm text-white shadow-sm hover:bg-indigo-500"
        >
          Reset
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4 w-full">
      {isLoading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
          {STEP_LABELS[step]}…
        </div>
      )}
      <form
        onSubmit={(e) =>
          allInOne ? onSubmitCardElement(e) : onSubmitCardElements(e)
        }
        name="react-3ds-form"
      >
        <div className="w-full space-y-4">
          <NameInput required />
          {allInOne ? (
            <div className="space-y-2 border-2 border-dashed border-gray-300 rounded-lg p-4">
              <label>Card element</label>
              <div className="w-full rounded-lg bg-white p-2 shadow">
                <CardElement id="threeds-card-element" ref={cardElement} />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 items-start border-2 border-dashed border-gray-300 rounded-lg p-4">
              <div>
                <label>Card number</label>
                <div className="w-full rounded-lg bg-white p-2 shadow">
                  <CardNumberElement id="threeds-card-number" ref={cardNumberElement} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 items-start">
                <div>
                  <label>Expiration</label>
                  <div className="w-full rounded-lg bg-white p-2 shadow">
                    <CardExpirationDateElement id="threeds-card-exp" ref={cardExpirationDateElement} />
                  </div>
                </div>
                <div>
                  <label>CVC</label>
                  <div className="w-full rounded-lg bg-white p-2 shadow">
                    <CardVerifcationCodeElement id="threeds-card-cvc" ref={cardVerificationCodeElement} />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end">
            <SubmitButton loading={isLoading} elementType="card" />
          </div>
        </div>
      </form>
      {stepLog.length > 0 && <StepLog entries={stepLog} />}
    </div>
  )
}

const STEP_LABELS: Partial<Record<Step, string>> = {
  tokenizing: '1/5 Tokenizing card',
  creating_intent: '2/5 Creating payment intent',
  creating_session: '3/5 Creating 3DS session',
  confirming: '4/5 Confirming payment intent',
  completing: '5/5 Completing 3DS challenge',
}

function StepLog({ entries }: { entries: { label: string; data: unknown }[] }) {
  return (
    <div className="space-y-2">
      {entries.map((entry, i) => (
        <details key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs">
          <summary className="font-medium cursor-pointer">{entry.label}</summary>
          <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-all">
            {JSON.stringify(entry.data, null, 2)}
          </pre>
        </details>
      ))}
    </div>
  )
}
