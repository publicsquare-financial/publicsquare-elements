import {
  ELEMENTS_NOM_DOM_ERROR_MESSAGE,
  ELEMENTS_PUBLICSQUARE_ACH_NO_POINTER_MESSAGE,
  ELEMENTS_SCRIPT_UNKNOWN_ERROR_MESSAGE
} from '@/constants'
import { Credova } from '..'
import { CreateElementOptions } from '@/types/sdk'

export default class PublicSquareACH {
  private _publicSquare: Credova

  constructor(psqPointer: Credova) {
    if (!psqPointer) {
      throw Error(ELEMENTS_PUBLICSQUARE_ACH_NO_POINTER_MESSAGE)
    }
    this._publicSquare = psqPointer
  }

  public createElement(options: CreateElementOptions): any {
    if (typeof window === 'undefined') {
      throw Error(ELEMENTS_NOM_DOM_ERROR_MESSAGE)
    }
    const container = document.createElement('div')
    container.id = 'psq-ach-container'
    const routingNumber = this._publicSquare.bt?.createElement('text', {
      targetId: container.id,
      placeholder: 'Enter bank routing #...'
    })
    const accountNumber = this._publicSquare.bt?.createElement('text', {
      targetId: container.id,
      placeholder: 'Enter bank account #...'
    })

    return {
      ...container,
      mount: (id: string) => {
        if (!routingNumber || !accountNumber) {
          throw new Error(ELEMENTS_SCRIPT_UNKNOWN_ERROR_MESSAGE)
        } else {
          routingNumber.mount(container.id)
          this._publicSquare._elements.push(routingNumber)

          accountNumber.mount(container.id)
          this._publicSquare._elements.push(accountNumber)
        }
        return this
      }
    }
  }
}
