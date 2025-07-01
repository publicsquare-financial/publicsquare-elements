'use client'

import CaptureModal from '@/components/Modals/CaptureModal'
import NameInput from '@/components/Form/NameInput'
import SubmitButton from '@/components/SubmitButton'
import PublicSquareTypes, {
  PublicSquareInitOptions
} from '@publicsquare/elements-react/types/sdk'
import {
  PublicSquareProvider,
  usePublicSquare
} from '@publicsquare/elements-react'
import { FormEvent, useEffect, useRef, useState } from 'react'
import AccountHolderTypeSelect from '../Form/AccountHolderTypeSelect'
import AccountTypeSelect from '../Form/AccountTypeSelect'
import { BankVerificationIdResponse } from '@publicsquare/elements-js/types/sdk/verificationWidget'

// Try to import the component with error handling
let BankAccountVerificationElement: any = null
try {
  const module = require('@publicsquare/elements-react')
  BankAccountVerificationElement = module.BankAccountVerificationElement
} catch (error) {
  console.error('Failed to import BankAccountVerificationElement:', error)
}

export default function BankAccountVerificationElementReact({
  onVerificationComplete
}: {
  onVerificationComplete?: (result: BankVerificationIdResponse) => void
}) {
  const apiKey = process.env.NEXT_PUBLIC_PUBLICSQUARE_KEY!
  const options: PublicSquareInitOptions = {}

  return (
    <PublicSquareProvider apiKey={apiKey} options={options}>
      <Elements onVerificationComplete={onVerificationComplete} />
    </PublicSquareProvider>
  )
}

function Elements({
  onVerificationComplete
}: {
  onVerificationComplete?: (result: BankVerificationIdResponse) => void
}) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{
    message?: object
    error?: boolean
  }>()

  const bankAccountVerificationElement =
    useRef<PublicSquareTypes.BankAccountVerificationElement>(null)

  async function onSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log('data', bankAccountVerificationElement.current)
  }

  const handleVerificationComplete = (result: BankVerificationIdResponse) => {
    console.log('Verification completed:', result)
    setMessage({
      message: result,
      error: false
    })
    if (onVerificationComplete) {
      onVerificationComplete(result)
    }
  }

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      const data = e.data
      if (data && typeof data === 'object') {
        console.log('data', data)
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  // Check if component is available
  if (!BankAccountVerificationElement) {
    return (
      <div className="space-y-4 w-full">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: BankAccountVerificationElement is not available
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 w-full">
      <form
        onSubmit={(e) => onSubmitForm(e)}
        name="react-form-bank-account-verification-element"
      >
        <div className="w-full space-y-4">
          <NameInput />
          <AccountHolderTypeSelect />
          <AccountTypeSelect />
          <div className="space-y-2 border-2 border-dashed border-gray-300 rounded-lg p-4">
            <label>Bank account verification element</label>
            <BankAccountVerificationElement
              ref={bankAccountVerificationElement}
              id="react-bank-account-verification-element"
              className="space-x-4"
              onVerificationComplete={handleVerificationComplete}
            />
          </div>
          <div className="flex justify-end">
            <SubmitButton loading={loading} elementType="bankAccount" />
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
