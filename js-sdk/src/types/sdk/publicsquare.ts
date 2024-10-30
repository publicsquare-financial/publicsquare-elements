import type {
  CreateCardElementOptions as BTCreateCardElementOptions,
  CreateCardExpirationDateElementOptions,
  CreateCardNumberElementOptions,
  CreateCardVerificationCodeElementOptions,
  ElementType as BTElementType,
  BasisTheoryElements
} from '@basis-theory/basis-theory-js/types/elements'
import { BasisTheory as IBasisTheory } from '@basis-theory/basis-theory-js/types/sdk'
import {PublicSquareBankAccounts} from "@/bankaccounts";
export { ElementWrapper } from '@basis-theory/basis-theory-js/types/elements'
export * from '@basis-theory/basis-theory-js/types/elements'

export interface ApplicationInfo {
  name?: string
  version?: string
  url?: string
}

export interface PublicSquareInitOptions {
  apiBaseUrl?: string
  appInfo?: ApplicationInfo
}

export type Environment = 'test' | 'production'

export type ElementType = BTElementType | 'bankaccount'

export enum ElementTypeEnum {
  Card = 'card',
  CardExpirationDate = 'cardExpirationDate',
  CardNumber = 'cardNumber',
  CardVerificationCode = 'cardVerificationCode',
  BankAccount = 'bankaccount'
}

export type CreateElementOptions =
  | BTCreateCardElementOptions
  | CreateCardExpirationDateElementOptions
  | CreateCardNumberElementOptions
  | CreateCardVerificationCodeElementOptions

export type CreateCardElementOptions = BTCreateCardElementOptions

export type BasisTheoryInstance = IBasisTheory & BasisTheoryElements
