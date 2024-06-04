import { CardsCreateInput } from '@/types/sdk/cards'
import { Credova } from '..'
import {
  API_ENDPOINTS,
  ELEMENTS_CREDOVA_CARDS_NO_POINTER_MESSAGE
} from '@/constants'
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

  public async create(input: CardsCreateInput) {
    const validatedInput = validateCreateCardInput(input)
    const result = await this._credova.bt?.client?.post(
      API_ENDPOINTS.COLLECT_CARD,
      transformCreateCardInput(validatedInput),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    return result
  }
}
