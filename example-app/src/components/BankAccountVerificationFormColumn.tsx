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
  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-2">
      <h3 className="text-lg font-medium">Bank Account Form</h3>
      <p className="text-sm">This is a form for bank account verification.</p>

      {type === 'react' && <BankAccountVerificationElementReact />}
      {type === 'javascript' && <BankAccountVerificationElementJs />}
    </div>
  )
}
