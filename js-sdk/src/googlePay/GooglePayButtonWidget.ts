import { PublicSquare } from '@/PublicSquare';
import type { GooglePayButtonWidgetOptions, GooglePayConfiguration, PublicSquareInitOptions } from '@/types'

export class GooglePayButtonWidget {
  private options: Required<GooglePayButtonWidgetOptions>;
  private containerRef: HTMLElement | null;
  private paymentsClient: any;
  private publicSquare = new PublicSquare();
  private baseRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
  };

  constructor(options: GooglePayButtonWidgetOptions = {}) {
    this.options = {
      id: options.id || 'google-pay-btn',
      environment: options.environment || 'TEST',
      merchantId: options.merchantId || '12345678901234567890',
      merchantName: options.merchantName || 'Example Merchant',
      allowedCardAuthMethods: options.allowedCardAuthMethods || ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
      buttonColor: options.buttonColor || 'black',
      buttonType: options.buttonType || 'buy',
      locale: options.locale || 'en',
      style: options.style || { width: '160px', height: '40px', borderRadius: 4, borderType: 'default_border' },
      transactionInfo: options.transactionInfo || {
        totalPriceStatus: 'FINAL',
        totalPrice: '0.00',
        currencyCode: 'USD',
        countryCode: 'US',
      },
      disabled: options.disabled ?? false,
      onPaymentDataLoaded: options.onPaymentDataLoaded || (() => {}),
    };
    this.containerRef = null;
  }

  createGooglePayButton(): Promise<void> {
    return new Promise((resolve, reject) => {
      const scriptId = 'google-pay-sdk-script';
      const src = 'https://pay.google.com/gp/p/js/pay.js';
      if (document.getElementById(scriptId)) return resolve();
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  render(container: HTMLElement): Promise<void> {
    return this.createGooglePayButton().then(async () => {
      const allowedCardNetworks = ['AMEX', 'DISCOVER', 'INTERAC', 'JCB', 'MASTERCARD', 'VISA'];
      const baseCardPaymentMethod = {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: this.options.allowedCardAuthMethods,
          allowedCardNetworks: allowedCardNetworks,
        },
      };

      if (container && this.options.style) {
        if (this.options.style.width) container.style.width = this.options.style.width;
        if (this.options.style.height) container.style.height = this.options.style.height;
      }

      this.paymentsClient = new (window as any).google.payments.api.PaymentsClient({
        environment: this.options.environment,
      });

      const isReadyToPayRequest = Object.assign({}, this.baseRequest, {
        allowedPaymentMethods: [baseCardPaymentMethod],
      });

      try {
        const response = await this.paymentsClient.isReadyToPay(isReadyToPayRequest);

        if (response.result) {
          if (this.paymentsClient) {
            const btn = this.paymentsClient.createButton({
              buttonColor: this.options.buttonColor,
              buttonType: this.options.buttonType,
              buttonRadius: this.options.style.borderRadius,
              buttonBorderType: this.options.style.borderType,
              locale: this.options.locale,
              buttonSizeMode: 'fill',
              onClick: () => this.onGooglePaymentButtonClicked(baseCardPaymentMethod),
              allowedPaymentMethods: [baseCardPaymentMethod],
            });
            this.containerRef = btn;
            container.appendChild(btn);
            this.updateButtonStyle(btn, this.options.disabled);
          }
        } else {
          console.error('Google Pay is not available.');
        }
      } catch (error) {
        console.error('Error checking readiness:', error);
      }
    });
  }

  async setupGooglePayConfiguration():Promise<GooglePayConfiguration> {
    const apiKey = process.env.NEXT_PUBLIC_PUBLICSQUARE_KEY!;
    const options: PublicSquareInitOptions = {};
    await this.publicSquare.init(apiKey, options);
    try {
      const config = await this.publicSquare.googlePay.getGooglePayConfiguration();
      return config;
    } catch (error) {
      console.error('Error fetching Google Pay configuration:', error);
      throw error;
    }
  }

  async onGooglePaymentButtonClicked(baseCardPaymentMethod: any) {
    const googlePayconfiguration = await this.setupGooglePayConfiguration();
    const tokenizationSpecification = {
        type: 'PAYMENT_GATEWAY',
        parameters: {
          gateway: googlePayconfiguration.gateway,
          gatewayMerchantId: googlePayconfiguration.gatewayMerchantId,
        },
      };
    const paymentDataRequest = Object.assign({}, this.baseRequest, {
      allowedPaymentMethods: [
        Object.assign({}, baseCardPaymentMethod, {
          tokenizationSpecification: tokenizationSpecification,
        }),
      ],
      transactionInfo: {
        totalPriceStatus: this.options.transactionInfo.totalPriceStatus,
        totalPrice: this.options.transactionInfo.totalPrice,
        currencyCode: this.options.transactionInfo.currencyCode,
        countryCode: this.options.transactionInfo.countryCode,
      },
      merchantInfo: {
        merchantId: this.options.merchantId,
        merchantName: this.options.merchantName,
      },
    });

    try {
      const paymentData = await this.paymentsClient.loadPaymentData(paymentDataRequest);
      if (this.options.onPaymentDataLoaded) {
        this.options.onPaymentDataLoaded(paymentData);
      }
    } catch (error) {
      console.error('Error loading payment data:', error);
    }
  }

  updateButtonStyle(
    button?: Element | null,
    disabled?: boolean
  ): void {
    const cursor = disabled === true ? 'not-allowed' : 'pointer'
    const opacity = disabled === true ? '0.5' : '1'
    button?.setAttribute('style', `cursor: ${cursor}; opacity: ${opacity};`)
    if (disabled) {
      button?.setAttribute('disabled', 'true');
    } else {
      button?.removeAttribute('disabled');
    }
  }

  setDisabled(disabled: boolean): void {
    this.options.disabled = disabled;
    if (this.containerRef) {
      const button = this.containerRef.querySelector('div > div > button')
      this.updateButtonStyle(button, disabled);
    }
  }

}
