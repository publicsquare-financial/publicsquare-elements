'use client'
import { useState } from 'react'
import {
  PublicSquareProvider,
  usePublicSquare
} from '@publicsquare/elements-react'
import ApplePayButtonElement from '@publicsquare/elements-react/elements/ApplePayButtonElement'
import CaptureModal from '../Modals/CaptureModal'

declare global {
  interface Window {
    ApplePaySession: any
  }
}

export default function ApplePayElementsReact() {
  const apiKey = process.env.NEXT_PUBLIC_PUBLICSQUARE_KEY!

  return (
    <PublicSquareProvider apiKey={apiKey}>
      <Elements />
    </PublicSquareProvider>
  )
}

function Elements() {
  const { publicsquare } = usePublicSquare()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{
    message?: object
    error?: boolean
  }>()

  async function onSubmitApplePay() {
    if (!window.ApplePaySession) {
      return
    }

    const session = createApplePaySession()

    session.onvalidatemerchant = async () => {
      const merchantSession = await validateMerchant()
      session.completeMerchantValidation(merchantSession)
    }

    session.onpaymentauthorized = async (event: any) => {
      if (publicsquare) {
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
          session.completePayment(window.ApplePaySession.STATUS_SUCCESS)
        } catch (e) {
          console.error(e)
          session.completePayment(window.ApplePaySession.STATUS_FAILURE)
        }

        setLoading(false)
      }
    }

    session.begin()
  }

  function createApplePaySession() {
    return new window.ApplePaySession(3, {
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
      return await publicsquare?.applePay.createSession({
        display_name: 'PublicSquare Payments Demo',
        domain: window.location.host
      })
    } catch (error) {
      console.error('Error validating merchant:', error)
      throw error
    }
  }

  async function createApplePay(event: any) {
    if (publicsquare) {
      try {
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
      <ApplePayButtonElement
        id="apple-pay-element"
        disabled={loading}
        onClick={onSubmitApplePay}
      />
      <CaptureModal
        message={message?.message}
        onClose={() => setMessage(undefined)}
        error={message?.error}
      />
    </>
  )
}
