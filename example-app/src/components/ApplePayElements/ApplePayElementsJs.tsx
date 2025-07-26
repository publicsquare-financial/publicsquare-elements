'use client'
import { useEffect, useRef, useState } from 'react'
import { PublicSquare } from '@publicsquare/elements-js'
import { PublicSquareInitOptions } from '@publicsquare/elements-js/types'
import CaptureModal from '../Modals/CaptureModal'

declare global {
  var ApplePaySession: any
}

export default function ApplePayElementsJs() {
  const [publicsquare, setPublicSquare] = useState<PublicSquare>()
  const buttonContainerRef = useRef<HTMLDivElement>(null)
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

    new PublicSquare()
      .init(apiKey, options)
      .then((_publicsquare) => setPublicSquare(_publicsquare))
  }, [])

  useEffect(() => {
    if (publicsquare && buttonContainerRef.current) {
      publicsquare.applePay.renderButton(buttonContainerRef.current!, {
        id: 'apple-pay-btn',
        buttonStyle: 'black',
        type: 'buy',
        locale: 'en-US',
        disabled: loading,
        onClick: onSubmitApplePay
      })
    }
  }, [publicsquare])

  function onSubmitApplePay() {
    if (!ApplePaySession) {
      return
    }

    const session = createApplePaySession()

    session.onvalidatemerchant = async () => {
      const merchantSession = await validateMerchant()
      session.completeMerchantValidation(merchantSession)
    }

    session.onpaymentauthorized = async (event: any) => {
      if (publicsquare && buttonContainerRef.current) {
        setLoading(true)

        try {
          // decrypt and tokenize Apple Pay
          const applePay = await createApplePay(event)
          if (applePay) {
            setMessage({
              message: applePay,
              error: !!applePay.error
            })
          }

          // present green check to the user before the timeout (30 seconds)
          session.completePayment(ApplePaySession.STATUS_SUCCESS)
        } catch (e) {
          console.error(e)
          session.completePayment(ApplePaySession.STATUS_FAILURE)
        }

        setLoading(false)
      }
    }

    session.begin()
  }

  function createApplePaySession() {
    return new ApplePaySession(3, {
      countryCode: 'US',
      currencyCode: 'USD',
      merchantCapabilities: ['supports3DS'],
      supportedNetworks: ['visa', 'masterCard', 'amex', 'discover'],
      total: {
        label: 'Demo (Card is not charged)',
        type: 'final',
        amount: '1.99'
      }
    })
  }

  async function validateMerchant() {
    try {
      const session = await publicsquare?.applePay.createSession({
        display_name: 'PublicSquare Payments Demo',
        domain: window.location.host
      })

      console.log(session)
      return session
    } catch (error) {
      console.error('Error validating merchant:', error)
      throw error
    }
  }

  async function createApplePay(event: any) {
    if (publicsquare) {
      try {
        console.log('Apple Pay token', event.payment.token)

        const response = await publicsquare.applePay.create({
          apple_payment_data: event.payment.token
        })
        if (response) {
          return response
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      <div ref={buttonContainerRef}></div>
      <CaptureModal
        message={message?.message}
        onClose={() => setMessage(undefined)}
        error={message?.error}
      />
    </>
  )
}
