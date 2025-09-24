'use client'
import { useEffect, useRef, useState } from 'react'
import {
  PublicSquareProvider,
  usePublicSquare
} from '@publicsquare/elements-react'
import { PublicSquareInitOptions } from '@publicsquare/elements-js/types'
import GooglePayButtonElement from '@publicsquare/elements-react/elements/GooglePayButtonElement'
import CaptureModal from '../Modals/CaptureModal'

export default function GooglePayElementsReact() {
  const apiKey = process.env.NEXT_PUBLIC_PUBLICSQUARE_KEY!
  const options: PublicSquareInitOptions = {}
  
  return (
    <PublicSquareProvider apiKey={apiKey} options={options}>
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

  const publicsquareRef = useRef(publicsquare);
  useEffect(() => {
    publicsquareRef.current = publicsquare;
  }, [publicsquare]);

  async function createGooglePay(event: any) {
    const psq = publicsquareRef.current;
    if (psq) {
      try {
        const tokenObj = JSON.parse(event.paymentMethodData.tokenizationData.token)
        const response = await psq.googlePay.create({
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

  async function onPaymentAuthorized(event: any) {
    setLoading(true)
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
    setLoading(false)
  }

  return (
    <>
      <GooglePayButtonElement
        id="google-pay-element"
        environment="TEST"
        merchantName="PSQ Merchant Test"
        allowedCardAuthMethods={['PAN_ONLY', 'CRYPTOGRAM_3DS']}
        allowedCardNetworks={['AMEX', 'DISCOVER', 'INTERAC', 'JCB', 'MASTERCARD', 'VISA']}
        buttonColor='black'
        buttonType='buy'
        locale='en'
        style={{
          width: '160px',
          height: '40px',
          borderRadius: 4,
          borderType: 'default_border'
        }}
        transactionInfo={{
          totalPriceStatus: 'FINAL',
          totalPrice: '1.00',
          currencyCode: 'USD',
          countryCode: 'US'
        }}
        disabled={loading}
        onPaymentDataLoaded={async (paymentData: any) => {
          onPaymentAuthorized(paymentData)
        }}
      />
      <CaptureModal
        message={message?.message}
        onClose={() => setMessage(undefined)}
        error={message?.error}
      />
    </>
  )
}
