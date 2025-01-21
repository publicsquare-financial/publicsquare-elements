import { CardCreateResponse, CardsCreateInput } from '@/types/sdk/cards'
import { PublicSquare } from '..'
import { ELEMENTS_CARDS_NO_POINTER_MESSAGE } from '@/constants'
import { transformCreateCardInput } from '@/utils'
import { validateCreateCardInput } from '@/validators'

export class PublicSquareCards {
  private _publicSquare: PublicSquare

  constructor(publicSquarePointer: PublicSquare) {
    if (!publicSquarePointer) {
      throw Error(ELEMENTS_CARDS_NO_POINTER_MESSAGE)
    }
    this._publicSquare = publicSquarePointer
  }

  public create(input: CardsCreateInput): Promise<CardCreateResponse> {
    if (!this._publicSquare._apiKey) {
      throw new Error('apiKey must be sent at initialization')
    } else if (!this._publicSquare.bt || !this._publicSquare.bt.client) {
      throw new Error('PublicSquare JS has not be initialized yet')
    } else {
      const validatedInput = validateCreateCardInput(input)
      return this._publicSquare.bt.client
        .post(
          'https://api.basistheory.com/proxy',
          transformCreateCardInput(validatedInput),
          {
            headers: {
              'Content-Type': 'application/json',
              'X-API-KEY': this._publicSquare._apiKey,
              'BT-PROXY-KEY': this._publicSquare._proxyKey
            }
          }
        )
        .then((res: any) =>
          res.error
            ? {
                error: res.error
              }
            : res
        )
    }
  }
}
