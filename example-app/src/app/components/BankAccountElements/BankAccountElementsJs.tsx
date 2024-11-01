'use client'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { PublicSquare } from '@publicsquare/elements-js'
import SubmitButton from '@/components/SubmitButton'
import { PublicSquareInitOptions } from '@publicsquare/elements-js/dist/types/sdk'
import NameInput from '@/components/NameInput'
import { BankAccountCreateInput } from '@publicsquare/elements-js/dist/types/sdk/bankaccounts'
import PaymentMethodCaptureSuccess from "@/components/Modals/PaymentMethodCaptureSuccess";

export default function BankAccountsElementsJs() {
  const [publicsquare, setPublicSquare] = useState<PublicSquare>()
  const bankAccountRef = useRef(null)
  const [bankAccountElement, setBankAccountElement] = useState<any>()
  const [bankAccountNumberElement, setBankAccountNumberElement] = useState<any>()
  const [bankAccountRoutingNumberElement, setBankAccountRoutingNumberElement] = useState<any>()
  const [jsBankAccountSuccessMessage, setJsBankAccountSuccessMessage] = useState<object>()
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
      const bankAccountElement = publicsquare.createBankAccountElement({})
      bankAccountElement.mount('#bankaccount-element')
      setBankAccountElement(bankAccountElement)
      // just the account number
      const bankAccountNumberElement = publicsquare.createBankAccountAccountNumberElement({})
      bankAccountNumberElement.mount('#bankaccount-account-number')
      setBankAccountNumberElement(bankAccountNumberElement)
      //just the routing number
      const bankAccountRoutingNumberElement = publicsquare.createBankAccountRoutingNumberElement({})
      bankAccountRoutingNumberElement.mount('#bankaccount-routing-number')
      setBankAccountRoutingNumberElement(bankAccountRoutingNumberElement)
    }
  }, [publicsquare])

  function onSubmitBankAccountElement(e: FormEvent<HTMLFormElement>) {
    if (bankAccountElement) {
      onSubmit(e, bankAccountElement)
    }
  }

  function onSubmitBankAccountElements(e: FormEvent<HTMLFormElement>) {
    if (
      bankAccountNumberElement &&
      bankAccountRoutingNumberElement
    ) {
      onSubmit(e, {
        account_number: bankAccountNumberElement,
        routing_number: bankAccountRoutingNumberElement
      })
    }
  }

  async function onSubmit(
    e: FormEvent<HTMLFormElement>,
    bankAccount: BankAccountCreateInput,
  ) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const formProps = Object.fromEntries(formData)
    if (loading) return
    if (bankAccount) {
      setLoading(true)
      try {
        console.log(publicsquare);//iterate and find values I am after
        const response = await publicsquare?.bankAccounts.create({
          account_number: formProps.account_number as string,
          routing_number: formProps.routing_number as string,
        })
        if (response) {
          setJsBankAccountSuccessMessage(response)
        }
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 w-full max-w-md">
      <h3 className="text-lg font-medium">All-in-one Bank Account Element</h3>
      <form onSubmit={onSubmitBankAccountElement} name="js-form-cardelement">
        <div className="w-full space-y-4">
          <div className="space-y-2">
            <label>Bank Account element</label>
            <div className="w-full max-w-md rounded-lg bg-white p-2 shadow">
              <div id="bankaccount-element" ref={bankAccountRef}></div>
            </div>
          </div>
          <div className="flex justify-end">
            <SubmitButton loading={loading} elementType="ach" />
          </div>
        </div>
      </form>
      <h3 className="text-lg font-medium">Individual Elements</h3>
      <form onSubmit={onSubmitBankAccountElements} name="js-form-cardelements">
        <div className="w-full max-w-md space-y-4">
          <div className="space-y-2">
            <label>Bank Account Routing Number Element</label>
            <div className="w-full max-w-md rounded-lg bg-white p-2 shadow">
              <div id="bankaccount-routing-number-element"></div>
            </div>
          </div>
          <div className="space-y-2">
            <label>Bank Account Account Number Element</label>
            <div className="w-full max-w-md rounded-lg bg-white p-2 shadow">
              <div id="bankaccount-account-number-element"></div>
            </div>
          </div>
          <div className="flex justify-end">
            <SubmitButton loading={loading} elementType="ach" />
          </div>
        </div>
      </form>
      <PaymentMethodCaptureSuccess
        message={jsBankAccountSuccessMessage}
        onClose={() => setJsBankAccountSuccessMessage(undefined)}
      />
    </div>
  )
}