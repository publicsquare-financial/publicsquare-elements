import { BasisTheory } from '@basis-theory/basis-theory-js'
import * as Types from './types/sdk'
import {
  ELEMENTS_INIT_ERROR_MESSAGE,
  ELEMENTS_TYPE_NOT_SUPPORTED
} from './constants'
import {
  CreateCardExpirationDateElementOptions,
  CreateCardNumberElementOptions,
  CreateCardVerificationCodeElementOptions,
  ElementValue
} from '@basis-theory/basis-theory-js/types/elements'
import { PublicSquareCards } from './cards'
import { PublicSquareBankAccount } from './bankAccounts'

export class PublicSquare {
  _apiKey?: string
  _proxyKey: string = 'key_prod_us_proxy_HiFqDwW49EZ8szKi8cMvQP'
  protected _bt?: Types.BasisTheoryInstance

  get bt(): Types.BasisTheoryInstance | undefined {
    return this._bt
  }

  _elements: (ElementValue | Types.PSQTextElement)[] = []

  public cards = new PublicSquareCards(this)

  public bankAccounts = new PublicSquareBankAccount(this)

  /**
   * Initialize the PublicSquare sdk. (REQUIRED before calling `createElement`)
   * @param apiKey your PublicSquare public key
   * @param options PublicSquareInitOptions see [docs](https://developers.publicsquare.com)
   * @returns class PublicSquare
   */
  public async init(apiKey: string, options?: Types.PublicSquareInitOptions) {
    this._apiKey = apiKey
    if (options?.apiBaseUrl) this._proxyKey = options?.apiBaseUrl

    const bt = await new BasisTheory().init(
      (Math.random() + 1).toString(36).substring(7),
      { elements: true }
    )
    if (!bt) {
      throw new Error(ELEMENTS_INIT_ERROR_MESSAGE)
    }
    this._bt = bt
    return this
  }

  private _createElement(
    type: Types.ElementTypeEnum,
    options: Types.CreateElementOptions
  ) {
    if (!this._bt) {
      throw new Error(ELEMENTS_INIT_ERROR_MESSAGE)
    }
    const element = this._bt.createElement(type as any, options as any)
    this._elements.push(element)
    return element
  }

  /**
   * Initialize a PublicSquare element.
   * @param type {ElementType} 'card' | 'cardExpirationDate' | 'cardNumber' | 'cardVerificationCode' | 'ach'
   * @param options CreateCardElementOptions see [docs](https://developers.publicsquare.com)
   * @returns created element
   */
  public createElement(
    type: Types.ElementType,
    options: Types.CreateElementOptions
  ) {
    switch (type) {
      case 'card':
        return this.createCardElement(options as Types.CreateCardElementOptions)
      case 'cardExpirationDate':
        return this.createCardExpirationDateElement(
          options as CreateCardExpirationDateElementOptions
        )
      case 'cardNumber':
        return this.createCardNumberElement(
          options as CreateCardNumberElementOptions
        )
      case 'cardVerificationCode':
        return this.createCardVerificationCodeElement(
          options as CreateCardVerificationCodeElementOptions
        )
      case 'bankAccount':
        return this.createBankAccountElement()
      default:
        throw new Error(ELEMENTS_TYPE_NOT_SUPPORTED)
    }
  }

  public createCardElement(options: Types.CreateCardElementOptions) {
    return this._createElement(Types.ElementTypeEnum.Card, options)
  }

  public createCardExpirationDateElement(
    options: Omit<Types.CreateCardExpirationDateElementOptions, 'targetId'>
  ) {
    return this._createElement(Types.ElementTypeEnum.CardExpirationDate, {
      ...options,
      targetId: 'elementTypesCardExpirationDateElement'
    }) as Types.CardExpirationDateElement
  }

  public createCardNumberElement(
    options: Omit<Types.CreateCardNumberElementOptions, 'targetId'>
  ) {
    return this._createElement(Types.ElementTypeEnum.CardNumber, {
      ...options,
      targetId: 'elementTypesCardNumberElement'
    }) as Types.CardNumberElement
  }

  public createCardVerificationCodeElement(
    options: Omit<Types.CreateCardVerificationCodeElementOptions, 'targetId'>
  ) {
    return this._createElement(Types.ElementTypeEnum.CardVerificationCode, {
      ...options,
      targetId: 'elementTypesCardVerificationCodeElement'
    }) as Types.CardVerificationCodeElement
  }

  public createBankAccountElement(options?: {
    routingNumberOptions?: Types.InputElementOptions
    accountNumberOptions?: Types.InputElementOptions
  }) {
    return new PublicSquareBankAccount(this).createElement(options)
  }

  public createBankAccountRoutingNumberElement(
    options: Types.InputElementOptions = {}
  ) {
    return new PublicSquareBankAccount(this).createRoutingNumberElement(options)
  }

  public createBankAccountAccountNumberElement(
    options: Types.InputElementOptions = {}
  ) {
    return new PublicSquareBankAccount(this).createAccountNumberElement(options)
  }
}
