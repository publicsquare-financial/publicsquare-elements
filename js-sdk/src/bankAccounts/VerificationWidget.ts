import {
  BankAccountVerificationUrlResponse,
  BankAccountVerificationIdRequest,
  BankAccountVerificationIdResponse
} from '@/types'
import { PublicSquare } from '@/PublicSquare'
import {
  ELEMENTS_PUBLICSQUARE_BANK_ACCOUNT_NO_POINTER_MESSAGE,
  ELEMENTS_PUBLICSQUARE_BANK_ACCOUNT_VERIFICATION_NOT_ENABLED
} from '@/constants'

export class VerificationWidget {
  private _publicSquare: PublicSquare
  private _messageHandler: ((event: MessageEvent) => void) | null = null

  constructor(psqPointer: PublicSquare) {
    if (!psqPointer) {
      throw Error(ELEMENTS_PUBLICSQUARE_BANK_ACCOUNT_NO_POINTER_MESSAGE)
    }
    this._publicSquare = psqPointer
  }

  public open(target?: string): Promise<BankAccountVerificationIdResponse> {
    // 1. Install script
    // 2. Make api requests
    // 3. Open widget
    // 4. Wait for response
    return this.getAuthorizationUrl()
      .then((response) => {
        this.buildContainer(response.authorization_url, target)
        return this._setupMessageListener()
      })
      .catch((err) => {
        this.buildErrorContainer(err.message, target)
        throw err
      })
  }

  private _setupMessageListener(): Promise<BankAccountVerificationIdResponse> {
    return new Promise((resolve, reject) => {
      this._messageHandler = (e: MessageEvent) => {
        const data = e.data
        if (data && typeof data === 'object') {
          if (data.step === 'REDIRECT' && data.loginId && data.requestId) {
            // Handle redirect event with loginId and requestId
            this.saveBankAccountVerification({
              verification_code: data.loginId,
              request_id: data.requestId
            })
              .then(resolve)
              .catch(reject)
          }
        }
      }
      window.addEventListener('message', this._messageHandler)
    })
  }

  public destroy() {
    if (this._messageHandler) {
      window.removeEventListener('message', this._messageHandler)
      this._messageHandler = null
    }
  }

  public async saveBankAccountVerification(
    request: BankAccountVerificationIdRequest
  ): Promise<BankAccountVerificationIdResponse> {
    return fetch(this._publicSquare._bankAccountVerificationUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': this._publicSquare._apiKey!
      },
      body: JSON.stringify(request)
    })
      .then((res) => {
        return res.json()
      })
      .then((res) =>
        res.errors
          ? {
              error: res
            }
          : res
      )
  }

  private buildContainer(url: string, target?: string) {
    const targetContainer = target
      ? document.querySelector(target)
      : document.body
    if (!targetContainer) {
      throw Error('Target container not found')
    }

    const container = document.createElement('div')
    container.id = 'publicsquare-verification-widget'
    container.style.display = 'flex'
    container.style.justifyContent = 'center'
    container.style.alignItems = 'center'
    container.style.height = '100%'
    container.style.width = '100%'
    targetContainer.appendChild(container)

    const iframe = document.createElement('iframe')
    iframe.src = url
    iframe.style.width = '100%'
    iframe.style.height = '768px'
    iframe.style.border = '1px solid #d1d5dc'
    iframe.style.borderRadius = '4px'
    container.appendChild(iframe)
  }

  private buildErrorContainer(error: string, target?: string) {
    const targetContainer = target
      ? document.querySelector(target)
      : document.body
    if (!targetContainer) {
      throw Error('Target container not found')
    }

    const container = document.createElement('div')
    container.id = 'publicsquare-verification-widget'
    container.style.display = 'flex'
    container.style.justifyContent = 'center'
    container.style.alignItems = 'center'
    container.style.height = '100%'
    container.style.width = '100%'
    container.textContent = error
    targetContainer.appendChild(container)
  }

  private async getAuthorizationUrl(): Promise<BankAccountVerificationUrlResponse> {
    const res = await fetch(this._publicSquare._bankAccountVerificationUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': this._publicSquare._apiKey!
      }
    })

    if (!res.ok) {
      throw Error(ELEMENTS_PUBLICSQUARE_BANK_ACCOUNT_VERIFICATION_NOT_ENABLED)
    }

    return await res.json()
  }
}
