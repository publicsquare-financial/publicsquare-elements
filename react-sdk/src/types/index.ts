import {
  ApplePayCreateResponse,
  ApplePayCreateErrorResponse,
  ApplePayCreateInput,
  ApplePayCreateSessionInput,
  ApplePaymentData,
  ApplePayPaymentData,
  ApplePayPaymentMethod,
  ApplePayPaymentDataHeader,
  ApplePayBillingContact,
  ApplePayPaymentPass,
  BankAccountAccountNumberElement,
  BankAccountCreateErrorResponse,
  BankAccountCreateResponse,
  BankAccountCreateInput,
  BankAccountElement,
  BankAccountHolderType,
  BankAccountRoutingNumberElement,
  BankAccountVerificationElement,
  BankAccountVerificationIdResponse,
  Card,
  CardBillingDetails,
  CardCreateErrorResponse,
  CardCreateInput,
  CardCreateResponse,
  CardElement,
  CardExpirationDateElement,
  CardNumberElement,
  CardVerificationCodeElement,
  CreateBankAccountAccountNumberElementOptions,
  CreateBankAccountElementOptions,
  CreateBankAccountRoutingNumberElementOptions,
  CreateBankAccountVerificationElementOptions,
  CreateCardExpirationDateElementOptions,
  CreateCardNumberElementOptions,
  CreateCardVerificationCodeElementOptions,
  CreateElementOptions,
  ElementType,
  PublicSquareInitOptions,
  ValidatedApplePayCreateInput,
  ValidatedApplePayCreateSessionInput,
  ValidatedCardCreateInput,
  ValidatedCardsCreateInput,
  CardsCreateInput,
  GooglePayCreateInput,
  ValidatedGooglePayCreateInput,
  GooglePayCreateResponse,
  GooglePayCreateErrorResponse,
  GooglePayIntermediateSigningKey,
  GooglePaymentMethodToken
} from '@publicsquare/elements-js/types'
import { PublicSquare } from '@publicsquare/elements-js'

export type PublicSquareProviderValue = {
  publicsquare?: PublicSquare
  createElement(
    type: ElementType,
    options: CreateElementOptions
  ): ReturnType<InstanceType<typeof PublicSquare>['createElement']>
}

export type PublicSquareProviderProps = {
  apiKey: string
  options?: PublicSquareInitOptions
}

export type ElementProps = {
  id: string
  type: ElementType
  options?: CreateElementOptions
}

export type CardElementProps = {
  id: string
}

export type CardNumberElementProps = {
  id: string
}

export type CardExpirationDateElementProps = {
  id: string
}

export type CardVerificationCodeElementProps = {
  id: string
}

export type BankAccountElementProps = {
  id: string
} & CreateBankAccountElementOptions

export type BankAccountVerificationElementProps = {
  id: string
  onVerificationComplete?: (result: BankAccountVerificationIdResponse) => void
} & CreateBankAccountVerificationElementOptions

export type BankAccountRoutingNumberElementProps = {
  id: string
} & CreateBankAccountRoutingNumberElementOptions

export type BankAccountAccountNumberElementProps = {
  id: string
} & CreateBankAccountAccountNumberElementOptions

export type ApplePayButtonElement = React.Ref<HTMLDivElement>

export type ApplePayButtonElementProps = {
  id: string
  buttonStyle?: 'black' | 'white' | 'white-outline'
  type?:
    | 'plain'
    | 'add-money'
    | 'book'
    | 'buy'
    | 'check-out'
    | 'continue'
    | 'contribute'
    | 'donate'
    | 'order'
    | 'pay'
    | 'reload'
    | 'rent'
    | 'set-up'
    | 'subscribe'
    | 'support'
    | 'tip'
    | 'top-up'
  locale?: string
  onClick?: () => void
  style?: {
    width?: string
    height?: string
    borderRadius?: string
    padding?: string
  }
  disabled?: boolean
}

export type GooglePayButtonElement = React.Ref<HTMLDivElement>

export type GooglePayButtonElementProps = {
  id?: string
  environment: 'TEST' | 'PRODUCTION'
  merchantId: string
  merchantName: string
  allowedCardAuthMethods?: Array<'PAN_ONLY' | 'CRYPTOGRAM_3DS'>
  allowedCardNetworks?: Array<'AMEX' | 'DISCOVER' | 'INTERAC' | 'JCB' | 'MASTERCARD' | 'VISA'>
  buttonColor?: 'black' | 'white'
  buttonType?: 'book' | 'buy' | 'checkout' | 'donate' | 'order' | 'pay' | 'plain' | 'subscribe'
  style?: {
    width?: string
    height?: string
    borderRadius?: number
    borderType?: 'default_border' | 'no_border'
  }
  locale:
        | 'en' | 'ar' | 'bg' | 'ca' | 'cs' | 'da' | 'de' | 'el' | 'es' | 'et' | 'fi' | 'fr' | 'hr' | 'id' | 'it' 
        | 'ja' | 'ko' | 'ms' | 'nl' | 'no' | 'pl' | 'pt' | 'ru' | 'sk' | 'sl' | 'sr' | 'sv' | 'th' | 'tr' | 'uk' | 'zh'
  transactionInfo: {
    totalPriceStatus: 'FINAL' | 'ESTIMATED';
    totalPrice: string;
    currencyCode: string;
    countryCode: string;
  },
  disabled?: boolean
  onPaymentDataLoaded?: (paymentData: any) => void
}

export {
  ApplePayCreateResponse,
  ApplePayCreateErrorResponse,
  ApplePayCreateInput,
  ApplePayCreateSessionInput,
  ApplePaymentData,
  ApplePayPaymentData,
  ApplePayPaymentMethod,
  ApplePayPaymentDataHeader,
  ApplePayBillingContact,
  ApplePayPaymentPass,
  CardElement,
  CreateBankAccountAccountNumberElementOptions,
  BankAccountAccountNumberElement,
  BankAccountElement,
  BankAccountVerificationElement,
  CreateBankAccountElementOptions,
  BankAccountRoutingNumberElement,
  CreateBankAccountRoutingNumberElementOptions,
  CardExpirationDateElement,
  CreateCardExpirationDateElementOptions,
  CardNumberElement,
  CreateCardNumberElementOptions,
  CardVerificationCodeElement,
  CreateCardVerificationCodeElementOptions,
  ElementType,
  CreateElementOptions,
  PublicSquareInitOptions,
  Card,
  CardCreateInput,
  CardsCreateInput,
  CardCreateResponse,
  CardBillingDetails,
  ValidatedApplePayCreateInput,
  ValidatedApplePayCreateSessionInput,
  ValidatedCardCreateInput,
  ValidatedCardsCreateInput,
  CardCreateErrorResponse,
  BankAccountCreateErrorResponse,
  BankAccountCreateResponse,
  BankAccountCreateInput,
  BankAccountHolderType,
  CreateBankAccountVerificationElementOptions,
  GooglePayCreateInput,
  ValidatedGooglePayCreateInput,
  GooglePayCreateResponse,
  GooglePayCreateErrorResponse,
  GooglePayIntermediateSigningKey,
  GooglePaymentMethodToken
}
