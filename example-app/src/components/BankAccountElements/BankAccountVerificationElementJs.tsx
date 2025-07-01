'use client'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { PublicSquare } from '@publicsquare/elements-js'
import SubmitButton from '@/components/SubmitButton'
import {
  BankAccountCreateInput,
  PublicSquareInitOptions,
  BankAccountElement,
  BankAccountRoutingNumberElement,
  BankAccountAccountNumberElement
} from '@publicsquare/elements-js/types/sdk'
import NameInput from '@/components/Form/NameInput'
import CaptureModal from '@/components/Modals/CaptureModal'
import Button from '../Buttons/Button'
import { BankVerificationIdResponse } from '@publicsquare/elements-js/types/sdk/verificationWidget'

export default function BankAccountVerificationElementJs() {
  const [publicsquare, setPublicSquare] = useState<PublicSquare>()
  const [message, setMessage] = useState<{
    message?: object
    error?: boolean
  }>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    /**
     * Step 1: Init the PublicSquare sdk
     */
    const apiKey = process.env.NEXT_PUBLIC_PUBLICSQUARE_KEY!
    const options: PublicSquareInitOptions = {}

    console.log('BankAccountVerificationElementJs', {
      apiKey,
      options
    })

    new PublicSquare()
      .init(apiKey, options)
      .then((_publicsquare) => setPublicSquare(_publicsquare))
  }, [])

  async function onConnectBankAccountWithVerification() {
    const response = await publicsquare?.bankAccounts.openVerification(
      `#${'bank-account-verification-element'}`
    )
    console.log('response', response)
  }

  async function onSubmit(
    e: FormEvent<HTMLFormElement>,
    data: BankVerificationIdResponse
  ) {
    e.preventDefault()
    console.log('data', data)
  }
  return (
    <div className="space-y-4 w-full">
      <form
        onSubmit={(e) => console.log('e', e)}
        name="js-form-bank-account-verification-element"
      >
        <div className="w-full space-y-4">
          <NameInput />

          <div className="space-y-2 border-2 border-dashed border-gray-300 rounded-lg p-4">
            <label>Bank Account Verification element</label>
            <div className="w-full  bg-white  overflow-hidden">
              <div id="bank-account-verification-element">
                <Button
                  onClick={onConnectBankAccountWithVerification}
                  className="mb-4"
                >
                  Connect Bank Account
                </Button>
              </div>
            </div>
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
