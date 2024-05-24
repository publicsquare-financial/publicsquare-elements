import { BasisTheory } from '@basis-theory/basis-theory-js'
import {
  BasisTheoryElementsInternal,
  CreateCardElementOptions,
  ElementType,
} from '@basis-theory/basis-theory-js/types/elements'
import { PSQPayInitOptions } from './types/sdk'
import { ELEMENTS_INIT_ERROR_MESSAGE } from './constants'

export class PSQPay {
  private _bt?: any

  private _elements?: BasisTheoryElementsInternal

  public async init(apiKey: string, options: PSQPayInitOptions) {
    this._bt = await new BasisTheory().init(
      (Math.random() + 1).toString(36).substring(7),
      { elements: true }
    )
    return this
  }

  public createElement(type: ElementType, options: CreateCardElementOptions) {
    if (!this._bt) {
      throw new Error(ELEMENTS_INIT_ERROR_MESSAGE)
    }
    return this._bt.createElement(type as never, options)
  }
}
