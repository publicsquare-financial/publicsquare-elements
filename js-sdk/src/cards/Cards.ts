import { CardsCreateInput } from '@/types/sdk/cards'
import { Credova } from '..'
import { API_ENDPOINTS } from '@/constants'
import { transformCreateCardInput } from '@/utils'
import { validateCreateInput } from '@/validators/cards'

export class CredovaCards {
  private _credova: Credova

  constructor(credovaPointer: Credova) {
    this._credova = credovaPointer
  }

  public async create(input: CardsCreateInput) {
    const validatedInput = validateCreateInput(input)
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
