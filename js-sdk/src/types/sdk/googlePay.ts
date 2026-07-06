import { CardBillingDetails } from './cards'
import { Environment } from '@/types'

export interface GooglePayButtonWidgetOptions {
  id: string
  environment: 'TEST' | 'PRODUCTION'
  merchantId?: string
  merchantName: string
  allowedCardAuthMethods?: Array<'PAN_ONLY' | 'CRYPTOGRAM_3DS'>
  allowedCardNetworks?: Array<'AMEX' | 'DISCOVER' | 'INTERAC' | 'JCB' | 'MASTERCARD' | 'VISA'>
  buttonColor?: 'black' | 'white'
  buttonType?: 'book' | 'buy' | 'checkout' | 'donate' | 'order' | 'pay' | 'plain' | 'subscribe'
  locale?:
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
  onClick?: () => void
  onPaymentDataLoaded?: (paymentData: any) => void
}

export type GooglePayCreateInput = {
  google_payment_method_data?: GooglePaymentMethodData
  customer_id?: string
  billing_details?: CardBillingDetails
}

export type ValidatedGooglePayCreateInput = {
  validated: GooglePayCreateInput
}

export type ValidateGooglePayButtonWidgetOptions = {
  validated: GooglePayButtonWidgetOptions
}

export type GooglePaymentMethodData = {
  type: 'CARD';
  description: string;
  tokenizationData: PaymentMethodTokenizationData;
  info?: CardInfo;
};

export type PaymentMethodTokenizationData = {
  type: 'PAYMENT_GATEWAY' | 'DIRECT';
  token: string;
};

export type CardInfo = {
  cardNetwork: string;
  cardDetails: string;
  billingAddress?: GooglePayAddress;
  assuranceDetails?: GooglePayAssuranceDetails;
};

export type GooglePayAssuranceDetails = {
  accountVerified?: boolean;
  cardHolderAuthenticated?: boolean;
};

export type GooglePayAddress = {
  name: string;
  address1: string;
  address2?: string;
  address3?: string;
  locality: string;
  administrativeArea: string;
  countryCode: string;
  postalCode: string;
  sortingCode?: string;
  phoneNumber?: string;
};


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

export type GooglePayEnvironmentsConfiguration = {
  TEST: GooglePayConfiguration;
  PRODUCTION: GooglePayConfiguration;
}
