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

  public async create(
    input: CardsCreateInput,
    proxyKey: string
  ): Promise<CardCreateResponse> {
    if (!this._credova._apiKey) {
      throw new Error('apiKey must be sent at initialization')
    } else if (!this._credova.bt || !this._credova.bt.client) {
      throw new Error('Credova JS has not be initialized yet')
    } else {
      const validatedInput = validateCreateCardInput(input)
      console.log('> proxy')
      const response = await this._credova.bt.client.post(
        'https://api.basistheory.com/proxy',
        transformCreateCardInput(validatedInput),
        {
          headers: {
            'Content-Type': 'application/json',
            // 'BT-PROXY-URL': API_ENDPOINTS.COLLECT_CARD,
            'BT-PROXY-KEY': proxyKey,
            'X-Api-Key': this._credova._apiKey
          }
        }
      )
      return response as CardCreateResponse
    }
  }
}
