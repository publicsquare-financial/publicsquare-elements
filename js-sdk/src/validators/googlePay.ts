import {
  GooglePayButtonWidgetOptions,
  GooglePayCreateInput,
  ValidatedGooglePayCreateInput,
  ValidateGooglePayButtonWidgetOptions,
} from '@/types'

export function validateCreateGooglePayInput(
  input: GooglePayCreateInput
): ValidatedGooglePayCreateInput {
  if (typeof input.google_payment_method_token !== 'object') {
    throw new Error('google_payment_method_token is required')
  }
  if (!['string', 'undefined'].includes(typeof input.customer_id)) {
    throw new Error('customer_id must be a string if included')
  }
  if (!['object', 'undefined'].includes(typeof input.billing_details)) {
    throw new Error('billing_details must be an object if included')
  }
  return {
    validated: {
      google_payment_method_token: input.google_payment_method_token as any,
      customer_id: input.customer_id,
      billing_details: input.billing_details
    }
  }
}

export function validateGooglePayButtonWidgetOptions(
  input: GooglePayButtonWidgetOptions
): ValidateGooglePayButtonWidgetOptions {
  
  if (typeof input.id !== 'string') {
    throw new Error('id is required')
  }
  if (typeof input.environment !== 'string') {
    throw new Error('environment is required')
  }
  if (input.environment === 'PRODUCTION' && typeof input.merchantId !== 'string') {
    throw new Error('merchantId is required')
  }
  if (typeof input.merchantName !== 'string') {
    throw new Error('merchantName is required')
  }
  if (typeof input.transactionInfo !== 'object') {
    throw new Error('transactionInfo is required')
  }
  else {
    if (typeof input.transactionInfo.totalPriceStatus !== 'string') {
      throw new Error('transactionInfo.totalPriceStatus is required')
    }
    if (typeof input.transactionInfo.totalPrice !== 'string') {
      throw new Error('transactionInfo.totalPrice is required')
    }
    if (typeof input.transactionInfo.currencyCode !== 'string') {
      throw new Error('transactionInfo.currencyCode is required')
    }
    if (typeof input.transactionInfo.countryCode !== 'string') {
      throw new Error('transactionInfo.countryCode is required')
    }
  }
  if (typeof input.onPaymentDataLoaded !== 'function') {
    throw new Error('onPaymentDataLoaded is required')
  }

  return {
    validated: {
      id: input.id,
      environment: input.environment,
      merchantId: input.merchantId,
      merchantName: input.merchantName,
      locale: input.locale,
      transactionInfo: input.transactionInfo as any,
      onPaymentDataLoaded: input.onPaymentDataLoaded as any
    }
  }
}