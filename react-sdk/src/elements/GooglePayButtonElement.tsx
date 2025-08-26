import React, { RefObject, useEffect, useRef } from 'react'
import * as Types from '../types'
import { PublicSquare } from '@publicsquare/elements-js/PublicSquare'
import { PublicSquareInitOptions } from '../types'
import { GooglePayConfiguration } from '@publicsquare/elements-js/types'

const GooglePayButtonElement: React.FC<Types.GooglePayButtonElementProps> = ({
  id,
  environment = 'TEST',
  merchantId = '12345678901234567890',
  merchantName = 'Example Merchant',
  allowedCardAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
  buttonColor = 'black',
  buttonType = 'buy',
  locale = 'en',
  style = { width: '160px', height: '40px', borderRadius: 4, borderType: 'default_border' },
  transactionInfo = {
    totalPriceStatus: 'FINAL',
    totalPrice: '0.00',
    currencyCode: 'USD',
    countryCode: 'US'
  },
  disabled = false,
  onPaymentDataLoaded
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  let publicSquare = new PublicSquare()
  
  useEffect(() => {
    let paymentsClient: any
    
    const baseRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
    }
    const allowedCardNetworks = ['AMEX', 'DISCOVER', 'INTERAC', 'JCB', 'MASTERCARD', 'VISA']
    const baseCardPaymentMethod = {
      type: 'CARD',
      parameters: {
        allowedAuthMethods: allowedCardAuthMethods,
        allowedCardNetworks: allowedCardNetworks,
      },
    }

    async function setupGooglePayConfiguration():Promise<GooglePayConfiguration> {
      const apiKey = process.env.NEXT_PUBLIC_PUBLICSQUARE_KEY!
      const options: PublicSquareInitOptions = {}
      await publicSquare.init(apiKey, options)
      try {
        const config = await publicSquare.googlePay.getGooglePayConfiguration()
        return config
      } catch (error) {
        console.error('Error fetching Google Pay configuration:', error)
        throw error
      }
    }

    async function onGooglePayLoaded() {
      paymentsClient = new (window as any).google.payments.api.PaymentsClient({
        environment: environment,
      })
      const isReadyToPayRequest = Object.assign({}, baseRequest, {
        allowedPaymentMethods: [baseCardPaymentMethod],
      })
      try {
        const response = await paymentsClient.isReadyToPay(isReadyToPayRequest)
        if (response.result) {
          createAndAddButton()
        } else {
          console.error('Google Pay is not available.')
        }
      } catch (error) {
        console.error('Error checking readiness:', error)
      }
    }

    function createAndAddButton() {
      if (!paymentsClient || !containerRef.current) return
      const button = paymentsClient.createButton({
        buttonColor: buttonColor,
        buttonType: buttonType,
        buttonRadius: style.borderRadius,
        buttonBorderType: style.borderType,
        locale: locale,
        buttonSizeMode: 'fill',
        onClick: onGooglePaymentButtonClicked,
        allowedPaymentMethods: [baseCardPaymentMethod],
      })
      containerRef.current.innerHTML = ''
      containerRef.current.appendChild(button)
    }

    async function onGooglePaymentButtonClicked() {
      const googlePayconfiguration = await setupGooglePayConfiguration()
      const tokenizationSpecification = {
        type: 'PAYMENT_GATEWAY',
        parameters: {
          gateway: googlePayconfiguration.gateway,
          gatewayMerchantId: googlePayconfiguration.gatewayMerchantId
        },
      }

      const paymentDataRequest = Object.assign({}, baseRequest, {
        allowedPaymentMethods: [
          Object.assign({}, baseCardPaymentMethod, {
            tokenizationSpecification: tokenizationSpecification,
          }),
        ],
        transactionInfo: {
          totalPriceStatus: transactionInfo.totalPriceStatus,
          totalPrice: transactionInfo.totalPrice,
          currencyCode: transactionInfo.currencyCode,
          countryCode: transactionInfo.countryCode,
        },
        merchantInfo: {
          merchantId: merchantId,
          merchantName: merchantName,
        },
      })

      try {
        const paymentData = await paymentsClient.loadPaymentData(paymentDataRequest)
        if (onPaymentDataLoaded) {
          onPaymentDataLoaded(paymentData)
        }
      } catch (error) {
        console.error('Error loading payment data:', error)
      }
    }

    // Load Google Pay script
    const script = document.createElement('script')
    script.src = 'https://pay.google.com/gp/p/js/pay.js'
    script.async = true
    script.onload = onGooglePayLoaded
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
      if (containerRef.current) containerRef.current.innerHTML = ''
    }
  }, [])

  const updateButtonStyle = (
    button?: Element | null,
    disabled?: boolean
  ): void => {
    const cursor = disabled === true ? 'not-allowed' : 'pointer'
    const opacity = disabled === true ? '0.5' : '1'
    button?.setAttribute('style', `cursor: ${cursor}; opacity: ${opacity};`)
    if (disabled) {
      button?.setAttribute('disabled', 'true')
    } else {
      button?.removeAttribute('disabled')
    }
  }

  useEffect(() => {
    if (containerRef.current) {
      const button = containerRef.current.querySelector('div > div > button')
      updateButtonStyle(button, disabled)
    }
  }, [disabled, containerRef.current])

  return (
    <div ref={containerRef} id="container" style={{ width: style.width, height: style.height }}></div>
  )
}
 
 export default GooglePayButtonElement