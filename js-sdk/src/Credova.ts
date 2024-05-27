import { BasisTheory } from '@basis-theory/basis-theory-js'
import {
  ElementType,
  CreateCardElementOptions,
  ElementTypeEnum,
  CredovaInitOptions
} from './types/sdk'
import { ELEMENTS_INIT_ERROR_MESSAGE } from './constants'
import {
  CreateCardExpirationDateElementOptions,
  CreateCardNumberElementOptions,
  CreateCardVerificationCodeElementOptions
} from '@basis-theory/basis-theory-js/types/elements'

export class Credova {
  private _bt?: any

  /**
   * Initialize the Credova sdk. (REQUIRED before calling `createElement`)
   * @param apiKey your Credova public key
   * @param options CredovaInitOptions see [docs](https://docs.credova.com)
   * @returns class Credova
   */
  public async init(apiKey: string, options: CredovaInitOptions) {
    this._bt = await new BasisTheory().init(
      (Math.random() + 1).toString(36).substring(7),
      { elements: true }
    )
    return this
  }

  private _createElement(
    type: ElementTypeEnum,
    options:
      | CreateCardElementOptions
      | CreateCardNumberElementOptions
      | CreateCardExpirationDateElementOptions
      | CreateCardVerificationCodeElementOptions
  ) {
    if (!this._bt) {
      throw new Error(ELEMENTS_INIT_ERROR_MESSAGE)
    }
    return this._bt.createElement(type, options)
  }

  /**
   * Initialize a Credova element.
   * @param type 'card' | 'cardExpirationDate' | 'cardNumber' | 'cardVerificationCode'
   * @param options CreateCardElementOptions see [docs](https://docs.credova.com)
   * @returns created element
   */
  public createElement(type: ElementType, options: CreateCardElementOptions) {
    return this._createElement(type as ElementTypeEnum, options)
  }

  public createCardElement(options: CreateCardElementOptions) {
    return this._createElement(ElementTypeEnum.Card, options)
  }

  public createCardExpirationDateElement(
    options: Omit<CreateCardExpirationDateElementOptions, 'targetId'>
  ) {
    return this._createElement(ElementTypeEnum.CardExpirationDate, {
      ...options,
      targetId: 'elementTypesCardExpirationDateElement'
    })
  }

  public createCardNumberElement(
    options: Omit<CreateCardNumberElementOptions, 'targetId'>
  ) {
    return this._createElement(ElementTypeEnum.CardNumber, {
      ...options,
      targetId: 'elementTypesCardNumberElement'
    })
  }

  public createCardVerificationCodeElement(
    options: Omit<CreateCardVerificationCodeElementOptions, 'targetId'>
  ) {
    return this._createElement(ElementTypeEnum.CardVerificationCode, {
      ...options,
      targetId: 'elementTypesCardVerificationCodeElement'
    })
  }
}
