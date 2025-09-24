'use client'
import { useEffect, useRef, useState } from 'react'
import { PublicSquare } from '@publicsquare/elements-js'
import { PublicSquareInitOptions } from '@publicsquare/elements-js/types'
import CaptureModal from '../Modals/CaptureModal'
import { GooglePayButtonWidget } from '@publicsquare/elements-js/googlePay/GooglePayButtonWidget'

export default function GooglePayElementsJs() {
  const [publicsquare, setPublicSquare] = useState<PublicSquare>()
  const buttonContainerRef = useRef<HTMLDivElement>(null)
  const googlePayButtonRef = useRef<GooglePayButtonWidget>(null)
  const [message, setMessage] = useState<{
    message?: object
    error?: boolean
  }>()

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_PUBLICSQUARE_KEY!
    const options: PublicSquareInitOptions = {}

    new PublicSquare()
      .init(apiKey, options)
      .then((_publicsquare) => setPublicSquare(_publicsquare))
  }, [])

  useEffect(() => {
    if (publicsquare && buttonContainerRef.current) {
      googlePayButtonRef.current = publicsquare.googlePay.renderButton(buttonContainerRef.current!, {
        id: 'google-pay-btn',
        environment: 'TEST',
        merchantName: 'PSQ Merchant Test',
        allowedCardAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
        allowedCardNetworks: ['AMEX', 'DISCOVER', 'INTERAC', 'JCB', 'MASTERCARD', 'VISA'],
        buttonColor: 'black',
        buttonType: 'buy',
        locale: 'en',
        style: {
          width: '160px',
          height: '40px',
          borderRadius: 4,
          borderType: 'default_border'
        },
        transactionInfo: {
          totalPriceStatus: 'FINAL',
          totalPrice: '1.00',
          currencyCode: 'USD',
          countryCode: 'US'
        },
        onPaymentDataLoaded: async (paymentData) => {
          onPaymentAuthorized(paymentData)
        }
      })
    }
  }, [publicsquare])

  async function onPaymentAuthorized(event: any) {
    if (publicsquare && buttonContainerRef.current) {
      googlePayButtonRef.current?.setDisabled(true);

      try {
        const googlePay = await createGooglePay(event)
        if (googlePay) {
          setMessage({
              message: googlePay,
              error: !!googlePay.error
          })
        }
      } catch (e) {
          console.error(e)
      }

      googlePayButtonRef.current?.setDisabled(false);
    }
  }

  async function createGooglePay(event: any) {
    if (publicsquare) {
      try {
        const tokenObj = JSON.parse(event.paymentMethodData.tokenizationData.token)
        const response = await publicsquare.googlePay.create({
          google_payment_data: tokenObj
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
