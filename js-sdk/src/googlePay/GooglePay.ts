import {
  GooglePayButtonWidgetOptions,
  GooglePayConfiguration,
  GooglePayCreateInput,
  GooglePayCreateResponse
} from '@/types'
import { PublicSquare } from '..'
import { ELEMENTS_PUBLICSQUARE_NO_POINTER_MESSAGE } from '@/constants'
import {
  transformCreateGooglePayInput
} from '@/utils'
import {
  validateCreateGooglePayInput
} from '@/validators'
import { GooglePayButtonWidget } from './GooglePayButtonWidget'

export class PublicSquareGooglePay {
  private _publicSquare: PublicSquare

  constructor(publicSquarePointer: PublicSquare) {
    if (!publicSquarePointer) {
      throw Error(ELEMENTS_PUBLICSQUARE_NO_POINTER_MESSAGE)
    }
    this._publicSquare = publicSquarePointer
  }

  public renderButton(container: HTMLElement, options: GooglePayButtonWidgetOptions) {
    const widget = new GooglePayButtonWidget({
      ...options,
      onPaymentDataLoaded: (paymentData) => {
        if (typeof options.onPaymentDataLoaded === 'function') {
          options.onPaymentDataLoaded(paymentData)
        }
      }
    })
    widget.render(container)
    return widget
  }

  public getGooglePayConfiguration(): Promise<GooglePayConfiguration> {
    return fetch(this._publicSquare._getGooglePayConfiguration, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => res.json())
    .then((res) =>
      res.errors
        ? {
            error: res
          }
        : res
    )
  }

  public create(input: GooglePayCreateInput): Promise<GooglePayCreateResponse> {
    if (!this._publicSquare._apiKey) {
      throw new Error('apiKey must be sent at initialization')
    } else if (!this._publicSquare.bt || !this._publicSquare.bt.client) {
      throw new Error('PublicSquare JS has not be initialized yet')
    } else {
      const validatedInput = validateCreateGooglePayInput(input)
      return fetch(this._publicSquare._googlePayCreateUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': this._publicSquare._apiKey
        },
        body: JSON.stringify(transformCreateGooglePayInput(validatedInput))
      })
      .then((res) => res.json())
      .then((res) =>
        res.errors
          ? {
              error: res
            }
          : res
      )
    }
  }

}
