'use client'
import CaptureModal from '@/components/Modals/CaptureModal'
import SubmitButton from '@/components/SubmitButton'
import {
  BankAccountVerificationElement,
  PublicSquareProvider,
  usePublicSquare
} from '@publicsquare/elements-react'
import PublicSquareTypes, {
  PublicSquareInitOptions
} from '@publicsquare/elements-react/types/sdk'
import { FormEvent, useRef, useState } from 'react'

export default function BankAccountVerificationElementReact() {
  const apiKey = process.env.NEXT_PUBLIC_PUBLICSQUARE_KEY!
  const options: PublicSquareInitOptions = {}

  return (
    <PublicSquareProvider apiKey={apiKey} options={options}>
      <Elements />
    </PublicSquareProvider>
  )
}

function Elements() {
  const [loading, setLoading] = useState(false)
  const [bankAccountVerificationId, setBankAccountVerificationId] =
    useState<string>()
  const [message, setMessage] = useState<{
    message?: object
    error?: boolean
  }>()

  const { publicsquare } = usePublicSquare()

  const bankAccountVerificationElement =
    useRef<PublicSquareTypes.BankAccountVerificationElement>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (!bankAccountVerificationId) {
        throw new Error('No bank account verification ID available')
      }
      const bankAccount = await publicsquare?.bankAccounts.create({
        bank_account_verification_id: bankAccountVerificationId
      })
      setMessage({
        message: bankAccount,
        error: false
      })
    } catch (error) {
      console.error('Error creating bank account:', error)
      setMessage({
        message: error as object,
        error: true
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 w-full">
      <form
        onSubmit={handleSubmit}
        name="react-form-bank-account-verification-element"
      >
        <div className="w-full space-y-4">
          <div className="space-y-2 border-2 border-dashed border-gray-300 rounded-lg p-4">
            <label>Bank account verification element</label>
            <BankAccountVerificationElement
              ref={bankAccountVerificationElement}
              id="react-bank-account-verification-element"
              className="space-x-4"
              onVerificationComplete={(result) => {
                console.log('Bank account verification completed React:', result.bank_account_verification_id);
                setBankAccountVerificationId(
                  result.bank_account_verification_id
                )
              }}
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
