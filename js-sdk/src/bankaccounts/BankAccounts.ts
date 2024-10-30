import { PublicSquare } from "..";
import { 
  ELEMENTS_PUBLICSQUARE_BANKACCOUNTS_NO_POINTER_MESSAGE,
  ELEMENTS_NOM_DOM_ERROR_MESSAGE,
  ELEMENTS_SCRIPT_UNKNOWN_ERROR_MESSAGE
} from '@/constants'
import { 
  BankAccountCreateInput,
  BankAccountCreateResponse,
  CreateElementOptions
} from "@/types/sdk";
import { transformCreateBankAccountInput } from "@/utils";
import { validateCreateBankAccountInput } from "@/validators";

export class PublicSquareBankAccounts {
  private _publicSquare: PublicSquare;

  constructor(publicSquarePointer: PublicSquare) {
    if (!publicSquarePointer) {
      throw Error(ELEMENTS_PUBLICSQUARE_BANKACCOUNTS_NO_POINTER_MESSAGE);
    }
    this._publicSquare = publicSquarePointer
  }

  public create(
    input: BankAccountCreateInput
  ): Promise<BankAccountCreateResponse> {
    if (!this._publicSquare._apiKey) {
      throw new Error('apiKey must be sent at initialization')
    } else if (!this._publicSquare.bt || !this._publicSquare.bt.client) {
      throw new Error('PublicSquare JS has not be initialized yet')
    } else {
      const validatedInput = validateCreateBankAccountInput(input)
      return this._publicSquare.bt.client
        .post(
          'https://api.basistheory.com/proxy',
          transformCreateBankAccountInput(validatedInput),
          {
            headers: {
              'Content-Type': 'application/json',
              'X-API-KEY': this._publicSquare._apiKey,
              'BT-PROXY-KEY': this._publicSquare._proxyKey
            }
          }
        )
        .then((res) => res as BankAccountCreateResponse)
    }
  }

  public createElement(options: CreateElementOptions): any {
    if (typeof window === 'undefined') {
      throw Error(ELEMENTS_NOM_DOM_ERROR_MESSAGE)
    }
    const container = document.createElement('div')
    container.id = 'psq-bankaccount-container'
    container.style.display = 'flex'

    const routingNumberContainer = document.createElement('div')
    routingNumberContainer.id = 'psq-bankaccount-routing-number-container'
    routingNumberContainer.style.width = '100%'
    container.appendChild(routingNumberContainer)
    const routingNumber = this._publicSquare.bt?.createElement('text', {
      targetId: 'psq-bankaccount-routing-number',
      placeholder: 'Routing Number'
    })

    const accountNumberContainer = document.createElement('div')
    accountNumberContainer.id = 'psq-bankaccount-account-number-container'
    accountNumberContainer.style.width = '100%'
    container.appendChild(accountNumberContainer)
    const accountNumber = this._publicSquare.bt?.createElement('text', {
      targetId: 'psq-bankaccount-account-number',
      placeholder: 'Account Number'
    })

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
      }
    }
  }
}
