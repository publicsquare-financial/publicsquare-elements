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
      const bankAccountElement = publicsquare.createBankAccountElement({})
      bankAccountElement.mount('#bankaccount-element')
      setBankAccountElement(bankAccountElement)
    }
  }, [publicsquare])

  function onSubmitBankAccountElement(e: FormEvent<HTMLFormElement>) {
    if (bankAccountElement) {
      onSubmit(e, bankAccountElement)
    }
  }

  function onSubmitBankAccountElements(e: FormEvent<HTMLFormElement>) {
    // if (
    //   cardNumberElement &&
    //   cardExpirationDateElement &&
    //   cardVerificationCodeElement
    // ) {
    //   onSubmit(e, {
    //     number: cardNumberElement!,
    //     expirationMonth: cardExpirationDateElement!.month(),
    //     expirationYear: cardExpirationDateElement!.year(),
    //     cvc: cardVerificationCodeElement!
    //   })
    // }
  }

  async function onSubmit(
    e: FormEvent<HTMLFormElement>,
    bankAccount: BankAccountCreateInput,
  ) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const formProps = Object.fromEntries(formData)
    if (loading) return
    if (formProps.account_number && bankAccount) {
      setLoading(true)
      try {
        const response = await publicsquare?.bankAccounts.create({
          account_number: formProps.account_number as string,
          routing_number: formProps.routing_number as string,
        })
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
      <h3 className="text-lg font-medium">All-in-one Bank Account Element</h3>
      <form onSubmit={onSubmitBankAccountElement} name="js-form-cardelement">
        <div className="w-full space-y-4">
          <NameInput />
          <div className="space-y-2">
            <label>BankAccount element</label>
            <div className="w-full max-w-md rounded-lg bg-white p-2 shadow">
              <div id="bankaccount-element" ref={bankAccountRef}></div>
            </div>
          </div>
          <div className="flex justify-end">
            <SubmitButton loading={loading} elementType="bankaccount" />
          </div>
        </div>
      </form>
      <h3 className="text-lg font-medium">Individual Elements</h3>
      <form onSubmit={onSubmitBankAccountElements} name="js-form-cardelements">
        <div className="w-full max-w-md space-y-4">
          <NameInput />
          <div className="space-y-2">
            <label>Bank Account routing number element</label>
            <div className="w-full max-w-md rounded-lg bg-white p-2 shadow">
              <div id="card-number-element"></div>
            </div>
          </div>
          <div className="space-y-2">
            <label>Bank Account account number element</label>
            <div className="w-full max-w-md rounded-lg bg-white p-2 shadow">
              <div id="card-number-element"></div>
            </div>
          </div>
          <div className="flex justify-end">
            <SubmitButton loading={loading} elementType="bankaccount" />
          </div>
        </div>
      </form>
      <PaymentMethodCaptureSuccess
        message={jsCardSuccessMessage}
        onClose={() => setJsCardSuccessMessage(undefined)}
      />
    </div>
  )
}