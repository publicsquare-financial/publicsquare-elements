import type {
  CreateCardElementOptions as BTCreateCardElementOptions,
  CreateCardExpirationDateElementOptions,
  CreateCardNumberElementOptions,
  CreateCardVerificationCodeElementOptions,
  ElementType as BTElementType,
  BasisTheoryElements,
  ElementWrapper,
  ICardElement,
  ICardExpirationDateElement,
  ICardNumberElement,
  ICardVerificationCodeElement,
} from '@basis-theory/web-elements/dist/types'
import {
  CreateBankAccountAccountNumberElementOptions,
  CreateBankAccountElementOptions,
  CreateBankAccountRoutingNumberElementOptions,
  CreateBankAccountVerificationElementOptions
} from './bankAccounts'

export type { ElementWrapper }
export type {
  AutoCompleteValue,
  BaseElement,
  BasisTheoryElements,
  CardElementEvents,
  CardExpirationDateElementEvents,
  CardNumberElementEvents,
  CardVerificationCodeElementEvents,
  ChangeEvent,
  CopyEvent,
  CreateCardExpirationDateElementOptions,
  CreateCardNumberElementOptions,
  CreateCardVerificationCodeElementOptions,
  ElementEventListener,
  ElementMetadata,
  ElementValue,
  ICardElement,
  ICardExpirationDateElement,
  ICardNumberElement,
  ICardVerificationCodeElement,
  InputBlurEvent,
  InputFocusEvent,
  InputKeydownEvent,
  ReadyEvent,
  Subscription,
  UpdateCardElementOptions,
  UpdateCardExpirationDateElementOptions,
  UpdateCardNumberElementOptions,
  UpdateCardVerificationCodeElementOptions,
} from '@basis-theory/web-elements/dist/types'

export interface ApplicationInfo {
  name?: string
  version?: string
  url?: string
}

export interface PublicSquareInitOptions {
  cardCreateUrl?: string
  bankAccountCreateUrl?: string
  bankAccountVerificationUrl?: string
  applePayCreateUrl?: string
  applePayCreateSessionUrl?: string
  googlePayCreateUrl?: string
  getGooglePayConfiguration?: string
  proxyKey?: string
  appInfo?: ApplicationInfo
}

export type Environment = 'test' | 'production'

export type BankAccountElementTypes =
  | 'bankAccount'
  | 'bankAccountRoutingNumber'
  | 'bankAccountAccountNumber'
  | 'bankAccountVerification'
export type ElementType = BTElementType | BankAccountElementTypes

export enum ElementTypeEnum {
  Text = 'text',
  Card = 'card',
  CardExpirationDate = 'cardExpirationDate',
  CardNumber = 'cardNumber',
  CardVerificationCode = 'cardVerificationCode',
  BankAccount = 'bankAccount',
  BankAccountRoutingNumber = 'bankAccountRoutingNumber',
  BankAccountAccountNumber = 'bankAccountAccountNumber',
  BankAccountVerification = 'bankAccountVerification'
}

export type CreateCardElementOptions = BTCreateCardElementOptions
export type CardElement = ICardElement
export type CardExpirationDateElement = ICardExpirationDateElement
export type CardNumberElement = ICardNumberElement
export type CardVerificationCodeElement = ICardVerificationCodeElement

export type CreateElementOptions =
  | CreateCardElementOptions
  | CreateCardExpirationDateElementOptions
  | CreateCardNumberElementOptions
  | CreateCardVerificationCodeElementOptions
  | CreateBankAccountElementOptions
  | CreateBankAccountRoutingNumberElementOptions
  | CreateBankAccountAccountNumberElementOptions
  | CreateBankAccountVerificationElementOptions

export type BasisTheoryInstance = BasisTheoryElements
