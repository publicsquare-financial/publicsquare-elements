import {
  ApplePayCreateInput,
  ApplePayCreateResponse,
  ApplePayCreateSessionInput
} from '@/types'
import { PublicSquare } from '..'
import { ELEMENTS_PUBLICSQUARE_APPLE_PAY_NO_POINTER_MESSAGE } from '@/constants'
import {
  transformCreateApplePayInput,
  transformCreateApplePaySessionInput
} from '@/utils'
import {
  validateCreateApplePayInput,
  validateCreateApplePaySessionInput
} from '@/validators'

export class PublicSquareApplePay {
  private _publicSquare: PublicSquare

  constructor(publicSquarePointer: PublicSquare) {
    if (!publicSquarePointer) {
      throw Error(ELEMENTS_PUBLICSQUARE_APPLE_PAY_NO_POINTER_MESSAGE)
    }
    this._publicSquare = publicSquarePointer
  }

  public create(input: ApplePayCreateInput): Promise<ApplePayCreateResponse> {
    if (!this._publicSquare._apiKey) {
      throw new Error('apiKey must be sent at initialization')
    } else if (!this._publicSquare.bt || !this._publicSquare.bt.client) {
      throw new Error('PublicSquare JS has not be initialized yet')
    } else {
      const validatedInput = validateCreateApplePayInput(input)
      return fetch(this._publicSquare._applePayCreateUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': this._publicSquare._apiKey
        },
        body: JSON.stringify(transformCreateApplePayInput(validatedInput))
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

  public createSession(input: ApplePayCreateSessionInput): Promise<any> {
    if (!this._publicSquare._apiKey) {
      throw new Error('apiKey must be sent at initialization')
    } else if (!this._publicSquare.bt || !this._publicSquare.bt.client) {
      throw new Error('PublicSquare JS has not be initialized yet')
    } else {
      const validatedInput = validateCreateApplePaySessionInput(input)
      return fetch(this._publicSquare._applePayCreateSessionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': this._publicSquare._apiKey
        },
        body: JSON.stringify(
          transformCreateApplePaySessionInput(validatedInput)
        )
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
