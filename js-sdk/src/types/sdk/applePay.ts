import { CardBillingDetails } from './cards'
import { Environment } from './publicsquare'

export interface ApplePayButtonWidgetOptions {
  id?: string;
  buttonStyle?: 'black' | 'white' | 'white-outline';
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
    | 'top-up';
  locale?: string;
  style?: {
    width?: string;
    height?: string;
    borderRadius?: string;
    padding?: string;
  };
  disabled?: boolean;
  onClick?: () => void;
}

export type ApplePayCreateInput = {
  apple_payment_data?: ApplePaymentData
  customer_id?: string
  billing_details?: CardBillingDetails
}

export type ValidatedApplePayCreateInput = {
  validated: ApplePayCreateInput
}

export type ApplePayCreateSessionInput = {
  display_name?: string
  domain?: string
}

export type ValidatedApplePayCreateSessionInput = {
  validated: ApplePayCreateSessionInput
}

export type ApplePaymentData = {
  transactionIdentifier?: string
  paymentData?: ApplePayPaymentData
  paymentMethod?: ApplePayPaymentMethod
}

export type ApplePayPaymentData = {
  data?: string
  header?: ApplePayPaymentDataHeader
  signature?: string
  version?: string
}

export type ApplePayPaymentMethod = {
  displayName?: string
  network?: string
  type?: string
  billingContact?: ApplePayBillingContact
  paymentPass?: ApplePayPaymentPass
}

export type ApplePayPaymentDataHeader = {
  applicationData?: string
  ephemeralPublicKey?: string
  wrappedKey?: string
  publicKeyHash?: string
  transactionId?: string
}

export type ApplePayBillingContact = {
  phoneNumber?: string
  emailAddress?: string
  givenName?: string
  familyName?: string
  phoneticGivenName?: string
  phoneticFamilyName?: string
  addressLines?: string[]
  subLocality?: string
  locality?: string
  postalCode?: string
  subAdministrativeArea?: string
  administrativeArea?: string
  country?: string
  countryCode?: string
}

export type ApplePayPaymentPass = {
  primaryAccountIdentifier?: string
  primaryAccountNumberSuffix?: string
  deviceAccountIdentifier?: string
  deviceAccountNumberSuffix?: string
  activationState?: string
}

export type ApplePayCreateResponse = {
  id: string
  account_id: string
  environment: Environment
  customer_id?: string
  token_type: string
  exp_month: string
  exp_year: string
  last4: string
  brand: string
  billing_details?: CardBillingDetails
  expires_at?: string
  created_at: string
  modified_at: string
  error?: ApplePayCreateErrorResponse
}

export type ApplePayCreateErrorResponse = {
  error: string
}
