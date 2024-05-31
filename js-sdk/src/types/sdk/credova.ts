import type {
  CreateCardElementOptions as BTCreateCardElementOptions,
  CreateCardExpirationDateElementOptions,
  CreateCardNumberElementOptions,
  CreateCardVerificationCodeElementOptions,
  ElementType as BTElementType,
  BasisTheoryElements,
  CardElement as BTCardElement
} from '@basis-theory/basis-theory-js/types/elements'
import { BasisTheory as IBasisTheory } from '@basis-theory/basis-theory-js/types/sdk'

export interface ApplicationInfo {
  name?: string
  version?: string
  url?: string
}

export interface CredovaInitOptions {
  apiBaseUrl?: string
  appInfo?: ApplicationInfo
}

export type ElementType = BTElementType

export enum ElementTypeEnum {
  Card = 'card',
  CardExpirationDate = 'cardExpirationDate',
  CardNumber = 'cardNumber',
  CardVerificationCode = 'cardVerificationCode'
}

export type CreateElementOptions =
  | BTCreateCardElementOptions
  | CreateCardExpirationDateElementOptions
  | CreateCardNumberElementOptions
  | CreateCardVerificationCodeElementOptions

export type CreateCardElementOptions = BTCreateCardElementOptions

export type BasisTheoryInstance = IBasisTheory & BasisTheoryElements

export type CardElement = BTCardElement
