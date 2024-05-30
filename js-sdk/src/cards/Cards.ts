import { CardsCreateInput } from '@/types/sdk/cards'
import { Credova } from '..'
import { API_ENDPOINTS } from '@/constants'

export class CredovaCards {
  private _credova: Credova

  constructor(credovaPointer: Credova) {
    this._credova = credovaPointer
  }

  public async create(input: CardsCreateInput) {
    const result = await this._credova.bt?.client?.post(
      API_ENDPOINTS.COLLECT_CARD,
      input,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    return result
  }
}
