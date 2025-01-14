import {
  ELEMENTS_NOM_DOM_ERROR_MESSAGE,
  ELEMENTS_PUBLICSQUARE_ACH_NO_POINTER_MESSAGE,
  ELEMENTS_PUBLICSQUARE_BANK_ACCOUNT_ROUTING_NUMBER_LOAD_ERROR_MESSAGE,
  ELEMENTS_PUBLICSQUARE_BANK_ACCOUNT_ACCOUNT_NUMBER_LOAD_ERROR_MESSAGE,
  ELEMENTS_SCRIPT_UNKNOWN_ERROR_MESSAGE
} from '@/constants'
import { PublicSquare } from '@/PublicSquare'
import {
  AccountNumberElement,
  BankAccountCreateInput,
  BankAccountCreateResponse,
  BankAccountElement,
  CreateElementOptions,
  InputElementOptions,
  PSQTextElement,
  RoutingNumberElement
} from '@/types/sdk'
import { transformCreateBankAccountInput } from '@/utils'
import { validateCreateBankAccountInput } from '@/validators/bankAccounts'

function createInputElement({
  placeholder,
  value,
  className
}: InputElementOptions): PSQTextElement {
  const input = document.createElement('input')
  input.type = 'text'
  input.placeholder = placeholder ?? ''
  input.value = value ?? ''
  input.className = [
    'publicsquare-element-input',
    ...(className?.split(' ') ?? [])
  ].join(' ')

  return {
    el: input,
    mount: (id: string) => {
      const target = document.querySelector(id)
      if (target) {
        target.appendChild(input)
      }
    }
  }
}

export class PublicSquareBankAccount {
  private _publicSquare: PublicSquare

  constructor(psqPointer: PublicSquare) {
    if (!psqPointer) {
      throw Error(ELEMENTS_PUBLICSQUARE_ACH_NO_POINTER_MESSAGE)
    }
    this._publicSquare = psqPointer
  }

  public create(
    input: BankAccountCreateInput,
    // TODO: DO NOT LET ME COMMIT THIS TO GITHUB
    secretKey: string
  ): Promise<BankAccountCreateResponse> {
    if (!this._publicSquare._apiKey) {
      throw new Error('apiKey must be sent at initialization')
    } else if (!this._publicSquare.bt || !this._publicSquare.bt.client) {
      throw new Error('PublicSquare JS has not be initialized yet')
    } else {
      const validatedInput = validateCreateBankAccountInput(input)
      return fetch(
        'https://api.publicsquare.com/payment-methods/bank-accounts',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': secretKey
          },
          body: JSON.stringify(transformCreateBankAccountInput(validatedInput))
        }
      )
        .then((res) => res.json())
        .then((res) => res as BankAccountCreateResponse)
    }
  }

  public createRoutingNumberElement(
    options: InputElementOptions
  ): RoutingNumberElement {
    return createInputElement(options)
  }

  public createAccountNumberElement(
    options: InputElementOptions
  ): AccountNumberElement {
    return createInputElement(options)
  }

  public createElement({
    routingNumberOptions,
    accountNumberOptions
  }: {
    routingNumberOptions?: InputElementOptions
    accountNumberOptions?: InputElementOptions
  } = {}): BankAccountElement {
    if (typeof window === 'undefined') {
      throw Error(ELEMENTS_NOM_DOM_ERROR_MESSAGE)
    }
    const container = document.createElement('div')
    container.id = 'psq-bank-account-container'
    container.style.display = 'flex'

    const routingNumberContainer = document.createElement('div')
    routingNumberContainer.id = 'psq-ach-routing-number-container'
    routingNumberContainer.style.width = '100%'
    container.appendChild(routingNumberContainer)
    let routingNumberValue = ''
    const routingNumber = this.createRoutingNumberElement({
      placeholder: 'Routing Number',
      value: routingNumberValue,
      ...routingNumberOptions
    })

    const accountNumberContainer = document.createElement('div')
    accountNumberContainer.id = 'psq-ach-account-number-container'
    accountNumberContainer.style.width = '100%'
    container.appendChild(accountNumberContainer)
    let accountNumberValue = ''
    const accountNumber = this.createAccountNumberElement({
      placeholder: 'Account Number',
      value: accountNumberValue,
      ...accountNumberOptions
    })

    if (!routingNumber) {
      throw new Error(
        ELEMENTS_PUBLICSQUARE_BANK_ACCOUNT_ROUTING_NUMBER_LOAD_ERROR_MESSAGE
      )
    } else if (!accountNumber) {
      throw new Error(
        ELEMENTS_PUBLICSQUARE_BANK_ACCOUNT_ACCOUNT_NUMBER_LOAD_ERROR_MESSAGE
      )
    }

    return {
      ...container,
      mount: (id: string) => {
        if (!routingNumber || !accountNumber) {
          throw new Error(ELEMENTS_SCRIPT_UNKNOWN_ERROR_MESSAGE)
        } else {
          const target = document.querySelector(id)
          if (target) {
            target.appendChild(container)

            routingNumber.mount(`#${routingNumberContainer.id}`)
            this._publicSquare._elements.push(routingNumber)

            accountNumber.mount(`#${accountNumberContainer.id}`)
            this._publicSquare._elements.push(accountNumber)
          }
        }
        return this
      },
      accountNumber,
      routingNumber
    }
  }
}
