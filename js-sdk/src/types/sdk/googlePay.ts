import { CardBillingDetails } from './cards'
import { Environment } from './publicsquare'

export interface GooglePayButtonWidgetOptions {
  id: string
  environment: 'TEST' | 'PRODUCTION'
  merchantId: string
  merchantName: string
  allowedCardAuthMethods?: Array<'PAN_ONLY' | 'CRYPTOGRAM_3DS'>
  allowedCardNetworks?: Array<'AMEX' | 'DISCOVER' | 'INTERAC' | 'JCB' | 'MASTERCARD' | 'VISA'>
  buttonColor?: 'black' | 'white'
  buttonType?: 'book' | 'buy' | 'checkout' | 'donate' | 'order' | 'pay' | 'plain' | 'subscribe'
  locale:
        | 'en' | 'ar' | 'bg' | 'ca' | 'cs' | 'da' | 'de' | 'el' | 'es' | 'et' | 'fi' | 'fr' | 'hr' | 'id' | 'it' 
        | 'ja' | 'ko' | 'ms' | 'nl' | 'no' | 'pl' | 'pt' | 'ru' | 'sk' | 'sl' | 'sr' | 'sv' | 'th' | 'tr' | 'uk' | 'zh'
  style?: {
    width?: string
    height?: string
    borderRadius?: number
    borderType?: 'default_border' | 'no_border'
  }
  transactionInfo: {
    totalPriceStatus: 'FINAL' | 'ESTIMATED';
    totalPrice: string;
    currencyCode: string;
    countryCode: string;
  },
  disabled?: boolean
  onPaymentDataLoaded?: (paymentData: any) => void
}

export type GooglePayCreateInput = {
  google_payment_method_token?: GooglePaymentMethodToken
  customer_id?: string
  billing_details?: CardBillingDetails
}

export type ValidatedGooglePayCreateInput = {
  validated: GooglePayCreateInput
}

export type ValidateGooglePayButtonWidgetOptions = {
  validated: GooglePayButtonWidgetOptions
}

export type GooglePayIntermediateSigningKey = {
  signedKey?: string
  signatures?: string[]
}

export type GooglePaymentMethodToken = {
  protocolVersion?: string
  signature?: string
  intermediateSigningKey?: GooglePayIntermediateSigningKey
  signedMessage?: string
}

export type GooglePayCreateResponse = {
  id: string
  account_id: string
  environment: Environment
  customer_id?: string
  token_type: string
  last4: string
  exp_month: string
  exp_year: string
  fingerprint: string
  brand: string
  avs_code: string
  cvv2_reply: string
  billing_details?: CardBillingDetails
  expires_at?: string
  created_at: string
  modified_at: string
  error?: GooglePayCreateErrorResponse
}

export type GooglePayCreateErrorResponse = {
  error: string
}

export type GooglePayConfiguration = {
  gateway: string
  gatewayMerchantId: string
}