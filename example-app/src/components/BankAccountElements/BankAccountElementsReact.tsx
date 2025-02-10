'use client'

import CaptureModal from '@/components/Modals/CaptureModal'
import NameInput from '@/components/Form/NameInput'
import SubmitButton from '@/components/SubmitButton'
import PublicSquareTypes, {
  PublicSquareInitOptions
} from '@publicsquare/elements-react/types/sdk'
import {
  BankAccountAccountNumberElement,
  BankAccountElement,
  BankAccountRoutingNumberElement,
  PublicSquareProvider,
  usePublicSquare
} from '@publicsquare/elements-react'
import { FormEvent, useRef, useState } from 'react'
import AccountHolderTypeSelect from '../Form/AccountHolderTypeSelect'
import AccountTypeSelect from '../Form/AccountTypeSelect'

export default function BankAccountElementsReact({
  allInOne
}: {
  allInOne: boolean
}) {
  const apiKey = process.env.NEXT_PUBLIC_PUBLICSQUARE_KEY!
  const options: PublicSquareInitOptions = {}

  return (
    <PublicSquareProvider apiKey={apiKey} options={options}>
      <Elements allInOne={allInOne} />
    </PublicSquareProvider>
  )
}

function Elements({ allInOne }: { allInOne: boolean }) {
  const { publicsquare } = usePublicSquare()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{
    message?: object
    error?: boolean
  }>()
  const bankAccountElement = useRef<PublicSquareTypes.BankAccountElement>(null)
  const bankRoutingNumberElement =
    useRef<PublicSquareTypes.BankAccountRoutingNumberElement>(null)
  const bankAccountNumberElement =
    useRef<PublicSquareTypes.BankAccountAccountNumberElement>(null)

  function onSubmitCardElement(e: FormEvent<HTMLFormElement>) {
    if (bankAccountElement.current) {
      onSubmit(e, {
        routing_number: bankAccountElement.current.routingNumber.el.value,
        account_number: bankAccountElement.current.accountNumber.el.value
      })
    }
  }

  function onSubmitCardElements(e: FormEvent<HTMLFormElement>) {
    if (bankRoutingNumberElement.current && bankAccountNumberElement.current) {
      onSubmit(e, {
        routing_number: bankRoutingNumberElement.current.el.value,
        account_number: bankAccountNumberElement.current.el.value
      })
    }
  }

  async function onSubmit(
    e: FormEvent<HTMLFormElement>,
    data: PublicSquareTypes.BankAccountCreateInput
  ) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const { cardholder_name, account_holder_type, account_type } =
      Object.fromEntries(formData)
    if (loading) return
    if (publicsquare && data.routing_number && data.account_number) {
      setLoading(true)
      try {
        const response = await publicsquare.bankAccounts.create({
          ...(cardholder_name && {
            account_holder_name: cardholder_name as string
          }),
          ...(account_holder_type && {
            account_holder_type: account_holder_type as string
          }),
          ...(account_type && { account_type: account_type as string }),
          routing_number: data.routing_number,
          account_number: data.account_number
        })
        setMessage({
          message: response,
          error: !!response.error
        })
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 w-full">
      <form
        onSubmit={(e) =>
          allInOne ? onSubmitCardElement(e) : onSubmitCardElements(e)
        }
        name="react-form-bank-account-element"
      >
        <div className="w-full space-y-4">
          <NameInput />
          <AccountHolderTypeSelect />
          <AccountTypeSelect />
          {allInOne ? (
            <div className="space-y-2 border-2 border-dashed border-gray-300 rounded-lg p-4">
              <label>Bank account element</label>
              <BankAccountElement
                id="react-bank-account-element"
                ref={bankAccountElement}
                routingNumberOptions={{
                  placeholder: 'Routing number',
                  className:
                    'w-full border-0 px-4 py-3 placeholder:text-gray-400 rounded-lg bg-white shadow focus:outline-none'
                }}
                accountNumberOptions={{
                  placeholder: 'Account number',
                  className:
                    'w-full border-0 px-4 py-3 placeholder:text-gray-400 rounded-lg bg-white shadow focus:outline-none'
                }}
                className="space-x-4"
              />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 items-start border-2 border-dashed border-gray-300 rounded-lg p-4">
                <div>
                  <label>Routing number</label>
                  <BankAccountRoutingNumberElement
                    id="react-bank-account-routing-number-element"
                    ref={bankRoutingNumberElement}
                    placeholder="Routing number"
                    className="w-full border-0 px-4 py-3 placeholder:text-gray-400 rounded-lg bg-white shadow focus:outline-none"
                  />
                </div>
                <div>
                  <label>Account number</label>
                  <BankAccountAccountNumberElement
                    id="react-bank-account-account-number-element"
                    ref={bankAccountNumberElement}
                    placeholder="Account number"
                    className="w-full border-0 px-4 py-3 placeholder:text-gray-400 rounded-lg bg-white shadow focus:outline-none"
                  />
                </div>
              </div>
            </>
          )}
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
