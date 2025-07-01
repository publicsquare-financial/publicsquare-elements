'use client'

import { Technology } from './HomeSection'
import BankAccountVerificationElementJs from './BankAccountElements/BankAccountVerificationElementJs'
import BankAccountVerificationElementReact from './BankAccountElements/BankAccountVerificationElementReact'
import { BankVerificationIdResponse } from '@publicsquare/elements-js/types/sdk/verificationWidget'
import { useState } from 'react'

export default function BankAccountVerificationFormColumn({
  type
}: {
  type: Technology
}) {
  const [verificationResult, setVerificationResult] =
    useState<BankVerificationIdResponse | null>(null)

  const handleVerificationComplete = (result: BankVerificationIdResponse) => {
    console.log(
      'Verification result in BankAccountVerificationFormColumn:',
      result
    )
    setVerificationResult(result)
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-2">
      <h3 className="text-lg font-medium">Bank Account Form</h3>
      <p className="text-sm">This is a form for bank account verification.</p>

      {verificationResult && (
        <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
          <h4 className="font-semibold">Verification Completed!</h4>
          <p>
            Bank Account Verification ID:{' '}
            {verificationResult.bank_account_verification_id}
          </p>
        </div>
      )}

      {type === 'react' && (
        <BankAccountVerificationElementReact
          onVerificationComplete={handleVerificationComplete}
        />
      )}
      {type === 'javascript' && <BankAccountVerificationElementJs />}
    </div>
  )
}
