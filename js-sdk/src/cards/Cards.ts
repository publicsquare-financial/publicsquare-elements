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
    }
    const validatedInput = validateCreateCardInput(input)
    return this._credova
      .bt!.client!.post(
        'https://api.basistheory.com/proxy',
        transformCreateCardInput(validatedInput),
        {
          headers: {
            'Content-Type': 'application/json',
            // 'BT-PROXY-URL': API_ENDPOINTS.COLLECT_CARD,
            'BT-PROXY-KEY': 'input_proxy_key_here',
            'X-Api-Key': this._credova._apiKey
          }
        }
      )
      .then((res) => res as CardCreateResponse)
  }
}
