import { PublicSquareInitOptions } from '@publicsquare/elements-js/types';

type EnvironmentOptions = {
  card: Pick<PublicSquareInitOptions, 'cardCreateUrl' | 'proxyKey'>;
  bankAccount: Pick<PublicSquareInitOptions, 'bankAccountCreateUrl'>;
  bankVerification: Pick<PublicSquareInitOptions, 'bankAccountCreateUrl' | 'bankAccountVerificationUrl'>;
  applePay: Pick<PublicSquareInitOptions, 'applePayCreateSessionUrl' | 'applePayCreateUrl'>;
  googlePay: Pick<PublicSquareInitOptions, 'googlePayCreateUrl' | 'getGooglePayConfiguration'>;
  apiKey: string;
};

const staging: EnvironmentOptions = {
  apiKey: process.env.NEXT_PUBLIC_PUBLICSQUARE_KEY!,
  card: {
    cardCreateUrl: 'https://api.test.basistheory.com/proxy',
    proxyKey: 'key_test_us_proxy_FrL4kJFRXU1AwuYVnMbTnP',
  },
  bankAccount: {
    bankAccountCreateUrl: 'https://staging.api.publicsquare.com/payment-methods/bank-accounts',
  },
  bankVerification: {
    bankAccountCreateUrl: 'https://staging.api.publicsquare.com/payment-methods/bank-accounts',
    bankAccountVerificationUrl: 'https://staging.api.publicsquare.com/payment-methods/bank-accounts/verification',
  },
  applePay: {
    applePayCreateSessionUrl: 'https://staging.api.publicsquare.com/payment-methods/apple-pay/session',
    applePayCreateUrl: 'https://staging.api.publicsquare.com/payment-methods/apple-pay',
  },
  googlePay: {
    googlePayCreateUrl: 'https://staging.api.publicsquare.com/payment-methods/google-pay',
    getGooglePayConfiguration: 'https://staging.api.publicsquare.com/.well-known/google-pay-configuration',
  },
};

const production: EnvironmentOptions = {
  apiKey: process.env.NEXT_PUBLIC_PUBLICSQUARE_KEY!,
  card: {
    cardCreateUrl: 'https://api.basistheory.com/proxy',
    proxyKey: 'key_prod_us_proxy_HiFqDwW49EZ8szKi8cMvQP',
  },
  bankAccount: {
    bankAccountCreateUrl: 'https://api.publicsquare.com/payment-methods/bank-accounts',
  },
  bankVerification: {
    bankAccountCreateUrl: 'https://api.publicsquare.com/payment-methods/bank-accounts',
    bankAccountVerificationUrl: 'https://api.publicsquare.com/payment-methods/bank-accounts/verification',
  },
  applePay: {
    applePayCreateSessionUrl: 'https://api.publicsquare.com/payment-methods/apple-pay/session',
    applePayCreateUrl: 'https://api.publicsquare.com/payment-methods/apple-pay',
  },
  googlePay: {
    googlePayCreateUrl: 'https://api.publicsquare.com/payment-methods/google-pay',
    getGooglePayConfiguration: 'https://api.publicsquare.com/.well-known/google-pay-configuration',
  },
};

// Switch between 'staging' and 'production' here to change all payment method URLs at once
//NEXT_PUBLIC_PUBLICSQUARE_KEY - change for staging or production value in the .env
export const environment = production;
