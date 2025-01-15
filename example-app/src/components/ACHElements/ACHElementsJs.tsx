'use client'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { PublicSquare } from '@publicsquare/elements-js'
import SubmitButton from '@/components/SubmitButton'
import {
  BankAccountCreateInput,
  PublicSquareInitOptions,
  BankAccountElement,
  RoutingNumberElement,
  AccountNumberElement
} from '@publicsquare/elements-js/dist/types/sdk'
import NameInput from '@/components/NameInput'
import CardCaptureSuccess from '@/components/Modals/CardCaptureSuccess'

export default function ACHElementsJs({ allInOne }: { allInOne: boolean }) {
  const [publicsquare, setPublicSquare] = useState<PublicSquare>()
  const achRef = useRef(null)
  const [bankAccountElement, setBankAccountElement] =
    useState<BankAccountElement>()
  const [routingNumberElement, setRoutingNumberElement] =
    useState<RoutingNumberElement>()
  const [accountNumberElement, setAccountNumberElement] =
    useState<AccountNumberElement>()
  const [jsCardSuccessMessage, setJsCardSuccessMessage] = useState<object>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    /**
     * Step 1: Init the PublicSquare sdk
     */
    const apiKey = process.env.NEXT_PUBLIC_PUBLICSQUARE_KEY!
    const options: PublicSquareInitOptions = {
      apiBaseUrl: process.env.NEXT_PUBLIC_CAPTURE_URL
    }

    new PublicSquare()
      .init(apiKey, options)
      .then((_publicsquare) => setPublicSquare(_publicsquare))
  }, [])

  useEffect(() => {
    if (publicsquare) {
      if (allInOne) {
        /**
         * Step 2: Initialize the elements you want to use
         */
        // The whole card
        const bankAccountElement = publicsquare.createBankAccountElement({
          routingNumberOptions: {
            className:
              'block w-full border-0 px-4 py-3 placeholder:text-gray-400 focus:outline-none'
          },
          accountNumberOptions: {
            className:
              'block w-full border-0 px-4 py-3 placeholder:text-gray-400 focus:outline-none'
          }
        })
        bankAccountElement.mount('#bank-account-element')
        setBankAccountElement(bankAccountElement)
      } else {
        const routingNumberElement =
          publicsquare.createBankAccountRoutingNumberElement({
            placeholder: 'Routing number',
            className:
              'block w-full border-0 px-4 py-3 placeholder:text-gray-400 rounded-lg bg-white shadow focus:outline-none'
          })
        routingNumberElement.mount('#routing-number-element')
        setRoutingNumberElement(routingNumberElement)

        const accountNumberElement =
          publicsquare.createBankAccountAccountNumberElement({
            placeholder: 'Account number',
            className:
              'block w-full border-0 px-4 py-3 placeholder:text-gray-400 rounded-lg bg-white shadow focus:outline-none'
          })
        accountNumberElement.mount('#account-number-element')
        setAccountNumberElement(accountNumberElement)
      }
    }
  }, [publicsquare, allInOne])

  function onSubmitCardElement(e: FormEvent<HTMLFormElement>) {
    if (bankAccountElement) {
      onSubmit(e, {
        account_number: bankAccountElement.accountNumber.el.value,
        routing_number: bankAccountElement.routingNumber.el.value,
        country: 'US'
      })
    }
  }

  function onSubmitCardElements(e: FormEvent<HTMLFormElement>) {
    if (accountNumberElement && routingNumberElement) {
      onSubmit(e, {
        account_number: accountNumberElement.el.value,
        routing_number: routingNumberElement.el.value,
        country: 'US'
      })
    }
  }

  async function onSubmit(
    e: FormEvent<HTMLFormElement>,
    data: BankAccountCreateInput
  ) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const formProps = Object.fromEntries(formData)
    if (loading) return
    if (data.account_number && data.routing_number) {
      setLoading(true)
      try {
        const response = await publicsquare?.bankAccounts.create(
          {
            ...data,
            account_holder_name: formProps.name as string
          },
          process.env.NEXT_PUBLIC_PUBLICSQUARE_KEY!
        )
        if (response) {
          setJsCardSuccessMessage(response)
        }
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 w-full max-w-md">
      <form
        onSubmit={(e) =>
          allInOne ? onSubmitCardElement(e) : onSubmitCardElements(e)
        }
        name="js-form-cardelement"
      >
        <div className="w-full space-y-4">
          <NameInput required />
          {allInOne ? (
            <div className="space-y-2">
              <label>ACH element</label>
              <div className="w-full max-w-md rounded-lg bg-white shadow overflow-hidden">
                <div id="bank-account-element" ref={achRef}></div>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <label>ACH routing number element</label>
                <div id="routing-number-element"></div>
              </div>
              <div className="space-y-2">
                <label>ACH account number element</label>
                <div id="account-number-element"></div>
              </div>
            </>
          )}
          <div className="flex justify-end">
            <SubmitButton loading={loading} elementType="ach" />
          </div>
        </div>
      </form>
      <CardCaptureSuccess
        message={jsCardSuccessMessage}
        onClose={() => setJsCardSuccessMessage(undefined)}
      />
    </div>
  )
}
