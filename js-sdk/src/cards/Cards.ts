import { CardCreateResponse, CardsCreateInput } from '@/types/sdk/cards'
import { Credova } from '..'
import { ELEMENTS_CREDOVA_CARDS_NO_POINTER_MESSAGE } from '@/constants'
import { transformCreateCardInput } from '@/utils'
import { validateCreateCardInput } from '@/validators'

export class CredovaCards {
  private _credova: Credova

  constructor(credovaPointer: Credova) {
    if (!credovaPointer) {
      throw Error(ELEMENTS_CREDOVA_CARDS_NO_POINTER_MESSAGE)
    }
    this._credova = credovaPointer
  }

  public create(input: CardsCreateInput): Promise<CardCreateResponse> {
    if (!this._credova._apiKey) {
      throw new Error('apiKey must be sent at initialization')
    } else if (!this._credova.bt || !this._credova.bt.client) {
      throw new Error('Credova JS has not be initialized yet')
    } else {
      const validatedInput = validateCreateCardInput(input)
      return this._credova.bt.client
        .post(
          'https://api.basistheory.com/proxy',
          transformCreateCardInput(validatedInput),
          {
            headers: {
              'Content-Type': 'application/json',
              'X-API-KEY': this._credova._apiKey,
              'BT-PROXY-KEY': this._credova._proxyKey,
            }
          }
        )
        .then((res) => res as CardCreateResponse)
    }
  }
}
