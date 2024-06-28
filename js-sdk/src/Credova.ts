import { BasisTheory } from '@basis-theory/basis-theory-js'
import {
  ElementType,
  CreateCardElementOptions,
  ElementTypeEnum,
  CredovaInitOptions,
  BasisTheoryInstance,
  CreateElementOptions,
  CardExpirationDateElement,
  CardNumberElement,
  CardVerificationCodeElement
} from './types/sdk'
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
import { CredovaCards } from './cards'

export class Credova {
  _apiKey?: string;
  _apiUrl: string = 'https://api.basistheory.com/proxy?bt-proxy-key=key_prod_us_proxy_HiFqDwW49EZ8szKi8cMvQP';
  protected _bt?: BasisTheoryInstance

  get bt(): BasisTheoryInstance | undefined {
    return this._bt
  }

  private _elements: ElementValue[] = []

  public cards = new CredovaCards(this)

  /**
   * Initialize the Credova sdk. (REQUIRED before calling `createElement`)
   * @param apiKey your Credova public key
   * @param options CredovaInitOptions see [docs](https://docs.credova.com)
   * @returns class Credova
   */
  public async init(apiKey: string, options?: CredovaInitOptions) {
    this._apiKey = apiKey
    if (options?.apiBaseUrl) this._apiUrl = options?.apiBaseUrl;

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

  private _createElement(type: ElementTypeEnum, options: CreateElementOptions) {
    if (!this._bt) {
      throw new Error(ELEMENTS_INIT_ERROR_MESSAGE)
    }
    const element = this._bt.createElement(type as any, options as any)
    this._elements.push(element)
    return element
  }

  /**
   * Initialize a Credova element.
   * @param type 'card' | 'cardExpirationDate' | 'cardNumber' | 'cardVerificationCode'
   * @param options CreateCardElementOptions see [docs](https://docs.credova.com)
   * @returns created element
   */
  public createElement(type: ElementType, options: CreateElementOptions) {
    switch (type) {
      case 'card':
        return this.createCardElement(options as CreateCardElementOptions)
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
      default:
        throw new Error(ELEMENTS_TYPE_NOT_SUPPORTED)
    }
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
    }) as CardExpirationDateElement
  }

  public createCardNumberElement(
    options: Omit<CreateCardNumberElementOptions, 'targetId'>
  ) {
    return this._createElement(ElementTypeEnum.CardNumber, {
      ...options,
      targetId: 'elementTypesCardNumberElement'
    }) as CardNumberElement
  }

  public createCardVerificationCodeElement(
    options: Omit<CreateCardVerificationCodeElementOptions, 'targetId'>
  ) {
    return this._createElement(ElementTypeEnum.CardVerificationCode, {
      ...options,
      targetId: 'elementTypesCardVerificationCodeElement'
    }) as CardVerificationCodeElement
  }
}
