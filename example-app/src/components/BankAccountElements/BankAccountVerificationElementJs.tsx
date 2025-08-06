'use client'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { PublicSquare } from '@publicsquare/elements-js'
import SubmitButton from '@/components/SubmitButton'
import {
  PublicSquareInitOptions,
  BankAccountVerificationIdResponse
} from '@publicsquare/elements-js/types'
import NameInput from '@/components/Form/NameInput'
import CaptureModal from '@/components/Modals/CaptureModal'
import Button from '../Buttons/Button'

export default function BankAccountVerificationElementJs() {
  const [publicsquare, setPublicSquare] = useState<PublicSquare>()
  const [data, setData] = useState<BankAccountVerificationIdResponse>()
  const [message, setMessage] = useState<{
    message?: object
    error?: boolean
  }>()
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    /**
     * Step 1: Init the PublicSquare sdk
     */
    const apiKey = process.env.NEXT_PUBLIC_PUBLICSQUARE_KEY!
    const options: PublicSquareInitOptions = {}

    new PublicSquare()
      .init(apiKey, options)
      .then((_publicsquare) => setPublicSquare(_publicsquare))
  }, [])

  async function onConnectBankAccountWithVerification() {
    setConnected(true);
    const response = await publicsquare?.bankVerify.openVerification(
      `#${'bank-account-verification-element'}`
    )
    setData(response)
  }

  return (
    <div className="space-y-4 w-full">
        <div className="w-full space-y-4">
          <NameInput />

          <div className="space-y-2 border-2 border-dashed border-gray-300 rounded-lg p-4">
            <label>Bank Account Verification element</label>
            <div className="w-full  bg-white  overflow-hidden">
              <div id="bank-account-verification-element">
                {!connected && (
                  <Button
                    onClick={onConnectBankAccountWithVerification}
                    className="mb-4"
                  >
                    Connect Bank Account
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

      <CaptureModal
        message={message?.message}
        onClose={() => setMessage(undefined)}
        error={message?.error}
      />
    </div>
  )
}
