'use client'
import { FormEvent, useState } from 'react'
import { PublicSquare } from '@publicsquare/elements-js'
import SubmitButton from '@/components/SubmitButton'
import {
  PublicSquareInitOptions,
  BankAccountVerificationIdResponse
} from '@publicsquare/elements-js/types'
import CaptureModal from '@/components/Modals/CaptureModal'
import Button from '../Buttons/Button'

//Element items
let publicSquare: PublicSquare
let data: BankAccountVerificationIdResponse | undefined
export default function BankAccountVerificationElementJs() {
  //Used only to refresh the modal to create bank account after verification
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{
    message?: object
    error?: boolean
  }>()

  //Create public square instance and load element
  async function loadElement() {
    //Element Container
    const target = '#bank-account-verification-element'

    //Optional - Clear out container
    const container = document.querySelector(target)
    if (container) {
      container.innerHTML = ''
    }

    //Init public square
    const apiKey = process.env.NEXT_PUBLIC_PUBLICSQUARE_KEY!
    const options: PublicSquareInitOptions = {}
    publicSquare = new PublicSquare()
    await publicSquare.init(apiKey, options)

    //Open verification element in container and Get data back
    data = await publicSquare.bankVerify.openVerification(target)
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      if (!data) {
        setMessage({
          message: {message:'Finish verification steps'},
          error: true
        })
      }
      else if (!loading) {
        setLoading(true);
        const bankAccount = await publicSquare?.bankAccounts.create({
          bank_account_verification_id: data?.bank_account_verification_id
        })
        setMessage({
          message: bankAccount,
          error: false
        })
      }
      else{
        setMessage({
          message: {message:'Verification in progress, please wait'},
          error: true
        })
      }
    } catch (error) {
      console.error('Error creating bank account:', error)
      setMessage({
        message: error as object,
        error: true
      })
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4 w-full">
      <div className="w-full space-y-4">
        <div className="space-y-2 border-2 border-dashed border-gray-300 rounded-lg p-4">
          <label>Bank Account Verification element</label>
          <div className="w-full  bg-white  overflow-hidden">
            <div id="bank-account-verification-element">
              <Button onClick={loadElement} className="mb-4">
                Open verification element
              </Button>
            </div>
          </div>
        </div>
      </div>
      <form
          onSubmit={(e) => onSubmit(e)}
          name="js-form-bank-account-verification-element"
      >
        <div className="flex justify-end">
           <SubmitButton loading={loading} elementType="bankAccount" />
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
