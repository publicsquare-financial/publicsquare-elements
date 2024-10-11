'use client'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { PublicSquare } from '@publicsquare/elements-js'
import SubmitButton from '@/components/SubmitButton'
import { PublicSquareInitOptions } from '@publicsquare/elements-js/dist/types/sdk'
import NameInput from '@/components/NameInput'
import CardCaptureSuccess from '@/components/Modals/CardCaptureSuccess'
import { CardsCreateInput } from '@publicsquare/elements-js/dist/types/sdk/cards'

export default function ACHElementsJs() {
  const [publicsquare, setPublicSquare] = useState<PublicSquare>()
  const achRef = useRef(null)
  const [achElement, setAchElement] = useState<any>()
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
      /**
       * Step 2: Initialize the elements you want to use
       */
      // The whole card
      const achElement = publicsquare.createACHElement({})
      achElement.mount('#ach-element')
      setAchElement(achElement)
    }
  }, [publicsquare])

  function onSubmitCardElement(e: FormEvent<HTMLFormElement>) {
    if (achElement) {
      onSubmit(e, achElement)
    }
  }

  function onSubmitCardElements(e: FormEvent<HTMLFormElement>) {
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
    card: CardsCreateInput['card']
  ) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const formProps = Object.fromEntries(formData)
    if (loading) return
    if (formProps.cardholder_name && card) {
      setLoading(true)
      try {
        const response = await publicsquare?.cards.create({
          cardholder_name: formProps.cardholder_name as string,
          card
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
      <h3 className="text-lg font-medium">All-in-one ACH Element</h3>
      <form onSubmit={onSubmitCardElement} name="js-form-cardelement">
        <div className="w-full space-y-4">
          <NameInput />
          <div className="space-y-2">
            <label>ACH element</label>
            <div className="w-full max-w-md rounded-lg bg-white p-2 shadow">
              <div id="ach-element" ref={achRef}></div>
            </div>
          </div>
          <div className="flex justify-end">
            <SubmitButton loading={loading} elementType="ach" />
          </div>
        </div>
      </form>
      <h3 className="text-lg font-medium">Individual Elements</h3>
      <form onSubmit={onSubmitCardElements} name="js-form-cardelements">
        <div className="w-full max-w-md space-y-4">
          <NameInput />
          <div className="space-y-2">
            <label>ACH routing number element</label>
            <div className="w-full max-w-md rounded-lg bg-white p-2 shadow">
              <div id="card-number-element"></div>
            </div>
          </div>
          <div className="space-y-2">
            <label>ACH account number element</label>
            <div className="w-full max-w-md rounded-lg bg-white p-2 shadow">
              <div id="card-number-element"></div>
            </div>
          </div>
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
